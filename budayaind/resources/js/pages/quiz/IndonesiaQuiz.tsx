import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { QuizGame } from '@/components/quiz/QuizGame';
import { indonesiaQuiz } from '@/data/quiz/indonesia';
import { ArrowLeft, Play, Trophy, Clock, Flag, Star, Globe, Heart } from 'lucide-react';

export default function IndonesiaQuiz() {
    const [showGame, setShowGame] = useState(false);

    if (showGame) {
        return <QuizGame
            config={indonesiaQuiz}
            onExit={() => setShowGame(false)}
            onComplete={(result) => {
                console.log('Quiz completed:', result);
                setShowGame(false);
            }}
        />;
    }

    return (
        <>
            <Head title="Quiz Budaya Indonesia - Bhinneka Tunggal Ika" />

            {/* Patriotic Gradient Background */}
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-white">

                {/* Patriotic Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(220,38,38,0.4)_0%,_transparent_25%)] bg-[length:80px_80px]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_rgba(255,255,255,0.6)_0%,_transparent_25%)] bg-[length:100px_100px]"></div>
                </div>

                {/* Patriotic Geometric Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-36 h-36 border border-red-400/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
                    <div className="absolute top-32 right-28 w-28 h-28 border border-white/30 rotate-45 animate-bounce" style={{ animationDuration: '3.5s' }}></div>
                    <div className="absolute bottom-28 left-24 w-44 h-44 border border-red-300/20 rotate-12 animate-spin" style={{ animationDuration: '28s' }}></div>
                    <div className="absolute bottom-20 right-20 w-32 h-32 border border-white/30 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 lg:p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/quiz"
                              className="flex items-center space-x-3 bg-black/20 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-black/30 transition-all duration-300 group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Kembali</span>
                        </Link>

                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-3 mb-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                                    <Flag size={18} className="text-white" />
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-white">Indonesia</h1>
                                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                                    <Star size={18} className="text-white" />
                                </div>
                            </div>
                            <p className="text-red-200 text-sm lg:text-base">Bhinneka Tunggal Ika</p>
                        </div>

                        <div className="w-24"></div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-6xl mx-auto">

                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 via-red-600 to-white rounded-2xl shadow-2xl shadow-red-500/25 mb-6">
                                <Flag size={36} className="text-white" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                {indonesiaQuiz.name}
                            </h2>
                            <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
                                {indonesiaQuiz.description}
                            </p>
                        </div>

                        {/* Main Card */}
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">

                            {/* Header Strip */}
                            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
                                <div className="flex items-center justify-center space-x-3">
                                    <Heart className="text-white" size={24} />
                                    <h3 className="text-2xl font-bold text-white">Tentang Indonesia</h3>
                                    <Globe className="text-white" size={24} />
                                </div>
                            </div>

                            <div className="p-8 lg:p-12">
                                {/* Description */}
                                <div className="prose prose-lg max-w-none text-gray-700 mb-10 leading-relaxed text-center">
                                    <p>
                                        Indonesia adalah negara kepulauan terbesar di dunia dengan lebih dari 17.000 pulau
                                        yang membentang dari Sabang sampai Merauke. Dengan semboyan Bhinneka Tunggal Ika,
                                        Indonesia menyatukan 1.340 suku bangsa dengan 652 bahasa daerah dalam satu kesatuan
                                        NKRI yang berdasarkan Pancasila.
                                    </p>
                                </div>

                                {/* Quiz Statistics */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Clock size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-red-800 mb-1">{indonesiaQuiz.timeLimit}</div>
                                        <div className="text-sm font-medium text-red-600">Menit</div>
                                    </div>

                                    <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Globe size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-blue-800 mb-1">{indonesiaQuiz.questions.length}</div>
                                        <div className="text-sm font-medium text-blue-600">Pertanyaan</div>
                                    </div>

                                    <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Trophy size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-yellow-800 mb-1">{indonesiaQuiz.passingScore}%</div>
                                        <div className="text-sm font-medium text-yellow-600">Nilai Lulus</div>
                                    </div>
                                </div>

                                {/* Cultural Highlights */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                                                <Flag size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-red-800">Ideologi Pancasila</h4>
                                        </div>
                                        <p className="text-sm text-red-700 leading-relaxed">
                                            Lima sila sebagai dasar negara dan pandangan hidup bangsa Indonesia
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                                                <Globe size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-blue-800">Keanekaragaman</h4>
                                        </div>
                                        <p className="text-sm text-blue-700 leading-relaxed">
                                            1.340 suku bangsa, 652 bahasa daerah, dan ribuan tradisi lokal
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                                <Heart size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-green-800">Warisan Budaya</h4>
                                        </div>
                                        <p className="text-sm text-green-700 leading-relaxed">
                                            Candi Borobudur, batik, wayang, dan tradisi turun temurun
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mr-3">
                                                <Star size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-orange-800">Kekayaan Alam</h4>
                                        </div>
                                        <p className="text-sm text-orange-700 leading-relaxed">
                                            Biodiversitas tinggi, rempah-rempah, dan sumber daya melimpah
                                        </p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="text-center">
                                    <button
                                        onClick={() => setShowGame(true)}
                                        className="group inline-flex items-center space-x-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-red-500/25 hover:shadow-red-500/40 transform hover:scale-105 transition-all duration-300"
                                    >
                                        <Play size={24} className="group-hover:scale-110 transition-transform" />
                                        <span>Mulai Quiz Indonesia</span>
                                        <Flag size={24} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                    <p className="text-gray-500 text-sm mt-4 font-medium">
                                        Uji pengetahuan tentang Tanah Air tercinta
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
