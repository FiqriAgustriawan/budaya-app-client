<?php

namespace App\Http\Controllers;

use App\Models\QuizQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    /**
     * Display the main quiz page.
     */
    public function index()
    {
        // Get quiz statistics for each island
        $islands = ['sumatera', 'jawa', 'kalimantan', 'sulawesi', 'papua', 'indonesia'];
        $quizStats = [];

        foreach ($islands as $island) {
            $totalQuestions = QuizQuestion::where('island', $island)->count();
            $categories = QuizQuestion::where('island', $island)
                ->distinct()
                ->pluck('category')
                ->filter()
                ->toArray();

            $quizStats[$island] = [
                'totalQuestions' => $totalQuestions,
                'categories' => $categories ?: ['umum']
            ];
        }

        return Inertia::render('quiz', [
            'quizStats' => $quizStats,
            'islands' => [
                'sumatera' => 'Sumatera',
                'jawa' => 'Jawa',
                'kalimantan' => 'Kalimantan',
                'sulawesi' => 'Sulawesi',
                'papua' => 'Papua',
                'indonesia' => 'Indonesia Umum'
            ]
        ]);
    }

    /**
     * Get quiz questions for a specific island.
     */
    public function getQuestions(Request $request, $island)
    {
        $limit = $request->get('limit', 10);
        $difficulty = $request->get('difficulty', null);
        $category = $request->get('category', null);

        $query = QuizQuestion::where('island', $island);

        if ($difficulty) {
            $query->where('difficulty', $difficulty);
        }

        if ($category) {
            $query->where('category', $category);
        }

        $questions = $query->inRandomOrder()->limit($limit)->get();

        // Transform questions to match frontend format
        $transformedQuestions = $questions->map(function ($question) {
            return [
                'id' => (string) $question->question_id,
                'question' => $question->question,
                'options' => is_string($question->options) ? json_decode($question->options, true) : $question->options,
                'correctAnswer' => (int) $question->correct_answer,
                'explanation' => $question->explanation ?? 'Penjelasan akan segera ditambahkan.',
                'difficulty' => $question->difficulty ?? 'mudah',
                'category' => $question->category ?? 'umum',
                'hint' => $question->hint ?? 'Baca dengan teliti setiap opsi jawaban.',
                'points' => (int) ($question->points ?? 10),
                'timeLimit' => (int) ($question->time_limit ?? 30)
            ];
        });

        return response()->json([
            'success' => true,
            'questions' => $transformedQuestions,
            'total' => $transformedQuestions->count()
        ]);
    }

    /**
     * Get categories for a specific island.
     */
    public function getCategories($island)
    {
        $categories = QuizQuestion::where('island', $island)
            ->distinct()
            ->pluck('category')
            ->filter()
            ->values();

        return response()->json([
            'success' => true,
            'categories' => $categories
        ]);
    }

    /**
     * Display quiz play page for specific island.
     */
    public function playQuiz($island)
    {
        // Get questions for the island
        $questions = QuizQuestion::where('island', $island)
            ->inRandomOrder()
            ->limit(10)
            ->get()
            ->map(function ($question) {
                return [
                    'id' => $question->question_id,
                    'question' => $question->question,
                    'options' => $question->options,
                    'correctAnswer' => $question->correct_answer,
                    'explanation' => $question->explanation,
                    'difficulty' => $question->difficulty,
                    'category' => $question->category,
                    'hint' => $question->hint,
                    'points' => $question->points,
                    'timeLimit' => $question->time_limit
                ];
            });

        // Get island name
        $islandNames = [
            'sumatera' => 'Sumatera',
            'jawa' => 'Jawa',
            'kalimantan' => 'Kalimantan',
            'sulawesi' => 'Sulawesi',
            'papua' => 'Papua',
            'indonesia' => 'Indonesia Umum'
        ];

        return Inertia::render('quiz-play', [
            'island' => $island,
            'islandName' => $islandNames[$island] ?? ucfirst($island),
            'questions' => $questions,
            'totalQuestions' => $questions->count()
        ]);
    }
}
