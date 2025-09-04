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
            // Add access_features field if it doesn't exist
            if (!Schema::hasColumn('tickets', 'access_features')) {
                $table->json('access_features')->nullable()->after('category');
            }

            // Add date and time fields if they don't exist
            if (!Schema::hasColumn('tickets', 'start_date')) {
                $table->date('start_date')->after('access_features');
            }

            if (!Schema::hasColumn('tickets', 'end_date')) {
                $table->date('end_date')->nullable()->after('start_date');
            }

            if (!Schema::hasColumn('tickets', 'start_time')) {
                $table->time('start_time')->nullable()->after('end_date');
            }

            if (!Schema::hasColumn('tickets', 'end_time')) {
                $table->time('end_time')->nullable()->after('start_time');
            }

            if (!Schema::hasColumn('tickets', 'duration_hours')) {
                $table->integer('duration_hours')->default(4)->after('end_time');
            }

            // Add quantity and status fields if they don't exist
            if (!Schema::hasColumn('tickets', 'available_quantity')) {
                $table->integer('available_quantity')->default(100)->after('duration_hours');
            }

            if (!Schema::hasColumn('tickets', 'sold_quantity')) {
                $table->integer('sold_quantity')->default(0)->after('available_quantity');
            }

            if (!Schema::hasColumn('tickets', 'status')) {
                $table->enum('status', ['active', 'inactive', 'sold_out'])->default('active')->after('sold_quantity');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn([
                'access_features',
                'start_date',
                'end_date',
                'start_time',
                'end_time',
                'duration_hours',
                'available_quantity',
                'sold_quantity',
                'status'
            ]);
        });
    }
};
