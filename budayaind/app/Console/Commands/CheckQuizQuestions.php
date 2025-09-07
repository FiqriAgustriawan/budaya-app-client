<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\QuizQuestion;

class CheckQuizQuestions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'quiz:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check quiz questions in database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $total = QuizQuestion::count();
        $this->info("Total quiz questions: {$total}");

        $islands = ['indonesia', 'jawa', 'kalimantan', 'sulawesi', 'papua', 'sumatera'];

        $this->info("\nQuestions per island:");
        foreach ($islands as $island) {
            $count = QuizQuestion::where('island', $island)->count();
            $this->info("- {$island}: {$count} questions");
        }

        $this->info("\nSample questions:");
        $sampleQuestions = QuizQuestion::limit(3)->get();
        foreach ($sampleQuestions as $question) {
            $this->info("- [{$question->island}] {$question->question}");
        }

        return 0;
    }
}
