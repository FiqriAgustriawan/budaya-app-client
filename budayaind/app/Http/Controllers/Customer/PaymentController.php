<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
  protected $midtransService;

  public function __construct(MidtransService $midtransService)
  {
    $this->midtransService = $midtransService;
  }

  public function success(Request $request, Order $order)
  {
    if ($order->user_id !== Auth::id()) {
      abort(403, 'Unauthorized access to order');
    }

    Log::info('Payment success page accessed', [
      'order_id' => $order->id,
      'order_number' => $order->order_number,
      'current_status' => $order->payment_status,
      'transaction_id' => $request->transaction_id
    ]);

    try {
      // Update status dengan nilai yang benar
      $order->update([
        'payment_status' => 'paid',
        'status' => 'paid'  // UBAH: dari 'confirmed' ke 'paid'
      ]);

      Log::info('Order status updated to paid', [
        'order_id' => $order->id,
        'order_number' => $order->order_number
      ]);
    } catch (\Exception $e) {
      Log::error('Error updating order status: ' . $e->getMessage());

      // Jika error, coba update hanya payment_status
      try {
        $order->update(['payment_status' => 'paid']);
      } catch (\Exception $e2) {
        Log::error('Failed to update even payment_status: ' . $e2->getMessage());
      }
    }

    // Reload order dengan status terbaru
    $order = $order->fresh()->load('items.ticket');

    return Inertia::render('Customer/Payment/Success', [
      'order' => [
        'id' => $order->id,
        'order_number' => $order->order_number,
        'customer_name' => $order->customer_name,
        'customer_email' => $order->customer_email,
        'total_amount' => (float) $order->total_amount,
        'platform_fee' => (float) $order->platform_fee,
        'payment_status' => $order->payment_status,
        'status' => $order->status,
        'items' => $order->items->map(function ($item) {
          return [
            'id' => $item->id,
            'quantity' => $item->quantity,
            'price' => (float) $item->price,
            'subtotal' => (float) $item->subtotal,
            'ticket' => [
              'title' => $item->ticket->title,
              'destination' => $item->ticket->destination,
            ]
          ];
        })->toArray()
      ],
      'transaction' => [
        'transaction_id' => $request->transaction_id ?? 'N/A',
        'order_id' => $request->order_id ?? $order->order_number,
        'status' => 'success'
      ]
    ]);
  }

  public function pending(Request $request, Order $order)
  {
    if ($order->user_id !== Auth::id()) {
      abort(403, 'Unauthorized access to order');
    }

    $order->update([
      'payment_status' => 'pending',
      'status' => 'pending'
    ]);

    return Inertia::render('Customer/Payment/Pending', [
      'order' => [
        'id' => $order->id,
        'order_number' => $order->order_number,
        'customer_name' => $order->customer_name,
        'total_amount' => (float) $order->total_amount,
        'platform_fee' => (float) $order->platform_fee,
      ],
      'transaction' => [
        'transaction_id' => $request->transaction_id ?? 'N/A',
        'order_id' => $request->order_id ?? $order->order_number,
      ]
    ]);
  }

  public function failed(Request $request, Order $order)
  {
    if ($order->user_id !== Auth::id()) {
      abort(403, 'Unauthorized access to order');
    }

    $order->update([
      'payment_status' => 'failed',
      'status' => 'cancelled'  // UBAH: dari 'cancelled' ke yang lebih pendek jika perlu
    ]);

    return Inertia::render('Customer/Payment/Failed', [
      'order' => [
        'id' => $order->id,
        'order_number' => $order->order_number,
        'total_amount' => (float) $order->total_amount,
        'platform_fee' => (float) $order->platform_fee,
      ],
      'transaction' => [
        'transaction_id' => $request->transaction_id ?? 'N/A',
        'order_id' => $request->order_id ?? $order->order_number,
      ]
    ]);
  }

  // Webhook notification dari Midtrans
  public function notification(Request $request)
  {
    try {
      $notification = $request->all();

      Log::info('Midtrans webhook notification received', [
        'notification' => $notification
      ]);

      // Validasi required fields
      if (!isset($notification['order_id']) || !isset($notification['transaction_status'])) {
        Log::error('Invalid notification format', $notification);
        return response('Invalid notification', 400);
      }

      // Find order
      $order = Order::where('order_number', $notification['order_id'])->first();

      if (!$order) {
        Log::error('Order not found in webhook: ' . $notification['order_id']);
        return response('Order not found', 404);
      }

      Log::info('Processing webhook for order', [
        'order_id' => $order->id,
        'order_number' => $order->order_number,
        'current_status' => $order->payment_status,
        'transaction_status' => $notification['transaction_status']
      ]);

      // Update order status berdasarkan transaction status - SEMUA GUNAKAN 'paid'
      $oldStatus = $order->payment_status;

      switch ($notification['transaction_status']) {
        case 'capture':
          if (isset($notification['fraud_status']) && $notification['fraud_status'] == 'accept') {
            $order->update([
              'payment_status' => 'paid',
              'status' => 'paid'  // UBAH: dari 'confirmed' ke 'paid'
            ]);
          }
          break;

        case 'settlement':
          $order->update([
            'payment_status' => 'paid',
            'status' => 'paid'  // UBAH: dari 'confirmed' ke 'paid'
          ]);
          break;

        case 'pending':
          $order->update([
            'payment_status' => 'pending',
            'status' => 'pending'
          ]);
          break;

        case 'deny':
        case 'cancel':
        case 'expire':
        case 'failure':
          $order->update([
            'payment_status' => 'failed',
            'status' => 'failed'  // UBAH: dari 'cancelled' ke 'failed'
          ]);
          break;
      }

      Log::info('Webhook processed successfully', [
        'order_id' => $order->id,
        'order_number' => $order->order_number,
        'old_status' => $oldStatus,
        'new_status' => $order->fresh()->payment_status,
        'transaction_status' => $notification['transaction_status']
      ]);

      return response('OK', 200);
    } catch (\Exception $e) {
      Log::error('Webhook notification error: ' . $e->getMessage(), [
        'exception' => $e->getTraceAsString(),
        'request_data' => $request->all()
      ]);
      return response('Error', 500);
    }
  }
}
