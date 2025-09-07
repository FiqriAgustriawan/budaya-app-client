import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Play, Trophy, Target, CheckCircle, XCircle, RotateCcw, Home, Loader } from 'lucide-react';
import { useState } from 'react';
import { QuizGame } from '@/components/quiz/QuizGame';
import { useQuizData } from '@/hooks/useQuizData';
import { QuizAnswer } from '@/types/quiz';

interface QuizResults {
    answers: QuizAnswer[];
    score: number;
}

export default function JavaQuiz() {
    const { quizConfig, loading, error, refetch, refreshQuestions } = useQuizData('jawa', 5);
    const [showGame, setShowGame] = useState(false);
    const [quizResults, setQuizResults] = useState<QuizResults | null>(null);

    const handleStartQuiz = () => {
        setShowGame(true);
        setQuizResults(null);
    };

    const handleRestartQuiz = () => {
        setShowGame(false);
        setQuizResults(null);
        refetch(); // Refresh data saat restart
    };

    const handleQuizComplete = (answers: QuizAnswer[]) => {
        const score = Math.round((answers.filter(answer => answer.isCorrect).length / answers.length) * 100);
        setQuizResults({ answers, score });
        setShowGame(false);
    };

    const handleBackToMenu = () => {
        setShowGame(false);
        setQuizResults(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-600" />
                    <p className="text-gray-600">Memuat soal quiz...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md mx-4">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Gagal Memuat Quiz</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => refetch()}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                        Coba Lagi
                    </button>
                    <div className="mt-4">
                        <Link
                            href="/public-quiz"
                            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Menu Quiz
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!quizConfig) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Quiz tidak tersedia</p>
                </div>
            </div>
        );
    }

    if (showGame) {
        return (
            <QuizGame
                quizConfig={quizConfig}
                onComplete={handleQuizComplete}
                onBack={handleBackToMenu}
            />
        );
    }

    if (quizResults) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
                <Head title="Hasil Quiz Budaya Pulau Jawa" />
                <div className="max-w-4xl mx-auto pt-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 text-white text-center">
                            <Trophy className="w-16 h-16 mx-auto mb-4" />
                            <h1 className="text-3xl font-bold mb-2">Quiz Selesai!</h1>
                            <p className="text-orange-100">Budaya Pulau Jawa</p>
                        </div>

                        <div className="p-8">
                            <div className="text-center mb-8">
                                <Link href="/public-quiz"
                                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mb-6"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Kembali ke Menu Quiz
                                </Link>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
                                    <div className="text-4xl font-bold text-green-600 mb-2">{quizResults.score}%</div>
                                    <div className="text-green-700 font-semibold">Skor Anda</div>
                                </div>
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
                                    <div className="text-4xl font-bold text-blue-600 mb-2">
                                        {quizResults.answers.filter(answer => answer.isCorrect).length}/{quizResults.answers.length}
                                    </div>
                                    <div className="text-blue-700 font-semibold">Jawaban Benar</div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Detail Jawaban:</h3>
                                <div className="space-y-4">
                                    {quizResults.answers.map((answer, index) => (
                                        <div key={index} className="border rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                {answer.isCorrect ? (
                                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                                ) : (
                                                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                                )}
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-800 mb-2">
                                                        {index + 1}. {answer.question}
                                                    </p>
                                                    <div className="space-y-1">
                                                        <p className="text-sm">
                                                            <span className="font-medium text-gray-600">Jawaban Anda: </span>
                                                            <span className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                                                                {answer.selectedAnswer}
                                                            </span>
                                                        </p>
                                                        {!answer.isCorrect && (
                                                            <p className="text-sm">
                                                                <span className="font-medium text-gray-600">Jawaban Benar: </span>
                                                                <span className="text-green-600">{answer.correctAnswer}</span>
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={handleRestartQuiz}
                                    className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    Ulangi Quiz
                                </button>
                                <Link
                                    href="/public-quiz"
                                    className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    <Home className="w-5 h-5" />
                                    Menu Utama
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
            <Head title="Quiz Budaya Pulau Jawa - Pusat Peradaban Nusantara" />
            <div className="max-w-4xl mx-auto p-4 pt-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative">
                        <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-8 text-white">
                            <div className="flex items-center mb-4">
                                <Link
                                    href="/public-quiz"
                                    className="text-orange-200 hover:text-white transition-colors mr-4"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </Link>
                                <h1 className="text-3xl font-bold">Quiz Budaya Pulau Jawa</h1>
                            </div>
                            <p className="text-orange-100 text-lg">
                                Pusat Peradaban Nusantara
                            </p>
                        </div>
                        <div className="absolute -bottom-4 left-8">
                            <div className="bg-white p-3 rounded-full shadow-lg">
                                <Target className="w-8 h-8 text-orange-600" />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 pt-12">
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Tentang Quiz Ini</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Target className="w-5 h-5 text-orange-600" />
                                        <span className="text-gray-700">
                                            {quizConfig.questions.length} Soal Pilihan Ganda
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Trophy className="w-5 h-5 text-orange-600" />
                                        <span className="text-gray-700">Skor berdasarkan jawaban benar</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                                <h4 className="font-bold text-orange-800 mb-3">Yang akan Anda pelajari:</h4>
                                <ul className="space-y-2 text-orange-700">
                                    <li>• Kebudayaan tradisional Jawa</li>
                                    <li>• Seni dan arsitektur Jawa</li>
                                    <li>• Sistem kepercayaan dan filosofi</li>
                                    <li>• Kuliner khas Jawa</li>
                                    <li>• Tradisi dan upacara adat</li>
                                </ul>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="mb-6">
                                <Link href="/public-quiz"
                                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Kembali ke Menu Quiz
                                </Link>
                            </div>
                            <button
                                onClick={handleStartQuiz}
                                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto"
                            >
                                <Play className="w-6 h-6" />
                                Mulai Quiz Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
