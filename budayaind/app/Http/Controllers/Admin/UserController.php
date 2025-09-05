<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Order;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = User::query();

            // Search filter
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            }

            // Role filter
            if ($request->filled('role') && $request->role !== 'all') {
                $query->where('role', $request->role);
            }

            // Status filter
            if ($request->filled('status') && $request->status !== 'all') {
                $isActive = $request->status === 'active';
                $query->where('is_active', $isActive);
            }

            // Sort by latest
            $query->latest();

            $users = $query->paginate(15)->withQueryString();

            // Add computed fields for each user
            $users->getCollection()->transform(function ($user) {
                // Safely get orders count
                $user->orders_count = Order::where('user_id', $user->id)->count();
                $user->tickets_count = Ticket::where('user_id', $user->id)->count();

                // Calculate total spent for customers
                if ($user->role === 'customer') {
                    $user->total_spent = Order::where('user_id', $user->id)
                        ->where('payment_status', 'paid')
                        ->sum('total_amount');
                } else {
                    $user->total_spent = 0;
                }

                // Calculate earnings for sellers
                if ($user->role === 'seller') {
                    $user->total_earnings = DB::table('order_items')
                        ->join('tickets', 'order_items.ticket_id', '=', 'tickets.id')
                        ->join('orders', 'order_items.order_id', '=', 'orders.id')
                        ->where('tickets.user_id', $user->id)
                        ->where('orders.payment_status', 'paid')
                        ->sum('order_items.subtotal');
                } else {
                    $user->total_earnings = 0;
                }

                return $user;
            });

            // Get stats
            $stats = [
                'total_users' => User::count(),
                'active_users' => User::where('is_active', true)->count(),
                'sellers' => User::where('role', 'seller')->count(),
                'customers' => User::where('role', 'customer')->count(),
            ];

            return Inertia::render('Admin/Users/Index', [
                'users' => $users,
                'filters' => $request->only(['search', 'role', 'status']),
                'stats' => $stats,
            ]);
        } catch (\Exception $e) {
            Log::error('Admin Users Index Error: ' . $e->getMessage());

            return back()->withErrors(['error' => 'Terjadi kesalahan saat memuat data users.']);
        }
    }

    public function show(User $user)
    {
        try {
            // Calculate stats based on role
            $stats = [];

            if ($user->role === 'customer') {
                $stats = [
                    'total_orders' => Order::where('user_id', $user->id)->count(),
                    'completed_orders' => Order::where('user_id', $user->id)->where('status', 'completed')->count(),
                    'total_spent' => Order::where('user_id', $user->id)->where('payment_status', 'paid')->sum('total_amount'),
                ];
            } elseif ($user->role === 'seller') {
                $stats = [
                    'total_tickets' => Ticket::where('user_id', $user->id)->count(),
                    'active_tickets' => Ticket::where('user_id', $user->id)->where('is_active', true)->count(),
                    'total_earnings' => DB::table('order_items')
                        ->join('tickets', 'order_items.ticket_id', '=', 'tickets.id')
                        ->join('orders', 'order_items.order_id', '=', 'orders.id')
                        ->where('tickets.user_id', $user->id)
                        ->where('orders.payment_status', 'paid')
                        ->sum('order_items.subtotal'),
                    'current_balance' => $user->balance ?? 0,
                ];
            }

            // Get recent activities
            $recent_activities = $this->getRecentActivities($user);

            return Inertia::render('Admin/Users/Show', [
                'user' => $user,
                'stats' => $stats,
                'recent_activities' => $recent_activities,
            ]);
        } catch (\Exception $e) {
            Log::error('Admin User Show Error: ' . $e->getMessage());

            return back()->withErrors(['error' => 'Terjadi kesalahan saat memuat detail user.']);
        }
    }

    public function updateStatus(User $user, Request $request)
    {
        try {
            $user->update([
                'is_active' => $request->boolean('is_active'),
            ]);

            $status = $user->is_active ? 'diaktifkan' : 'dinonaktifkan';

            return back()->with('success', "User {$user->name} berhasil {$status}.");
        } catch (\Exception $e) {
            Log::error('Update User Status Error: ' . $e->getMessage());

            return back()->withErrors(['error' => 'Terjadi kesalahan saat mengubah status user.']);
        }
    }

    private function getRecentActivities(User $user)
    {
        try {
            $activities = collect();

            if ($user->role === 'customer') {
                // Get recent orders
                $recentOrders = Order::where('user_id', $user->id)
                    ->latest()
                    ->take(10)
                    ->get()
                    ->map(function ($order) {
                        return [
                            'type' => 'order',
                            'title' => 'Pesanan #' . $order->order_number,
                            'description' => 'Pesanan tiket wisata',
                            'amount' => $order->total_amount,
                            'status' => $order->payment_status,
                            'created_at' => $order->created_at,
                        ];
                    });

                $activities = $activities->concat($recentOrders);
            }

            return $activities->sortByDesc('created_at')->take(10)->values()->all();
        } catch (\Exception $e) {
            Log::error('Get Recent Activities Error: ' . $e->getMessage());
            return [];
        }
    }
}
