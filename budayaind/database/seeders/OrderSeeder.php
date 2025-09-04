<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
  public function run(): void
  {
    $customer = User::where('role', 'customer')->first();
    $tickets = Ticket::all();

    if (!$customer || $tickets->isEmpty()) {
      $this->command->info('Skipping OrderSeeder: No customer or tickets found');
      return;
    }

    // Create some test orders
    foreach ([1, 2, 3] as $i) {
      $order = Order::create([
        'customer_id' => $customer->id,
        'order_number' => 'ORD-' . now()->format('Ymd') . '-' . str_pad($i, 4, '0', STR_PAD_LEFT),
        'customer_name' => $customer->name,
        'customer_email' => $customer->email,
        'customer_phone' => '081234567890',
        'visit_date' => now()->addDays(rand(1, 30)),
        'special_requests' => $i === 1 ? 'Mohon guide yang bisa bahasa Inggris' : null,
        'total_amount' => 0,
        'platform_fee' => 0,
        'status' => ['pending', 'confirmed', 'completed'][rand(0, 2)],
        'payment_status' => ['pending', 'success', 'success'][rand(0, 2)],
        'payment_method' => 'midtrans',
        'created_at' => now()->subDays(rand(0, 30)),
      ]);

      // Add 1-2 items per order
      $itemCount = rand(1, 2);
      $totalAmount = 0;

      for ($j = 0; $j < $itemCount; $j++) {
        $ticket = $tickets->random();
        $quantity = rand(1, 3);
        $subtotal = $ticket->price * $quantity;
        $totalAmount += $subtotal;

        OrderItem::create([
          'order_id' => $order->id,
          'ticket_id' => $ticket->id,
          'quantity' => $quantity,
          'price' => $ticket->price,
          'subtotal' => $subtotal,
        ]);

        // Update ticket sold quantity
        $ticket->increment('sold_quantity', $quantity);
      }

      // Calculate platform fee (5%)
      $platformFee = $totalAmount * 0.05;

      // Update order totals
      $order->update([
        'total_amount' => $totalAmount,
        'platform_fee' => $platformFee,
      ]);
    }
  }
}
