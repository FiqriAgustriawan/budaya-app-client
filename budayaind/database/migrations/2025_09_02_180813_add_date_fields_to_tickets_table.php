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
            // Add date and time fields
            if (!Schema::hasColumn('tickets', 'start_date')) {
                $table->date('start_date')->after('category');
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
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn(['start_date', 'end_date', 'start_time', 'end_time', 'duration_hours']);
        });
    }
};
