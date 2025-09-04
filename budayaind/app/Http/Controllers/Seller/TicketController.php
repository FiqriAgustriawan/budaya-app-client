<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TicketController extends Controller
{
  public function index(Request $request)
  {
    $sellerId = Auth::id();

    $query = Ticket::where('user_id', $sellerId);

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

    // Apply status filter
    if ($request->filled('is_active')) {
      $query->where('is_active', $request->is_active === '1');
    }

    $tickets = $query->latest()->paginate(12)->withQueryString();

    return Inertia::render('Seller/Tickets/Index', [
      'tickets' => $tickets,
      'filters' => $request->only(['search', 'category', 'is_active']),
    ]);
  }

  public function create()
  {
    return Inertia::render('Seller/Tickets/Create');
  }

  public function store(Request $request)
  {
    $request->validate([
      'title' => 'required|string|max:255',
      'destination' => 'required|string|max:255',
      'description' => 'required|string',
      'price' => 'required|numeric|min:0',
      'category' => 'required|in:basic,premium,vip',
      'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
      'available_dates' => 'required|array|min:1',
      'max_participants' => 'required|integer|min:1',
      'access_features' => 'nullable|array',
    ]);

    $ticketData = $request->all();
    $ticketData['user_id'] = Auth::id();
    $ticketData['is_active'] = true;

    if ($request->hasFile('image')) {
      $ticketData['image'] = $request->file('image')->store('tickets', 'public');
    }

    $ticket = Ticket::create($ticketData);

    return redirect()->route('seller.tickets.index')
      ->with('success', 'Tiket berhasil dibuat');
  }

  public function show(Ticket $ticket)
  {
    if ($ticket->user_id !== Auth::id()) {
      abort(403, 'Unauthorized');
    }

    return Inertia::render('Seller/Tickets/Show', [
      'ticket' => $ticket,
    ]);
  }

  public function edit(Ticket $ticket)
  {
    if ($ticket->user_id !== Auth::id()) {
      abort(403, 'Unauthorized');
    }

    return Inertia::render('Seller/Tickets/Edit', [
      'ticket' => $ticket,
    ]);
  }

  public function update(Request $request, Ticket $ticket)
  {
    if ($ticket->user_id !== Auth::id()) {
      abort(403, 'Unauthorized');
    }

    $request->validate([
      'title' => 'required|string|max:255',
      'destination' => 'required|string|max:255',
      'description' => 'required|string',
      'price' => 'required|numeric|min:0',
      'category' => 'required|in:basic,premium,vip',
      'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
      'available_dates' => 'required|array|min:1',
      'max_participants' => 'required|integer|min:1',
      'access_features' => 'nullable|array',
    ]);

    $ticketData = $request->all();

    if ($request->hasFile('image')) {
      if ($ticket->image) {
        Storage::disk('public')->delete($ticket->image);
      }
      $ticketData['image'] = $request->file('image')->store('tickets', 'public');
    }

    $ticket->update($ticketData);

    return redirect()->route('seller.tickets.index')
      ->with('success', 'Tiket berhasil diperbarui');
  }

  public function destroy(Ticket $ticket)
  {
    if ($ticket->user_id !== Auth::id()) {
      abort(403, 'Unauthorized');
    }

    if ($ticket->image) {
      Storage::disk('public')->delete($ticket->image);
    }

    $ticket->delete();

    return redirect()->route('seller.tickets.index')
      ->with('success', 'Tiket berhasil dihapus');
  }
}
