<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicTicketController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Ticket::with(['seller'])
                          ->where('is_active', true);

            // Search filter
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
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

            // Safe data structure - pastikan tidak ada undefined
            return Inertia::render('Public/Tickets/Index', [
                'tickets' => [
                    'data' => $tickets->items() ?: [],
                    'links' => $tickets->linkCollection()->toArray() ?: [],
                    'meta' => [
                        'current_page' => $tickets->currentPage(),
                        'last_page' => $tickets->lastPage(),
                        'per_page' => $tickets->perPage(),
                        'total' => $tickets->total(),
                        'from' => $tickets->firstItem(),
                        'to' => $tickets->lastItem(),
                    ],
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
            Log::error('Public Tickets Index Error: ' . $e->getMessage());
            
            // Return safe fallback data
            return Inertia::render('Public/Tickets/Index', [
                'tickets' => [
                    'data' => [],
                    'links' => [],
                    'meta' => [
                        'current_page' => 1,
                        'last_page' => 1,
                        'per_page' => 12,
                        'total' => 0,
                        'from' => null,
                        'to' => null,
                    ],
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

    public function show(Ticket $ticket)
    {
        if (!$ticket->is_active) {
            abort(404);
        }

        $ticket->load(['seller']);

        // Get related tickets
        $relatedTickets = Ticket::where('is_active', true)
          ->where('id', '!=', $ticket->id)
          ->where(function ($q) use ($ticket) {
            $q->where('destination', $ticket->destination)
              ->orWhere('category', $ticket->category);
          })
          ->with(['seller'])
          ->limit(4)
          ->get();

        return Inertia::render('Public/Tickets/Show', [
          'ticket' => $ticket,
          'related_tickets' => $relatedTickets,
        ]);
    }
}
