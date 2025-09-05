<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Ticket;
use App\Models\Order;
use App\Models\WithdrawalRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            // Basic stats dengan null safety
            $stats = [
                'total_users' => User::count() ?: 0,
                'total_sellers' => User::where('role', 'seller')->count() ?: 0,
                'total_customers' => User::where('role', 'customer')->count() ?: 0,
                'total_tickets' => Ticket::count() ?: 0,
                'active_tickets' => Ticket::where('is_active', true)->count() ?: 0,
                'total_orders' => Order::count() ?: 0,
                'total_revenue' => Order::where('payment_status', 'paid')->sum('total_amount') ?: 0,
                'pending_withdrawals' => WithdrawalRequest::where('status', 'pending')->count() ?: 0,
            ];

            // Recent orders dengan fallback
            $recentOrders = Order::with(['user'])
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'order_number' => $order->order_number ?? 'N/A',
                        'customer_name' => $order->user->name ?? 'Guest',
                        'total_amount' => $order->total_amount ?? 0,
                        'status' => $order->status ?? 'unknown',
                        'payment_status' => $order->payment_status ?? 'unknown',
                        'created_at' => $order->created_at ? $order->created_at->toISOString() : null,
                    ];
                });

            // Top selling tickets dengan user relationship
            $topTickets = Ticket::with(['user:id,name'])
                ->withCount(['orderItems as total_sold' => function ($query) {
                    $query->select(DB::raw('COALESCE(sum(quantity), 0)'))
                          ->whereHas('order', function ($q) {
                              $q->where('payment_status', 'paid');
                          });
                }])
                ->orderBy('total_sold', 'desc')
                ->take(5)
                ->get()
                ->map(function ($ticket) {
                    return [
                        'id' => $ticket->id,
                        'title' => $ticket->title ?? 'Untitled',
                        'price' => $ticket->price ?? 0,
                        'total_sold' => $ticket->total_sold ?? 0,
                        'user' => [
                            'name' => $ticket->user->name ?? 'Unknown Seller'
                        ]
                    ];
                });

            // Monthly revenue chart (last 6 months)
            $monthlyRevenue = [];
            for ($i = 5; $i >= 0; $i--) {
                $date = Carbon::now()->subMonths($i);
                $revenue = Order::where('payment_status', 'paid')
                    ->whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->sum('total_amount') ?: 0;

                $monthlyRevenue[] = [
                    'month' => $date->format('M Y'),
                    'revenue' => $revenue,
                ];
            }

            // User growth (last 6 months)
            $userGrowth = [];
            for ($i = 5; $i >= 0; $i--) {
                $date = Carbon::now()->subMonths($i);
                $users = User::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count() ?: 0;

                $userGrowth[] = [
                    'month' => $date->format('M Y'),
                    'users' => $users,
                ];
            }

            return Inertia::render('Admin/Dashboard', [
                'stats' => $stats,
                'recent_orders' => $recentOrders,
                'top_tickets' => $topTickets,
                'monthly_revenue' => $monthlyRevenue,
                'user_growth' => $userGrowth,
            ]);

        } catch (\Exception $e) {
            Log::error('Admin Dashboard Error: ' . $e->getMessage());
            
            // Return dengan data kosong jika error
            return Inertia::render('Admin/Dashboard', [
                'stats' => [
                    'total_users' => 0,
                    'total_sellers' => 0,
                    'total_customers' => 0,
                    'total_tickets' => 0,
                    'active_tickets' => 0,
                    'total_orders' => 0,
                    'total_revenue' => 0,
                    'pending_withdrawals' => 0,
                ],
                'recent_orders' => [],
                'top_tickets' => [],
                'monthly_revenue' => [],
                'user_growth' => [],
            ]);
        }
    }
}