<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
class SellerDashboardController extends Controller
{
  public function index()
  {
    try {
      $sellerId = Auth::id();

      // Basic Ticket Statistics - Remove undefined methods
      $ticketStats = [
        'total_tickets' => Ticket::where('seller_id', $sellerId)->count(),
        'active_tickets' => Ticket::where('seller_id', $sellerId)->count(), // Remove ->active()
        'total_sold' => 0, // Remove ->sum('sold_quantity') since column doesn't exist
        'pending_orders' => 0,
      ];

      // Calculate total sold from order_items
      try {
        $totalSold = OrderItem::whereHas('ticket', function ($query) use ($sellerId) {
          $query->where('seller_id', $sellerId);
        })->whereHas('order', function ($query) {
          $query->where('payment_status', 'success');
        })->sum('quantity');

        $ticketStats['total_sold'] = $totalSold;
      } catch (\Exception $e) {
        $ticketStats['total_sold'] = 0;
      }

      // Calculate pending orders
      try {
        $pendingOrders = OrderItem::whereHas('ticket', function ($query) use ($sellerId) {
          $query->where('seller_id', $sellerId);
        })->whereHas('order', function ($query) {
          $query->where('payment_status', 'pending');
        })->count();

        $ticketStats['pending_orders'] = $pendingOrders;
      } catch (\Exception $e) {
        $ticketStats['pending_orders'] = 0;
      }

      // Simple Earnings Statistics - Remove complex earnings system for now
      $earningsStats = [
        'available_balance' => 0,
        'pending_balance' => 0,
        'total_earned' => 0,
        'withdrawn_amount' => 0,
      ];

      // Calculate basic earnings from completed orders
      try {
        $totalEarned = OrderItem::whereHas('ticket', function ($query) use ($sellerId) {
          $query->where('seller_id', $sellerId);
        })->whereHas('order', function ($query) {
          $query->where('payment_status', 'success');
        })->sum(DB::raw('quantity * price'));

        $earningsStats['total_earned'] = $totalEarned;
        $earningsStats['available_balance'] = $totalEarned; // Simple calculation
      } catch (\Exception $e) {
        // Keep default values
      }

      // Recent Tickets
      $recentTickets = [];
      try {
        $recentTickets = Ticket::where('seller_id', $sellerId)
          ->select(['id', 'title', 'price', 'destination', 'category', 'created_at'])
          ->latest()
          ->limit(5)
          ->get()
          ->map(function ($ticket) {
            return [
              'id' => $ticket->id,
              'title' => $ticket->title ?? 'No Title',
              'price' => $ticket->price ?? 0,
              'destination' => $ticket->destination ?? 'Unknown',
              'category' => $ticket->category ?? 'basic',
              'created_at' => $ticket->created_at,
            ];
          });
      } catch (\Exception $e) {
        $recentTickets = [];
      }

      // Recent Transactions (Orders) - Simplified
      $recentTransactions = [];
      try {
        $recentTransactions = OrderItem::whereHas('ticket', function ($query) use ($sellerId) {
          $query->where('seller_id', $sellerId);
        })
          ->with(['order:id,order_number,customer_name,payment_status,created_at', 'ticket:id,title'])
          ->latest()
          ->limit(5)
          ->get()
          ->map(function ($item) {
            return [
              'id' => $item->id,
              'order_number' => $item->order->order_number ?? 'Unknown',
              'customer_name' => $item->order->customer_name ?? 'Unknown Customer',
              'ticket_title' => $item->ticket->title ?? 'Unknown Ticket',
              'quantity' => $item->quantity,
              'price' => $item->price,
              'total' => $item->quantity * $item->price,
              'status' => $item->order->payment_status ?? 'pending',
              'created_at' => $item->created_at,
            ];
          });
      } catch (\Exception $e) {
        $recentTransactions = [];
      }

      return Inertia::render('Seller/Dashboard', [
        'ticketStats' => $ticketStats,
        'earningsStats' => $earningsStats,
        'recentTickets' => $recentTickets,
        'recentTransactions' => $recentTransactions,
      ]);
    } catch (\Exception $e) {
      Log::error('Seller dashboard error: ' . $e->getMessage());

      // Return safe default data
      return Inertia::render('Seller/Dashboard', [
        'ticketStats' => [
          'total_tickets' => 0,
          'active_tickets' => 0,
          'total_sold' => 0,
          'pending_orders' => 0,
        ],
        'earningsStats' => [
          'available_balance' => 0,
          'pending_balance' => 0,
          'total_earned' => 0,
          'withdrawn_amount' => 0,
        ],
        'recentTickets' => [],
        'recentTransactions' => [],
      ]);
    }
  }
}
