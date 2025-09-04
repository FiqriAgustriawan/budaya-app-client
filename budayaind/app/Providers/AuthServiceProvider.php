<?php


namespace App\Providers;

use App\Models\Ticket;
use App\Models\WithdrawalRequest;
use App\Policies\TicketPolicy;
use App\Policies\WithdrawalRequestPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
  protected $policies = [
    Ticket::class => TicketPolicy::class,
    WithdrawalRequest::class => WithdrawalRequestPolicy::class,
  ];

  public function boot(): void
  {
    //
  }
}
