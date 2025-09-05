import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, BookOpen, Camera, Globe, Users, Sparkles, Database, Package, Brain } from 'lucide-react';
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { FlipText } from "@/components/magicui/flip-text";
import { useAppearance } from "@/hooks/use-appearance";
import { getDashboardUrl } from "@/utils/navigation";
import { useState, useEffect } from 'react';

function WelcomeContent() {
    const { auth } = usePage<SharedData>().props;
    const { appearance } = useAppearance();
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Get dashboard URL based on user role - FIXED: Proper null checking
    const dashboardUrl = auth?.user ? getDashboardUrl(auth.user.role as string) : '/customer/dashboard';

    useEffect(() => {
        const updateTheme = () => {
            if (appearance === 'dark') {
                setIsDarkMode(true);
            } else if (appearance === 'light') {
                setIsDarkMode(false);
            } else {
                // System preference
                setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
            }
        };

        updateTheme();

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', updateTheme);

        return () => mediaQuery.removeEventListener('change', updateTheme);
    }, [appearance]);

    return (
        <>
            <Head title="BudayaInd - Portal Kebudayaan Indonesia">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <style dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes float {
                            0%, 100% { transform: translateY(0px); }
                            50% { transform: translateY(-10px); }
                        }

                        .animate-float {
                            animation: float 3s ease-in-out infinite;
                        }

                        .delay-1000 {
                            animation-delay: 1s;
                        }

                        .delay-2000 {
                            animation-delay: 2s;
                        }

                        .delay-500 {
                            animation-delay: 0.5s;
                        }
                    `
                }} />
            </Head>

            {/* Dynamic Background */}
            <div className="min-h-screen relative overflow-hidden transition-all duration-500">
                {/* Header Navigation */}
                <header className="relative z-20 p-6 lg:p-8">
                    <nav className="flex items-center justify-between max-w-7xl mx-auto">
                        {/* Logo Area */}
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#a4773e] to-[#d4a574] rounded-xl flex items-center justify-center shadow-lg shadow-[#a4773e]/25 group-hover:shadow-[#a4773e]/40 transition-all duration-300">
                                    <img
                                        src="/image/logo-batik.svg"
                                        alt="BudayaInd Logo"
                                        className="w-8 h-8 object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                            if (fallback) fallback.style.display = 'block';
                                        }}
                                    />
                                    <span className="hidden text-white font-bold text-xl">BI</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-[#a4773e]/20 to-[#d4a574]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-[#a4773e] to-[#d4a574] bg-clip-text font-space-grotesk">
                                    BudayaInd
                                </h1>
                                <p className={`text-sm font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}>Portal Kebudayaan Indonesia</p>
                            </div>
                        </Link>

                        {/* Navigation Links */}
                        <div className="flex items-center gap-4">

                            {/* Quiz Link */}
                            <Link
                                href={route('quiz')}
                                className={`px-4 py-2 font-medium transition-colors duration-300 rounded-xl flex items-center space-x-2 ${
                                    isDarkMode
                                        ? 'text-gray-300 hover:text-[#a4773e] hover:bg-gray-800/50'
                                        : 'text-gray-700 hover:text-[#a4773e] hover:bg-gray-100/80'
                                }`}
                            >
                                <Brain className="w-4 h-4" />
                                <span>Quiz</span>
                            </Link>


                            <Link
                                href="/map"
                                className={`px-4 py-2 font-medium transition-colors duration-300 rounded-xl flex items-center space-x-2 ${isDarkMode
                                        ? 'text-gray-300 hover:text-[#a4773e] hover:bg-gray-800/50'
                                        : 'text-gray-700 hover:text-[#a4773e] hover:bg-gray-100/80'
                                    }`}
                            >
                                <Globe className="w-4 h-4" />
                                <span>Peta</span>
                            </Link>

                            {/* Tiket Link */}
                            <Link
                                href="/tickets"
                                className={`px-4 py-2 font-medium transition-colors duration-300 rounded-xl flex items-center space-x-2 ${isDarkMode
                                        ? 'text-gray-300 hover:text-[#a4773e] hover:bg-gray-800/50'
                                        : 'text-gray-700 hover:text-[#a4773e] hover:bg-gray-100/80'
                                    }`}
                            >
                                <Package className="w-4 h-4" />
                                <span>Jelajahi Tiket</span>
                            </Link>

                            {/* Theme Toggle */}
                            <AnimatedThemeToggler />

                            {/* FIXED: Proper auth checking */}
                            {auth?.user ? (
                                <Link
                                    href={dashboardUrl}
                                    className="relative px-6 py-2.5 bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-white rounded-xl font-medium hover:from-[#8b6635] hover:to-[#a4773e] transition-all duration-300 shadow-lg shadow-[#a4773e]/25 hover:shadow-[#a4773e]/40 transform hover:scale-105 group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#a4773e]/20 to-[#d4a574]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative">
                                        {auth.user.role === 'admin' ? 'Admin Panel' :
                                            auth.user.role === 'seller' ? 'Seller Panel' : 'Dashboard'}
                                    </span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className={`px-6 py-2.5 font-medium transition-colors duration-300 rounded-xl ${isDarkMode
                                                ? 'text-gray-300 hover:text-[#a4773e] hover:bg-gray-800/50'
                                                : 'text-gray-700 hover:text-[#a4773e] hover:bg-gray-100/80'
                                            }`}
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="relative px-6 py-2.5 bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-white rounded-xl font-medium hover:from-[#8b6635] hover:to-[#a4773e] transition-all duration-300 shadow-lg shadow-[#a4773e]/25 hover:shadow-[#a4773e]/40 transform hover:scale-105 group overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#a4773e]/20 to-[#d4a574]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="relative">Daftar</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
                    {/* Hero Section - Centered Layout */}
                    <div className="text-center space-y-12">
                        {/* Hero Text */}
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <div className={`inline-flex items-center px-6 py-3 backdrop-blur-sm rounded-full border shadow-sm ${isDarkMode
                                        ? 'border-gray-600/50 bg-gray-800/30'
                                        : 'border-gray-300/50 bg-white/30'
                                    }`}>
                                    <Sparkles className="w-5 h-5 text-[#a4773e] mr-3" />
                                    <span className={`text-base font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                        }`}>Portal Digital Kebudayaan Indonesia</span>
                                </div>

                                <div className="space-y-4">
                                    <FlipText className="text-6xl lg:text-8xl font-bold leading-tight font-space-grotesk text-transparent bg-gradient-to-r from-[#a4773e] to-[#d4a574] bg-clip-text">BudayaInd</FlipText>
                                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight font-space-grotesk max-w-5xl mx-auto">
                                        <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Jelajahi</span>
                                        <br />
                                        <span className="text-transparent bg-gradient-to-r from-[#a4773e] to-[#d4a574] bg-clip-text">
                                            Kebudayaan
                                        </span>
                                        <br />
                                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Nusantara</span>
                                    </h1>
                                </div>
                            </div>

                            <p className={`text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                Temukan, dokumentasikan, dan lestarikan kekayaan budaya Indonesia.
                                Platform digital yang menghubungkan tradisi masa lalu dengan teknologi masa depan.
                            </p>
                        </div>

                        {/* Feature Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className={`backdrop-blur-xl rounded-2xl p-6 border shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode
                                    ? 'border-gray-600/50 bg-gray-800/20'
                                    : 'border-gray-300/50 bg-white/20'
                                }`}>
                                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-[#a4773e] to-[#d4a574] bg-clip-text font-space-grotesk mb-2">1000+</div>
                                <div className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'
                                    }`}>Artikel Budaya</div>
                                <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Dokumentasi lengkap warisan nusantara</div>
                            </div>
                            <div className={`backdrop-blur-xl rounded-2xl p-6 border shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode
                                    ? 'border-gray-600/50 bg-gray-800/20'
                                    : 'border-gray-300/50 bg-white/20'
                                }`}>
                                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text font-space-grotesk mb-2">500+</div>
                                <div className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'
                                    }`}>Media Visual</div>
                                <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Foto, video, dan audio berkualitas tinggi</div>
                            </div>
                            <div className={`backdrop-blur-xl rounded-2xl p-6 border shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode
                                    ? 'border-gray-600/50 bg-gray-800/20'
                                    : 'border-gray-300/50 bg-white/20'
                                }`}>
                                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-space-grotesk mb-2">34</div>
                                <div className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'
                                    }`}>Provinsi</div>
                                <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Cakupan seluruh Indonesia</div>
                            </div>
                        </div>

                        {/* CTA Buttons - FIXED: Proper auth checking */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                            {!auth?.user ? (
                                <>
                                    <Link
                                        href="/register"
                                        className="group relative px-10 py-5 bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-white rounded-2xl font-semibold text-lg hover:from-[#8b6635] hover:to-[#a4773e] transition-all duration-300 shadow-xl shadow-[#a4773e]/25 hover:shadow-[#a4773e]/40 transform hover:scale-105 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#a4773e]/20 to-[#d4a574]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="relative flex items-center justify-center">
                                            Mulai Jelajahi Sekarang
                                            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                                        </span>
                                    </Link>
                                    <Link
                                        href="/login"
                                        className={`group px-10 py-5 backdrop-blur-sm rounded-2xl font-semibold text-lg transition-all duration-300 border shadow-lg hover:shadow-xl ${isDarkMode
                                                ? 'border-gray-600/50 hover:border-gray-500/70 text-gray-200 hover:bg-gray-800/30'
                                                : 'border-gray-400/50 hover:border-gray-500/70 text-gray-700 hover:bg-gray-100/80'
                                            }`}
                                    >
                                        <span className="flex items-center justify-center">
                                            Masuk ke Akun
                                            <Users className="w-6 h-6 ml-3" />
                                        </span>
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href={dashboardUrl}
                                    className="group relative px-10 py-5 bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-white rounded-2xl font-semibold text-lg hover:from-[#8b6635] hover:to-[#a4773e] transition-all duration-300 shadow-xl shadow-[#a4773e]/25 hover:shadow-[#a4773e]/40 transform hover:scale-105 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#a4773e]/20 to-[#d4a574]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center">
                                        {auth.user.role === 'admin' ? 'Masuk ke Admin Panel' :
                                            auth.user.role === 'seller' ? 'Masuk ke Seller Panel' : 'Masuk ke Dashboard'}
                                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                                    </span>
                                </Link>
                            )}
                        </div>

                        {/* Floating Decorative Elements */}
                        <div className="relative max-w-6xl mx-auto">
                            <div className={`absolute top-0 left-1/4 w-20 h-20 backdrop-blur-xl rounded-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-300 animate-float border shadow-lg ${isDarkMode
                                    ? 'border-gray-600/50 bg-gray-800/20'
                                    : 'border-gray-300/50 bg-white/20'
                                }`}>
                                <BookOpen className="w-8 h-8 text-[#a4773e] group-hover:text-[#d4a574] transition-colors duration-300" />
                            </div>

                            <div className={`absolute top-0 right-1/4 w-20 h-20 backdrop-blur-xl rounded-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-300 animate-float delay-1000 border shadow-lg ${isDarkMode
                                    ? 'border-gray-600/50 bg-gray-800/20'
                                    : 'border-gray-300/50 bg-white/20'
                                }`}>
                                <Camera className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                            </div>

                            <div className={`absolute top-1/2 left-0 transform -translate-y-1/2 w-16 h-16 backdrop-blur-xl rounded-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-300 animate-float delay-2000 border shadow-lg ${isDarkMode
                                    ? 'border-gray-600/50 bg-gray-800/20'
                                    : 'border-gray-300/50 bg-white/20'
                                }`}>
                                <Globe className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                            </div>

                            <div className={`absolute top-1/2 right-0 transform -translate-y-1/2 w-16 h-16 backdrop-blur-xl rounded-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-300 animate-float delay-500 border shadow-lg ${isDarkMode
                                    ? 'border-gray-600/50 bg-gray-800/20'
                                    : 'border-gray-300/50 bg-white/20'
                                }`}>
                                <Database className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
                            </div>
                        </div>
                    </div>
                </main>

                {/* Features Section */}
                <section className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className={`text-3xl lg:text-4xl font-bold mb-4 font-space-grotesk ${isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                            Fitur <span className="text-transparent bg-gradient-to-r from-[#a4773e] to-[#d4a574] bg-clip-text">Unggulan</span>
                        </h2>
                        <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                            Platform komprehensif untuk eksplorasi dan dokumentasi kebudayaan Indonesia
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Feature 1 */}
                        <div className={`group backdrop-blur-xl rounded-2xl p-6 hover:border-[#a4773e]/50 transition-all duration-300 hover:transform hover:scale-105 border shadow-lg hover:shadow-xl ${isDarkMode
                                ? 'border-gray-600/50 bg-gray-800/20'
                                : 'border-gray-300/50 bg-white/20'
                            }`}>
                            <div className="w-12 h-12 bg-gradient-to-br from-[#a4773e] to-[#d4a574] rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[#a4773e]/25 transition-all duration-300">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <h3 className={`font-semibold mb-2 font-space-grotesk ${isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                }`}>Perpustakaan Digital</h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>Akses ribuan artikel dan dokumentasi budaya Indonesia dengan teknologi pencarian AI</p>
                        </div>

                        {/* Feature 2 */}
                        <div className={`group backdrop-blur-xl rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 border shadow-lg hover:shadow-xl ${isDarkMode
                                ? 'border-gray-600/50 bg-gray-800/20'
                                : 'border-gray-300/50 bg-white/20'
                            }`}>
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-cyan-400/25 transition-all duration-300">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                            <h3 className={`font-semibold mb-2 font-space-grotesk ${isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                }`}>Galeri Multimedia</h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>Koleksi foto, video, dan audio dokumentasi budaya tradisional berkualitas tinggi</p>
                        </div>

                        {/* Feature 3 - FIXED: Remove route() function */}
                        <Link
                            href="/map"
                            className={`group backdrop-blur-xl rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer border shadow-lg hover:shadow-xl ${isDarkMode
                                    ? 'border-gray-600/50 bg-gray-800/20'
                                    : 'border-gray-300/50 bg-white/20'
                                }`}
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-400/25 transition-all duration-300">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <h3 className={`font-semibold mb-2 font-space-grotesk ${isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                }`}>Peta Interaktif</h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>Jelajahi kebudayaan Indonesia berdasarkan wilayah dengan peta interaktif 3D</p>
                            <div className="mt-3">
                                <span className="inline-flex items-center text-xs text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                                    Klik untuk menjelajahi →
                                </span>
                            </div>
                        </Link>

                        {/* Feature 4 */}
                        <div className={`group backdrop-blur-xl rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 border shadow-lg hover:shadow-xl ${isDarkMode
                                ? 'border-gray-600/50 bg-gray-800/20'
                                : 'border-gray-300/50 bg-white/20'
                            }`}>
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-green-400/25 transition-all duration-300">
                                <Database className="w-6 h-6 text-white" />
                            </div>
                            <h3 className={`font-semibold mb-2 font-space-grotesk ${isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                }`}>Arsip Digital</h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>Sistem arsip digital canggih untuk pelestarian warisan budaya jangka panjang</p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className={`relative z-10 backdrop-blur-xl border-t shadow-lg ${isDarkMode
                        ? 'border-gray-600/50 bg-gray-800/20'
                        : 'border-gray-300/50 bg-white/20'
                    }`}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                        <div className="text-center space-y-6">
                            <div className="flex items-center justify-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#a4773e] to-[#d4a574] rounded-xl flex items-center justify-center shadow-lg shadow-[#a4773e]/25">
                                    <img
                                        src="/image/logo-batik.svg"
                                        alt="BudayaInd Logo"
                                        className="w-6 h-6 object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                            if (fallback) fallback.style.display = 'block';
                                        }}
                                    />
                                    <span className="hidden text-white font-bold text-sm">BI</span>
                                </div>
                                <span className={`font-semibold text-lg font-space-grotesk ${isDarkMode ? 'text-white' : 'text-gray-900'
                                    }`}>BudayaInd</span>
                            </div>

                            <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                Platform digital terdepan untuk eksplorasi, dokumentasi, dan pelestarian
                                kekayaan budaya Indonesia. Menghubungkan tradisi dengan teknologi modern.
                            </p>

                            <div className={`flex justify-center items-center space-x-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                <span>© 2025 BudayaInd</span>
                                <span className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                                    }`}></span>
                                <span>Portal Kebudayaan Indonesia</span>
                                <span className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                                    }`}></span>
                                <span>Made with ❤️ for Indonesia</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default function Welcome() {
    return <WelcomeContent />;
}
