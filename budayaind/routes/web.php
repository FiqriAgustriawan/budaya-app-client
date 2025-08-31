<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Customer\ProfileController as CustomerProfileController;
use App\Http\Controllers\Seller\SellerDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// Customer Routes
Route::middleware(['auth', 'verified', 'role:customer'])->prefix('customer')->name('customer.')->group(function () {
    Route::get('/profile', [CustomerProfileController::class, 'index'])->name('profile.index');
    Route::post('/profile/update', [CustomerProfileController::class, 'update'])->name('profile.update'); // Ubah ke POST
});

// Seller Routes
Route::middleware(['auth', 'verified', 'role:seller'])->prefix('seller')->name('seller.')->group(function () {
    Route::get('/dashboard', [SellerDashboardController::class, 'index'])->name('dashboard');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';
