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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        try {
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

            // Recent Orders - Fixed relationship
            $recentOrders = Order::with(['items.ticket' => function ($q) use ($sellerId) {
                $q->where('user_id', $sellerId);
            }])
                ->whereHas('items.ticket', function ($q) use ($sellerId) {
                    $q->where('user_id', $sellerId);
                })
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($order) use ($sellerId) {
                    // Filter items to only show seller's tickets
                    $order->setRelation('items', $order->items->filter(function ($item) use ($sellerId) {
                        return $item->ticket && $item->ticket->user_id === $sellerId;
                    }));
                    return $order;
                });

            // Top Performing Tickets
            $topTickets = Ticket::where('user_id', $sellerId)
                ->withCount(['orderItems as total_sold' => function ($q) {
                    $q->select(DB::raw('sum(quantity)'));
                }])
                ->orderBy('total_sold', 'desc')
                ->take(5)
                ->get();

            // Monthly Revenue (last 6 months)
            $monthlyRevenue = [];
            for ($i = 5; $i >= 0; $i--) {
                $date = Carbon::now()->subMonths($i);
                $revenue = OrderItem::whereHas('ticket', function ($q) use ($sellerId) {
                    $q->where('user_id', $sellerId);
                })->whereHas('order', function ($q) {
                    $q->where('payment_status', 'paid');
                })->whereYear('created_at', $date->year)
                  ->whereMonth('created_at', $date->month)
                  ->sum('subtotal');

                $monthlyRevenue[] = [
                    'month' => $date->format('M Y'),
                    'revenue' => $revenue,
                ];
            }

            $stats = [
                'total_tickets' => $totalTickets,
                'active_tickets' => $activeTickets,
                'total_orders' => $totalOrders,
                'paid_orders' => $paidOrders,
                'total_revenue' => $totalRevenue,
            ];

            return Inertia::render('Seller/Dashboard', [
                'seller' => $seller,
                'stats' => $stats,
                'recent_orders' => $recentOrders,
                'top_tickets' => $topTickets,
                'monthly_revenue' => $monthlyRevenue,
            ]);

        } catch (\Exception $e) {
            Log::error('Seller dashboard error: ' . $e->getMessage());
            
            return Inertia::render('Seller/Dashboard', [
                'seller' => Auth::user(),
                'stats' => [
                    'total_tickets' => 0,
                    'active_tickets' => 0,
                    'total_orders' => 0,
                    'paid_orders' => 0,
                    'total_revenue' => 0,
                ],
                'recent_orders' => [],
                'top_tickets' => [],
                'monthly_revenue' => [],
            ]);
        }
    }
}
