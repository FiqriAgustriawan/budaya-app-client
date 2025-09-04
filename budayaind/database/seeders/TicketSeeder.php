<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
  public function run(): void
  {
    $seller = User::where('role', 'seller')->first();

    if (!$seller) {
      $this->command->info('Skipping TicketSeeder: No seller found');
      return;
    }

    $tickets = [
      [
        'title' => 'Tiket Masuk Candi Borobudur',
        'description' => 'Nikmati keindahan Candi Borobudur dengan paket wisata lengkap termasuk guide lokal dan dokumentasi.',
        'destination' => 'Candi Borobudur, Yogyakarta',
        'price' => 150000,
        'available_quantity' => 100,
        'sold_quantity' => 25,
        'start_date' => now(),
        'end_date' => now()->addMonths(6),
        'access_features' => ['Tiket masuk candi', 'Guide lokal', 'Dokumentasi foto', 'Welcome drink'],
        'category' => 'premium',
        'is_active' => true,
      ],
      [
        'title' => 'Paket Wisata Keraton Yogyakarta',
        'description' => 'Jelajahi sejarah dan budaya Keraton Yogyakarta dengan guide ahli sejarah.',
        'destination' => 'Keraton Yogyakarta',
        'price' => 75000,
        'available_quantity' => 50,
        'sold_quantity' => 10,
        'start_date' => now(),
        'end_date' => now()->addMonths(3),
        'access_features' => ['Tiket masuk keraton', 'Guide sejarah', 'Museum'],
        'category' => 'basic',
        'is_active' => true,
      ],
      [
        'title' => 'VIP Tour Taman Sari',
        'description' => 'Pengalaman eksklusif menjelajahi Taman Sari dengan akses khusus dan layanan premium.',
        'destination' => 'Taman Sari, Yogyakarta',
        'price' => 300000,
        'available_quantity' => 20,
        'sold_quantity' => 5,
        'start_date' => now(),
        'end_date' => now()->addMonths(4),
        'access_features' => ['Akses VIP', 'Private guide', 'Makan siang', 'Transportasi', 'Souvenir'],
        'category' => 'vip',
        'is_active' => true,
      ],
    ];

    foreach ($tickets as $ticketData) {
      Ticket::create(array_merge($ticketData, [
        'seller_id' => $seller->id,
      ]));
    }
  }
}
