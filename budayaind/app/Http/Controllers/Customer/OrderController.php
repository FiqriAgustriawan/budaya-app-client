<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
  public function index(Request $request)
  {
    $query = Order::with(['items.ticket.seller'])
      ->where('user_id', Auth::id())
      ->latest();

    // Filter by search
    if ($request->filled('search')) {
      $search = $request->search;
      $query->where(function ($q) use ($search) {
        $q->where('order_number', 'like', "%{$search}%")
          ->orWhere('customer_name', 'like', "%{$search}%")
          ->orWhereHas('items.ticket', function ($ticketQuery) use ($search) {
            $ticketQuery->where('title', 'like', "%{$search}%")
              ->orWhere('destination', 'like', "%{$search}%");
          });
      });
    }

    // Filter by status
    if ($request->filled('status') && $request->status !== 'all') {
      $query->where('status', $request->status);
    }

    // Filter by payment status
    if ($request->filled('payment_status') && $request->payment_status !== 'all') {
      $query->where('payment_status', $request->payment_status);
    }

    $orders = $query->paginate(10)->withQueryString();

    // Calculate stats
    $userOrders = Order::where('user_id', Auth::id());

    $stats = [
      'total_orders' => $userOrders->count(),
      'pending_orders' => $userOrders->where('payment_status', 'pending')->count(),
      'completed_orders' => $userOrders->where('payment_status', 'paid')->count(),
      'total_spent' => $userOrders->where('payment_status', 'paid')->sum('total_amount'),
    ];

    return Inertia::render('Customer/Orders/Index', [
      'orders' => $orders,
      'filters' => $request->only(['search', 'status', 'payment_status']),
      'stats' => $stats,
    ]);
  }

  public function show(Order $order)
  {
    // Check ownership
    if ($order->user_id !== Auth::id()) {
      abort(403, 'Unauthorized access to order');
    }

    $order->load(['items.ticket.seller']);

    return Inertia::render('Customer/Orders/Show', [
      'order' => $order,
    ]);
  }
}
