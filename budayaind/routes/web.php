<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Customer\ProfileController as CustomerProfileController;
use App\Http\Controllers\Customer\RequestSellerController;
use App\Http\Controllers\Customer\CartController;
use App\Http\Controllers\Customer\CheckoutController;
use App\Http\Controllers\Customer\PaymentController;
use App\Http\Controllers\Customer\OrderController as CustomerOrderController;
use App\Http\Controllers\Customer\TicketController as CustomerTicketController;
use App\Http\Controllers\Seller\SellerDashboardController;
use App\Http\Controllers\Seller\TicketController as SellerTicketController;
use App\Http\Controllers\Seller\EarningsController;
use App\Http\Controllers\Seller\WithdrawalController;
use App\Http\Controllers\Admin\SellerRequestController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController; // ADD THIS
use App\Http\Controllers\MapController;
use App\Http\Controllers\Admin\CulturalSiteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public ticket routes (no auth required) - BROWSE TICKETS
Route::get('/tickets', [CustomerTicketController::class, 'index'])->name('tickets.index');
Route::get('/tickets/{ticket}', [CustomerTicketController::class, 'show'])->name('tickets.show');

// Redirect browse-tickets to tickets for backward compatibility
Route::get('/browse-tickets', function () {
    return redirect()->route('tickets.index');
})->name('browse-tickets');

// Public Tickets Routes (accessible to all)
Route::get('/tickets', [\App\Http\Controllers\PublicTicketController::class, 'index'])->name('tickets.index');
Route::get('/tickets/{ticket}', [\App\Http\Controllers\PublicTicketController::class, 'show'])->name('tickets.show');

// GANTI: Route dashboard umum dengan redirect berdasarkan role
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = \Illuminate\Support\Facades\Auth::user();

        switch ($user->role) {
            case 'admin':
                return redirect()->route('admin.dashboard');
            case 'seller':
                return redirect()->route('seller.dashboard');
            case 'customer':
            default:
                return redirect()->route('customer.dashboard');
        }
    })->name('dashboard');
});

// Customer Routes
Route::middleware(['auth', 'verified', 'role:customer'])->prefix('customer')->name('customer.')->group(function () {
    // ADD: Customer Dashboard
    Route::get('/dashboard', [\App\Http\Controllers\Customer\ProfileController::class, 'index'])->name('dashboard');

    Route::get('/profile', [CustomerProfileController::class, 'index'])->name('profile.index');
    Route::post('/profile/update', [CustomerProfileController::class, 'update'])->name('profile.update');

    // Request Seller routes - EXISTING FLOW
    Route::get('/request-seller-requirements', [RequestSellerController::class, 'requirements'])->name('request-seller.requirements');
    Route::get('/request-seller', [RequestSellerController::class, 'index'])->name('request-seller.index');
    Route::post('/request-seller', [RequestSellerController::class, 'store'])->name('request-seller.store');
    Route::get('/request-seller/{sellerRequest}', [RequestSellerController::class, 'show'])->name('request-seller.show');

    // Cart & Shopping routes - NEW TICKET FEATURE
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::patch('/cart/{cartItem}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{cartItem}', [CartController::class, 'remove'])->name('cart.remove');
    Route::delete('/cart', [CartController::class, 'clear'])->name('cart.clear');

    // Checkout Routes
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    // Order Routes - GUNAKAN OrderController YANG SUDAH ADA
    Route::get('/orders', [CustomerOrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [CustomerOrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}/cancel', [CustomerOrderController::class, 'cancel'])->name('orders.cancel');

    // Customer routes untuk tickets
    Route::get('/tickets', [CustomerTicketController::class, 'index'])->name('tickets.index');
    Route::get('/tickets/{ticket}', [CustomerTicketController::class, 'show'])->name('tickets.show');

    // Payment callback routes
    Route::get('/orders/{order}/payment/success', [PaymentController::class, 'success'])->name('payment.success');
    Route::get('/orders/{order}/payment/pending', [PaymentController::class, 'pending'])->name('payment.pending');
    Route::get('/orders/{order}/payment/failed', [PaymentController::class, 'failed'])->name('payment.failed');
    Route::get('/orders/{order}/payment/finish', [PaymentController::class, 'finish'])->name('payment.finish');
});

// Midtrans notification webhook (tidak perlu auth)
Route::post('/midtrans/notification', [PaymentController::class, 'notification'])->name('midtrans.notification');

// Order callback routes (no auth required for webhooks) - KEEP THESE
Route::name('orders.')->group(function () {
    Route::get('/orders/success', [CustomerOrderController::class, 'success'])->name('success');
    Route::get('/orders/pending', [CustomerOrderController::class, 'pending'])->name('pending');
    Route::get('/orders/failed', [CustomerOrderController::class, 'failed'])->name('failed');
    Route::post('/orders/webhook', [CustomerOrderController::class, 'webhook'])->name('webhook');
});

// Seller Routes
Route::middleware(['auth', 'verified', 'role:seller'])->prefix('seller')->name('seller.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Seller\DashboardController::class, 'index'])->name('dashboard');

    // Ticket Management - NEW FEATURE
    Route::resource('tickets', SellerTicketController::class);
    Route::patch('/tickets/{ticket}/toggle-status', [SellerTicketController::class, 'toggleStatus'])
        ->name('tickets.toggle-status');

    // Orders Management - ADD THIS
    Route::get('/orders', [\App\Http\Controllers\Seller\OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [\App\Http\Controllers\Seller\OrderController::class, 'show'])->name('orders.show');

    // Earnings & Financial Management - NEW FEATURE
    Route::get('/earnings', [EarningsController::class, 'index'])->name('earnings.index');
    Route::get('/earnings/transactions', [EarningsController::class, 'transactions'])->name('earnings.transactions');
    Route::get('/earnings/transactions/export', [EarningsController::class, 'exportTransactions'])->name('earnings.transactions.export');

    // Withdrawal Management - NEW FEATURE
    Route::get('/earnings/withdrawals', [WithdrawalController::class, 'index'])->name('earnings.withdrawals');
    Route::get('/earnings/withdraw', [WithdrawalController::class, 'create'])->name('earnings.withdraw');
    Route::post('/earnings/withdraw', [WithdrawalController::class, 'store'])->name('earnings.withdraw.store');
    Route::get('/earnings/withdrawals/{withdrawal}', [WithdrawalController::class, 'show'])->name('earnings.withdrawals.show');
});

// Admin routes
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    // ADD: Admin Dashboard
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Existing Seller Requests Management
    Route::get('/seller-requests', [SellerRequestController::class, 'index'])->name('seller-requests.index');
    Route::get('/seller-requests/{sellerRequest}', [SellerRequestController::class, 'show'])->name('seller-requests.show');
    Route::patch('/seller-requests/{sellerRequest}/approve', [SellerRequestController::class, 'approve'])->name('seller-requests.approve');
    Route::patch('/seller-requests/{sellerRequest}/reject', [SellerRequestController::class, 'reject'])->name('seller-requests.reject');

    // NEW: Quiz Management for Admin
    Route::get('/quiz', [\App\Http\Controllers\Admin\QuizController::class, 'index'])->name('quiz.index');
    Route::get('/quiz/{quizQuestion}', [\App\Http\Controllers\Admin\QuizController::class, 'show'])->name('quiz.show');
    Route::get('/quiz/{quizQuestion}/edit', [\App\Http\Controllers\Admin\QuizController::class, 'edit'])->name('quiz.edit');
    Route::post('/quiz', [\App\Http\Controllers\Admin\QuizController::class, 'store'])->name('quiz.store');
    Route::put('/quiz/{quizQuestion}', [\App\Http\Controllers\Admin\QuizController::class, 'update'])->name('quiz.update');
    Route::delete('/quiz/{quizQuestion}', [\App\Http\Controllers\Admin\QuizController::class, 'destroy'])->name('quiz.destroy');

    // NEW: Withdrawal Management for Admin
    Route::get('/withdrawals', [\App\Http\Controllers\Admin\WithdrawalController::class, 'index'])->name('withdrawals.index');
    Route::get('/withdrawals/{withdrawal}', [\App\Http\Controllers\Admin\WithdrawalController::class, 'show'])->name('withdrawals.show');
    Route::patch('/withdrawals/{withdrawal}/approve', [\App\Http\Controllers\Admin\WithdrawalController::class, 'approve'])->name('withdrawals.approve');
    Route::patch('/withdrawals/{withdrawal}/reject', [\App\Http\Controllers\Admin\WithdrawalController::class, 'reject'])->name('withdrawals.reject');
    Route::patch('/withdrawals/{withdrawal}/complete', [\App\Http\Controllers\Admin\WithdrawalController::class, 'complete'])->name('withdrawals.complete');

    // Cultural Sites Routes
    Route::resource('cultural-sites', CulturalSiteController::class);
    Route::patch('cultural-sites/{culturalSite}/toggle-status', [CulturalSiteController::class, 'toggleStatus'])
        ->name('cultural-sites.toggle-status');
});

// Cultural Sites Routes (Public)
Route::get('/map', [MapController::class, 'index'])->name('map');
Route::get('/cultural-sites/{slug}', [MapController::class, 'show'])->name('cultural-sites.show');

// Test webhook route (remove after testing)
Route::post('/test-webhook/{orderNumber}', function ($orderNumber) {
    $testNotification = [
        'order_id' => $orderNumber,
        'transaction_status' => 'settlement',
        'status_code' => '200',
        'gross_amount' => '1050000.00'
    ];

    $controller = new \App\Http\Controllers\Customer\PaymentController(new \App\Services\MidtransService());

    $request = new \Illuminate\Http\Request();
    $request->merge($testNotification);

    return $controller->notification($request);
});

// GET version untuk testing via browser
Route::get('/test-webhook-get/{orderNumber}', function ($orderNumber) {
    $testNotification = [
        'order_id' => $orderNumber,
        'transaction_status' => 'settlement',
        'status_code' => '200',
        'gross_amount' => '1050000.00'
    ];

    try {
        $controller = new \App\Http\Controllers\Customer\PaymentController(new \App\Services\MidtransService());

        $request = new \Illuminate\Http\Request();
        $request->merge($testNotification);

        $response = $controller->notification($request);

        // Cek order setelah update
        $order = \App\Models\Order::where('order_number', $orderNumber)->first();

        return response()->json([
            'success' => true,
            'message' => 'Webhook processed successfully',
            'response' => $response->getContent(),
            'order_number' => $orderNumber,
            'order_status' => $order ? $order->status : 'not found',
            'payment_status' => $order ? $order->payment_status : 'not found'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error processing webhook',
            'error' => $e->getMessage(),
            'order_number' => $orderNumber,
            'trace' => $e->getTraceAsString()
        ]);
    }
});

Route::get('/public-quiz', function () {
    return Inertia::render('quiz');
})->name('public.quiz');

// Quiz Routes untuk setiap pulau
Route::get('/public-quiz/sumatera', function () {
    return Inertia::render('quiz/SumateraQuiz');
})->name('public.quiz.sumatera');

Route::get('/public-quiz/jawa', function () {
    return Inertia::render('quiz/JavaQuiz');
})->name('public.quiz.jawa');

Route::get('/public-quiz/kalimantan', function () {
    return Inertia::render('quiz/KalimantanQuiz');
})->name('public.quiz.kalimantan');

Route::get('/public-quiz/sulawesi', function () {
    return Inertia::render('quiz/SulawesiQuiz');
})->name('public.quiz.sulawesi');

Route::get('/public-quiz/papua', function () {
    return Inertia::render('quiz/PapuaQuiz');
})->name('public.quiz.papua');

Route::get('/public-quiz/indonesia', function () {
    return Inertia::render('quiz/IndonesiaQuiz');
})->name('public.quiz.indonesia');

// API routes for quiz questions
Route::prefix('api/quiz')->group(function () {
    Route::get('/questions/{island}', [\App\Http\Controllers\QuizController::class, 'getQuestions'])->name('api.quiz.questions');
    Route::get('/categories/{island}', [\App\Http\Controllers\QuizController::class, 'getCategories'])->name('api.quiz.categories');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';

// Public Cultural Sites Routes
Route::get('/cultural-sites', [CulturalSiteController::class, 'publicIndex'])
    ->name('cultural-sites.index');

Route::get('/cultural-sites/{culturalSite:slug}', [CulturalSiteController::class, 'publicShow'])
    ->name('cultural-sites.show');

// Admin routes
