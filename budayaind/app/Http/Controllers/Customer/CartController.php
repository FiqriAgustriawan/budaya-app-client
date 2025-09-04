<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Ticket;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
  protected $cartService;

  public function __construct(CartService $cartService)
  {
    $this->cartService = $cartService;
  }

  public function index()
  {
    try {
      $userId = Auth::id();
      $cartSummary = $this->cartService->getCartSummary($userId);

      // Transform items for frontend compatibility
      $transformedItems = $cartSummary['items']->map(function ($item) {
        return [
          'id' => $item->id,
          'quantity' => $item->quantity,
          'visit_date' => $item->visit_date,
          'special_requests' => $item->special_requests,
          'ticket' => [
            'id' => $item->ticket->id,
            'title' => $item->ticket->title,
            'destination' => $item->ticket->destination,
            'price' => $item->ticket->price,
            'image' => $item->ticket->image,
            'seller' => $item->ticket->seller ? [
              'id' => $item->ticket->seller->id,
              'name' => $item->ticket->seller->name,
            ] : null,
          ]
        ];
      });

      return Inertia::render('Customer/Cart/Index', [
        'cartItems' => $transformedItems,
        'total' => $cartSummary['total_amount'],
      ]);
    } catch (\Exception $e) {
      Log::error('Cart index error: ' . $e->getMessage());

      return Inertia::render('Customer/Cart/Index', [
        'cartItems' => [],
        'total' => 0,
      ]);
    }
  }

  public function add(Request $request)
  {
    $request->validate([
      'ticket_id' => 'required|exists:tickets,id',
      'quantity' => 'integer|min:1|max:10',
      'visit_date' => 'nullable|date|after_or_equal:today',
      'special_requests' => 'nullable|string|max:500',
    ]);

    try {
      $userId = Auth::id();

      $this->cartService->addToCart(
        $request->ticket_id,
        $request->get('quantity', 1),
        $userId,
        $request->visit_date,
        $request->special_requests
      );

      return back()->with('success', 'Tiket berhasil ditambahkan ke keranjang');
    } catch (\Exception $e) {
      Log::error('Add to cart error: ' . $e->getMessage());
      return back()->withErrors(['message' => $e->getMessage()]);
    }
  }

  public function update(Request $request, CartItem $cartItem)
  {
    $request->validate([
      'quantity' => 'required|integer|min:1|max:10',
      'visit_date' => 'nullable|date|after_or_equal:today',
      'special_requests' => 'nullable|string|max:500',
    ]);

    try {
      // Check ownership
      if ($cartItem->user_id !== Auth::id()) {
        abort(403, 'Unauthorized');
      }

      $this->cartService->updateCartItem($cartItem->id, [
        'quantity' => $request->quantity,
        'visit_date' => $request->visit_date,
        'special_requests' => $request->special_requests,
      ], Auth::id());

      return back()->with('success', 'Item keranjang berhasil diperbarui');
    } catch (\Exception $e) {
      Log::error('Update cart error: ' . $e->getMessage());
      return back()->withErrors(['message' => $e->getMessage()]);
    }
  }

  public function remove(CartItem $cartItem)
  {
    try {
      // Check ownership
      if ($cartItem->user_id !== Auth::id()) {
        abort(403, 'Unauthorized');
      }

      $this->cartService->removeFromCart($cartItem->id, Auth::id());

      return back()->with('success', 'Item berhasil dihapus dari keranjang');
    } catch (\Exception $e) {
      Log::error('Remove cart error: ' . $e->getMessage());
      return back()->withErrors(['message' => 'Gagal menghapus item dari keranjang']);
    }
  }

  public function clear()
  {
    try {
      $this->cartService->clearCart(Auth::id());

      return back()->with('success', 'Keranjang berhasil dikosongkan');
    } catch (\Exception $e) {
      Log::error('Clear cart error: ' . $e->getMessage());
      return back()->withErrors(['message' => 'Gagal mengosongkan keranjang']);
    }
  }
}
