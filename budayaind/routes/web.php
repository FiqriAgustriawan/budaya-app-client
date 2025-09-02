<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Customer\ProfileController as CustomerProfileController;
use App\Http\Controllers\Customer\RequestSellerController;
use App\Http\Controllers\Seller\SellerDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\SellerRequestController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/map', function () {
    return Inertia::render('map');
})->name('map');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// Customer Routes
Route::middleware(['auth', 'verified', 'role:customer'])->prefix('customer')->name('customer.')->group(function () {
    Route::get('/profile', [CustomerProfileController::class, 'index'])->name('profile.index');
    Route::post('/profile/update', [CustomerProfileController::class, 'update'])->name('profile.update');

    // Request Seller routes - NEW FLOW
    Route::get('/request-seller-requirements', [RequestSellerController::class, 'requirements'])->name('request-seller.requirements');
    Route::get('/request-seller', [RequestSellerController::class, 'index'])->name('request-seller.index');
    Route::post('/request-seller', [RequestSellerController::class, 'store'])->name('request-seller.store');
    Route::get('/request-seller/{sellerRequest}', [RequestSellerController::class, 'show'])->name('request-seller.show');
});

// Seller Routes
Route::middleware(['auth', 'verified', 'role:seller'])->prefix('seller')->name('seller.')->group(function () {
    Route::get('/dashboard', [SellerDashboardController::class, 'index'])->name('dashboard');
});

// Admin routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Seller Requests Management
    Route::get('/seller-requests', [SellerRequestController::class, 'index'])->name('seller-requests.index');
    Route::get('/seller-requests/{sellerRequest}', [SellerRequestController::class, 'show'])->name('seller-requests.show');
    Route::patch('/seller-requests/{sellerRequest}/approve', [SellerRequestController::class, 'approve'])->name('seller-requests.approve');
    Route::patch('/seller-requests/{sellerRequest}/reject', [SellerRequestController::class, 'reject'])->name('seller-requests.reject');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';
