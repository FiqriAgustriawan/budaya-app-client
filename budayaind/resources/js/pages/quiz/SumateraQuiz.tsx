import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Play, Trophy, Target, CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';
import { useState } from 'react';
import { QuizGame } from '@/components/quiz/QuizGame';
import { sumateraQuiz } from '@/data/quiz/sumatera';
import { QuizAnswer } from '@/types/quiz';

interface QuizResults {
    answers: QuizAnswer[];
    score: number;
}

export default function SumateraQuiz() {
    const [showGame, setShowGame] = useState(false);
    const [quizResults, setQuizResults] = useState<QuizResults | null>(null);

    const handleQuizComplete = (answers: QuizAnswer[], score: number) => {
        console.log('Quiz completed:', { answers, score });
        setQuizResults({ answers, score });
        setShowGame(false);
    };

    const restartQuiz = () => {
        setQuizResults(null);
        setShowGame(true);
    };

    if (showGame) {
        return <QuizGame
            config={sumateraQuiz}
            onExit={() => setShowGame(false)}
            onComplete={handleQuizComplete}
        />;
    }

    // Quiz Results Screen
    if (quizResults) {
        const totalQuestions = sumateraQuiz.questions.length;
        const correctAnswers = quizResults.answers.filter(answer => answer.isCorrect).length;
        const wrongAnswers = totalQuestions - correctAnswers;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        const isPassed = percentage >= 70;

        return (
            <>
                <Head title="Hasil Quiz Budaya Pulau Sumatera" />

                {/* Results Background */}
                <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-900 via-red-800 to-yellow-700">

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(249,115,22,0.4)_0%,_transparent_30%)] bg-[length:70px_70px]"></div>
                    </div>

                    {/* Navigation */}
                    <div className="relative z-10 p-6">
                        <Link href="/quiz"
                              className="flex items-center space-x-3 bg-black/20 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-black/30 transition-all duration-300 group w-fit">
                            <Home size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Kembali ke Quiz</span>
                        </Link>
                    </div>

                    {/* Results Content */}
                    <div className="relative z-10 px-6 pb-12">
                        <div className="max-w-4xl mx-auto text-center">

                            {/* Result Icon */}
                            <div className="mb-8">
                                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                                    isPassed
                                        ? 'bg-green-500/20 border border-green-400/30'
                                        : 'bg-red-500/20 border border-red-400/30'
                                }`}>
                                    {isPassed ? (
                                        <Trophy className="w-12 h-12 text-yellow-400" />
                                    ) : (
                                        <Target className="w-12 h-12 text-red-400" />
                                    )}
                                </div>
                                <h1 className="text-4xl font-bold text-white mb-2">
                                    {isPassed ? 'Selamat!' : 'Coba Lagi!'}
                                </h1>
                                <p className="text-xl text-white/80">
                                    {isPassed
                                        ? 'Anda berhasil menguasai budaya Pulau Sumatera!'
                                        : 'Terus belajar tentang budaya Pulau Sumatera!'}
                                </p>
                            </div>

                            {/* Score Display */}
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
                                <div className="text-6xl font-bold text-white mb-4">
                                    {percentage}%
                                </div>
                                <div className="text-xl text-white/80 mb-6">
                                    Skor Anda
                                </div>

                                {/* Detailed Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                                        <div className="text-2xl font-bold text-white mb-1">{totalQuestions}</div>
                                        <div className="text-sm text-white/70">Total Soal</div>
                                    </div>
                                    <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4">
                                        <div className="flex items-center justify-center mb-2">
                                            <CheckCircle className="w-6 h-6 text-green-400 mr-1" />
                                            <div className="text-2xl font-bold text-green-400">{correctAnswers}</div>
                                        </div>
                                        <div className="text-sm text-green-300">Benar</div>
                                    </div>
                                    <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4">
                                        <div className="flex items-center justify-center mb-2">
                                            <XCircle className="w-6 h-6 text-red-400 mr-1" />
                                            <div className="text-2xl font-bold text-red-400">{wrongAnswers}</div>
                                        </div>
                                        <div className="text-sm text-red-300">Salah</div>
                                    </div>
                                    <div className={`border rounded-xl p-4 ${
                                        isPassed
                                            ? 'bg-green-500/20 border-green-400/30'
                                            : 'bg-red-500/20 border-red-400/30'
                                    }`}>
                                        <div className={`text-2xl font-bold mb-1 ${
                                            isPassed ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                            {isPassed ? 'LULUS' : 'GAGAL'}
                                        </div>
                                        <div className={`text-sm ${
                                            isPassed ? 'text-green-300' : 'text-red-300'
                                        }`}>
                                            Min. 70%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={restartQuiz}
                                    className="flex items-center justify-center space-x-2 bg-orange-500/20 backdrop-blur-md border border-orange-400/30 rounded-xl px-6 py-3 text-white hover:bg-orange-500/30 transition-all duration-300"
                                >
                                    <RotateCcw size={20} />
                                    <span>Ulangi Quiz</span>
                                </button>
                                <Link
                                    href="/quiz"
                                    className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3 text-white hover:bg-white/20 transition-all duration-300"
                                >
                                    <Home size={20} />
                                    <span>Pilih Quiz Lain</span>
                                </Link>
                            </div>

                            {/* Learning Recommendation */}
                            {!isPassed && (
                                <div className="mt-8 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-blue-300 mb-2">
                                        💡 Tips untuk Skor Lebih Baik
                                    </h3>
                                    <p className="text-blue-200 text-sm">
                                        Pelajari lebih dalam tentang adat Minangkabau, budaya Batak, tarian tradisional,
                                        dan makanan khas dari berbagai daerah di Sumatera sebelum mencoba lagi.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Quiz Budaya Pulau Sumatera - Keragaman dari Aceh hingga Lampung" />

            {/* Sumatera Gradient Background */}
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-900 via-red-800 to-yellow-700">

                {/* Sumatera Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(249,115,22,0.4)_0%,_transparent_30%)] bg-[length:70px_70px]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_rgba(220,38,38,0.4)_0%,_transparent_30%)] bg-[length:90px_90px]"></div>
                </div>

                {/* Sumatera Geometric Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-24 left-24 w-40 h-40 border border-orange-400/20 rounded-full animate-pulse" style={{ animationDuration: '5s' }}></div>
                    <div className="absolute top-16 right-28 w-32 h-32 border border-red-300/20 rotate-45 animate-bounce" style={{ animationDuration: '4.5s' }}></div>
                    <div className="absolute bottom-20 left-32 w-48 h-48 border border-yellow-300/20 rotate-12 animate-spin" style={{ animationDuration: '35s' }}></div>
                    <div className="absolute bottom-24 right-24 w-36 h-36 border border-orange-400/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '2.5s' }}></div>
                </div>

                {/* Navigation & Header */}
                <div className="relative z-10">
                    <div className="flex items-center justify-between p-6 lg:p-8">
                        <Link href="/quiz"
                              className="flex items-center space-x-3 bg-black/20 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-black/30 transition-all duration-300 group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Kembali</span>
                        </Link>

                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">🏔️</span>
                                </div>
                                <span className="text-white font-semibold text-lg">Quiz Pulau Sumatera</span>
                            </div>
                        </div>

                        <div className="w-24"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 px-6 lg:px-8 pb-12">
                    <div className="max-w-6xl mx-auto">

                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                                <span className="text-4xl">🏔️</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                                Budaya
                                <br />
                                <span className="text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text">
                                    Pulau Sumatera
                                </span>
                            </h1>

                            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                                Jelajahi keragaman budaya dari Aceh hingga Lampung, dari Minangkabau hingga Batak
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-white/80">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-400">15</div>
                                    <div className="text-sm">Pertanyaan</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-400">20</div>
                                    <div className="text-sm">Menit</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-400">70%</div>
                                    <div className="text-sm">Nilai Lulus</div>
                                </div>
                            </div>
                        </div>

                        {/* Quiz Card */}
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                            <div className="p-8 lg:p-12">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                        Siap untuk Memulai?
                                    </h2>
                                    <p className="text-gray-600 max-w-2xl mx-auto">
                                        Uji pengetahuan Anda tentang budaya, sejarah, kuliner, dan tradisi dari berbagai suku di Pulau Sumatera
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900">Yang Akan Dipelajari:</h3>
                                        <ul className="space-y-2 text-gray-600">
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                                Budaya Minangkabau dan sistem matrilineal
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                                Tradisi Batak di sekitar Danau Toba
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                                Sejarah Islam Aceh dan kerajaan-kerajaannya
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                                Kuliner khas seperti Rendang dan Gudeg
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900">Format Quiz:</h3>
                                        <ul className="space-y-2 text-gray-600">
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                                15 pertanyaan pilihan ganda
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                                Waktu 20 menit
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                                Penjelasan detail setiap jawaban
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                                Tingkat kesulitan: Menengah
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button
                                        onClick={() => setShowGame(true)}
                                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    >
                                        <Play size={20} className="mr-2" />
                                        Mulai Quiz Sekarang
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
