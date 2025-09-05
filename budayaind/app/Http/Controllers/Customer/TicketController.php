<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class TicketController extends Controller
{
  public function index(Request $request)
  {
    try {
      $query = Ticket::with(['seller'])
        ->where('is_active', true);

      // Search filter
      if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function ($q) use ($search) {
          $q->where('title', 'like', "%{$search}%")
            ->orWhere('destination', 'like', "%{$search}%")
            ->orWhere('description', 'like', "%{$search}%");
        });
      }

      // Category filter
      if ($request->filled('category') && $request->category !== 'all') {
        $query->where('category', $request->category);
      }

      // Destination filter
      if ($request->filled('destination') && $request->destination !== 'all') {
        $query->where('destination', $request->destination);
      }

      // Price range filter
      if ($request->filled('price_min')) {
        $query->where('price', '>=', $request->price_min);
      }
      if ($request->filled('price_max')) {
        $query->where('price', '<=', $request->price_max);
      }

      // Sorting
      switch ($request->sort) {
        case 'price_low':
          $query->orderBy('price', 'asc');
          break;
        case 'price_high':
          $query->orderBy('price', 'desc');
          break;
        case 'popular':
          $query->withCount('orderItems')->orderBy('order_items_count', 'desc');
          break;
        default:
          $query->latest();
      }

      $tickets = $query->paginate(12)->withQueryString();

      // Get featured destinations
      $featuredDestinations = Ticket::where('is_active', true)
        ->distinct()
        ->pluck('destination')
        ->filter()
        ->take(10)
        ->values()
        ->toArray();

      return Inertia::render('Customer/Tickets/Index', [
        'tickets' => [
          'data' => $tickets->items() ?: [],
          'links' => $tickets->linkCollection()->toArray() ?: [],
          'meta' => $tickets->toArray() ?: [],
          'total' => $tickets->total(),
        ],
        'filters' => [
          'search' => $request->get('search', ''),
          'category' => $request->get('category', ''),
          'destination' => $request->get('destination', ''),
          'price_min' => $request->get('price_min'),
          'price_max' => $request->get('price_max'),
          'sort' => $request->get('sort', 'newest'),
        ],
        'featured_destinations' => $featuredDestinations ?: [],
      ]);
    } catch (\Exception $e) {
      Log::error('Customer Tickets Index Error: ' . $e->getMessage());

      return Inertia::render('Customer/Tickets/Index', [
        'tickets' => [
          'data' => [],
          'links' => [],
          'meta' => [],
          'total' => 0,
        ],
        'filters' => [
          'search' => '',
          'category' => '',
          'destination' => '',
          'price_min' => null,
          'price_max' => null,
          'sort' => 'newest',
        ],
        'featured_destinations' => [],
      ]);
    }
  }
}
