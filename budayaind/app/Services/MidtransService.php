<?php

namespace App\Services;

use App\Models\Order;
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Transaction;
use Illuminate\Support\Facades\Log;

class MidtransService
{
  public function __construct()
  {
    Config::$serverKey = config('midtrans.server_key');
    Config::$isProduction = config('midtrans.is_production', false);
    Config::$isSanitized = config('midtrans.is_sanitized', true);
    Config::$is3ds = config('midtrans.is_3ds', true);
  }

  public function createSnapToken(Order $order): ?string
  {
    try {
      $totalAmount = $order->total_amount + $order->platform_fee;

      $params = [
        'transaction_details' => [
          'order_id' => $order->order_number,
          'gross_amount' => (int) $totalAmount,
        ],
        'customer_details' => [
          'first_name' => $order->customer_name,
          'email' => $order->customer_email,
          'phone' => $order->customer_phone,
        ],
        'item_details' => $this->buildItemDetails($order),
        'callbacks' => [
          'finish' => url("/customer/orders/{$order->id}/payment/success"),
          'unfinish' => url("/customer/orders/{$order->id}/payment/pending"),
          'error' => url("/customer/orders/{$order->id}/payment/failed"),
        ]
      ];

      Log::info('Creating Midtrans snap token', [
        'order_number' => $order->order_number,
        'amount' => $totalAmount,
        'params' => $params
      ]);

      $snapToken = Snap::getSnapToken($params);

      Log::info('Snap token created successfully', [
        'order_number' => $order->order_number,
        'snap_token' => substr($snapToken, 0, 20) . '...'
      ]);

      return $snapToken;
    } catch (\Exception $e) {
      Log::error('Failed to create snap token: ' . $e->getMessage(), [
        'order_number' => $order->order_number,
        'error' => $e->getTraceAsString()
      ]);
      return null;
    }
  }

  public function getTransactionStatus(string $orderId)
  {
    try {
      Log::info('Checking transaction status from Midtrans', ['order_id' => $orderId]);

      $status = Transaction::status($orderId);

      Log::info('Transaction status response from Midtrans', [
        'order_id' => $orderId,
        'status' => $status
      ]);

      return $status;
    } catch (\Exception $e) {
      Log::error('Failed to get transaction status: ' . $e->getMessage(), [
        'order_id' => $orderId,
        'error' => $e->getTraceAsString()
      ]);
      throw $e;
    }
  }

  private function buildItemDetails(Order $order): array
  {
    $items = [];

    foreach ($order->items as $item) {
      $items[] = [
        'id' => $item->ticket_id,
        'price' => (int) $item->price,
        'quantity' => $item->quantity,
        'name' => $item->ticket->title,
        'category' => 'Tiket Wisata',
      ];
    }

    // Add platform fee as separate item
    if ($order->platform_fee > 0) {
      $items[] = [
        'id' => 'platform_fee',
        'price' => (int) $order->platform_fee,
        'quantity' => 1,
        'name' => 'Biaya Platform',
        'category' => 'Fee',
      ];
    }

    return $items;
  }
}
