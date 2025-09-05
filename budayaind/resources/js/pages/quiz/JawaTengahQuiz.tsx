import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { QuizGame } from '@/components/quiz/QuizGame';
import { jawaTengahQuiz } from '@/data/quiz/jawa-tengah';
import { ArrowLeft, Play, Trophy, Clock, Crown, Building, Star, Sparkles } from 'lucide-react';

export default function JawaTengahQuiz() {
    const [showGame, setShowGame] = useState(false);

    if (showGame) {
        return <QuizGame 
            config={jawaTengahQuiz} 
            onExit={() => setShowGame(false)}
            onComplete={(result) => {
                console.log('Quiz completed:', result);
                setShowGame(false);
            }}
        />;
    }

    return (
        <>
            <Head title="Quiz Budaya Jawa Tengah - Keraton & Tradisi" />
            
            {/* Cultural Gradient Background */}
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-700">
                
                {/* Cultural Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,_rgba(245,158,11,0.4)_0%,_transparent_25%)] bg-[length:75px_75px]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,_rgba(251,191,36,0.4)_0%,_transparent_25%)] bg-[length:95px_95px]"></div>
                </div>

                {/* Cultural Geometric Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-36 h-36 border border-amber-400/20 rounded-full animate-pulse" style={{ animationDuration: '4.5s' }}></div>
                    <div className="absolute top-32 right-28 w-28 h-28 border border-yellow-300/20 rotate-45 animate-bounce" style={{ animationDuration: '4s' }}></div>
                    <div className="absolute bottom-32 left-28 w-42 h-42 border border-orange-300/20 rotate-12 animate-spin" style={{ animationDuration: '32s' }}></div>
                    <div className="absolute bottom-20 right-20 w-32 h-32 border border-amber-400/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '2.2s' }}></div>
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
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
                                    <Crown size={18} className="text-white" />
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-white">Jawa Tengah</h1>
                                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                                    <Building size={18} className="text-white" />
                                </div>
                            </div>
                            <p className="text-amber-200 text-sm lg:text-base">Keraton & Tradisi Jawa</p>
                        </div>
                        
                        <div className="w-24"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 px-6 lg:px-8 pb-12">
                    <div className="max-w-6xl mx-auto">
                        
                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-2xl shadow-2xl shadow-amber-500/25 mb-6">
                                <Crown size={36} className="text-white" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                {jawaTengahQuiz.name}
                            </h2>
                            <p className="text-xl text-amber-100 max-w-2xl mx-auto leading-relaxed">
                                {jawaTengahQuiz.description}
                            </p>
                        </div>

                        {/* Main Card */}
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                            
                            {/* Header Strip */}
                            <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6">
                                <div className="flex items-center justify-center space-x-3">
                                    <Sparkles className="text-white" size={24} />
                                    <h3 className="text-2xl font-bold text-white">Tentang Jawa Tengah</h3>
                                    <Building className="text-white" size={24} />
                                </div>
                            </div>

                            <div className="p-8 lg:p-12">
                                {/* Description */}
                                <div className="prose prose-lg max-w-none text-gray-700 mb-10 leading-relaxed text-center">
                                    <p>
                                        Jawa Tengah adalah jantung budaya Jawa dengan warisan keraton yang agung dan tradisi 
                                        yang luhur. Dari Candi Borobudur yang megah hingga batik Solo yang memukau, dari 
                                        filosofi kejawen hingga wayang kulit yang adiluhung, provinsi ini menyimpan kearifan 
                                        lokal yang menjadi identitas bangsa Indonesia.
                                    </p>
                                </div>

                                {/* Quiz Statistics */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Clock size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-amber-800 mb-1">{jawaTengahQuiz.timeLimit}</div>
                                        <div className="text-sm font-medium text-amber-600">Menit</div>
                                    </div>
                                    
                                    <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Crown size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-yellow-800 mb-1">{jawaTengahQuiz.questions.length}</div>
                                        <div className="text-sm font-medium text-yellow-600">Pertanyaan</div>
                                    </div>
                                    
                                    <div className="group bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 hover:shadow-lg transition-all duration-300 text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Trophy size={24} className="text-white" />
                                        </div>
                                        <div className="text-3xl font-bold text-orange-800 mb-1">{jawaTengahQuiz.passingScore}%</div>
                                        <div className="text-sm font-medium text-orange-600">Nilai Lulus</div>
                                    </div>
                                </div>

                                {/* Cultural Highlights */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                    <div className="group bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3">
                                                <Crown size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-amber-800">Keraton & Istana</h4>
                                        </div>
                                        <p className="text-sm text-amber-700 leading-relaxed">
                                            Keraton Surakarta, Yogyakarta, dan tradisi kerajaan Jawa yang luhur
                                        </p>
                                    </div>
                                    
                                    <div className="group bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                                                <Building size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-yellow-800">Candi & Warisan</h4>
                                        </div>
                                        <p className="text-sm text-yellow-700 leading-relaxed">
                                            Borobudur, Prambanan, dan jejak peradaban Hindu-Buddha
                                        </p>
                                    </div>
                                    
                                    <div className="group bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                                                <Sparkles size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-orange-800">Seni & Batik</h4>
                                        </div>
                                        <p className="text-sm text-orange-700 leading-relaxed">
                                            Batik Solo, wayang kulit, gamelan, dan seni adiluhung Jawa
                                        </p>
                                    </div>
                                    
                                    <div className="group bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                                                <Star size={16} className="text-white" />
                                            </div>
                                            <h4 className="font-bold text-red-800">Filosofi Kejawen</h4>
                                        </div>
                                        <p className="text-sm text-red-700 leading-relaxed">
                                            Kebijaksanaan hidup, tata krama, dan spiritualitas Jawa
                                        </p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="text-center">
                                    <button
                                        onClick={() => setShowGame(true)}
                                        className="group inline-flex items-center space-x-4 bg-gradient-to-r from-amber-600 via-yellow-700 to-orange-600 hover:from-amber-700 hover:via-yellow-800 hover:to-orange-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:scale-105 transition-all duration-300"
                                    >
                                        <Play size={24} className="group-hover:scale-110 transition-transform" />
                                        <span>Mulai Quiz Jawa Tengah</span>
                                        <Crown size={24} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                    <p className="text-gray-500 text-sm mt-4 font-medium">
                                        Sugeng rawuh - Mari menyelami adiluhung budaya Jawa
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
