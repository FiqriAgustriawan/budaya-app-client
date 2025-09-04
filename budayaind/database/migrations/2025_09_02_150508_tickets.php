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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('destination');
            $table->decimal('price', 12, 2);
            $table->integer('available_quantity');
            $table->integer('sold_quantity')->default(0);
            $table->date('start_date');
            $table->date('end_date');
            $table->json('access_features'); // Array of features
            $table->enum('category', ['basic', 'premium', 'vip']);
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['destination', 'category']);
            $table->index(['is_active', 'end_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
