<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SellerEarning extends Model
{
  use HasFactory;

  protected $fillable = [
    'seller_id',
    'order_id',
    'ticket_id',
    'total_amount',
    'platform_fee',
    'seller_amount',
    'status',
    'available_at',
  ];

  protected $casts = [
    'total_amount' => 'decimal:2',
    'platform_fee' => 'decimal:2',
    'seller_amount' => 'decimal:2',
    'available_at' => 'datetime',
  ];

  // Relationships
  public function seller(): BelongsTo
  {
    return $this->belongsTo(User::class, 'seller_id');
  }

  public function order(): BelongsTo
  {
    return $this->belongsTo(Order::class);
  }

  public function ticket(): BelongsTo
  {
    return $this->belongsTo(Ticket::class);
  }

  // Scopes
  public function scopeAvailable($query)
  {
    return $query->where('status', 'available');
  }

  public function scopePending($query)
  {
    return $query->where('status', 'pending');
  }

  public function scopeWithdrawn($query)
  {
    return $query->where('status', 'withdrawn');
  }

  public function scopeForSeller($query, int $sellerId)
  {
    return $query->where('seller_id', $sellerId);
  }
}
