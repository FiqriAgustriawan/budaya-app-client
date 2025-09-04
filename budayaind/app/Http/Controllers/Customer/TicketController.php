<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TicketController extends Controller
{
  public function index(Request $request)
  {
    try {
      // Start with basic query
      $query = Ticket::where('status', 'active')
        ->where('is_active', true);

      // Add seller relation safely
      $query->with('seller:id,name,email');

      // Apply search filter
      if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function ($q) use ($search) {
          $q->where('title', 'like', "%{$search}%")
            ->orWhere('destination', 'like', "%{$search}%")
            ->orWhere('description', 'like', "%{$search}%");
        });
      }

      // Apply category filter
      if ($request->filled('category') && $request->category !== 'all') {
        $query->where('category', $request->category);
      }

      // Apply destination filter
      if ($request->filled('destination') && $request->destination !== 'all') {
        $query->where('destination', $request->destination);
      }

      // Apply price range filter
      if ($request->filled('price_min')) {
        $query->where('price', '>=', $request->price_min);
      }
      if ($request->filled('price_max')) {
        $query->where('price', '<=', $request->price_max);
      }

      // Apply sorting
      switch ($request->get('sort', 'newest')) {
        case 'price_low':
          $query->orderBy('price', 'asc');
          break;
        case 'price_high':
          $query->orderBy('price', 'desc');
          break;
        case 'popular':
          $query->orderBy('sold_quantity', 'desc');
          break;
        default:
          $query->latest();
          break;
      }

      // Get paginated results
      $tickets = $query->paginate(12)->withQueryString();

      // Get featured destinations
      $featuredDestinations = Ticket::select('destination')
        ->whereNotNull('destination')
        ->where('destination', '!=', '')
        ->where('status', 'active')
        ->distinct()
        ->orderBy('destination')
        ->limit(10)
        ->pluck('destination')
        ->filter()
        ->values()
        ->toArray();

      // Prepare filters data
      $filters = [
        'search' => $request->get('search', ''),
        'category' => $request->get('category', 'all'),
        'destination' => $request->get('destination', 'all'),
        'price_min' => $request->get('price_min'),
        'price_max' => $request->get('price_max'),
        'sort' => $request->get('sort', 'newest'),
      ];

      return Inertia::render('Customer/Tickets/Index', [
        'tickets' => $tickets,
        'filters' => $filters,
        'featured_destinations' => $featuredDestinations,
      ]);
    } catch (\Exception $e) {
      Log::error('Customer Ticket index error: ' . $e->getMessage());
      Log::error('Stack trace: ' . $e->getTraceAsString());

      // Return safe empty data structure
      return Inertia::render('Customer/Tickets/Index', [
        'tickets' => [
          'data' => [],
          'links' => [],
          'current_page' => 1,
          'last_page' => 1,
          'per_page' => 12,
          'total' => 0,
          'from' => null,
          'to' => null,
        ],
        'filters' => [
          'search' => '',
          'category' => 'all',
          'destination' => 'all',
          'price_min' => null,
          'price_max' => null,
          'sort' => 'newest',
        ],
        'featured_destinations' => [],
      ]);
    }
  }

  public function show(Ticket $ticket)
  {
    try {
      // Check if ticket is available
      if ($ticket->status !== 'active' || !$ticket->is_active) {
        abort(404, 'Ticket not available');
      }

      // Load seller relationship
      $ticket->load('seller:id,name,email');

      // Get related tickets
      $relatedTickets = Ticket::where('id', '!=', $ticket->id)
        ->where('status', 'active')
        ->where('is_active', true)
        ->where(function ($query) use ($ticket) {
          $query->where('destination', $ticket->destination)
            ->orWhere('category', $ticket->category);
        })
        ->with('seller:id,name')
        ->limit(4)
        ->get();

      return Inertia::render('Customer/Tickets/Show', [
        'ticket' => $ticket,
        'related_tickets' => $relatedTickets,
      ]);
    } catch (\Exception $e) {
      Log::error('Customer Ticket show error: ' . $e->getMessage());
      abort(404, 'Ticket not found');
    }
  }
}
