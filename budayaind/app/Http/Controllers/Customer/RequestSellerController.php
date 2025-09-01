<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\SellerRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;



class RequestSellerController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Check if user came from requirements page (optional protection)
        $referrer = $request->headers->get('referer');
        if (!str_contains($referrer, 'request-seller-requirements') && !$request->session()->has('seller_requirements_accepted')) {
            return redirect()->route('customer.request-seller.requirements');
        }
        
        // Set session flag
        $request->session()->put('seller_requirements_accepted', true);

        // Check if user already has a request
        $existingRequest = SellerRequest::where('user_id', $user->id)->first();

        // Check if user can make a new request
        $canRequest = SellerRequest::canUserRequest($user->id);

        return Inertia::render('Customer/RequestSeller', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'address' => $user->address,
            ],
            'existingRequest' => $existingRequest ? [
                'id' => $existingRequest->id,
                'nama_tempat_wisata' => $existingRequest->nama_tempat_wisata,
                'status' => $existingRequest->status,
                'status_badge' => $existingRequest->status_badge,
                'created_at' => $existingRequest->created_at,
                'admin_notes' => $existingRequest->admin_notes,
            ] : null,
            'canRequest' => $canRequest
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        // Check if user can make request
        if (!SellerRequest::canUserRequest($user->id)) {
            return back()->withErrors([
                'general' => 'Anda sudah memiliki request yang pending atau sudah disetujui.'
            ]);
        }

        // Validate request
        $validated = $request->validate([
            'nama_tempat_wisata' => 'required|string|max:255',
            'email_tempat' => 'required|email|unique:seller_requests,email_tempat',
            'password_tempat' => ['required', 'confirmed', 'min:8'],
            'deskripsi_tempat' => 'required|string|min:50|max:2000',
            'asal_daerah' => 'required|string|max:255',
            'nomor_telepon' => 'required|string|max:20',
            'alamat_tempat' => 'required|string|max:1000',
            'foto_ktp' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'foto_tempat' => 'required|array|min:3|max:10',
            'foto_tempat.*' => 'image|mimes:jpeg,png,jpg|max:2048'
        ], [
            'nama_tempat_wisata.required' => 'Nama tempat wisata harus diisi.',
            'email_tempat.required' => 'Email tempat wisata harus diisi.',
            'email_tempat.unique' => 'Email tempat wisata sudah digunakan.',
            'password_tempat.required' => 'Password harus diisi.',
            'password_tempat.min' => 'Password minimal 8 karakter.',
            'password_tempat.confirmed' => 'Konfirmasi password tidak cocok.',
            'deskripsi_tempat.required' => 'Deskripsi tempat wisata harus diisi.',
            'deskripsi_tempat.min' => 'Deskripsi minimal 50 karakter.',
            'asal_daerah.required' => 'Asal daerah budaya harus diisi.',
            'nomor_telepon.required' => 'Nomor telepon harus diisi.',
            'alamat_tempat.required' => 'Alamat tempat wisata harus diisi.',
            'foto_ktp.required' => 'Foto KTP harus diupload.',
            'foto_ktp.image' => 'File KTP harus berupa gambar.',
            'foto_tempat.required' => 'Foto tempat wisata harus diupload.',
            'foto_tempat.min' => 'Minimal upload 3 foto tempat wisata.',
            'foto_tempat.max' => 'Maksimal upload 10 foto tempat wisata.',
            'foto_tempat.*.image' => 'Semua file foto tempat harus berupa gambar.'
        ]);

        try {
            // Upload KTP
            $ktpPath = $request->file('foto_ktp')->store('seller-requests/ktp', 'public');

            // Upload foto tempat
            $tempatPaths = [];
            foreach ($request->file('foto_tempat') as $file) {
                $tempatPaths[] = $file->store('seller-requests/tempat', 'public');
            }

            // Create seller request
            SellerRequest::create([
                'user_id' => $user->id,
                'nama_tempat_wisata' => $validated['nama_tempat_wisata'],
                'email_tempat' => $validated['email_tempat'],
                'password_tempat' => Hash::make($validated['password_tempat']),
                'deskripsi_tempat' => $validated['deskripsi_tempat'],
                'asal_daerah' => $validated['asal_daerah'],
                'nomor_telepon' => $validated['nomor_telepon'],
                'alamat_tempat' => $validated['alamat_tempat'],
                'foto_ktp' => $ktpPath,
                'foto_tempat' => $tempatPaths,
                'status' => 'pending'
            ]);

            return redirect()
                ->route('customer.request-seller.index')
                ->with('success', 'Request seller berhasil dikirim! Silakan tunggu review dari admin.');
        } catch (\Exception $e) {
            // Clean up uploaded files if error occurs
            if (isset($ktpPath) && Storage::disk('public')->exists($ktpPath)) {
                Storage::disk('public')->delete($ktpPath);
            }
            if (isset($tempatPaths)) {
                foreach ($tempatPaths as $path) {
                    if (Storage::disk('public')->exists($path)) {
                        Storage::disk('public')->delete($path);
                    }
                }
            }

            return back()->withErrors([
                'general' => 'Gagal mengirim request. Silakan coba lagi.'
            ])->withInput();
        }
    }
    public function requirements(Request $request)
    {
        $user = $request->user();
        
        // Check if user already has approved/pending request
        $existingRequest = SellerRequest::where('user_id', $user->id)
            ->whereIn('status', ['pending', 'approved'])
            ->first();
        
        if ($existingRequest) {
            return redirect()->route('customer.request-seller.index');
        }

        return Inertia::render('Customer/SellerRequirements', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'address' => $user->address,
            ]
        ]);
    }
}
