<?php


namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\SellerEarning;
use App\Models\WithdrawalRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class WithdrawalController extends Controller
{
  use AuthorizesRequests;
  public function index(Request $request)
  {
    $sellerId = Auth::id();

    $query = WithdrawalRequest::where('seller_id', $sellerId);

    // Apply filters
    if ($request->search) {
      $query->where(function ($q) use ($request) {
        $q->where('bank_name', 'like', "%{$request->search}%")
          ->orWhere('account_number', 'like', "%{$request->search}%")
          ->orWhere('account_holder', 'like', "%{$request->search}%");
      });
    }

    if ($request->status && $request->status !== 'all') {
      $query->where('status', $request->status);
    }

    $withdrawals = $query->latest('requested_at')->paginate(20);

    return Inertia::render('Seller/Earnings/Withdrawals', [
      'withdrawals' => $withdrawals,
      'filters' => $request->only(['search', 'status']),
    ]);
  }

  public function create()
  {
    $sellerId = Auth::id();

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
      'platform_fee_percentage' => 5,
    ];

    return Inertia::render('Seller/Earnings/Withdraw', [
      'earnings' => $earningsSummary,
    ]);
  }

  public function store(Request $request)
  {
    $sellerId = Auth::id();

    $validated = $request->validate([
      'amount' => 'required|numeric|min:50000', // Minimum 50k
      'bank_name' => 'required|string|max:255',
      'account_number' => 'required|string|max:50',
      'account_holder' => 'required|string|max:255',
      'notes' => 'nullable|string|max:1000',
    ]);

    // Check available balance
    $availableBalance = SellerEarning::where('seller_id', $sellerId)
      ->where('status', 'available')
      ->sum('seller_amount');

    if ($validated['amount'] > $availableBalance) {
      return back()->with('error', 'Jumlah penarikan melebihi saldo tersedia');
    }

    // Check if there's pending withdrawal
    $pendingWithdrawal = WithdrawalRequest::where('seller_id', $sellerId)
      ->where('status', 'pending')
      ->exists();

    if ($pendingWithdrawal) {
      return back()->with('error', 'Anda masih memiliki permintaan penarikan yang pending');
    }

    WithdrawalRequest::create([
      'seller_id' => $sellerId,
      'amount' => $validated['amount'],
      'bank_name' => $validated['bank_name'],
      'account_number' => $validated['account_number'],
      'account_holder' => $validated['account_holder'],
      'notes' => $validated['notes'],
      'requested_at' => now(),
    ]);

    return redirect()->route('seller.earnings.withdrawals')
      ->with('success', 'Permintaan penarikan berhasil diajukan');
  }

  public function show(WithdrawalRequest $withdrawal)
  {
    $this->authorize('view', $withdrawal);

    return Inertia::render('Seller/Earnings/WithdrawalShow', [
      'withdrawal' => $withdrawal,
    ]);
  }
}
