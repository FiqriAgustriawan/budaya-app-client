<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WithdrawalRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WithdrawalController extends Controller
{
  public function index(Request $request)
  {
    $query = WithdrawalRequest::with('seller');

    if ($request->status && $request->status !== 'all') {
      $query->where('status', $request->status);
    }

    if ($request->search) {
      $query->whereHas('seller', function ($q) use ($request) {
        $q->where('name', 'like', "%{$request->search}%");
      })->orWhere('bank_name', 'like', "%{$request->search}%");
    }

    $withdrawals = $query->latest('requested_at')->paginate(20);

    return Inertia::render('Admin/Withdrawals/Index', [
      'withdrawals' => $withdrawals,
      'filters' => $request->only(['status', 'search']),
    ]);
  }

  public function show(WithdrawalRequest $withdrawal)
  {
    $withdrawal->load('seller', 'processedBy');

    return Inertia::render('Admin/Withdrawals/Show', [
      'withdrawal' => $withdrawal,
    ]);
  }

  public function approve(Request $request, WithdrawalRequest $withdrawal)
  {
    $validated = $request->validate([
      'admin_notes' => 'nullable|string|max:1000',
    ]);

    $withdrawal->approve(Auth::id(), $validated['admin_notes']);

    return back()->with('success', 'Permintaan penarikan berhasil disetujui');
  }

  public function reject(Request $request, WithdrawalRequest $withdrawal)
  {
    $validated = $request->validate([
      'admin_notes' => 'required|string|max:1000',
    ]);

    $withdrawal->reject(Auth::id(), $validated['admin_notes']);

    return back()->with('success', 'Permintaan penarikan berhasil ditolak');
  }

  public function complete(WithdrawalRequest $withdrawal)
  {
    $withdrawal->complete(Auth::id());

    return back()->with('success', 'Penarikan berhasil diselesaikan');
  }
}
