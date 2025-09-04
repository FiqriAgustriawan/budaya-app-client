<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
  public function index(Request $request)
  {
    $sellerId = Auth::id();

    $query = Order::with(['items.ticket' => function ($q) use ($sellerId) {
      $q->where('user_id', $sellerId);
    }])
      ->whereHas('items.ticket', function ($q) use ($sellerId) {
        $q->where('user_id', $sellerId);
      });

    // Apply filters
    if ($request->search) {
      $query->where(function ($q) use ($request) {
        $q->where('order_number', 'like', "%{$request->search}%")
          ->orWhere('customer_name', 'like', "%{$request->search}%")
          ->orWhere('customer_email', 'like', "%{$request->search}%");
      });
    }

    if ($request->status && $request->status !== 'all') {
      $query->where('status', $request->status);
    }

    if ($request->payment_status && $request->payment_status !== 'all') {
      $query->where('payment_status', $request->payment_status);
    }

    if ($request->date_range) {
      switch ($request->date_range) {
        case 'today':
          $query->whereDate('created_at', today());
          break;
        case 'this_week':
          $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
          break;
        case 'this_month':
          $query->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()]);
          break;
        case 'last_month':
          $query->whereBetween('created_at', [
            now()->subMonth()->startOfMonth(),
            now()->subMonth()->endOfMonth()
          ]);
          break;
      }
    }

    $orders = $query->latest()->paginate(20);

    $statsQuery = Order::whereHas('items.ticket', function ($q) use ($sellerId) {
      $q->where('user_id', $sellerId);
    });

    $stats = [
      'total_orders' => $statsQuery->count(),
      'pending_orders' => $statsQuery->where('payment_status', 'pending')->count(),
      'completed_orders' => $statsQuery->where('payment_status', 'paid')->count(),
      'total_revenue' => OrderItem::whereHas('ticket', function ($q) use ($sellerId) {
        $q->where('user_id', $sellerId);
      })->whereHas('order', function ($q) {
        $q->where('payment_status', 'paid');
      })->sum('subtotal') ?? 0,
    ];

    return Inertia::render('Seller/Orders/Index', [
      'orders' => $orders,
      'filters' => $request->only(['search', 'status', 'payment_status', 'date_range']),
      'stats' => $stats,
    ]);
  }

  public function show(Order $order)
  {
    $hasSellerItems = $order->items()
      ->whereHas('ticket', function ($q) {
        $q->where('user_id', Auth::id());
      })
      ->exists();

    if (!$hasSellerItems) {
      abort(403, 'Unauthorized');
    }

    $order->load([
      'items.ticket' => function ($q) {
        $q->where('user_id', Auth::id());
      }
    ]);

    $order->setRelation('items', $order->items->filter(function ($item) {
      return $item->ticket->user_id === Auth::id();
    }));

    return Inertia::render('Seller/Orders/Show', [
      'order' => $order,
    ]);
  }
}
