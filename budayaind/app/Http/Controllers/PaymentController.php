<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
  public function success(Request $request)
  {
    $orderNumber = $request->query('order_id');

    if ($orderNumber) {
      $order = Order::where('order_number', $orderNumber)->first();

      if ($order) {
        return Inertia::render('Customer/Payment/Success', [
          'order' => $order->load(['items.ticket']),
        ]);
      }
    }

    return Inertia::render('Customer/Payment/Success', [
      'order' => null,
    ]);
  }

  public function pending(Request $request)
  {
    $orderNumber = $request->query('order_id');

    if ($orderNumber) {
      $order = Order::where('order_number', $orderNumber)->first();

      if ($order) {
        return Inertia::render('Customer/Payment/Pending', [
          'order' => $order->load(['items.ticket']),
        ]);
      }
    }

    return Inertia::render('Customer/Payment/Pending', [
      'order' => null,
    ]);
  }

  public function failed(Request $request)
  {
    $orderNumber = $request->query('order_id');

    if ($orderNumber) {
      $order = Order::where('order_number', $orderNumber)->first();

      if ($order) {
        return Inertia::render('Customer/Payment/Failed', [
          'order' => $order->load(['items.ticket']),
        ]);
      }
    }

    return Inertia::render('Customer/Payment/Failed', [
      'order' => null,
    ]);
  }

  public function webhook(Request $request)
  {
    try {
      // Log the webhook payload for debugging
      Log::info('Payment webhook received:', $request->all());

      $orderNumber = $request->order_id;
      $transactionStatus = $request->transaction_status;
      $paymentType = $request->payment_type;
      $fraudStatus = $request->fraud_status ?? null;

      // Find the order
      $order = Order::where('order_number', $orderNumber)->first();

      if (!$order) {
        Log::error('Order not found for webhook:', ['order_number' => $orderNumber]);
        return response()->json(['status' => 'error', 'message' => 'Order not found'], 404);
      }

      // Update order status based on transaction status
      switch ($transactionStatus) {
        case 'capture':
        case 'settlement':
          if ($fraudStatus === 'accept' || $fraudStatus === null) {
            $order->update([
              'payment_status' => 'success',
              'status' => 'confirmed',
            ]);
            Log::info('Order payment confirmed:', ['order_number' => $orderNumber]);
          }
          break;

        case 'pending':
          $order->update([
            'payment_status' => 'pending',
            'status' => 'pending',
          ]);
          Log::info('Order payment pending:', ['order_number' => $orderNumber]);
          break;

        case 'deny':
        case 'cancel':
        case 'expire':
          $order->update([
            'payment_status' => 'failed',
            'status' => 'cancelled',
          ]);
          Log::info('Order payment failed/cancelled:', ['order_number' => $orderNumber]);
          break;

        case 'failure':
          $order->update([
            'payment_status' => 'failed',
            'status' => 'cancelled',
          ]);
          Log::info('Order payment failure:', ['order_number' => $orderNumber]);
          break;

        default:
          Log::warning('Unknown transaction status:', [
            'order_number' => $orderNumber,
            'transaction_status' => $transactionStatus
          ]);
          break;
      }

      return response()->json(['status' => 'ok']);
    } catch (\Exception $e) {
      Log::error('Payment webhook error:', [
        'error' => $e->getMessage(),
        'payload' => $request->all()
      ]);

      return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
    }
  }
}
