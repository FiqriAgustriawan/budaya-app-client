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
        Schema::table('tickets', function (Blueprint $table) {
            // Add missing fields with default values
            if (!Schema::hasColumn('tickets', 'available_quantity')) {
                $table->integer('available_quantity')->default(100)->after('price');
            }
            if (!Schema::hasColumn('tickets', 'sold_quantity')) {
                $table->integer('sold_quantity')->default(0)->after('available_quantity');
            }
            if (!Schema::hasColumn('tickets', 'status')) {
                $table->enum('status', ['active', 'inactive', 'sold_out'])->default('active')->after('image');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn(['available_quantity', 'sold_quantity', 'status']);
        });
    }
};
