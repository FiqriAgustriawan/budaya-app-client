import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, BookOpen, Camera, Globe, Users, Sparkles, Database } from 'lucide-react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

function WelcomeContent() {
    const { auth } = usePage<SharedData>().props;
    const { theme } = useTheme();

    return (
        <>
            <Head title="BudayaInd - Portal Kebudayaan Indonesia">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .bg-grid-pattern-dark {
                            background-image:
                                linear-gradient(rgba(164, 119, 62, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(164, 119, 62, 0.1) 1px, transparent 1px);
                            background-size: 50px 50px;
                        }

                        .bg-grid-pattern-light {
                            background-image:
                                linear-gradient(rgba(164, 119, 62, 0.15) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(164, 119, 62, 0.15) 1px, transparent 1px);
                            background-size: 50px 50px;
                        }

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
            <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
                theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
                    : 'bg-gradient-to-br from-blue-50 via-white to-orange-50'
            }`}>
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    {/* Floating Orbs */}
                    <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
                        theme === 'dark'
                            ? 'bg-gradient-to-r from-[#a4773e]/20 to-cyan-500/20'
                            : 'bg-gradient-to-r from-[#a4773e]/10 to-blue-400/10'
                    }`}></div>
                    <div className={`absolute top-3/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 ${
                        theme === 'dark'
                            ? 'bg-gradient-to-r from-purple-500/20 to-[#a4773e]/20'
                            : 'bg-gradient-to-r from-orange-400/10 to-[#a4773e]/10'
                    }`}></div>
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl animate-pulse delay-2000 ${
                        theme === 'dark'
                            ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10'
                            : 'bg-gradient-to-r from-cyan-400/8 to-indigo-400/8'
                    }`}></div>

                    {/* Grid Pattern */}
                    <div className={`absolute inset-0 opacity-10 ${
                        theme === 'dark' ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'
                    }`}></div>

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 ${
                        theme === 'dark'
                            ? 'bg-gradient-to-br from-gray-900/80 via-transparent to-slate-900/80'
                            : 'bg-gradient-to-br from-blue-50/60 via-transparent to-orange-50/60'
                    }`}></div>
                </div>

                {/* Header Navigation */}
                <header className="relative z-20 p-6 lg:p-8">
                    <nav className="flex items-center justify-between max-w-7xl mx-auto">
                        {/* Logo Area */}
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#a4773e] to-[#d4a574] rounded-xl flex items-center justify-center shadow-lg shadow-[#a4773e]/25 group-hover:shadow-[#a4773e]/40 transition-all duration-300">
                                    <img
                                        src="/image/logo.png"
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
                                <p className={`text-sm font-light ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>Portal Kebudayaan Indonesia</p>
                            </div>
                        </Link>

                        {/* Navigation Links */}
                        <div className="flex items-center gap-4">
                            {/* Peta Link */}
                            <Link
                                href={route('map')}
                                className={`px-4 py-2 font-medium transition-colors duration-300 rounded-xl flex items-center space-x-2 ${
                                    theme === 'dark'
                                        ? 'text-gray-300 hover:text-[#a4773e] hover:bg-gray-800/50'
                                        : 'text-gray-700 hover:text-[#a4773e] hover:bg-gray-100/80'
                                }`}
                            >
                                <Globe className="w-4 h-4" />
                                <span>Peta</span>
                            </Link>

                            {/* Theme Toggle */}
                            <ThemeToggle size="md" />

                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="relative px-6 py-2.5 bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-white rounded-xl font-medium hover:from-[#8b6635] hover:to-[#a4773e] transition-all duration-300 shadow-lg shadow-[#a4773e]/25 hover:shadow-[#a4773e]/40 transform hover:scale-105 group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#a4773e]/20 to-[#d4a574]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative">Dashboard</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className={`px-6 py-2.5 font-medium transition-colors duration-300 rounded-xl ${
                                            theme === 'dark'
                                                ? 'text-gray-300 hover:text-[#a4773e] hover:bg-gray-800/50'
                                                : 'text-gray-700 hover:text-[#a4773e] hover:bg-gray-100/80'
                                        }`}
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
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
                                <div className={`inline-flex items-center px-6 py-3 backdrop-blur-sm rounded-full ${
                                    theme === 'dark'
                                        ? 'bg-gray-800/50 border border-gray-700/50'
                                        : 'bg-white/80 border border-gray-200/80'
                                }`}>
                                    <Sparkles className="w-5 h-5 text-[#a4773e] mr-3" />
                                    <span className={`text-base font-medium ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                    }`}>Portal Digital Kebudayaan Indonesia</span>
                                </div>

                                <h1 className="text-6xl lg:text-8xl font-bold leading-tight font-space-grotesk max-w-5xl mx-auto">
                                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Jelajahi</span>
                                    <br />
                                    <span className="text-transparent bg-gradient-to-r from-[#a4773e] to-[#d4a574] bg-clip-text">
                                        Kebudayaan
                                    </span>
                                    <br />
                                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Nusantara</span>
                                </h1>
                            </div>

                            <p className={`text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                Temukan, dokumentasikan, dan lestarikan kekayaan budaya Indonesia.
                                Platform digital yang menghubungkan tradisi masa lalu dengan teknologi masa depan.
                            </p>
                        </div>

                        {/* Feature Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className={`backdrop-blur-xl rounded-2xl p-6 ${
                                theme === 'dark'
                                    ? 'bg-gray-800/30 border border-gray-700/50'
                                    : 'bg-white/70 border border-gray-200/70'
                            }`}>
                                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-[#a4773e] to-[#d4a574] bg-clip-text font-space-grotesk mb-2">1000+</div>
                                <div className={`text-lg font-medium ${
                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                                }`}>Artikel Budaya</div>
                                <div className={`text-sm mt-1 ${
                                    theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                                }`}>Dokumentasi lengkap warisan nusantara</div>
                            </div>
                            <div className={`backdrop-blur-xl rounded-2xl p-6 ${
                                theme === 'dark'
                                    ? 'bg-gray-800/30 border border-gray-700/50'
                                    : 'bg-white/70 border border-gray-200/70'
                            }`}>
                                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text font-space-grotesk mb-2">500+</div>
                                <div className={`text-lg font-medium ${
                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                                }`}>Media Visual</div>
                                <div className={`text-sm mt-1 ${
                                    theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                                }`}>Foto, video, dan audio berkualitas tinggi</div>
                            </div>
                            <div className={`backdrop-blur-xl rounded-2xl p-6 ${
                                theme === 'dark'
                                    ? 'bg-gray-800/30 border border-gray-700/50'
                                    : 'bg-white/70 border border-gray-200/70'
                            }`}>
                                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-space-grotesk mb-2">34</div>
                                <div className={`text-lg font-medium ${
                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                                }`}>Provinsi</div>
                                <div className={`text-sm mt-1 ${
                                    theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                                }`}>Cakupan seluruh Indonesia</div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                            {!auth.user ? (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="group relative px-10 py-5 bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-white rounded-2xl font-semibold text-lg hover:from-[#8b6635] hover:to-[#a4773e] transition-all duration-300 shadow-xl shadow-[#a4773e]/25 hover:shadow-[#a4773e]/40 transform hover:scale-105 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#a4773e]/20 to-[#d4a574]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="relative flex items-center justify-center">
                                            Mulai Jelajahi Sekarang
                                            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                                        </span>
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="group px-10 py-5 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-2xl font-semibold text-lg hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/50 hover:border-gray-500/70"
                                    >
                                        <span className="flex items-center justify-center">
                                            Masuk ke Akun
                                            <Users className="w-6 h-6 ml-3" />
                                        </span>
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href={route('dashboard')}
                                    className="group relative px-10 py-5 bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-white rounded-2xl font-semibold text-lg hover:from-[#8b6635] hover:to-[#a4773e] transition-all duration-300 shadow-xl shadow-[#a4773e]/25 hover:shadow-[#a4773e]/40 transform hover:scale-105 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#a4773e]/20 to-[#d4a574]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center">
                                        Masuk ke Dashboard
                                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                                    </span>
                                </Link>
                            )}
                        </div>

                        {/* Floating Decorative Elements */}
                        <div className="relative max-w-6xl mx-auto">
                            <div className={`absolute top-0 left-1/4 w-20 h-20 backdrop-blur-xl rounded-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-300 animate-float ${
                                theme === 'dark'
                                    ? 'bg-gray-800/40 border border-gray-700/50'
                                    : 'bg-white/60 border border-gray-200/60'
                            }`}>
                                <BookOpen className="w-8 h-8 text-[#a4773e] group-hover:text-[#d4a574] transition-colors duration-300" />
                            </div>

                            <div className={`absolute top-0 right-1/4 w-20 h-20 backdrop-blur-xl rounded-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-300 animate-float delay-1000 ${
                                theme === 'dark'
                                    ? 'bg-gray-800/40 border border-gray-700/50'
                                    : 'bg-white/60 border border-gray-200/60'
                            }`}>
                                <Camera className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                            </div>

                            <div className={`absolute top-1/2 left-0 transform -translate-y-1/2 w-16 h-16 backdrop-blur-xl rounded-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-300 animate-float delay-2000 ${
                                theme === 'dark'
                                    ? 'bg-gray-800/40 border border-gray-700/50'
                                    : 'bg-white/60 border border-gray-200/60'
                            }`}>
                                <Globe className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                            </div>

                            <div className={`absolute top-1/2 right-0 transform -translate-y-1/2 w-16 h-16 backdrop-blur-xl rounded-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-300 animate-float delay-500 ${
                                theme === 'dark'
                                    ? 'bg-gray-800/40 border border-gray-700/50'
                                    : 'bg-white/60 border border-gray-200/60'
                            }`}>
                                <Database className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
                            </div>
                        </div>
                    </div>
                </main>
                {/* Features Section */}
                <section className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className={`text-3xl lg:text-4xl font-bold mb-4 font-space-grotesk ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                            Fitur <span className="text-transparent bg-gradient-to-r from-[#a4773e] to-[#d4a574] bg-clip-text">Unggulan</span>
                        </h2>
                        <p className={`text-lg max-w-2xl mx-auto ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            Platform komprehensif untuk eksplorasi dan dokumentasi kebudayaan Indonesia
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Feature 1 */}
                        <div className={`group backdrop-blur-xl rounded-2xl p-6 hover:border-[#a4773e]/50 transition-all duration-300 hover:transform hover:scale-105 ${
                            theme === 'dark'
                                ? 'bg-gray-800/30 border border-gray-700/50'
                                : 'bg-white/70 border border-gray-200/70'
                        }`}>
                            <div className="w-12 h-12 bg-gradient-to-br from-[#a4773e] to-[#d4a574] rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[#a4773e]/25 transition-all duration-300">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <h3 className={`font-semibold mb-2 font-space-grotesk ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>Perpustakaan Digital</h3>
                            <p className={`text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>Akses ribuan artikel dan dokumentasi budaya Indonesia dengan teknologi pencarian AI</p>
                        </div>

                        {/* Feature 2 */}
                        <div className={`group backdrop-blur-xl rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 ${
                            theme === 'dark'
                                ? 'bg-gray-800/30 border border-gray-700/50'
                                : 'bg-white/70 border border-gray-200/70'
                        }`}>
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-cyan-400/25 transition-all duration-300">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                            <h3 className={`font-semibold mb-2 font-space-grotesk ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>Galeri Multimedia</h3>
                            <p className={`text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>Koleksi foto, video, dan audio dokumentasi budaya tradisional berkualitas tinggi</p>
                        </div>

                        {/* Feature 3 */}
                        <div className={`group backdrop-blur-xl rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer ${
                            theme === 'dark'
                                ? 'bg-gray-800/30 border border-gray-700/50'
                                : 'bg-white/70 border border-gray-200/70'
                        }`}
                        onClick={() => window.location.href = route('map')}
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-400/25 transition-all duration-300">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <h3 className={`font-semibold mb-2 font-space-grotesk ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>Peta Interaktif</h3>
                            <p className={`text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>Jelajahi kebudayaan Indonesia berdasarkan wilayah dengan peta interaktif 3D</p>
                            <div className="mt-3">
                                <span className="inline-flex items-center text-xs text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                                    Klik untuk menjelajahi →
                                </span>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className={`group backdrop-blur-xl rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 ${
                            theme === 'dark'
                                ? 'bg-gray-800/30 border border-gray-700/50'
                                : 'bg-white/70 border border-gray-200/70'
                        }`}>
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-green-400/25 transition-all duration-300">
                                <Database className="w-6 h-6 text-white" />
                            </div>
                            <h3 className={`font-semibold mb-2 font-space-grotesk ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>Arsip Digital</h3>
                            <p className={`text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>Sistem arsip digital canggih untuk pelestarian warisan budaya jangka panjang</p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className={`relative z-10 backdrop-blur-xl ${
                    theme === 'dark'
                        ? 'border-t border-gray-700/50 bg-gray-800/20'
                        : 'border-t border-gray-200/50 bg-white/20'
                }`}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                        <div className="text-center space-y-6">
                            <div className="flex items-center justify-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#a4773e] to-[#d4a574] rounded-xl flex items-center justify-center shadow-lg shadow-[#a4773e]/25">
                                    <img
                                        src="/image/logo.png"
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
                                <span className={`font-semibold text-lg font-space-grotesk ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>BudayaInd</span>
                            </div>

                            <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                Platform digital terdepan untuk eksplorasi, dokumentasi, dan pelestarian
                                kekayaan budaya Indonesia. Menghubungkan tradisi dengan teknologi modern.
                            </p>

                            <div className={`flex justify-center items-center space-x-6 text-sm ${
                                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                            }`}>
                                <span>© 2025 BudayaInd</span>
                                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                <span>Portal Kebudayaan Indonesia</span>
                                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
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
    return (
        <ThemeProvider>
            <WelcomeContent />
        </ThemeProvider>
    );
}
