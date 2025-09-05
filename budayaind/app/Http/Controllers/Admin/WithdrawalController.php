<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WithdrawalRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class WithdrawalController extends Controller
{
  public function index(Request $request)
  {
    try {
      $query = WithdrawalRequest::with(['seller']);

      // Search filter
      if ($request->filled('search')) {
        $search = $request->search;
        $query->whereHas('seller', function ($q) use ($search) {
          $q->where('name', 'like', "%{$search}%")
            ->orWhere('email', 'like', "%{$search}%");
        })->orWhere('bank_name', 'like', "%{$search}%")
          ->orWhere('account_number', 'like', "%{$search}%");
      }

      // Status filter
      if ($request->filled('status') && $request->status !== 'all') {
        $query->where('status', $request->status);
      }

      // Sort by latest
      $query->latest('requested_at');

      $withdrawals = $query->paginate(15)->withQueryString();

      return Inertia::render('Admin/Withdrawals/Index', [
        'withdrawals' => $withdrawals,
        'filters' => [
          'search' => $request->get('search', ''),
          'status' => $request->get('status', ''),
        ],
      ]);
    } catch (\Exception $e) {
      Log::error('Admin Withdrawals Index Error: ' . $e->getMessage());

      return Inertia::render('Admin/Withdrawals/Index', [
        'withdrawals' => [
          'data' => [],
          'links' => [],
          'total' => 0,
        ],
        'filters' => [
          'search' => '',
          'status' => '',
        ],
      ]);
    }
  }

  public function show(WithdrawalRequest $withdrawal)
  {
    $withdrawal->load(['seller', 'processedBy']);

    // Get seller's current balance and total earnings
    $seller = $withdrawal->seller;
    $seller->total_earnings = $seller->orders()
      ->where('status', 'completed')
      ->sum('total_amount');

    return Inertia::render('Admin/Withdrawals/Show', [
      'withdrawal' => $withdrawal,
    ]);
  }

  public function approve(WithdrawalRequest $withdrawal, Request $request)
  {
    $request->validate([
      'admin_notes' => 'nullable|string|max:1000',
    ]);

    if ($withdrawal->status !== 'pending') {
      return back()->withErrors(['error' => 'Penarikan ini sudah diproses sebelumnya.']);
    }

    try {
      DB::beginTransaction();
      $withdrawal->update([
        'status' => 'approved',
        'processed_at' => Carbon::now(),
        'processed_by' => Auth::id(),
        'admin_notes' => $request->admin_notes,
      ]);
      

      DB::commit();

      return redirect()->route('admin.withdrawals.show', $withdrawal)
        ->with('success', 'Penarikan berhasil disetujui.');
    } catch (\Exception $e) {
      DB::rollback();
      Log::error('Withdrawal Approval Error: ' . $e->getMessage());

      return back()->withErrors(['error' => 'Gagal menyetujui penarikan.']);
    }
  }

  public function reject(WithdrawalRequest $withdrawal, Request $request)
  {
    $request->validate([
      'admin_notes' => 'required|string|max:1000',
    ]);

    if ($withdrawal->status !== 'pending') {
      return back()->withErrors(['error' => 'Penarikan ini sudah diproses sebelumnya.']);
    }

    try {
      DB::beginTransaction();

      // Return amount to seller's balance
      $seller = $withdrawal->seller;
      $seller->increment('balance', $withdrawal->amount);
      $withdrawal->update([
        'status' => 'rejected',
        'processed_at' => Carbon::now(),
        'processed_by' => Auth::id(),
        'admin_notes' => $request->admin_notes,
      ]);
      

      DB::commit();

      return redirect()->route('admin.withdrawals.show', $withdrawal)
        ->with('success', 'Penarikan berhasil ditolak dan saldo dikembalikan.');
    } catch (\Exception $e) {
      DB::rollback();
      Log::error('Withdrawal Rejection Error: ' . $e->getMessage());

      return back()->withErrors(['error' => 'Gagal menolak penarikan.']);
    }
  }

  public function complete(WithdrawalRequest $withdrawal, Request $request)
  {
    $request->validate([
      'admin_notes' => 'nullable|string|max:1000',
    ]);

    if ($withdrawal->status !== 'approved') {
      return back()->withErrors(['error' => 'Penarikan harus disetujui terlebih dahulu.']);
    }

    try {
      DB::beginTransaction();

      $withdrawal->update([
        'status' => 'completed',
        'completed_at' => Carbon::now(),
        'admin_notes' => $request->admin_notes,
      ]);

      DB::commit();

      return redirect()->route('admin.withdrawals.show', $withdrawal)
        ->with('success', 'Penarikan berhasil diselesaikan.');
    } catch (\Exception $e) {
      DB::rollback();
      Log::error('Withdrawal Completion Error: ' . $e->getMessage());

      return back()->withErrors(['error' => 'Gagal menyelesaikan penarikan.']);
    }
  }
}
