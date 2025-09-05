import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { QuizGame } from '@/components/quiz/QuizGame';
import { sumateraBaratQuiz } from '@/data/quiz/sumatera-barat';
import { ArrowLeft, Play, Trophy, Clock, Mountain, Home, Sparkles, Users } from 'lucide-react';

export default function SumateraBaratQuiz() {
    const [showGame, setShowGame] = useState(false);

    if (showGame) {
        return <QuizGame
            config={sumateraBaratQuiz}
            onExit={() => setShowGame(false)}
            onComplete={(result) => {
                console.log('Quiz completed:', result);
                setShowGame(false);
            }}
        />;
    }

    return (
        <>
            <Head title="Quiz Budaya Sumatera Barat - Ranah Minang" />

            {/* Minang Gradient Background */}
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-900 via-yellow-800 to-green-700">

                {/* Minang Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(239,68,68,0.4)_0%,_transparent_25%)] bg-[length:75px_75px]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_rgba(34,197,94,0.4)_0%,_transparent_25%)] bg-[length:90px_90px]"></div>
                </div>

                {/* Minang Geometric Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-36 h-36 border border-red-400/20 rounded-full animate-pulse" style={{ animationDuration: '4.2s' }}></div>
                    <div className="absolute top-32 right-28 w-28 h-28 border border-yellow-300/20 rotate-45 animate-bounce" style={{ animationDuration: '3.8s' }}></div>
                    <div className="absolute bottom-32 left-28 w-40 h-40 border border-green-300/20 rotate-12 animate-spin" style={{ animationDuration: '28s' }}></div>
                    <div className="absolute bottom-20 right-20 w-32 h-32 border border-red-400/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '1.8s' }}></div>
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
                                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                    <Mountain size={18} className="text-white" />
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-white">Sumatera Barat</h1>
                                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-green-500 rounded-lg flex items-center justify-center">
                                    <Home size={18} className="text-white" />
                                </div>
                            </div>
                            <p className="text-red-200 text-sm lg:text-base">Ranah Minang & Budaya Matrilineal</p>
                        </div>

                        <div className="w-24"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 px-6 lg:px-8 pb-12">
                    <div className="max-w-6xl mx-auto">

                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-2xl shadow-2xl shadow-red-500/25 mb-6">
                                <Mountain size={36} className="text-white" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                {sumateraBaratQuiz.name}
                            </h2>
                            <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
                                {sumateraBaratQuiz.description}
                            </p>
                        </div>

                        {/* Main Card */}
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">

                            {/* Header Strip */}
                            <div className="bg-gradient-to-r from-red-600 to-green-600 p-6">
                                <div className="flex items-center justify-center space-x-3">
                                    <Sparkles className="text-white" size={24} />
                                    <h3 className="text-2xl font-bold text-white">Tentang Sumatera Barat</h3>
                                    <Home className="text-white" size={24} />
                                </div>
                            </div>

                            <div className="p-8 lg:p-12">
                                {/* Description */}
                                <div className="prose prose-lg max-w-none text-gray-700 mb-10 leading-relaxed text-center">
                                    <p>
                                        Sumatera Barat adalah ranah Minangkabau dengan sistem matrilineal yang unik dan filosofi
                                        "Adat Basandi Syarak, Syarak Basandi Kitabullah." Dari rumah gadang yang megah hingga
                                        rendang yang mendunia, dari tari piring hingga randai yang memukau, provinsi ini
                                        menyimpan kearifan budaya yang mengutamakan musyawarah dan mufakat.
                                    </p>
                                </div>

                                {/* Quiz Statistics */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Clock size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-red-800 mb-1">{sumateraBaratQuiz.timeLimit}</div>
                                        <div className="text-sm font-medium text-red-600">Menit</div>
                                    </div>

                                    <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Mountain size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-yellow-800 mb-1">{sumateraBaratQuiz.questions.length}</div>
                                        <div className="text-sm font-medium text-yellow-600">Pertanyaan</div>
                                    </div>

                                    <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Trophy size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-green-800 mb-1">{sumateraBaratQuiz.passingScore}%</div>
                                        <div className="text-sm font-medium text-green-600">Nilai Lulus</div>
                                    </div>
                                </div>

                                {/* Cultural Highlights */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                                                <Home size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-red-800">Rumah Gadang</h4>
                                        </div>
                                        <p className="text-sm text-red-700 leading-relaxed">
                                            Arsitektur tradisional dengan atap gonjong dan filosofi matrilineal
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center mr-3">
                                                <Sparkles size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-yellow-800">Kuliner Rendang</h4>
                                        </div>
                                        <p className="text-sm text-yellow-700 leading-relaxed">
                                            Masakan terbaik dunia dengan bumbu rempah yang kaya dan kompleks
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                                <Mountain size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-green-800">Seni Tari & Randai</h4>
                                        </div>
                                        <p className="text-sm text-green-700 leading-relaxed">
                                            Tari piring, tari payung, randai, dan seni pertunjukan tradisional
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                                                <Users size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-orange-800">Sistem Matrilineal</h4>
                                        </div>
                                        <p className="text-sm text-orange-700 leading-relaxed">
                                            Adat yang mengutamakan garis keturunan ibu dan musyawarah mufakat
                                        </p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="text-center">
                                    <button
                                        onClick={() => setShowGame(true)}
                                        className="group inline-flex items-center space-x-4 bg-gradient-to-r from-red-600 via-yellow-700 to-green-600 hover:from-red-700 hover:via-yellow-800 hover:to-green-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-red-500/25 hover:shadow-red-500/40 transform hover:scale-105 transition-all duration-300"
                                    >
                                        <Play size={24} className="group-hover:scale-110 transition-transform" />
                                        <span>Mulai Quiz Sumatera Barat</span>
                                        <Mountain size={24} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                    <p className="text-gray-500 text-sm mt-4 font-medium">
                                        Salamaik datang ka ranah Minang!
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
