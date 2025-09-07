<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update table structure to use DECIMAL for coordinates
        Schema::table('cultural_sites', function (Blueprint $table) {
            $table->decimal('latitude', 10, 8)->change();
            $table->decimal('longitude', 11, 8)->change();
        });

        // Convert any string coordinates to proper decimal
        DB::statement("UPDATE cultural_sites SET latitude = CAST(latitude AS DECIMAL(10,8)) WHERE latitude IS NOT NULL");
        DB::statement("UPDATE cultural_sites SET longitude = CAST(longitude AS DECIMAL(11,8)) WHERE longitude IS NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cultural_sites', function (Blueprint $table) {
            $table->string('latitude')->change();
            $table->string('longitude')->change();
        });
    }
};
