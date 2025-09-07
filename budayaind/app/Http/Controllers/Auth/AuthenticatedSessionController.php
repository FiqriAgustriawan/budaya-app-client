<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        // Path harus sesuai dengan struktur folder yang sebenarnya
        // File ada di: resources/js/pages/auth/login.tsx
        // Jadi render path: auth/login (folder/file tanpa ekstensi)
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        // Update last login time jika ada kolom last_login_at
        try {
            if (Auth::check()) {
                $userId = Auth::id();
                $user = \App\Models\User::find($userId);
                if ($user) {
                    $user->last_login_at = now();
                    $user->save();
                }
            }
        } catch (\Exception $e) {
            // Jika tidak ada kolom last_login_at, skip saja
        }

       
        $user = Auth::user();

        if ($user && isset($user->role)) {
            switch (strtolower($user->role)) {
                case 'admin':
                    return redirect()->intended('/admin/dashboard');
                case 'seller':
                    return redirect()->intended('/seller/dashboard');
                case 'customer':
                    return redirect()->intended('/customer/dashboard');
                default:
                    return redirect()->intended('/dashboard');
            }
        }


        return redirect()->intended('/dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
