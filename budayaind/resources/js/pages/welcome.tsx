import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, BookOpen, Camera, Globe, Users, Sparkles, Database, Package, Brain } from 'lucide-react';
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { FlipText } from "@/components/magicui/flip-text";
import { useAppearance } from "@/hooks/use-appearance";
import { getDashboardUrl } from "@/utils/navigation";
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Cultural locations data inspired by Rockstar Games style
const culturalLocations = [
    {
        id: 1,
        name: "CANDI SEWU",
        subtitle: "Jawa Tengah, Indonesia",
        description: "Kompleks candi Buddha terbesar kedua di Indonesia. Dibangun pada abad ke-8, Candi Sewu menjadi saksi bisu kejayaan Kerajaan Mataram Kuno.",
        quote: "WARISAN LELUHUR YANG ABADI SEPANJANG MASA",
        image: "/images/candiPlaosan.jpg",
        gradient: "from-amber-900 to-orange-800",
        textColor: "text-amber-100"
    },
    {
        id: 2,
        name: "DANAU TOBA",
        subtitle: "Sumatera Utara, Indonesia",
        description: "Danau vulkanik terbesar di dunia dengan kedalaman 505 meter. Pulau Samosir di tengahnya menjadi rumah bagi budaya Batak yang autentik.",
        quote: "KEAJAIBAN ALAM YANG MENYENTUH JIWA",
        image: "/images/danauToba.jpg",
        gradient: "from-blue-900 to-cyan-800",
        textColor: "text-blue-100"
    },
    {
        id: 3,
        name: "AIR TERJUN SEKUMPUL",
        subtitle: "Bali, Indonesia",
        description: "Air terjun tersembunyi dengan ketinggian 80 meter yang dikelilingi hutan tropis. Permata tersembunyi di jantung Bali Utara.",
        quote: "SURGA TERSEMBUNYI DI BUMI DEWATA",
        image: "/images/SharkBeach.jpg",
        gradient: "from-emerald-900 to-green-800",
        textColor: "text-emerald-100"
    },
    {
        id: 4,
        name: "MONUMEN NASIONAL",
        subtitle: "Jakarta, Indonesia",
        description: "Tugu setinggi 132 meter yang menjadi simbol perjuangan kemerdekaan Indonesia. Puncaknya dilapisi emas murni seberat 50 kilogram.",
        quote: "KEMERDEKAAN HARGA MATI",
        image: "/images/MataJitu.jpg",
        gradient: "from-yellow-900 to-amber-800",
        textColor: "text-yellow-100"
    },
    {
        id: 5,
        name: "PASAR TERAPUNG",
        subtitle: "Kalimantan Selatan, Indonesia",
        description: "Tradisi perdagangan di atas sungai yang telah berlangsung ratusan tahun. Perahu-perahu kayu berjejer menjual hasil bumi Kalimantan.",
        quote: "TRADISI YANG MENGALIR BERSAMA WAKTU",
        image: "/images/pasarTerapung.jpg",
        gradient: "from-orange-900 to-red-800",
        textColor: "text-orange-100"
    },
    {
        id: 6,
        name: "PATUNG YESUS MANADO",
        subtitle: "Sulawesi Utara, Indonesia",
        description: "Patung Kristus setinggi 50 meter yang berdiri megah di atas bukit. Simbol toleransi dan keberagaman agama di Indonesia.",
        quote: "PERSATUAN DALAM PERBEDAAN",
        image: "/images/patungYesus.jpg",
        gradient: "from-sky-900 to-blue-800",
        textColor: "text-sky-100"
    },
    {
        id: 7,
        name: "PURA LEMPUYANG",
        subtitle: "Bali, Indonesia",
        description: "Gerbang surga dengan pemandangan Gunung Agung yang menakjubkan. Pura suci yang menjadi gateway spiritual untuk mencapai pencerahan.",
        quote: "GERBANG MENUJU KEBAHAGIAAN ABADI",
        image: "/images/puraLempuyang.jpg",
        gradient: "from-purple-900 to-indigo-800",
        textColor: "text-purple-100"
    },
    {
        id: 8,
        name: "RUMAH JOGLO",
        subtitle: "Yogyakarta, Indonesia",
        description: "Arsitektur tradisional Jawa dengan filosofi mendalam. Setiap sudut dan ukiran mengandung makna kehidupan dan kosmologi Jawa.",
        quote: "RUMAH ADALAH CERMIN JIWA PEMILIKNYA",
        image: "/images/rumahjoglo.jpg",
        gradient: "from-amber-900 to-yellow-800",
        textColor: "text-amber-100"
    },
    {
        id: 9,
        name: "PANTAI SAWARNA",
        subtitle: "Banten, Indonesia",
        description: "Pantai dengan formasi batuan karang yang dramatis. Ombak yang menerjang bebatuan menciptakan simfoni alam yang memukau.",
        quote: "KEKUATAN ALAM YANG MENGINSPIRASI",
        image: "/images/SharkBeach.jpg",
        gradient: "from-slate-900 to-gray-800",
        textColor: "text-slate-100"
    },
    {
        id: 10,
        name: "TONGKONAN TORAJA",
        subtitle: "Sulawesi Selatan, Indonesia",
        description: "Rumah adat berbentuk perahu dengan filosofi spiritual yang dalam. Arsitektur yang mencerminkan hubungan antara dunia atas dan bawah.",
        quote: "KEHIDUPAN DAN KEMATIAN DALAM HARMONI",
        image: "/images/tongkonan.jpg",
        gradient: "from-brown-900 to-amber-800",
        textColor: "text-amber-100"
    }
];

// Parallax Section Component for Tourism Places
function ParallaxSection({ location, index }: { location: typeof culturalLocations[0], index: number }) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const bg = bgRef.current;
        const content = contentRef.current;

        if (!section || !bg || !content) return;

        // Background parallax effect
        gsap.fromTo(bg,
            { yPercent: -50 },
            {
                yPercent: 50,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );

        // Content reveal animation
        gsap.fromTo(content.children,
            {
                y: 100,
                opacity: 0,
                scale: 0.8
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );

    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden py-16 lg:py-20"
        >
            {/* Background Image with Parallax */}
            <div
                ref={bgRef}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
                style={{
                    backgroundImage: `url(${location.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className={`absolute inset-0 bg-gradient-to-br ${location.gradient} opacity-70`} />
            </div>

            {/* Content */}
            <div ref={contentRef} className="relative z-10 text-center px-6 lg:px-8 max-w-5xl mx-auto">
                <div className="space-y-8 lg:space-y-10">
                    <div className={`inline-block px-6 py-3 rounded-full border ${location.textColor} border-opacity-30 bg-black bg-opacity-20 backdrop-blur-sm`}>
                        <span className="text-lg lg:text-xl font-medium">{location.subtitle}</span>
                    </div>

                    <h1 className={`text-6xl lg:text-8xl xl:text-9xl font-bold font-space-grotesk ${location.textColor} leading-tight`}>
                        {location.name}
                    </h1>

                    <div className={`text-xl lg:text-2xl xl:text-3xl ${location.textColor} opacity-90 max-w-4xl mx-auto leading-relaxed`}>
                        {location.description}
                    </div>

                    <div className={`text-lg lg:text-xl xl:text-2xl font-semibold ${location.textColor} opacity-80 tracking-wider mt-12`}>
                        "{location.quote}"
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            {index === 0 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className={`w-6 h-10 border-2 ${location.textColor} border-opacity-50 rounded-full flex justify-center`}>
                        <div className={`w-1 h-3 ${location.textColor.replace('text-', 'bg-')} rounded-full mt-2 animate-pulse`}></div>
                    </div>
                </div>
            )}
        </section>
    );
}

function WelcomeContent() {
    const { auth } = usePage<SharedData>().props;
    const { appearance } = useAppearance();
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Get dashboard URL based on user role - FIXED: Proper null checking
    const dashboardUrl = auth?.user ? getDashboardUrl(auth.user.role as string) : '/customer/dashboard';

    // Initialize smooth scrolling with Lenis
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

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

                        html {
                            scroll-behavior: smooth;
                        }

                        body {
                            overflow-x: hidden;
                        }

                        /* Custom scrollbar */
                        ::-webkit-scrollbar {
                            width: 8px;
                        }

                        ::-webkit-scrollbar-track {
                            background: #1a1a1a;
                        }

                        ::-webkit-scrollbar-thumb {
                            background: linear-gradient(to bottom, #a4773e, #d4a574);
                            border-radius: 10px;
                        }

                        ::-webkit-scrollbar-thumb:hover {
                            background: linear-gradient(to bottom, #8b6635, #a4773e);
                        }
                    `
                }} />
            </Head>

            {/* Dynamic Background */}
            <div className="min-h-screen relative overflow-hidden transition-all duration-500">
                {/* Fixed Header Navigation */}
                <header className="fixed top-0 left-0 right-0 z-50 p-6 lg:p-8 backdrop-blur-md bg-black/10 border-b border-white/10">
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
                                    <span className="hidden text-white font-bold text-lg">BI</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-xl font-space-grotesk text-white">BudayaInd</span>
                                <span className="text-xs text-gray-300">Portal Kebudayaan Indonesia</span>
                            </div>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                href="/quiz"
                                className="px-4 py-2 font-medium transition-colors duration-300 rounded-xl flex items-center space-x-2 text-gray-200 hover:text-[#a4773e] hover:bg-white/10"
                            >
                                <Brain className="w-4 h-4" />
                                <span>Kuis Budaya</span>
                            </Link>

                            <Link
                                href="/tickets"
                                className="px-4 py-2 font-medium transition-colors duration-300 rounded-xl flex items-center space-x-2 text-gray-200 hover:text-[#a4773e] hover:bg-white/10"
                            >
                                <Package className="w-4 h-4" />
                                <span>Jelajahi Tiket</span>
                            </Link>

                            <Link
                                href="/map"
                                className="px-4 py-2 font-medium transition-colors duration-300 rounded-xl flex items-center space-x-2 text-gray-200 hover:text-[#a4773e] hover:bg-white/10"
                            >
                                <Globe className="w-4 h-4" />
                                <span>Map</span>
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
                                        className="px-6 py-2.5 font-medium transition-colors duration-300 rounded-xl text-gray-200 hover:text-[#a4773e] hover:bg-white/10"
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
                <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-12 lg:pt-40 lg:pb-20">
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
                                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-space-grotesk mb-2">500+</div>
                                <div className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'
                                    }`}>Situs Bersejarah</div>
                                <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Lokasi budaya terdaftar dengan pemetaan digital</div>
                            </div>
                            <div className={`backdrop-blur-xl rounded-2xl p-6 border shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode
                                    ? 'border-gray-600/50 bg-gray-800/20'
                                    : 'border-gray-300/50 bg-white/20'
                                }`}>
                                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text font-space-grotesk mb-2">50K+</div>
                                <div className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'
                                    }`}>Pengguna Aktif</div>
                                <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Komunitas pelestari budaya Indonesia</div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
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
                    <div className="text-center space-y-16">
                        {/* Section Header */}
                        <div className="space-y-6">
                            <h2 className={`text-4xl lg:text-5xl font-bold font-space-grotesk ${isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                Fitur <span className="text-transparent bg-gradient-to-r from-[#a4773e] to-[#d4a574] bg-clip-text">Unggulan</span>
                            </h2>
                            <p className={`text-xl leading-relaxed max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                Jelajahi kebudayaan Indonesia dengan teknologi terdepan yang dirancang khusus untuk pelestarian dan edukasi budaya
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Feature 1 */}
                            <Link
                                href="/quiz"
                                className={`group backdrop-blur-xl rounded-2xl p-6 hover:border-[#a4773e]/50 transition-all duration-300 hover:transform hover:scale-105 border shadow-lg hover:shadow-xl ${isDarkMode
                                        ? 'border-gray-600/50 bg-gray-800/20'
                                        : 'border-gray-300/50 bg-white/20'
                                    }`}
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-[#a4773e] to-[#d4a574] rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[#a4773e]/25 transition-all duration-300">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <h3 className={`font-semibold mb-2 font-space-grotesk ${isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                    }`}>Kuis Interaktif</h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Uji pengetahuan budaya Indonesia dengan kuis interaktif yang mendidik dan menyenangkan</p>
                                <div className="mt-3">
                                    <span className="inline-flex items-center text-xs text-[#a4773e] group-hover:text-[#d4a574] transition-colors duration-300">
                                        Mulai bermain →
                                    </span>
                                </div>
                            </Link>

                            {/* Feature 2 */}
                            <Link
                                href="/cultural-sites"
                                className={`group backdrop-blur-xl rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 border shadow-lg hover:shadow-xl ${isDarkMode
                                        ? 'border-gray-600/50 bg-gray-800/20'
                                        : 'border-gray-300/50 bg-white/20'
                                    }`}
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-cyan-400/25 transition-all duration-300">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                                <h3 className={`font-semibold mb-2 font-space-grotesk ${isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                    }`}>Galeri Virtual</h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Koleksi foto dan video berkualitas tinggi dari berbagai situs budaya di seluruh Indonesia</p>
                                <div className="mt-3">
                                    <span className="inline-flex items-center text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                                        Jelajahi galeri →
                                    </span>
                                </div>
                            </Link>

                            {/* Feature 3 */}
                            <Link
                                href="/cultural-sites"
                                className={`group backdrop-blur-xl rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 border shadow-lg hover:shadow-xl ${isDarkMode
                                        ? 'border-gray-600/50 bg-gray-800/20'
                                        : 'border-gray-300/50 bg-white/20'
                                    }`}
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-400/25 transition-all duration-300">
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
                    </div>
                </section>

                {/* Cultural Locations Parallax Sections */}
                {culturalLocations.map((location, index) => (
                    <ParallaxSection key={location.id} location={location} index={index} />
                ))}

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
