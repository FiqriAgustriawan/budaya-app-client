import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Brain, Trophy, Users, Clock, Play, BookOpen, Building2, Flower, Home, Crown, Feather, Mountain, Trees, Flag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';

// Data provinsi untuk quiz
const provinces = [
    {
        id: 'jawa-tengah',
        name: 'Jawa Tengah',
        description: 'Budaya Jawa klasik, batik, dan tradisi keraton',
        difficulty: 'Mudah',
        questions: 20,
        time: 15,
        image: '/public/images/tongkonan.jpg', // Gambar: Candi Borobudur/Prambanan, Batik, Keraton Solo/Yogya
        color: 'from-amber-400 to-orange-500',
        icon: Building2
    },
    {
        id: 'bali',
        name: 'Bali',
        description: 'Seni, tarian, dan tradisi Hindu-Bali',
        difficulty: 'Mudah',
        questions: 20,
        time: 15,
        image: '/images/bali.jpg', // Gambar: Pura Tanah Lot, Penari Legong, Padi Terrasering Jatiluwih
        color: 'from-emerald-400 to-teal-500',
        icon: Flower
    },
    {
        id: 'sumatera-barat',
        name: 'Sumatera Barat',
        description: 'Budaya Minangkabau dan tradisi matrilineal',
        difficulty: 'Mudah',
        questions: 20,
        time: 15,
        image: '/images/sumbar.jpg', // Gambar: Rumah Gadang, Danau Maninjau, Rendang/Masakan Padang
        color: 'from-red-400 to-pink-500',
        icon: Home
    },
    {
        id: 'yogyakarta',
        name: 'DI Yogyakarta',
        description: 'Kota budaya dengan warisan sultan dan tradisi',
        difficulty: 'Mudah',
        questions: 20,
        time: 15,
        image: '/images/yogya.jpg', // Gambar: Keraton Yogyakarta, Malioboro, Gudeg, Tugu Yogya
        color: 'from-blue-400 to-indigo-500',
        icon: Crown
    },
    {
        id: 'papua',
        name: 'Papua',
        description: 'Budaya asli Papua dan tradisi suku-suku',
        difficulty: 'Sulit',
        questions: 25,
        time: 20,
        image: '/images/papua.jpg', // Gambar: Cendrawasih, Suku Dani, Pegunungan Jayawijaya, Honai
        color: 'from-purple-400 to-violet-500',
        icon: Feather
    },
    {
        id: 'sulawesi-selatan',
        name: 'Sulawesi Selatan',
        description: 'Budaya Bugis, Makassar, dan Toraja',
        difficulty: 'Menengah',
        questions: 25,
        time: 20,
        image: '/images/tongkonan.jpg', // Gambar: Rumah Tongkonan, Kapal Pinisi, Benteng Rotterdam
        color: 'from-cyan-400 to-blue-500',
        icon: Mountain
    },
    {
        id: 'kalimantan',
        name: 'Kalimantan',
        description: 'Budaya Dayak dan tradisi sungai',
        difficulty: 'Menengah',
        questions: 25,
        time: 20,
        image: '/images/kalimantan.jpg', // Gambar: Rumah Betang, Orangutan, Sungai Mahakam, Dayak Dance
        color: 'from-green-400 to-emerald-500',
        icon: Trees
    },
    {
        id: 'indonesia',
        name: 'Indonesia',
        description: 'Pengetahuan umum budaya Indonesia',
        difficulty: 'Sulit',
        questions: 30,
        time: 25,
        image: '/images/indonesia.jpg', // Gambar: Garuda Pancasila, Tari Saman, Wayang, Bendera Merah Putih
        color: 'from-red-500 to-red-600',
        icon: Flag
    }
];

// Data statistik quiz
const quizStats = {
    totalPlayers: 12543,
    totalQuestions: 2340,
    averageScore: 78,
    completionRate: 89
};

function QuizContent() {
    const { appearance } = useAppearance();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [showQuizModal, setShowQuizModal] = useState(false);

    useEffect(() => {
        const updateTheme = () => {
            const newIsDarkMode = appearance === 'dark' ||
                (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
            setIsDarkMode(newIsDarkMode);
        };

        updateTheme();

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemChange = () => {
            if (appearance === 'system') {
                updateTheme();
            }
        };

        mediaQuery.addEventListener('change', handleSystemChange);
        return () => mediaQuery.removeEventListener('change', handleSystemChange);
    }, [appearance]);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Mudah':
                return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'Menengah':
                return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            case 'Sulit':
                return 'text-red-500 bg-red-500/10 border-red-500/20';
            default:
                return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
        }
    };

    const handleStartQuiz = (provinceId: string) => {
        // Route to specific province quiz pages
        switch (provinceId) {
            case 'jawa-tengah':
                router.visit(route('quiz.jawa-tengah'));
                break;
            case 'bali':
                router.visit(route('quiz.bali'));
                break;
            case 'sumatera-barat':
                router.visit(route('quiz.sumatera-barat'));
                break;
            case 'yogyakarta':
                router.visit(route('quiz.yogyakarta'));
                break;
            case 'papua':
                router.visit(route('quiz.papua'));
                break;
            case 'sulawesi-selatan':
                router.visit(route('quiz.sulawesi-selatan'));
                break;
            case 'kalimantan':
                router.visit(route('quiz.kalimantan'));
                break;
            case 'indonesia':
                router.visit(route('quiz.indonesia'));
                break;
            default:
                setSelectedProvince(provinceId);
                setShowQuizModal(true);
        }
    };

    return (
        <>
            <Head title="Quiz Budaya - BudayaInd">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen transition-all duration-500">
                {/* Header */}
                <header className="relative z-30 p-4 lg:p-6">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        {/* Back Button & Logo */}
                        <div className="flex items-center space-x-4">
                            <Link
                                href={route('home')}
                                className={`p-3 rounded-xl transition-all duration-300 group border ${
                                    isDarkMode
                                        ? 'border-slate-700/50 hover:border-slate-600/50'
                                        : 'border-slate-200/80 hover:border-slate-300/80'
                                }`}
                            >
                                <ArrowLeft className={`w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200 ${
                                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                                }`} />
                            </Link>

                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#a4773e] to-[#d4a574] rounded-xl flex items-center justify-center shadow-lg shadow-[#a4773e]/25">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className={`text-xl font-bold font-space-grotesk ${
                                        isDarkMode ? 'text-white' : 'text-slate-900'
                                    }`}>
                                        Quiz Budaya Indonesia
                                    </h1>
                                    <p className={`text-sm ${
                                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                    }`}>Uji pengetahuan budaya nusantara</p>
                                </div>
                            </div>
                        </div>

                        {/* Theme Toggle */}
                        <AnimatedThemeToggler />
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 lg:px-6 pb-12">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="space-y-6">
                            <div className={`inline-flex items-center px-6 py-3 backdrop-blur-sm rounded-full border shadow-sm ${
                                isDarkMode
                                    ? 'border-gray-600/50'
                                    : 'border-gray-300/50'
                            }`}>
                                <Trophy className="w-5 h-5 text-[#a4773e] mr-3" />
                                <span className={`text-base font-medium ${
                                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                }`}>Tantang Pengetahuan Budaya Anda</span>
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-4xl lg:text-6xl font-bold leading-tight font-space-grotesk max-w-4xl mx-auto">
                                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Quiz</span>
                                    <br />
                                    <span className="text-transparent bg-gradient-to-r from-[#a4773e] to-[#d4a574] bg-clip-text">
                                        Budaya
                                    </span>
                                    <br />
                                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Nusantara</span>
                                </h1>
                            </div>

                            <p className={`text-xl leading-relaxed max-w-3xl mx-auto ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                Pilih provinsi dan uji seberapa dalam pengetahuan Anda tentang kekayaan budaya Indonesia
                            </p>
                        </div>

                        {/* Quiz Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
                            <div className={`backdrop-blur-xl rounded-2xl p-6 border shadow-lg ${
                                isDarkMode
                                    ? 'border-gray-600/50'
                                    : 'border-gray-300/50'
                            }`}>
                                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-[#a4773e] to-[#d4a574] bg-clip-text font-space-grotesk mb-2">
                                    {quizStats.totalPlayers.toLocaleString()}
                                </div>
                                <div className={`text-sm font-medium ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>Pemain</div>
                            </div>
                            <div className={`backdrop-blur-xl rounded-2xl p-6 border shadow-lg ${
                                isDarkMode
                                    ? 'border-gray-600/50'
                                    : 'border-gray-300/50'
                            }`}>
                                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text font-space-grotesk mb-2">
                                    {quizStats.totalQuestions.toLocaleString()}
                                </div>
                                <div className={`text-sm font-medium ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>Soal</div>
                            </div>
                            <div className={`backdrop-blur-xl rounded-2xl p-6 border shadow-lg ${
                                isDarkMode
                                    ? 'border-gray-600/50'
                                    : 'border-gray-300/50'
                            }`}>
                                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text font-space-grotesk mb-2">
                                    {quizStats.averageScore}%
                                </div>
                                <div className={`text-sm font-medium ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>Rata-rata Skor</div>
                            </div>
                            <div className={`backdrop-blur-xl rounded-2xl p-6 border shadow-lg ${
                                isDarkMode
                                    ? 'border-gray-600/50'
                                    : 'border-gray-300/50'
                            }`}>
                                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-space-grotesk mb-2">
                                    {quizStats.completionRate}%
                                </div>
                                <div className={`text-sm font-medium ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>Tingkat Selesai</div>
                            </div>
                        </div>
                    </div>

                    {/* Province Selection */}
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className={`text-3xl font-bold mb-4 font-space-grotesk ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                Pilih <span className="text-transparent bg-gradient-to-r from-[#a4773e] to-[#d4a574] bg-clip-text">Provinsi</span>
                            </h2>
                            <p className={`text-lg ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                Setiap provinsi memiliki tantangan dan tingkat kesulitan yang berbeda
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {provinces.map((province) => (
                                <div
                                    key={province.id}
                                    className={`group backdrop-blur-xl rounded-2xl border transition-all duration-300 hover:transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl overflow-hidden ${
                                        isDarkMode
                                            ? 'border-gray-600/50 hover:border-gray-500/70'
                                            : 'border-gray-300/50 hover:border-gray-400/70'
                                    }`}
                                    onClick={() => handleStartQuiz(province.id)}
                                >
                                    {/* Province Image Header */}
                                    <div className="relative h-32 bg-gradient-to-br from-gray-100 via-gray-50 to-white overflow-hidden">
                                        {/* Background Pattern */}
                                        <div className="absolute inset-0 opacity-20">
                                            <div className={`w-full h-full bg-gradient-to-br ${province.color}`}></div>
                                        </div>

                                        {/* Actual Province Image */}
                                        {province.image && (
                                            <img
                                                src={province.image}
                                                alt={`${province.name} cultural imagery`}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                onError={(e) => {
                                                    // Fallback to placeholder if image fails to load
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        )}

                                        {/* Overlay untuk readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                                        {/* Icon dan Badge overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                                                    <province.icon className="w-8 h-8 text-gray-700" />
                                                </div>
                                                <div className={`px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-medium border shadow-sm ${getDifficultyColor(province.difficulty)}`}>
                                                    {province.difficulty}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover effect overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6">
                                        {/* Province Name */}
                                        <h3 className={`font-bold text-lg mb-2 font-space-grotesk ${
                                            isDarkMode ? 'text-white' : 'text-gray-900'
                                        }`}>
                                            {province.name}
                                        </h3>

                                        {/* Description */}
                                        <p className={`text-sm mb-4 line-clamp-2 ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            {province.description}
                                        </p>

                                        {/* Quiz Info */}
                                        <div className="flex items-center justify-between mb-4 text-sm">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center">
                                                    <BookOpen className={`w-4 h-4 mr-1 ${
                                                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                    }`} />
                                                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                                        {province.questions} soal
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className={`w-4 h-4 mr-1 ${
                                                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                    }`} />
                                                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                                        {province.time} menit
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Start Button */}
                                        <button className={`w-full py-3 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r ${province.color} text-white hover:shadow-lg flex items-center justify-center group-hover:from-[#a4773e] group-hover:to-[#d4a574]`}>
                                            <Play className="w-4 h-4 mr-2" />
                                            Mulai Quiz
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Feature Info */}
                    <div className="mt-16 text-center">
                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className={`backdrop-blur-xl rounded-2xl p-6 border shadow-lg ${
                                isDarkMode
                                    ? 'border-gray-600/50'
                                    : 'border-gray-300/50'
                            }`}>
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <h3 className={`font-semibold mb-2 font-space-grotesk ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>Soal Berkualitas</h3>
                                <p className={`text-sm ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    Soal-soal yang disusun oleh ahli budaya dengan berbagai tingkat kesulitan
                                </p>
                            </div>

                            <div className={`backdrop-blur-xl rounded-2xl p-6 border shadow-lg ${
                                isDarkMode
                                    ? 'border-gray-600/50'
                                    : 'border-gray-300/50'
                            }`}>
                                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <Trophy className="w-6 h-6 text-white" />
                                </div>
                                <h3 className={`font-semibold mb-2 font-space-grotesk ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>Sistem Poin</h3>
                                <p className={`text-sm ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    Dapatkan poin dan lencana berdasarkan performa quiz Anda
                                </p>
                            </div>

                            <div className={`backdrop-blur-xl rounded-2xl p-6 border shadow-lg ${
                                isDarkMode
                                    ? 'border-gray-600/50'
                                    : 'border-gray-300/50'
                            }`}>
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className={`font-semibold mb-2 font-space-grotesk ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>Leaderboard</h3>
                                <p className={`text-sm ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    Bersaing dengan pemain lain dan lihat ranking Anda
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Quiz Start Modal */}
                {showQuizModal && selectedProvince && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className={`max-w-md w-full rounded-2xl p-8 border ${
                            isDarkMode
                                ? 'border-gray-700/50'
                                : 'border-gray-200/70'
                        }`}>
                            {(() => {
                                const province = provinces.find(p => p.id === selectedProvince);
                                if (!province) return null;

                                return (
                                    <>
                                        <div className="text-center mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <province.icon className="w-8 h-8 text-gray-700" />
                                            </div>
                                            <h3 className={`text-2xl font-bold font-space-grotesk mb-2 ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                Quiz {province.name}
                                            </h3>
                                            <p className={`text-sm ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                {province.description}
                                            </p>
                                        </div>

                                        <div className="space-y-4 mb-6">
                                            <div className="flex justify-between items-center">
                                                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                                    Jumlah Soal:
                                                </span>
                                                <span className={`font-semibold ${
                                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                    {province.questions} soal
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                                    Waktu:
                                                </span>
                                                <span className={`font-semibold ${
                                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                    {province.time} menit
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                                    Tingkat:
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(province.difficulty)}`}>
                                                    {province.difficulty}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => setShowQuizModal(false)}
                                                className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-300 font-medium ${
                                                    isDarkMode
                                                        ? 'border-gray-600 text-gray-300 hover:bg-gray-800/50'
                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50/50'
                                                }`}
                                            >
                                                Batal
                                            </button>
                                            <button
                                                onClick={() => {
                                                    // Implement quiz start logic here
                                                    console.log('Starting quiz for:', province.name);
                                                    setShowQuizModal(false);
                                                }}
                                                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-white rounded-xl font-medium hover:from-[#8b6635] hover:to-[#a4773e] transition-all duration-300 flex items-center justify-center"
                                            >
                                                <Play className="w-4 h-4 mr-2" />
                                                Mulai Sekarang
                                            </button>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default function Quiz() {
    return <QuizContent />;
}
