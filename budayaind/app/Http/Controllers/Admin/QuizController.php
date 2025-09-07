<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\QuizQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class QuizController extends Controller
{
    /**
     * Display a listing of quiz questions.
     */
    public function index(Request $request)
    {
        // Get distinct islands for filter dropdown and tabs
        $islands = QuizQuestion::distinct()
            ->pluck('island')
            ->sort()
            ->values();

        // Get current tab/island filter
        $selectedIsland = $request->get('island', $islands->first());

        $query = QuizQuestion::query();

        // Filter by selected island
        if ($selectedIsland && $selectedIsland !== 'all') {
            $query->where('island', $selectedIsland);
        }

        // Search by question text
        if ($request->has('search') && $request->search !== '') {
            $query->where('question', 'like', '%' . $request->search . '%');
        }

        $quizQuestions = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Transform data to match frontend expectations
        $quizQuestions->getCollection()->transform(function ($question) {
            return [
                'id' => $question->id,
                'question' => $question->question,
                'option_a' => $question->options[0] ?? '',
                'option_b' => $question->options[1] ?? '',
                'option_c' => $question->options[2] ?? '',
                'option_d' => $question->options[3] ?? '',
                'correct_answer' => ['A', 'B', 'C', 'D'][$question->correct_answer] ?? 'A',
                'island' => $question->island,
                'created_at' => $question->created_at,
                'updated_at' => $question->updated_at,
            ];
        });

        // Get questions grouped by island for statistics
        $questionsByIsland = QuizQuestion::selectRaw('island, COUNT(*) as count')
            ->groupBy('island')
            ->pluck('count', 'island')
            ->toArray();

        return Inertia::render('Admin/Quiz/Index', [
            'quizQuestions' => $quizQuestions,
            'islands' => $islands,
            'questionsByIsland' => $questionsByIsland,
            'selectedIsland' => $selectedIsland,
            'filters' => [
                'search' => $request->search,
                'island' => $selectedIsland,
            ],
        ]);
    }

    /**
     * Store a newly created quiz question.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:1000',
            'option_a' => 'required|string|max:255',
            'option_b' => 'required|string|max:255',
            'option_c' => 'required|string|max:255',
            'option_d' => 'required|string|max:255',
            'correct_answer' => ['required', Rule::in(['A', 'B', 'C', 'D'])],
            'island' => 'required|string|max:100',
        ]);

        // Convert form data to database format
        $options = [
            $validated['option_a'],
            $validated['option_b'],
            $validated['option_c'],
            $validated['option_d']
        ];

        // Convert letter answer to index (A=0, B=1, C=2, D=3)
        $correctAnswerIndex = array_search($validated['correct_answer'], ['A', 'B', 'C', 'D']);

        // Generate unique question_id
        $questionId = strtolower($validated['island']) . '_' . time() . '_' . rand(1000, 9999);

        // Create quiz question with proper database format
        QuizQuestion::create([
            'question_id' => $questionId,
            'island' => strtolower($validated['island']),
            'question' => $validated['question'],
            'options' => $options,
            'correct_answer' => $correctAnswerIndex,
            'explanation' => 'Penjelasan akan ditambahkan nanti',
            'difficulty' => 'mudah',
            'category' => 'Umum',
            'hint' => 'Baca dengan teliti setiap opsi jawaban',
            'points' => 10,
            'time_limit' => 30
        ]);

        return redirect()->back()->with('success', 'Soal quiz berhasil ditambahkan!');
    }

    /**
     * Display the specified quiz question.
     */
    public function show(QuizQuestion $quizQuestion)
    {
        return Inertia::render('Admin/Quiz/Show', [
            'quizQuestion' => $quizQuestion,
        ]);
    }

    /**
     * Show the form for editing the specified quiz question.
     */
    public function edit(QuizQuestion $quizQuestion)
    {
        return Inertia::render('Admin/Quiz/Edit', [
            'quizQuestion' => $quizQuestion,
        ]);
    }

    /**
     * Update the specified quiz question.
     */
    public function update(Request $request, QuizQuestion $quizQuestion)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:1000',
            'option_a' => 'required|string|max:255',
            'option_b' => 'required|string|max:255',
            'option_c' => 'required|string|max:255',
            'option_d' => 'required|string|max:255',
            'correct_answer' => ['required', Rule::in(['A', 'B', 'C', 'D'])],
            'island' => 'required|string|max:100',
        ]);

        // Convert form data to database format
        $options = [
            $validated['option_a'],
            $validated['option_b'],
            $validated['option_c'],
            $validated['option_d']
        ];

        // Convert letter answer to index (A=0, B=1, C=2, D=3)
        $correctAnswerIndex = array_search($validated['correct_answer'], ['A', 'B', 'C', 'D']);

        // Update quiz question with proper database format
        $quizQuestion->update([
            'island' => strtolower($validated['island']),
            'question' => $validated['question'],
            'options' => $options,
            'correct_answer' => $correctAnswerIndex,
        ]);

        return redirect()->back()->with('success', 'Soal quiz berhasil diperbarui!');
    }

    /**
     * Remove the specified quiz question.
     */
    public function destroy(QuizQuestion $quizQuestion)
    {
        $quizQuestion->delete();

        return redirect()->back()->with('success', 'Soal quiz berhasil dihapus!');
    }
}
