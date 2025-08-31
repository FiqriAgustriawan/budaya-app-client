<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SellerRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nama_tempat_wisata',
        'email_tempat',
        'password_tempat',
        'deskripsi_tempat',
        'asal_daerah',
        'nomor_telepon',
        'alamat_tempat',
        'foto_ktp',
        'foto_tempat',
        'status',
        'admin_notes',
        'reviewed_at',
        'reviewed_by'
    ];

    protected $casts = [
        'foto_tempat' => 'array',
        'reviewed_at' => 'datetime'
    ];

    protected $hidden = [
        'password_tempat'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    // Accessor untuk status badge
    public function getStatusBadgeAttribute(): array
    {
        return match($this->status) {
            'pending' => ['color' => 'yellow', 'label' => 'Pending Review'],
            'approved' => ['color' => 'green', 'label' => 'Approved'],
            'rejected' => ['color' => 'red', 'label' => 'Rejected'],
            default => ['color' => 'gray', 'label' => 'Unknown']
        };
    }

    // Check if user can request seller again
    public static function canUserRequest($userId): bool
    {
        $existingRequest = static::where('user_id', $userId)
            ->whereIn('status', ['pending', 'approved'])
            ->exists();
            
        return !$existingRequest;
    }
}
