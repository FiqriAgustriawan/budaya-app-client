<?php

namespace Database\Seeders;

use App\Models\CulturalSite;
use App\Models\Order;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            TicketSeeder::class,
            OrderSeeder::class,
            CulturalSiteSeeder::class,
        ]);
    }
}
