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

class ReportController extends Controller
{
    public function index(Request $request)
    {
        try {
            $period = $request->get('period', 'monthly');
            $startDate = $request->get('start_date');
            $endDate = $request->get('end_date');

            // Set date range based on period
            switch ($period) {
                case 'daily':
                    $start = Carbon::now()->subDays(30);
                    $end = Carbon::now();
                    break;
                case 'weekly':
                    $start = Carbon::now()->subWeeks(12);
                    $end = Carbon::now();
                    break;
                case 'yearly':
                    $start = Carbon::now()->subYears(3);
                    $end = Carbon::now();
                    break;
                case 'custom':
                    $start = $startDate ? Carbon::parse($startDate) : Carbon::now()->subMonths(12);
                    $end = $endDate ? Carbon::parse($endDate) : Carbon::now();
                    break;
                default: // monthly
                    $start = Carbon::now()->subMonths(12);
                    $end = Carbon::now();
            }

            // Get summary data
            $currentPeriodSummary = $this->getSummaryData($start, $end);
            
            // Get previous period for comparison
            $periodLength = $end->diffInDays($start);
            $previousStart = $start->copy()->subDays($periodLength);
            $previousEnd = $start->copy();
            $previousPeriodSummary = $this->getSummaryData($previousStart, $previousEnd);

            // Calculate growth percentages
            $growth = [
                'revenue_growth' => $this->calculateGrowth($previousPeriodSummary['revenue'], $currentPeriodSummary['revenue']),
                'orders_growth' => $this->calculateGrowth($previousPeriodSummary['orders'], $currentPeriodSummary['orders']),
                'users_growth' => $this->calculateGrowth($previousPeriodSummary['users'], $currentPeriodSummary['users']),
            ];

            // Get monthly revenue data
            $monthlyRevenue = $this->getMonthlyRevenueData($period, $start, $end);

            // Get top destinations (berdasarkan kategori tiket atau destinasi)
            $topDestinations = $this->getTopDestinations($start, $end);

            // Get top sellers
            $topSellers = $this->getTopSellers($start, $end);

            // Get recent transactions
            $recentTransactions = $this->getRecentTransactions();

            // Prepare report data sesuai struktur frontend
            $reportData = [
                'summary' => [
                    'total_revenue' => $currentPeriodSummary['revenue'],
                    'total_orders' => $currentPeriodSummary['orders'],
                    'total_users' => $currentPeriodSummary['users'],
                    'total_tickets' => $currentPeriodSummary['tickets'],
                    'revenue_growth' => $growth['revenue_growth'],
                    'orders_growth' => $growth['orders_growth'],
                    'users_growth' => $growth['users_growth'],
                ],
                'monthly_revenue' => $monthlyRevenue,
                'top_destinations' => $topDestinations,
                'top_sellers' => $topSellers,
                'recent_transactions' => $recentTransactions,
            ];

            return Inertia::render('Admin/Reports/Index', [
                'report_data' => $reportData,
                'filters' => [
                    'period' => $period,
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('Admin Reports Error: ' . $e->getMessage());
            
            return Inertia::render('Admin/Reports/Index', [
                'report_data' => [
                    'summary' => [
                        'total_revenue' => 0,
                        'total_orders' => 0,
                        'total_users' => 0,
                        'total_tickets' => 0,
                        'revenue_growth' => 0,
                        'orders_growth' => 0,
                        'users_growth' => 0,
                    ],
                    'monthly_revenue' => [],
                    'top_destinations' => [],
                    'top_sellers' => [],
                    'recent_transactions' => [],
                ],
                'filters' => [
                    'period' => 'monthly',
                    'start_date' => null,
                    'end_date' => null,
                ],
            ]);
        }
    }

    private function getSummaryData($start, $end)
    {
        return [
            'revenue' => Order::where('payment_status', 'paid')
                ->whereBetween('created_at', [$start, $end])
                ->sum('total_amount') ?? 0,
            'orders' => Order::whereBetween('created_at', [$start, $end])->count(),
            'users' => User::whereBetween('created_at', [$start, $end])->count(),
            'tickets' => Ticket::whereBetween('created_at', [$start, $end])->count(),
        ];
    }

    private function calculateGrowth($previous, $current)
    {
        if ($previous == 0) {
            return $current > 0 ? 100 : 0;
        }
        return round((($current - $previous) / $previous) * 100, 2);
    }

    private function getMonthlyRevenueData($period, $start, $end)
    {
        $data = [];
        
        // Get last 6 months data
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            
            $revenue = Order::where('payment_status', 'paid')
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->sum('total_amount') ?? 0;
            
            $orders = Order::whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();
            
            $data[] = [
                'month' => $date->format('M Y'),
                'revenue' => $revenue,
                'orders' => $orders,
            ];
        }

        return $data;
    }

    private function getTopDestinations($start, $end)
    {
        // Ambil berdasarkan lokasi atau kategori tiket
        $destinations = DB::table('tickets')
            ->select('location as destination', DB::raw('count(*) as tickets_count'), DB::raw('sum(COALESCE(order_items.subtotal, 0)) as total_revenue'))
            ->leftJoin('order_items', 'tickets.id', '=', 'order_items.ticket_id')
            ->leftJoin('orders', 'order_items.order_id', '=', 'orders.id')
            ->where(function($query) use ($start, $end) {
                $query->whereNull('orders.created_at')
                      ->orWhere(function($q) use ($start, $end) {
                          $q->where('orders.payment_status', 'paid')
                            ->whereBetween('orders.created_at', [$start, $end]);
                      });
            })
            ->groupBy('tickets.location')
            ->orderBy('total_revenue', 'desc')
            ->take(5)
            ->get()
            ->map(function ($item) {
                return [
                    'destination' => $item->destination ?? 'Unknown',
                    'tickets_count' => $item->tickets_count,
                    'total_revenue' => $item->total_revenue ?? 0,
                ];
            });

        return $destinations->toArray();
    }

    private function getTopSellers($start, $end)
    {
        $sellers = User::where('role', 'seller')
            ->select('users.id', 'users.name')
            ->selectRaw('COUNT(DISTINCT tickets.id) as tickets_count')
            ->selectRaw('COUNT(DISTINCT orders.id) as total_orders')
            ->selectRaw('SUM(COALESCE(order_items.subtotal, 0)) as total_revenue')
            ->leftJoin('tickets', 'users.id', '=', 'tickets.user_id')
            ->leftJoin('order_items', 'tickets.id', '=', 'order_items.ticket_id')
            ->leftJoin('orders', function($join) use ($start, $end) {
                $join->on('order_items.order_id', '=', 'orders.id')
                     ->where('orders.payment_status', 'paid')
                     ->whereBetween('orders.created_at', [$start, $end]);
            })
            ->groupBy('users.id', 'users.name')
            ->orderBy('total_revenue', 'desc')
            ->take(5)
            ->get()
            ->map(function ($seller) {
                return [
                    'id' => $seller->id,
                    'name' => $seller->name,
                    'total_revenue' => $seller->total_revenue ?? 0,
                    'total_orders' => $seller->total_orders ?? 0,
                    'tickets_count' => $seller->tickets_count ?? 0,
                ];
            });

        return $sellers->toArray();
    }

    private function getRecentTransactions()
    {
        $transactions = Order::with('user')
            ->where('payment_status', 'paid')
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'type' => 'Order',
                    'amount' => $order->total_amount,
                    'description' => "Order dari " . ($order->user->name ?? 'Guest'),
                    'created_at' => $order->created_at->toISOString(),
                ];
            });

        return $transactions->toArray();
    }
}