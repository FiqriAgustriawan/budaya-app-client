<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SellerRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SellerRequestController extends Controller
{
  public function index(Request $request)
  {
    $status = $request->get('status', 'all');
    $search = $request->get('search');

    $query = SellerRequest::with(['user', 'reviewer'])
      ->latest();

    // Filter by status
    if ($status !== 'all') {
      $query->where('status', $status);
    }

    // Search functionality
    if ($search) {
      $query->where(function ($q) use ($search) {
        $q->where('nama_tempat_wisata', 'like', "%{$search}%")
          ->orWhere('email_tempat', 'like', "%{$search}%")
          ->orWhere('asal_daerah', 'like', "%{$search}%")
          ->orWhereHas('user', function ($userQuery) use ($search) {
            $userQuery->where('name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
          });
      });
    }

    $sellerRequests = $query->paginate(10);

    // Get statistics
    $stats = [
      'total' => SellerRequest::count(),
      'pending' => SellerRequest::where('status', 'pending')->count(),
      'approved' => SellerRequest::where('status', 'approved')->count(),
      'rejected' => SellerRequest::where('status', 'rejected')->count(),
    ];

    return Inertia::render('Admin/SellerRequests/Index', [
      'sellerRequests' => $sellerRequests->through(function ($request) {
        return [
          'id' => $request->id,
          'nama_tempat_wisata' => $request->nama_tempat_wisata,
          'email_tempat' => $request->email_tempat,
          'asal_daerah' => $request->asal_daerah,
          'status' => $request->status,
          'status_badge' => $request->status_badge,
          'created_at' => $request->created_at,
          'reviewed_at' => $request->reviewed_at,
          'user' => [
            'id' => $request->user->id,
            'name' => $request->user->name,
            'email' => $request->user->email,
          ],
          'reviewer' => $request->reviewer ? [
            'name' => $request->reviewer->name
          ] : null
        ];
      }),
      'stats' => $stats,
      'filters' => [
        'status' => $status,
        'search' => $search,
      ]
    ]);
  }

  public function show(SellerRequest $sellerRequest)
  {
    $sellerRequest->load(['user', 'reviewer']);

    return Inertia::render('Admin/SellerRequests/Show', [
      'sellerRequest' => [
        'id' => $sellerRequest->id,
        'nama_tempat_wisata' => $sellerRequest->nama_tempat_wisata,
        'email_tempat' => $sellerRequest->email_tempat,
        'deskripsi_tempat' => $sellerRequest->deskripsi_tempat,
        'asal_daerah' => $sellerRequest->asal_daerah,
        'nomor_telepon' => $sellerRequest->nomor_telepon,
        'alamat_tempat' => $sellerRequest->alamat_tempat,
        'foto_ktp' => $sellerRequest->foto_ktp,
        'foto_tempat' => $sellerRequest->foto_tempat,
        'status' => $sellerRequest->status,
        'status_badge' => $sellerRequest->status_badge,
        'admin_notes' => $sellerRequest->admin_notes,
        'reviewed_at' => $sellerRequest->reviewed_at,
        'created_at' => $sellerRequest->created_at,
        'user' => [
          'id' => $sellerRequest->user->id,
          'name' => $sellerRequest->user->name,
          'email' => $sellerRequest->user->email,
          'phone' => $sellerRequest->user->phone,
          'address' => $sellerRequest->user->address,
          'created_at' => $sellerRequest->user->created_at,
        ],
        'reviewer' => $sellerRequest->reviewer ? [
          'name' => $sellerRequest->reviewer->name
        ] : null
      ]
    ]);
  }

  public function approve(Request $request, SellerRequest $sellerRequest)
  {
    $validated = $request->validate([
      'admin_notes' => 'nullable|string|max:1000'
    ]);

    if ($sellerRequest->status !== 'pending') {
      return back()->withErrors([
        'message' => 'Request ini sudah di-review sebelumnya.'
      ]);
    }

    DB::beginTransaction();
    try {
      // Update seller request status
      $sellerRequest->update([
        'status' => 'approved',
        'admin_notes' => $validated['admin_notes'] ?? 'Request approved by admin.',
        'reviewed_at' => now(),
        'reviewed_by' => $request->user()->id
      ]);

      // Check if email already exists in users table
      $existingUser = User::where('email', $sellerRequest->email_tempat)->first();

      if ($existingUser) {
        DB::rollback();
        return back()->withErrors([
          'message' => 'Email sudah terdaftar sebagai user lain. Gunakan email yang berbeda.'
        ]);
      }

      // Create seller account
      $seller = User::create([
        'name' => $sellerRequest->nama_tempat_wisata,
        'email' => $sellerRequest->email_tempat,
        'password' => $sellerRequest->password_tempat, // Already hashed
        'role' => 'seller',
        'phone' => $sellerRequest->nomor_telepon,
        'address' => $sellerRequest->alamat_tempat,
        'is_active' => true,
        'email_verified_at' => now(),
      ]);

      DB::commit();

      return redirect()
        ->route('admin.seller-requests.index')
        ->with('success', "Request dari {$sellerRequest->user->name} telah disetujui! Akun seller '{$seller->name}' berhasil dibuat.");
    } catch (\Exception $e) {
      DB::rollback();

      return back()->withErrors([
        'message' => 'Gagal menyetujui request. Silakan coba lagi.'
      ]);
    }
  }

  public function reject(Request $request, SellerRequest $sellerRequest)
  {
    $validated = $request->validate([
      'admin_notes' => 'required|string|max:1000'
    ], [
      'admin_notes.required' => 'Alasan penolakan harus diisi.'
    ]);

    if ($sellerRequest->status !== 'pending') {
      return back()->withErrors([
        'message' => 'Request ini sudah di-review sebelumnya.'
      ]);
    }

    $sellerRequest->update([
      'status' => 'rejected',
      'admin_notes' => $validated['admin_notes'],
      'reviewed_at' => now(),
      'reviewed_by' => $request->user()->id
    ]);

    return redirect()
      ->route('admin.seller-requests.index')
      ->with('success', "Request dari {$sellerRequest->user->name} telah ditolak.");
  }
}
