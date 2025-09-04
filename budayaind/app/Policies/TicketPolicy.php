<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;

class TicketPolicy
{
  public function view(User $user, Ticket $ticket): bool
  {
    return $ticket->seller_id === $user->id;
  }

  public function create(User $user): bool
  {
    return $user->role === 'seller';
  }

  public function update(User $user, Ticket $ticket): bool
  {
    return $ticket->seller_id === $user->id;
  }

  public function delete(User $user, Ticket $ticket): bool
  {
    return $ticket->seller_id === $user->id && $ticket->sold_quantity === 0;
  }
}
