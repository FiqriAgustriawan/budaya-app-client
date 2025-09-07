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
        Schema::create('quiz_questions', function (Blueprint $table) {
            $table->id();
            $table->string('question_id')->unique();
            $table->string('island'); // sumatera, jawa, kalimantan, sulawesi, papua, indonesia
            $table->text('question');
            $table->json('options'); // Array of options
            $table->integer('correct_answer'); // Index of correct answer (0-3)
            $table->text('explanation')->nullable();
            $table->enum('difficulty', ['mudah', 'menengah', 'sulit']);
            $table->string('category');
            $table->text('hint')->nullable();
            $table->integer('points')->default(10);
            $table->integer('time_limit')->default(30); // in seconds
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_questions');
    }
};
