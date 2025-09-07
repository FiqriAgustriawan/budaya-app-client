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
        Schema::create('cultural_sites', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('province');
            $table->string('category');
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->text('description');
            $table->longText('content')->nullable(); // Artikel lengkap
            $table->string('image')->nullable();
            $table->json('photos')->nullable(); // Array foto tambahan
            $table->string('youtube_video')->nullable(); // Link YouTube
            $table->integer('articles_count')->default(0);
            $table->integer('photos_count')->default(0);
            $table->integer('videos_count')->default(0);
            $table->boolean('is_active')->default(true);
            $table->json('meta_data')->nullable(); // Data tambahan
            $table->timestamps();

            $table->index(['province', 'category']);
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cultural_sites');
    }
};
