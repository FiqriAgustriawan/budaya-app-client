<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\SellerEarning;
use App\Models\WithdrawalRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EarningsController extends Controller
{
  public function index(Request $request)
  {
    $sellerId = Auth::id();

    // Calculate earnings summary
    $earnings = SellerEarning::where('seller_id', $sellerId)
      ->selectRaw('
                SUM(CASE WHEN status = "available" THEN seller_amount ELSE 0 END) as available_balance,
                SUM(CASE WHEN status = "pending" THEN seller_amount ELSE 0 END) as pending_balance,
                SUM(seller_amount) as total_earned,
                COUNT(*) as total_sales
            ')
      ->first();

    $withdrawnAmount = WithdrawalRequest::where('seller_id', $sellerId)
      ->where('status', 'completed')
      ->sum('amount');

    $earningsSummary = [
      'available_balance' => $earnings->available_balance ?? 0,
      'pending_balance' => $earnings->pending_balance ?? 0,
      'total_earned' => $earnings->total_earned ?? 0,
      'withdrawn_amount' => $withdrawnAmount,
      'total_sales' => $earnings->total_sales ?? 0,
      'platform_fee_percentage' => 5, // 5% platform fee
    ];

    // Recent transactions
    $recentTransactions = SellerEarning::where('seller_id', $sellerId)
      ->with(['order', 'ticket'])
      ->latest()
      ->limit(5)
      ->get()
      ->map(function ($earning) {
        return [
          'id' => $earning->id,
          'order_id' => $earning->order_id,
          'ticket_title' => $earning->ticket->title,
          'customer_name' => $earning->order->customer_name,
          'amount' => $earning->total_amount,
          'seller_amount' => $earning->seller_amount,
          'platform_fee' => $earning->platform_fee,
          'status' => $earning->status,
          'created_at' => $earning->created_at,
        ];
      });

    // Recent withdrawal requests
    $withdrawalRequests = WithdrawalRequest::where('seller_id', $sellerId)
      ->latest()
      ->limit(5)
      ->get();

    return Inertia::render('Seller/Earnings/Index', [
      'earnings' => $earningsSummary,
      'recent_transactions' => $recentTransactions,
      'withdrawal_requests' => $withdrawalRequests,
      'filters' => $request->only(['period', 'search']),
    ]);
  }

  public function transactions(Request $request)
  {
    $sellerId = Auth::id();

    $query = SellerEarning::where('seller_id', $sellerId)
      ->with(['order', 'ticket']);

    // Apply filters
    if ($request->search) {
      $query->whereHas('ticket', function ($q) use ($request) {
        $q->where('title', 'like', "%{$request->search}%");
      })->orWhereHas('order', function ($q) use ($request) {
        $q->where('customer_name', 'like', "%{$request->search}%");
      });
    }

    if ($request->status && $request->status !== 'all') {
      $query->where('status', $request->status);
    }

    if ($request->period && $request->period !== 'this_month') {
      $this->applyPeriodFilter($query, $request->period);
    }

    $transactions = $query->latest()->paginate(20);

    // Calculate summary for current filters
    $summary = SellerEarning::where('seller_id', $sellerId)
      ->when($request->search, function ($q) use ($request) {
        $q->whereHas('ticket', function ($q) use ($request) {
          $q->where('title', 'like', "%{$request->search}%");
        })->orWhereHas('order', function ($q) use ($request) {
          $q->where('customer_name', 'like', "%{$request->search}%");
        });
      })
      ->when($request->status && $request->status !== 'all', function ($q) use ($request) {
        $q->where('status', $request->status);
      })
      ->when($request->period && $request->period !== 'this_month', function ($q) use ($request) {
        $this->applyPeriodFilter($q, $request->period);
      })
      ->selectRaw('
                SUM(total_amount) as total_amount,
                SUM(seller_amount) as total_seller_amount,
                SUM(platform_fee) as total_platform_fee,
                COUNT(*) as total_transactions
            ')
      ->first();

    return Inertia::render('Seller/Earnings/Transactions', [
      'transactions' => $transactions->through(function ($earning) {
        return [
          'id' => $earning->id,
          'order_id' => $earning->order_id,
          'ticket_title' => $earning->ticket->title,
          'customer_name' => $earning->order->customer_name,
          'amount' => $earning->total_amount,
          'seller_amount' => $earning->seller_amount,
          'platform_fee' => $earning->platform_fee,
          'status' => $earning->status,
          'created_at' => $earning->created_at,
        ];
      }),
      'filters' => $request->only(['search', 'status', 'period']),
      'summary' => $summary,
    ]);
  }

  private function applyPeriodFilter($query, $period)
  {
    switch ($period) {
      case 'today':
        $query->whereDate('created_at', today());
        break;
      case 'this_week':
        $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
        break;
      case 'last_month':
        $query->whereBetween('created_at', [
          now()->subMonth()->startOfMonth(),
          now()->subMonth()->endOfMonth()
        ]);
        break;
      case 'this_year':
        $query->whereYear('created_at', now()->year);
        break;
      default:
        // this_month
        $query->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()]);
    }
  }
}
