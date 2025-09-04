<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
  use HasFactory;

  protected $fillable = [
    'order_id',
    'ticket_id',
    'quantity',
    'price',
    'subtotal',
  ];

  protected $casts = [
    'price' => 'decimal:2',
    'subtotal' => 'decimal:2',
  ];

  // Relationships
  public function order(): BelongsTo
  {
    return $this->belongsTo(Order::class);
  }

  public function ticket(): BelongsTo
  {
    return $this->belongsTo(Ticket::class);
  }
}
