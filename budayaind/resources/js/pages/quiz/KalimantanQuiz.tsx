import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { QuizGame } from '@/components/quiz/QuizGame';
import { kalimantanQuiz } from '@/data/quiz/kalimantan';
import { ArrowLeft, Play, Trophy, Target, CheckCircle, XCircle, RotateCcw, Home, Clock, Trees, Leaf, Mountain, Compass } from 'lucide-react';
import { QuizAnswer } from '@/types/quiz';

interface QuizResults {
    answers: QuizAnswer[];
    score: number;
}

export default function KalimantanQuiz() {
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
            config={kalimantanQuiz}
            onExit={() => setShowGame(false)}
            onComplete={handleQuizComplete}
        />;
    }

    // Quiz Results Screen
    if (quizResults) {
        const totalQuestions = kalimantanQuiz.questions.length;
        const correctAnswers = quizResults.answers.filter(answer => answer.isCorrect).length;
        const wrongAnswers = totalQuestions - correctAnswers;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        const isPassed = percentage >= 70;

        return (
            <>
                <Head title="Hasil Quiz Budaya Pulau Kalimantan" />

                {/* Results Background */}
                <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-amber-700">

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(34,197,94,0.4)_0%,_transparent_30%)] bg-[length:70px_70px]"></div>
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
                                        ? 'Anda berhasil menguasai budaya Pulau Kalimantan!'
                                        : 'Terus belajar tentang budaya Pulau Kalimantan!'}
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
                                    className="flex items-center justify-center space-x-2 bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-xl px-6 py-3 text-white hover:bg-green-500/30 transition-all duration-300"
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
                                        Pelajari lebih dalam tentang budaya Dayak, rumah Betang, tarian tradisional,
                                        hutan hujan tropis Borneo, dan kearifan lokal masyarakat Kalimantan sebelum mencoba lagi.
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
            <Head title="Quiz Budaya Kalimantan - Hutan Belantara Borneo" />

            {/* Forest Gradient Background */}
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-amber-700">

                {/* Forest Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(34,197,94,0.4)_0%,_transparent_30%)] bg-[length:70px_70px]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_rgba(251,191,36,0.4)_0%,_transparent_30%)] bg-[length:90px_90px]"></div>
                </div>

                {/* Forest Geometric Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-24 left-24 w-40 h-40 border border-green-400/20 rounded-full animate-pulse" style={{ animationDuration: '5s' }}></div>
                    <div className="absolute top-16 right-28 w-32 h-32 border border-amber-300/20 rotate-45 animate-bounce" style={{ animationDuration: '4.5s' }}></div>
                    <div className="absolute bottom-20 left-32 w-48 h-48 border border-emerald-300/20 rotate-12 animate-spin" style={{ animationDuration: '35s' }}></div>
                    <div className="absolute bottom-24 right-24 w-36 h-36 border border-green-400/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '2.5s' }}></div>
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
                            <div className="flex items-center justify-center space-x-3 mb-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                                    <Trees size={18} className="text-white" />
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-white">Kalimantan</h1>
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                                    <Leaf size={18} className="text-white" />
                                </div>
                            </div>
                            <p className="text-green-200 text-sm lg:text-base">Hutan Belantara & Budaya Dayak</p>
                        </div>

                        <div className="w-24"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 px-6 lg:px-8 pb-12">
                    <div className="max-w-6xl mx-auto">

                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 via-emerald-500 to-amber-500 rounded-2xl shadow-2xl shadow-green-500/25 mb-6">
                                <Trees size={36} className="text-white" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                {kalimantanQuiz.name}
                            </h2>
                            <p className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
                                {kalimantanQuiz.description}
                            </p>
                        </div>

                        {/* Main Card */}
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">

                            {/* Header Strip */}
                            <div className="bg-gradient-to-r from-green-600 to-amber-600 p-6">
                                <div className="flex items-center justify-center space-x-3">
                                    <Leaf className="text-white" size={24} />
                                    <h3 className="text-2xl font-bold text-white">Tentang Kalimantan</h3>
                                    <Mountain className="text-white" size={24} />
                                </div>
                            </div>

                            <div className="p-8 lg:p-12">
                                {/* Description */}
                                <div className="prose prose-lg max-w-none text-gray-700 mb-10 leading-relaxed text-center">
                                    <p>
                                        Kalimantan adalah pulau terbesar ketiga di dunia yang menyimpan hutan hujan tropis
                                        terluas di Asia Tenggara. Rumah bagi suku Dayak dengan tradisi Mandau dan rumah
                                        Betang, dari sungai Mahakam hingga budaya tambang yang kaya, Kalimantan menawarkan
                                        kearifan hutan yang tak tergantikan.
                                    </p>
                                </div>

                                {/* Quiz Statistics */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Clock size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-green-800 mb-1">{kalimantanQuiz.timeLimit}</div>
                                        <div className="text-sm font-medium text-green-600">Menit</div>
                                    </div>

                                    <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Trees size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-emerald-800 mb-1">{kalimantanQuiz.questions.length}</div>
                                        <div className="text-sm font-medium text-emerald-600">Pertanyaan</div>
                                    </div>

                                    <div className="group bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Trophy size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-amber-800 mb-1">{kalimantanQuiz.passingScore}%</div>
                                        <div className="text-sm font-medium text-amber-600">Nilai Lulus</div>
                                    </div>
                                </div>

                                {/* Cultural Highlights */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                                <Trees size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-green-800">Hutan Hujan Tropis</h4>
                                        </div>
                                        <p className="text-sm text-green-700 leading-relaxed">
                                            Biodiversitas tinggi, orangutan, dan paru-paru dunia yang vital
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                                                <Compass size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-amber-800">Budaya Dayak</h4>
                                        </div>
                                        <p className="text-sm text-amber-700 leading-relaxed">
                                            Rumah Betang, Mandau, tari Kancet, dan tradisi berburu kepala
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mr-3">
                                                <Mountain size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-emerald-800">Sungai & Transportasi</h4>
                                        </div>
                                        <p className="text-sm text-emerald-700 leading-relaxed">
                                            Sungai Mahakam, Kapuas, transportasi perahu tradisional
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center mr-3">
                                                <Leaf size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-yellow-800">Kekayaan Alam</h4>
                                        </div>
                                        <p className="text-sm text-yellow-700 leading-relaxed">
                                            Tambang batubara, minyak bumi, emas, dan hasil hutan berlimpah
                                        </p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="text-center">
                                    <button
                                        onClick={() => setShowGame(true)}
                                        className="group inline-flex items-center space-x-4 bg-gradient-to-r from-green-600 via-emerald-700 to-amber-600 hover:from-green-700 hover:via-emerald-800 hover:to-amber-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transform hover:scale-105 transition-all duration-300"
                                    >
                                        <Play size={24} className="group-hover:scale-110 transition-transform" />
                                        <span>Mulai Quiz Kalimantan</span>
                                        <Trees size={24} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                    <p className="text-gray-500 text-sm mt-4 font-medium">
                                        Jelajahi kearifan hutan Borneo
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
