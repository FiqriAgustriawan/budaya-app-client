<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'order_number',
    'customer_name',
    'customer_email',
    'customer_phone',
    'visit_date',
    'special_requests',
    'total_amount',
    'platform_fee',
    'status',
    'payment_status',
    'snap_token',
  ];

  protected $casts = [
    'visit_date' => 'date',
    'total_amount' => 'decimal:2',
    'platform_fee' => 'decimal:2',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function items()
  {
    return $this->hasMany(OrderItem::class);
  }

  // Tambahkan scope methods jika perlu:

  public function scopeForUser($query, $userId)
  {
    return $query->where('user_id', $userId);
  }

  public function scopeByStatus($query, $status)
  {
    return $query->where('status', $status);
  }

  public static function generateOrderNumber()
  {
    return 'ORD-' . date('Ymd') . '-' . strtoupper(uniqid());
  }
}
