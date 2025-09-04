<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
  use HasFactory;

  protected $fillable = [
    'session_id',
    'user_id',
    'ticket_id',
    'quantity',
    'visit_date',
    'special_requests',
  ];

  protected $casts = [
    'quantity' => 'integer',
    'visit_date' => 'date',
  ];

  // Relationships
  public function ticket(): BelongsTo
  {
    return $this->belongsTo(Ticket::class);
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  // Accessors
  public function getPriceAttribute(): float
  {
    return $this->ticket ? $this->ticket->price : 0;
  }

  public function getSubtotalAttribute(): float
  {
    return $this->price * $this->quantity;
  }

  // Helper method
  public function getTotalPrice()
  {
    return $this->quantity * $this->ticket->price;
  }

  // Scopes
  public function scopeForSession($query, string $sessionId)
  {
    return $query->where('session_id', $sessionId);
  }

  public function scopeForUser($query, int $userId)
  {
    return $query->where('user_id', $userId);
  }
}
