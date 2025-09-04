<?php

namespace App\Services;

use App\Models\CartItem;
use App\Models\Ticket;
use Illuminate\Support\Facades\Session;

class CartService
{
  public function getCartItems(?int $userId = null): \Illuminate\Database\Eloquent\Collection
  {
    $query = CartItem::with(['ticket.seller:id,name']);

    if ($userId) {
      $query->where('user_id', $userId);
    } else {
      $query->where('session_id', Session::getId());
    }

    return $query->get();
  }

  public function getCartSummary(?int $userId = null): array
  {
    $items = $this->getCartItems($userId);

    $items = $items->map(function ($item) {
      $item->subtotal = $item->quantity * $item->ticket->price;
      return $item;
    });

    $totalItems = $items->count();
    $totalAmount = $items->sum('subtotal');

    return [
      'items' => $items,
      'total_items' => $totalItems,
      'total_amount' => $totalAmount,
    ];
  }

  public function addToCart(int $ticketId, int $quantity, ?int $userId = null, ?string $visitDate = null, ?string $specialRequests = null): CartItem
  {
    $ticket = Ticket::findOrFail($ticketId);

    if (!$ticket->is_active || $ticket->status !== 'active') {
      throw new \Exception('Tiket tidak tersedia');
    }

    if ($quantity > $ticket->available_quantity) {
      throw new \Exception('Kuantitas melebihi stok tersedia');
    }

    $existingItem = CartItem::where('ticket_id', $ticketId)
      ->when($userId, fn($q) => $q->where('user_id', $userId))
      ->when(!$userId, fn($q) => $q->where('session_id', Session::getId()))
      ->first();

    if ($existingItem) {
      $newQuantity = $existingItem->quantity + $quantity;

      if ($newQuantity > $ticket->available_quantity) {
        throw new \Exception('Total kuantitas melebihi stok tersedia');
      }

      $existingItem->update([
        'quantity' => $newQuantity,
        'visit_date' => $visitDate ?? $existingItem->visit_date,
        'special_requests' => $specialRequests ?? $existingItem->special_requests,
      ]);
      return $existingItem;
    }

    // PERBAIKAN: Jika user login, session_id = null
    // Jika user tidak login, user_id = null
    return CartItem::create([
      'session_id' => $userId ? null : Session::getId(),
      'user_id' => $userId,
      'ticket_id' => $ticketId,
      'quantity' => $quantity,
      'visit_date' => $visitDate,
      'special_requests' => $specialRequests,
    ]);
  }

  public function updateCartItem(int $cartItemId, array $data, ?int $userId = null): CartItem
  {
    $query = CartItem::where('id', $cartItemId);

    if ($userId) {
      $query->where('user_id', $userId);
    } else {
      $query->where('session_id', Session::getId());
    }

    $cartItem = $query->firstOrFail();

    if (isset($data['quantity']) && $data['quantity'] > $cartItem->ticket->available_quantity) {
      throw new \Exception('Kuantitas melebihi stok tersedia');
    }

    $cartItem->update($data);
    return $cartItem;
  }

  public function removeFromCart(int $cartItemId, ?int $userId = null): void
  {
    $query = CartItem::where('id', $cartItemId);

    if ($userId) {
      $query->where('user_id', $userId);
    } else {
      $query->where('session_id', Session::getId());
    }

    $query->delete();
  }

  public function clearCart(?int $userId = null): void
  {
    $query = CartItem::query();

    if ($userId) {
      $query->where('user_id', $userId);
    } else {
      $query->where('session_id', Session::getId());
    }

    $query->delete();
  }
}
