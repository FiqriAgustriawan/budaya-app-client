<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Redirect based on role
        if ($user->isCustomer()) {
            return redirect()->route('customer.profile.index');
        } elseif ($user->isSeller()) {
            return redirect()->route('seller.dashboard');
        } else {
            // Admin tetap ke dashboard utama
            return Inertia::render('dashboard');
        }
    }
}