<?php


namespace App\Policies;

use App\Models\WithdrawalRequest;
use App\Models\User;

class WithdrawalRequestPolicy
{
  public function view(User $user, WithdrawalRequest $withdrawalRequest): bool
  {
    return $withdrawalRequest->seller_id === $user->id;
  }

  public function create(User $user): bool
  {
    return $user->role === 'seller';
  }
}
