import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { QuizGame } from '@/components/quiz/QuizGame';
import { sulawesiSelatanQuiz } from '@/data/quiz/sulawesi-selatan';
import { ArrowLeft, Play, Trophy, Clock, Anchor, Ship, Waves, Star } from 'lucide-react';

export default function SulawesiSelatanQuiz() {
    const [showGame, setShowGame] = useState(false);

    if (showGame) {
        return <QuizGame
            config={sulawesiSelatanQuiz}
            onExit={() => setShowGame(false)}
            onComplete={(result) => {
                console.log('Quiz completed:', result);
                setShowGame(false);
            }}
        />;
    }

    return (
        <>
            <Head title="Quiz Budaya Sulawesi Selatan - Bumi Sriwijaya" />

            {/* Maritime Gradient Background */}
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-700">

                {/* Maritime Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(14,165,233,0.4)_0%,_transparent_25%)] bg-[length:80px_80px]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_rgba(6,182,212,0.4)_0%,_transparent_25%)] bg-[length:100px_100px]"></div>
                </div>

                {/* Maritime Geometric Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-32 h-32 border border-cyan-400/20 rounded-full animate-pulse" style={{ animationDuration: '3.5s' }}></div>
                    <div className="absolute top-40 right-32 w-24 h-24 border border-blue-300/20 rotate-45 animate-bounce" style={{ animationDuration: '4s' }}></div>
                    <div className="absolute bottom-32 left-28 w-40 h-40 border border-teal-300/20 rotate-12 animate-spin" style={{ animationDuration: '30s' }}></div>
                    <div className="absolute bottom-20 right-20 w-28 h-28 border border-cyan-400/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
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
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                                    <Ship size={18} className="text-white" />
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-white">Sulawesi Selatan</h1>
                                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                    <Anchor size={18} className="text-white" />
                                </div>
                            </div>
                            <p className="text-cyan-200 text-sm lg:text-base">Bumi Bugis Makassar & Tradisi Bahari</p>
                        </div>

                        <div className="w-24"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 px-6 lg:px-8 pb-12">
                    <div className="max-w-6xl mx-auto">

                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 rounded-2xl shadow-2xl shadow-blue-500/25 mb-6">
                                <Ship size={36} className="text-white" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                {sulawesiSelatanQuiz.name}
                            </h2>
                            <p className="text-xl text-cyan-100 max-w-2xl mx-auto leading-relaxed">
                                {sulawesiSelatanQuiz.description}
                            </p>
                        </div>

                        {/* Main Card */}
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">

                            {/* Header Strip */}
                            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6">
                                <div className="flex items-center justify-center space-x-3">
                                    <Waves className="text-white" size={24} />
                                    <h3 className="text-2xl font-bold text-white">Tentang Sulawesi Selatan</h3>
                                    <Anchor className="text-white" size={24} />
                                </div>
                            </div>

                            <div className="p-8 lg:p-12">
                                {/* Description */}
                                <div className="prose prose-lg max-w-none text-gray-700 mb-10 leading-relaxed text-center">
                                    <p>
                                        Sulawesi Selatan adalah jantung budaya Bugis-Makassar yang terkenal sebagai pelaut
                                        handal nusantara. Dari Benteng Rotterdam hingga Toraja yang memukau, dari kapal
                                        Pinisi yang legendaris hingga sop konro yang nikmat, provinsi ini menyimpan warisan
                                        maritim dan budaya yang tak ternilai.
                                    </p>
                                </div>

                                {/* Quiz Statistics */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Clock size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-blue-800 mb-1">{sulawesiSelatanQuiz.timeLimit}</div>
                                        <div className="text-sm font-medium text-blue-600">Menit</div>
                                    </div>

                                    <div className="group bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 border border-cyan-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Ship size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-cyan-800 mb-1">{sulawesiSelatanQuiz.questions.length}</div>
                                        <div className="text-sm font-medium text-cyan-600">Pertanyaan</div>
                                    </div>

                                    <div className="group bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Trophy size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-teal-800 mb-1">{sulawesiSelatanQuiz.passingScore}%</div>
                                        <div className="text-sm font-medium text-teal-600">Nilai Lulus</div>
                                    </div>
                                </div>

                                {/* Cultural Highlights */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                                                <Ship size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-blue-800">Tradisi Bahari</h4>
                                        </div>
                                        <p className="text-sm text-blue-700 leading-relaxed">
                                            Kapal Pinisi, pelaut Bugis-Makassar, dan tradisi maritim yang mendunia
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                                                <Anchor size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-teal-800">Sejarah & Benteng</h4>
                                        </div>
                                        <p className="text-sm text-teal-700 leading-relaxed">
                                            Benteng Rotterdam, Somba Opu, dan jejak Kerajaan Gowa-Tallo
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                                                <Waves size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-cyan-800">Budaya Toraja</h4>
                                        </div>
                                        <p className="text-sm text-cyan-700 leading-relaxed">
                                            Upacara Rambu Solo, Tongkonan, dan tradisi megalitik yang unik
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                                                <Star size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-indigo-800">Kuliner Khas</h4>
                                        </div>
                                        <p className="text-sm text-indigo-700 leading-relaxed">
                                            Sop konro, coto Makassar, pisang epe, dan kue-kue tradisional
                                        </p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="text-center">
                                    <button
                                        onClick={() => setShowGame(true)}
                                        className="group inline-flex items-center space-x-4 bg-gradient-to-r from-blue-600 via-cyan-700 to-teal-600 hover:from-blue-700 hover:via-cyan-800 hover:to-teal-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300"
                                    >
                                        <Play size={24} className="group-hover:scale-110 transition-transform" />
                                        <span>Mulai Quiz Sulawesi Selatan</span>
                                        <Ship size={24} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                    <p className="text-gray-500 text-sm mt-4 font-medium">
                                        Jelajahi kekayaan budaya Bugis Makassar
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
