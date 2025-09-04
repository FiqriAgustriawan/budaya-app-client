<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seller_earnings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('ticket_id')->constrained()->onDelete('cascade');
            $table->decimal('total_amount', 12, 2); // Original order amount
            $table->decimal('platform_fee', 12, 2); // Platform commission
            $table->decimal('seller_amount', 12, 2); // Amount for seller
            $table->enum('status', ['pending', 'available', 'withdrawn'])->default('pending');
            $table->timestamp('available_at')->nullable(); // When funds become available for withdrawal
            $table->timestamps();

            $table->index(['seller_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seller_earnings');
    }
};
