<?php


namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
  public function index(Request $request)
  {
    $sellerId = Auth::id();
    $seller = Auth::user();

    // Stats Overview
    $totalTickets = Ticket::where('user_id', $sellerId)->count();
    $activeTickets = Ticket::where('user_id', $sellerId)->where('is_active', true)->count();

    $totalOrders = Order::whereHas('items.ticket', function ($q) use ($sellerId) {
      $q->where('user_id', $sellerId);
    })->count();

    $paidOrders = Order::whereHas('items.ticket', function ($q) use ($sellerId) {
      $q->where('user_id', $sellerId);
    })->where('payment_status', 'paid')->count();

    $totalRevenue = OrderItem::whereHas('ticket', function ($q) use ($sellerId) {
      $q->where('user_id', $sellerId);
    })->whereHas('order', function ($q) {
      $q->where('payment_status', 'paid');
    })->sum('subtotal');

    // Recent Orders
    $recentOrders = Order::with(['items.ticket' => function ($q) use ($sellerId) {
      $q->where('user_id', $sellerId);
    }])
      ->whereHas('items.ticket', function ($q) use ($sellerId) {
        $q->where('user_id', $sellerId);
      })
      ->latest()
      ->take(5)
      ->get()
      ->map(function ($order) {
        // Filter items to only show seller's tickets
        $order->setRelation('items', $order->items->filter(function ($item) {
          return $item->ticket && $item->ticket->user_id === Auth::id();
        }));
        return $order;
      });

    // Top Performing Tickets
    $topTickets = Ticket::withCount(['orderItems' => function ($q) {
      $q->whereHas('order', function ($query) {
        $query->where('payment_status', 'paid');
      });
    }])
      ->where('user_id', $sellerId)
      ->orderBy('order_items_count', 'desc')
      ->take(5)
      ->get();

    // Monthly Revenue (last 6 months)
    $monthlyRevenue = [];
    for ($i = 5; $i >= 0; $i--) {
      $month = Carbon::now()->subMonths($i);
      $revenue = OrderItem::whereHas('ticket', function ($q) use ($sellerId) {
        $q->where('user_id', $sellerId);
      })
        ->whereHas('order', function ($q) {
          $q->where('payment_status', 'paid');
        })
        ->whereYear('created_at', $month->year)
        ->whereMonth('created_at', $month->month)
        ->sum('subtotal');

      $monthlyRevenue[] = [
        'month' => $month->format('M Y'),
        'revenue' => $revenue
      ];
    }

    return Inertia::render('Seller/Dashboard', [
      'seller' => $seller,
      'stats' => [
        'total_tickets' => $totalTickets,
        'active_tickets' => $activeTickets,
        'total_orders' => $totalOrders,
        'paid_orders' => $paidOrders,
        'total_revenue' => $totalRevenue,
      ],
      'recent_orders' => $recentOrders,
      'top_tickets' => $topTickets,
      'monthly_revenue' => $monthlyRevenue,
    ]);
  }
}
