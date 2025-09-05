<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use  HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_active',
        'phone',
        'address',
        'profile_image',
        'balance',
        'last_login_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
            'balance' => 'decimal:2',
            'last_login_at' => 'datetime',
        ];
    }

    /**
     * Role constants
     */
    const ROLE_ADMIN = 'admin';
    const ROLE_SELLER = 'seller';
    const ROLE_CUSTOMER = 'customer';

    /**
     * Check if user is admin
     */
    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    /**
     * Check if user is seller
     */
    public function isSeller(): bool
    {
        return $this->role === self::ROLE_SELLER;
    }

    /**
     * Check if user is customer
     */
    public function isCustomer(): bool
    {
        return $this->role === self::ROLE_CUSTOMER;
    }

    /**
     * Check if user has role
     */
    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    /**
     * Check if user has any of the given roles
     */
    public function hasAnyRole(array $roles): bool
    {
        return in_array($this->role, $roles);
    }

    /**
     * Get all seller requests for the user.
     */
    public function sellerRequests()
    {
        return $this->hasMany(SellerRequest::class);
    }

    /**
     * Get the latest seller request for the user.
     */
    public function latestSellerRequest()
    {
        return $this->hasOne(SellerRequest::class)->latest();
    }

    /**
     * Check if user can become seller
     */
    public function canRequestSeller(): bool
    {
        return SellerRequest::canUserRequest($this->id);
    }

    /**
     * Check if user has approved seller request
     */
    public function hasApprovedSellerRequest(): bool
    {
        return $this->sellerRequests()
            ->where('status', 'approved')
            ->exists();
    }

    // Helper methods for seller
    public function isApprovedSeller(): bool
    {
        return $this->role === 'seller' && $this->is_active;
    }

    public function getSellerInfo(): ?array
    {
        return $this->seller_data;
    }

    // Relationships untuk ticket system
    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class, 'seller_id');
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function earnings(): HasMany
    {
        return $this->hasMany(SellerEarning::class, 'seller_id');
    }

    public function withdrawalRequests(): HasMany
    {
        return $this->hasMany(WithdrawalRequest::class, 'seller_id');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByRole($query, $role)
    {
        return $query->where('role', $role);
    }

    // Helper methods
    public function getAvailableBalance(): float
    {
        if (!$this->isSeller()) {
            return 0;
        }

        return $this->sellerEarnings()
            ->where('status', 'available')
            ->sum('seller_amount');
    }

    public function getTotalEarnings(): float
    {
        if (!$this->isSeller()) {
            return 0;
        }

        return $this->sellerEarnings()->sum('seller_amount');
    }
}
