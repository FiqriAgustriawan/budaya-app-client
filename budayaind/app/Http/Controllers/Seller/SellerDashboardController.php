<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerDashboardController extends Controller
{
  public function index(Request $request)
  {
    return Inertia::render('Seller/Dashboard');
  }
}
