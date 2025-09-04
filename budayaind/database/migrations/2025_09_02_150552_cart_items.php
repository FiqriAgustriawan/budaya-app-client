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
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->string('session_id'); // For guest users
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade'); // For logged in users
            $table->foreignId('ticket_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->timestamps();

            $table->index(['session_id', 'ticket_id']);
            $table->index(['user_id', 'ticket_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
