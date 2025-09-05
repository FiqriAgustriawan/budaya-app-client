import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { QuizGame } from '@/components/quiz/QuizGame';
import { yogyakartaQuiz } from '@/data/quiz/yogyakarta';
import { Crown, ArrowLeft, Play, Trophy, Clock, Star, Shield, BookOpen } from 'lucide-react';

export default function YogyakartaQuiz() {
    const [showGame, setShowGame] = useState(false);

    if (showGame) {
        return <QuizGame
            config={yogyakartaQuiz}
            onExit={() => setShowGame(false)}
            onComplete={(result) => {
                console.log('Quiz completed:', result);
                setShowGame(false);
            }}
        />;
    }

    return (
        <>
            <Head title="Quiz Budaya Yogyakarta - Kerajaan & Tradisi" />

            {/* Premium Gradient Background */}
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-amber-700">

                {/* Sophisticated Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(251,191,36,0.3)_0%,_transparent_25%)] bg-[length:50px_50px]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_rgba(147,51,234,0.3)_0%,_transparent_25%)] bg-[length:80px_80px]"></div>
                </div>

                {/* Elegant Geometric Shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-32 h-32 border border-yellow-400/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 border border-purple-300/20 rotate-45 animate-bounce" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute bottom-32 left-32 w-40 h-40 border border-yellow-300/20 rotate-12 animate-spin" style={{ animationDuration: '20s' }}></div>
                    <div className="absolute bottom-20 right-20 w-28 h-28 border border-purple-400/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
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
                                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                                    <Crown size={18} className="text-white" />
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-white">Yogyakarta</h1>
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Shield size={18} className="text-white" />
                                </div>
                            </div>
                            <p className="text-purple-200 text-sm lg:text-base">Daerah Istimewa & Warisan Kerajaan</p>
                        </div>

                        <div className="w-24"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 px-6 lg:px-8 pb-12">
                    <div className="max-w-6xl mx-auto">

                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-2xl shadow-2xl shadow-yellow-500/25 mb-6">
                                <Crown size={36} className="text-white" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                {yogyakartaQuiz.name}
                            </h2>
                            <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
                                {yogyakartaQuiz.description}
                            </p>
                        </div>

                        {/* Main Card */}
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">

                            {/* Header Strip */}
                            <div className="bg-gradient-to-r from-purple-600 to-amber-600 p-6">
                                <div className="flex items-center justify-center space-x-3">
                                    <Star className="text-yellow-200" size={24} />
                                    <h3 className="text-2xl font-bold text-white">Tentang Daerah Istimewa Yogyakarta</h3>
                                    <Star className="text-yellow-200" size={24} />
                                </div>
                            </div>

                            <div className="p-8 lg:p-12">
                                {/* Description */}
                                <div className="prose prose-lg max-w-none text-gray-700 mb-10 leading-relaxed text-center">
                                    <p>
                                        Yogyakarta adalah daerah istimewa yang memiliki keunikan tersendiri sebagai wilayah
                                        kerajaan yang masih bertahan hingga kini. Dikenal sebagai kota pelajar, kota budaya,
                                        dan pusat kerajaan Jawa, Yogyakarta menyimpan kekayaan tradisi keraton, kuliner legendaris
                                        seperti gudeg, serta warisan dunia Candi Borobudur.
                                    </p>
                                </div>

                                {/* Quiz Statistics */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Clock size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-purple-800 mb-1">{yogyakartaQuiz.timeLimit}</div>
                                        <div className="text-sm font-medium text-purple-600">Menit</div>
                                    </div>

                                    <div className="group bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <BookOpen size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-amber-800 mb-1">{yogyakartaQuiz.questions.length}</div>
                                        <div className="text-sm font-medium text-amber-600">Pertanyaan</div>
                                    </div>

                                    <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Trophy size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-emerald-800 mb-1">{yogyakartaQuiz.passingScore}%</div>
                                        <div className="text-sm font-medium text-emerald-600">Nilai Lulus</div>
                                    </div>
                                </div>

                                {/* Cultural Highlights */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                                                <Crown size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-purple-800">Warisan Kerajaan</h4>
                                        </div>
                                        <p className="text-sm text-purple-700 leading-relaxed">
                                            Keraton Yogyakarta, Sultan Hamengku Buwono, tradisi kerajaan yang masih lestari
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                                                <Star size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-amber-800">Kuliner Legendaris</h4>
                                        </div>
                                        <p className="text-sm text-amber-700 leading-relaxed">
                                            Gudeg, angkringan Malioboro, tradisi kuliner yang autentik dan bersejarah
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                                                <Shield size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-emerald-800">Situs Dunia</h4>
                                        </div>
                                        <p className="text-sm text-emerald-700 leading-relaxed">
                                            Candi Borobudur, Prambanan, warisan peradaban yang mendunia
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                                                <BookOpen size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-blue-800">Seni & Budaya</h4>
                                        </div>
                                        <p className="text-sm text-blue-700 leading-relaxed">
                                            Batik Truntum, tari Wireng, Festival Kesenian Yogyakarta
                                        </p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="text-center">
                                    <button
                                        onClick={() => setShowGame(true)}
                                        className="group inline-flex items-center space-x-4 bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 hover:from-purple-700 hover:via-purple-800 hover:to-amber-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300"
                                    >
                                        <Play size={24} className="group-hover:scale-110 transition-transform" />
                                        <span>Mulai Quiz Yogyakarta</span>
                                        <Crown size={24} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                    <p className="text-gray-500 text-sm mt-4 font-medium">
                                        Jelajahi keajaiban Daerah Istimewa Yogyakarta
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
