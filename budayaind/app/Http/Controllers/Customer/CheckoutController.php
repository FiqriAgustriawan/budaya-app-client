<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Services\CartService;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
  protected $cartService;
  protected $midtransService;

  public function __construct(CartService $cartService, MidtransService $midtransService)
  {
    $this->cartService = $cartService;
    $this->midtransService = $midtransService;
  }

  public function index()
  {
    $userId = Auth::id();

    try {
      $cartSummary = $this->cartService->getCartSummary($userId);

      if (empty($cartSummary['items']) || $cartSummary['items']->isEmpty()) {
        return redirect()->route('customer.cart.index')
          ->with('error', 'Keranjang kosong');
      }

      // Calculate additional fees
      $subtotal = $cartSummary['total_amount'];
      $platformFee = $subtotal * 0.05;
      $grandTotal = $subtotal + $platformFee;

      // Prepare cart data for frontend
      $cart = [
        'items' => $cartSummary['items']->map(function ($item) {
          return [
            'id' => $item->id,
            'ticket_id' => $item->ticket_id,
            'quantity' => $item->quantity,
            'subtotal' => $item->subtotal,
            'visit_date' => $item->visit_date,
            'special_requests' => $item->special_requests,
            'ticket' => [
              'id' => $item->ticket->id,
              'title' => $item->ticket->title,
              'destination' => $item->ticket->destination,
              'price' => (float) $item->ticket->price,
              'image' => $this->getImageUrl($item->ticket->image),
              'seller' => $item->ticket->seller ? [
                'id' => $item->ticket->seller->id,
                'name' => $item->ticket->seller->name,
              ] : null,
            ]
          ];
        }),
        'total_items' => $cartSummary['total_items'],
        'total_quantity' => $cartSummary['items']->sum('quantity'),
        'total_amount' => $subtotal,
        'platform_fee' => $platformFee,
        'grand_total' => $grandTotal,
      ];

      return Inertia::render('Customer/Checkout/Index', [
        'cart' => $cart,
      ]);
    } catch (\Exception $e) {
      Log::error('Checkout index error: ' . $e->getMessage());
      return redirect()->route('customer.cart.index')
        ->with('error', 'Terjadi kesalahan saat memproses checkout');
    }
  }

  public function store(Request $request)
  {
    $request->validate([
      'customer_name' => 'required|string|max:255',
      'customer_email' => 'required|email|max:255',
      'customer_phone' => 'required|string|max:20',
      'visit_date' => 'required|date|after_or_equal:today',
      'special_requests' => 'nullable|string|max:1000',
    ]);

    $userId = Auth::id();

    try {
      return DB::transaction(function () use ($request, $userId) {
        $cartSummary = $this->cartService->getCartSummary($userId);

        if (empty($cartSummary['items']) || $cartSummary['items']->isEmpty()) {
          return back()->withErrors(['message' => 'Keranjang kosong']);
        }

        // Calculate totals
        $subtotal = $cartSummary['total_amount'];
        $platformFee = $subtotal * 0.05;

        // Create order
        $order = Order::create([
          'user_id' => $userId,
          'order_number' => $this->generateOrderNumber(),
          'customer_name' => $request->customer_name,
          'customer_email' => $request->customer_email,
          'customer_phone' => $request->customer_phone,
          'visit_date' => $request->visit_date,
          'special_requests' => $request->special_requests,
          'total_amount' => $subtotal,
          'platform_fee' => $platformFee,
          'status' => 'pending',
          'payment_status' => 'pending',
        ]);

        // Create order items
        foreach ($cartSummary['items'] as $cartItem) {
          OrderItem::create([
            'order_id' => $order->id,
            'ticket_id' => $cartItem->ticket_id,
            'quantity' => $cartItem->quantity,
            'price' => $cartItem->ticket->price,
            'subtotal' => $cartItem->subtotal,
          ]);
        }

        // Generate Midtrans Snap Token
        $snapToken = $this->midtransService->createSnapToken($order);

        if (!$snapToken) {
          throw new \Exception('Failed to create payment transaction');
        }

        // Save snap token
        $order->update(['snap_token' => $snapToken]);

        // Clear cart
        $this->cartService->clearCart($userId);

        return Inertia::render('Customer/Checkout/Payment', [
          'order' => $order->fresh()->load('items.ticket'),
          'snapToken' => $snapToken,
        ]);
      });
    } catch (\Exception $e) {
      Log::error('Create order error: ' . $e->getMessage());
      return back()->withErrors(['message' => 'Gagal membuat pesanan: ' . $e->getMessage()]);
    }
  }

  private function generateOrderNumber(): string
  {
    return 'ORD-' . date('Ymd') . '-' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));
  }

  private function getImageUrl($imagePath)
  {
    if (!$imagePath) {
      return '/images/placeholder-ticket.jpg';
    }

    if (str_starts_with($imagePath, 'http')) {
      return $imagePath;
    }

    if (str_starts_with($imagePath, 'tickets/')) {
      return "/storage/{$imagePath}";
    }

    return "/storage/tickets/{$imagePath}";
  }
}
