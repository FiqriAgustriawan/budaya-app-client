import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { QuizGame } from '@/components/quiz/QuizGame';
import { baliQuiz } from '@/data/quiz/bali';
import { QuizAnswer } from '@/types/quiz';
import { ArrowLeft, Flower, Waves, Sun, Play, Trophy, Clock, Sparkles, Mountain } from 'lucide-react';

function BaliQuizContent() {
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'completed'>('intro');
    const [finalResults, setFinalResults] = useState<{ answers: QuizAnswer[]; score: number } | null>(null);

    const handleQuizComplete = (answers: QuizAnswer[], score: number) => {
        setFinalResults({ answers, score });
        setGameState('completed');
    };

    const handleExit = () => {
        router.visit(route('quiz'));
    };

    const handleStartQuiz = () => {
        setGameState('playing');
    };

    if (gameState === 'playing') {
        return (
            <QuizGame
                config={baliQuiz}
                onComplete={handleQuizComplete}
                onExit={handleExit}
            />
        );
    }

    if (gameState === 'completed' && finalResults) {
        const correctAnswers = finalResults.answers.filter(a => a.isCorrect).length;
        const accuracy = Math.round((correctAnswers / baliQuiz.questions.length) * 100);
        const passed = accuracy >= baliQuiz.passingScore;

        return (
            <>
                <Head title="Hasil Quiz Bali - BudayaInd" />
                <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-green-700">

                    {/* Tropical Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(16,185,129,0.4)_0%,_transparent_25%)] bg-[length:80px_80px]"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_rgba(59,130,246,0.4)_0%,_transparent_25%)] bg-[length:100px_100px]"></div>
                    </div>

                    <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
                        <div className="max-w-2xl w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
                            {/* Results Header */}
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    {passed ? (
                                        <Trophy className="w-10 h-10 text-white" />
                                    ) : (
                                        <Flower className="w-10 h-10 text-white" />
                                    )}
                                </div>

                                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                    {passed ? 'Selamat! Taksu Anda Memancar!' : 'Tetap Semangat!'}
                                </h1>

                                <div className="text-6xl font-bold mb-2">
                                    <span className={passed ? 'text-emerald-600' : 'text-orange-600'}>
                                        {accuracy}%
                                    </span>
                                </div>

                                <p className="text-gray-600 mb-6">
                                    {correctAnswers} dari {baliQuiz.questions.length} jawaban benar
                                </p>

                                {passed && (
                                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
                                        <p className="text-emerald-700 font-medium flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 mr-2" />
                                            Taksu Anda memancar!
                                        </p>
                                        <p className="text-emerald-600 text-sm">Satu langkah menuju pencerahan spiritual dan budaya Hindu-Bali.</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200 mb-8">
                                <h4 className="font-bold text-emerald-800 mb-2 flex items-center">
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Wisdom Bali:
                                </h4>
                                <p className="text-emerald-700 text-sm">
                                    "Taksu" dalam budaya Bali berarti kekuatan spiritual yang membuat seseorang tampil
                                    luar biasa dalam seni atau kehidupan. Setiap penari Bali harus memiliki taksu!
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setGameState('intro')}
                                    className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-xl font-medium hover:from-emerald-500 hover:to-teal-600 transition-all duration-300"
                                >
                                    Main Lagi
                                </button>
                                <button
                                    onClick={handleExit}
                                    className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
                                >
                                    Kembali ke Menu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Quiz Budaya Bali - Pulau Dewata" />

            {/* Tropical Gradient Background */}
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-green-700">

                {/* Tropical Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(16,185,129,0.4)_0%,_transparent_25%)] bg-[length:70px_70px]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_rgba(6,182,212,0.4)_0%,_transparent_25%)] bg-[length:90px_90px]"></div>
                </div>

                {/* Tropical Geometric Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-24 left-24 w-32 h-32 border border-emerald-400/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
                    <div className="absolute top-32 right-32 w-24 h-24 border border-teal-300/20 rotate-45 animate-bounce" style={{ animationDuration: '3.5s' }}></div>
                    <div className="absolute bottom-32 left-28 w-40 h-40 border border-green-300/20 rotate-12 animate-spin" style={{ animationDuration: '30s' }}></div>
                    <div className="absolute bottom-24 right-24 w-28 h-28 border border-emerald-400/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                {/* Navigation & Header */}
                <div className="relative z-10">
                    <div className="flex items-center justify-between p-6 lg:p-8">
                        <button
                            onClick={handleExit}
                            className="flex items-center space-x-3 bg-black/20 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-black/30 transition-all duration-300 group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Kembali</span>
                        </button>

                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-3 mb-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                                    <Flower size={18} className="text-white" />
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-white">Bali</h1>
                                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
                                    <Sun size={18} className="text-white" />
                                </div>
                            </div>
                            <p className="text-emerald-200 text-sm lg:text-base">Pulau Dewata & Budaya Hindu</p>
                        </div>

                        <div className="w-24"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 px-6 lg:px-8 pb-12">
                    <div className="max-w-6xl mx-auto">

                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 via-teal-500 to-green-500 rounded-2xl shadow-2xl shadow-emerald-500/25 mb-6">
                                <Flower size={36} className="text-white" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                {baliQuiz.name}
                            </h2>
                            <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
                                {baliQuiz.description}
                            </p>
                        </div>

                        {/* Main Card */}
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">

                            {/* Header Strip */}
                            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
                                <div className="flex items-center justify-center space-x-3">
                                    <Waves className="text-white" size={24} />
                                    <h3 className="text-2xl font-bold text-white">Tentang Bali</h3>
                                    <Mountain className="text-white" size={24} />
                                </div>
                            </div>

                            <div className="p-8 lg:p-12">
                                {/* Description */}
                                <div className="prose prose-lg max-w-none text-gray-700 mb-10 leading-relaxed text-center">
                                    <p>
                                        Bali adalah pulau dewata yang menyimpan keindahan budaya Hindu yang unik dan mempesona.
                                        Dari tari Kecak yang sakral hingga filosofi Tri Hita Karana, dari Pura Besakih hingga
                                        sistem Subak yang harmonis, Bali menawarkan kearifan spiritual yang mendalam dan
                                        tradisi seni yang tak tergantikan.
                                    </p>
                                </div>

                                {/* Quiz Statistics */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Clock size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-emerald-800 mb-1">{baliQuiz.timeLimit}</div>
                                        <div className="text-sm font-medium text-emerald-600">Menit</div>
                                    </div>

                                    <div className="group bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Flower size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-teal-800 mb-1">{baliQuiz.questions.length}</div>
                                        <div className="text-sm font-medium text-teal-600">Pertanyaan</div>
                                    </div>

                                    <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Trophy size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-green-800 mb-1">{baliQuiz.passingScore}%</div>
                                        <div className="text-sm font-medium text-green-600">Nilai Lulus</div>
                                    </div>
                                </div>

                                {/* Cultural Highlights */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                                                <Flower size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-emerald-800">Seni Tari Sakral</h4>
                                        </div>
                                        <p className="text-sm text-emerald-700 leading-relaxed">
                                            Barong, Kecak, Legong, dan tari-tarian yang sarat filosofi Hindu
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 border border-teal-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center mr-3">
                                                <Mountain size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-teal-800">Arsitektur Pura</h4>
                                        </div>
                                        <p className="text-sm text-teal-700 leading-relaxed">
                                            Pura Besakih, Tanah Lot, dan simbolisme arsitektur Hindu-Bali
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                                <Sun size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-green-800">Filosofi Tri Hita Karana</h4>
                                        </div>
                                        <p className="text-sm text-green-700 leading-relaxed">
                                            Keseimbangan hubungan manusia dengan Tuhan, sesama, dan alam
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                                                <Waves size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-cyan-800">Sistem Subak</h4>
                                        </div>
                                        <p className="text-sm text-cyan-700 leading-relaxed">
                                            Irigasi tradisional warisan UNESCO yang harmonis dengan alam
                                        </p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="text-center">
                                    <button
                                        onClick={handleStartQuiz}
                                        className="group inline-flex items-center space-x-4 bg-gradient-to-r from-emerald-600 via-teal-700 to-green-600 hover:from-emerald-700 hover:via-teal-800 hover:to-green-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:scale-105 transition-all duration-300"
                                    >
                                        <Play size={24} className="group-hover:scale-110 transition-transform" />
                                        <span>Mulai Perjalanan Spiritual</span>
                                        <Flower size={24} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                    <p className="text-gray-500 text-sm mt-4 font-medium">
                                        Om Swastiastu - Mari jelajahi keindahan Pulau Dewata!
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

export default function BaliQuiz() {
    return <BaliQuizContent />;
}
