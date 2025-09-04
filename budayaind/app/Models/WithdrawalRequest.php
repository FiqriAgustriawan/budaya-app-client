<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WithdrawalRequest extends Model
{
  use HasFactory;

  protected $fillable = [
    'seller_id',
    'amount',
    'bank_name',
    'account_number',
    'account_holder',
    'notes',
    'status',
    'admin_notes',
    'requested_at',
    'processed_at',
    'processed_by',
  ];

  protected $casts = [
    'amount' => 'decimal:2',
    'requested_at' => 'datetime',
    'processed_at' => 'datetime',
  ];

  // Relationships
  public function seller(): BelongsTo
  {
    return $this->belongsTo(User::class, 'seller_id');
  }

  public function processedBy(): BelongsTo
  {
    return $this->belongsTo(User::class, 'processed_by');
  }

  // Scopes
  public function scopePending($query)
  {
    return $query->where('status', 'pending');
  }

  public function scopeApproved($query)
  {
    return $query->where('status', 'approved');
  }

  public function scopeCompleted($query)
  {
    return $query->where('status', 'completed');
  }

  public function scopeRejected($query)
  {
    return $query->where('status', 'rejected');
  }

  // Methods
  public function approve(int $adminId, string $notes = null): void
  {
    $this->update([
      'status' => 'approved',
      'admin_notes' => $notes,
      'processed_at' => now(),
      'processed_by' => $adminId,
    ]);
  }

  public function reject(int $adminId, string $notes): void
  {
    $this->update([
      'status' => 'rejected',
      'admin_notes' => $notes,
      'processed_at' => now(),
      'processed_by' => $adminId,
    ]);
  }

  public function complete(int $adminId): void
  {
    $this->update([
      'status' => 'completed',
      'processed_at' => now(),
      'processed_by' => $adminId,
    ]);

    // Mark seller earnings as withdrawn
    SellerEarning::where('seller_id', $this->seller_id)
      ->where('status', 'available')
      ->where('seller_amount', '<=', $this->amount)
      ->update(['status' => 'withdrawn']);
  }
}
