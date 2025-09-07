<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'island',
        'question',
        'options',
        'correct_answer',
        'explanation',
        'difficulty',
        'category',
        'hint',
        'points',
        'time_limit'
    ];

    protected $casts = [
        'options' => 'array',
        'correct_answer' => 'integer',
        'points' => 'integer',
        'time_limit' => 'integer'
    ];

    /**
     * Scope to filter questions by island
     */
    public function scopeByIsland($query, $island)
    {
        return $query->where('island', $island);
    }

    /**
     * Scope to filter questions by difficulty
     */
    public function scopeByDifficulty($query, $difficulty)
    {
        return $query->where('difficulty', $difficulty);
    }

    /**
     * Scope to filter questions by category
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Get random questions for a quiz
     */
    public static function getRandomQuestions($island, $limit = 10)
    {
        return self::byIsland($island)->inRandomOrder()->limit($limit)->get();
    }

    /**
     * Get questions by difficulty level
     */
    public static function getQuestionsByDifficulty($island, $difficulty, $limit = 5)
    {
        return self::byIsland($island)->byDifficulty($difficulty)->inRandomOrder()->limit($limit)->get();
    }
}
