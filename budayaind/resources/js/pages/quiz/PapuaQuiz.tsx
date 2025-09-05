import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { QuizGame } from '@/components/quiz/QuizGame';
import { papuaQuiz } from '@/data/quiz/papua';
import { ArrowLeft, Play, Trophy, Clock, Mountain, Trees, Compass, Globe } from 'lucide-react';

export default function PapuaQuiz() {
    const [showGame, setShowGame] = useState(false);

    if (showGame) {
        return <QuizGame
            config={papuaQuiz}
            onExit={() => setShowGame(false)}
            onComplete={(result) => {
                console.log('Quiz completed:', result);
                setShowGame(false);
            }}
        />;
    }

    return (
        <>
            <Head title="Quiz Budaya Papua - Tanah Cendrawasih" />

            {/* Natural Gradient Background */}
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-orange-700">

                {/* Organic Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(34,197,94,0.4)_0%,_transparent_25%)] bg-[length:60px_60px]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,_rgba(249,115,22,0.4)_0%,_transparent_25%)] bg-[length:90px_90px]"></div>
                </div>

                {/* Natural Geometric Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-16 left-16 w-36 h-36 border border-green-400/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
                    <div className="absolute top-32 right-24 w-28 h-28 border border-orange-300/20 rotate-45 animate-bounce" style={{ animationDuration: '3.5s' }}></div>
                    <div className="absolute bottom-24 left-24 w-44 h-44 border border-emerald-300/20 rotate-12 animate-spin" style={{ animationDuration: '25s' }}></div>
                    <div className="absolute bottom-16 right-16 w-32 h-32 border border-green-400/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
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
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                                    <Mountain size={18} className="text-white" />
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-white">Papua</h1>
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                    <Trees size={18} className="text-white" />
                                </div>
                            </div>
                            <p className="text-green-200 text-sm lg:text-base">Tanah Cendrawasih & Keanekaragaman Budaya</p>
                        </div>

                        <div className="w-24"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 px-6 lg:px-8 pb-12">
                    <div className="max-w-6xl mx-auto">

                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 via-green-500 to-orange-500 rounded-2xl shadow-2xl shadow-emerald-500/25 mb-6">
                                <Mountain size={36} className="text-white" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                {papuaQuiz.name}
                            </h2>
                            <p className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
                                {papuaQuiz.description}
                            </p>
                        </div>

                        {/* Main Card */}
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">

                            {/* Header Strip */}
                            <div className="bg-gradient-to-r from-emerald-600 to-orange-600 p-6">
                                <div className="flex items-center justify-center space-x-3">
                                    <Trees className="text-white" size={24} />
                                    <h3 className="text-2xl font-bold text-white">Tentang Papua</h3>
                                    <Compass className="text-white" size={24} />
                                </div>
                            </div>

                            <div className="p-8 lg:p-12">
                                {/* Description */}
                                <div className="prose prose-lg max-w-none text-gray-700 mb-10 leading-relaxed text-center">
                                    <p>
                                        Papua adalah provinsi terluas di Indonesia yang menyimpan kekayaan alam dan budaya
                                        yang luar biasa. Dari burung Cendrawasih yang eksotis hingga tradisi bakar batu
                                        suku Dani, dari puncak bersalju Jayawijaya hingga rumah honai yang unik, Papua
                                        menawarkan keragaman yang tak tertandingi.
                                    </p>
                                </div>

                                {/* Quiz Statistics */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Clock size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-emerald-800 mb-1">{papuaQuiz.timeLimit}</div>
                                        <div className="text-sm font-medium text-emerald-600">Menit</div>
                                    </div>

                                    <div className="group bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Globe size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-orange-800 mb-1">{papuaQuiz.questions.length}</div>
                                        <div className="text-sm font-medium text-orange-600">Pertanyaan</div>
                                    </div>

                                    <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Trophy size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-yellow-800 mb-1">{papuaQuiz.passingScore}%</div>
                                        <div className="text-sm font-medium text-yellow-600">Nilai Lulus</div>
                                    </div>
                                </div>

                                {/* Cultural Highlights */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mr-3">
                                                <Mountain size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-emerald-800">Fauna Endemik</h4>
                                        </div>
                                        <p className="text-sm text-emerald-700 leading-relaxed">
                                            Burung Cendrawasih, berbagai spesies kanguru pohon, dan kekayaan hayati yang unik
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                                                <Compass size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-orange-800">Alam Spektakuler</h4>
                                        </div>
                                        <p className="text-sm text-orange-700 leading-relaxed">
                                            Puncak Jaya bersalju, Danau Paniai, Raja Ampat, dan pegunungan eksotis
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center mr-3">
                                                <Trees size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-yellow-800">Suku & Tradisi</h4>
                                        </div>
                                        <p className="text-sm text-yellow-700 leading-relaxed">
                                            Suku Dani, Asmat, bakar batu, honai, dan ratusan suku dengan tradisi unik
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                                                <Globe size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-blue-800">Kuliner Tradisional</h4>
                                        </div>
                                        <p className="text-sm text-blue-700 leading-relaxed">
                                            Sagu, papeda, hasil hutan dan laut yang kaya protein dan karbohidrat alami
                                        </p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="text-center">
                                    <button
                                        onClick={() => setShowGame(true)}
                                        className="group inline-flex items-center space-x-4 bg-gradient-to-r from-emerald-600 via-green-700 to-orange-600 hover:from-emerald-700 hover:via-green-800 hover:to-orange-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:scale-105 transition-all duration-300"
                                    >
                                        <Play size={24} className="group-hover:scale-110 transition-transform" />
                                        <span>Mulai Quiz Papua</span>
                                        <Mountain size={24} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                    <p className="text-gray-500 text-sm mt-4 font-medium">
                                        Jelajahi keajaiban tanah Cendrawasih
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
