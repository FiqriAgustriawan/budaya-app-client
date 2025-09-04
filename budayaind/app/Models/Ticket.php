<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id', // TAMBAHKAN: untuk seller
    'title',
    'destination',
    'description',
    'price',
    'category',
    'image',
    'available_dates',
    'max_participants',
    'access_features',
    'is_active',
  ];

  protected $casts = [
    'price' => 'decimal:2',
    'available_dates' => 'array',
    'access_features' => 'array',
    'is_active' => 'boolean',
  ];

  // Relasi dengan seller (user)
  public function seller()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  // Alias untuk user
  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function orderItems()
  {
    return $this->hasMany(OrderItem::class);
  }
}
