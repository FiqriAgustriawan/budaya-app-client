import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, MapPin, Search, Filter, Info, Camera, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';
import { InteractiveMap } from '@/components/InteractiveMap';

// Sample data untuk demo dengan koordinat yang disesuaikan dengan peta baru
const culturalSites = [
    {
        id: 1,
        name: "Candi Borobudur",
        province: "Jawa Tengah",
        category: "Candi",
        coordinates: { lat: -7.6079, lng: 110.2038 }, // Koordinat asli: akan di-convert ke peta SVG
        description: "Candi Buddha terbesar di dunia yang dibangun pada abad ke-8.",
        image: "/images/borobudur.jpg",
        articles: 15,
        photos: 120,
        videos: 8
    },
    {
        id: 2,
        name: "Tari Kecak Bali",
        province: "Bali",
        category: "Tarian",
        coordinates: { lat: -8.5069, lng: 115.2625 },
        description: "Tarian tradisional Bali yang terkenal dengan gerakan dan musik yang unik.",
        image: "/images/kecak.jpg",
        articles: 8,
        photos: 85,
        videos: 12
    },
    {
        id: 3,
        name: "Rumah Gadang",
        province: "Sumatera Barat",
        category: "Arsitektur",
        coordinates: { lat: -0.7893, lng: 100.6500 },
        description: "Rumah adat Minangkabau dengan atap melengkung yang ikonik.",
        image: "/images/rumah-gadang.jpg",
        articles: 12,
        photos: 95,
        videos: 6
    },
    {
        id: 4,
        name: "Batik Yogyakarta",
        province: "DI Yogyakarta",
        category: "Kerajinan",
        coordinates: { lat: -7.7956, lng: 112.3695 },
        description: "Seni batik tradisional dengan motif khas Yogyakarta.",
        image: "/images/batik-yogya.jpg",
        articles: 20,
        photos: 150,
        videos: 15
    },
    {
        id: 5,
        name: "Toraja Traditional Houses",
        province: "Sulawesi Selatan",
        category: "Arsitektur",
        coordinates: { lat: -3.0977, lng: 119.8707 },
        description: "Rumah adat Toraja dengan arsitektur unik dan filosofi mendalam.",
        image: "/images/toraja.jpg",
        articles: 10,
        photos: 78,
        videos: 9
    },
    {
        id: 6,
        name: "Tifa Papua",
        province: "Papua",
        category: "Musik",
        coordinates: { lat: -4.0695, lng: 138.0814 },
        description: "Alat musik tradisional Papua yang dimainkan dalam upacara adat.",
        image: "/images/tifa.jpg",
        articles: 6,
        photos: 45,
        videos: 5
    },
    {
        id: 7,
        name: "Sasirangan Banjar",
        province: "Kalimantan Selatan",
        category: "Kerajinan",
        coordinates: { lat: -3.3194, lng: 114.5906 },
        description: "Kain tradisional Banjar dengan teknik celup ikat yang unik.",
        image: "/images/sasirangan.jpg",
        articles: 8,
        photos: 62,
        videos: 4
    },
    {
        id: 8,
        name: "Maluku Spices",
        province: "Maluku",
        category: "Kuliner",
        coordinates: { lat: -3.2385, lng: 130.1453 },
        description: "Rempah-rempah legendaris yang menjadi incaran dunia sejak masa lalu.",
        image: "/images/maluku-spices.jpg",
        articles: 14,
        photos: 89,
        videos: 7
    }
];

const provinces = [
    "Semua Provinsi",
    "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan",
    "Bengkulu", "Lampung", "Kepulauan Bangka Belitung", "Kepulauan Riau",
    "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Banten",
    "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
    "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
    "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat",
    "Maluku", "Maluku Utara", "Papua Barat", "Papua"
];

const categories = ["Semua Kategori", "Candi", "Tarian", "Arsitektur", "Kerajinan", "Musik", "Kuliner", "Upacara", "Pakaian", "Seni Rupa"];

function MapContent() {
    const { appearance } = useAppearance();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedSite, setSelectedSite] = useState<typeof culturalSites[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('Semua Provinsi');
    const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
    const [showFilters, setShowFilters] = useState(false);
    const [showStats, setShowStats] = useState(true);
    const [showTutorial, setShowTutorial] = useState(false);

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

    // Filter sites based on search and filters
    const filteredSites = culturalSites.filter(site => {
        const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            site.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesProvince = selectedProvince === 'Semua Provinsi' || site.province === selectedProvince;
        const matchesCategory = selectedCategory === 'Semua Kategori' || site.category === selectedCategory;

        return matchesSearch && matchesProvince && matchesCategory;
    });

    const handleSiteSelect = (site: typeof culturalSites[0]) => {
        setSelectedSite(site);
    };

    return (
        <>
            <Head title="Peta Interaktif - BudayaInd">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <link href="/css/map.css" rel="stylesheet" />
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
                                        ? 'border-slate-700/50 hover:bg-slate-700/50'
                                        : 'border-slate-200/80 hover:bg-slate-50/80'
                                }`}
                            >
                                <ArrowLeft className={`w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200 ${
                                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                                }`} />
                            </Link>

                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-400 rounded-xl flex items-center justify-center shadow-lg shadow-slate-500/25">
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
                                <div>
                                    <h1 className={`text-xl font-bold font-space-grotesk ${
                                        isDarkMode ? 'text-white' : 'text-slate-900'
                                    }`}>
                                        Peta Budaya Indonesia
                                    </h1>
                                    <p className={`text-sm ${
                                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                    }`}>Eksplorasi interaktif warisan nusantara</p>
                                </div>
                            </div>
                        </div>

                        {/* Theme Toggle */}
                        <div className="flex items-center space-x-3">
                            {/* Tutorial Button */}
                            <button
                                onClick={() => setShowTutorial(true)}
                                className={`p-3 rounded-xl transition-all duration-300 group border ${
                                    isDarkMode
                                        ? 'border-slate-700/50 hover:bg-slate-700/50 text-slate-300'
                                        : 'border-slate-200/80 hover:bg-slate-50/80 text-slate-700'
                                }`}
                                title="Panduan Penggunaan"
                            >
                                <Info className="w-5 h-5" />
                            </button>
                            <AnimatedThemeToggler />
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex h-[calc(100vh-120px)] max-w-7xl mx-auto px-4 lg:px-6 gap-6">
                    {/* Sidebar */}
                    <div className={`w-80 backdrop-blur-xl rounded-2xl p-6 overflow-y-auto custom-scrollbar border ${
                        isDarkMode
                            ? 'border-slate-700/50'
                            : 'border-slate-200/70'
                    }`}>
                        {/* Search Bar */}
                        <div className="mb-6">
                            <div className="relative">
                                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                                }`} />
                                <input
                                    type="text"
                                    placeholder="Cari lokasi budaya..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent search-input-focus ${
                                        isDarkMode
                                            ? 'border-slate-600 text-white placeholder-slate-400'
                                            : 'border-slate-300 text-slate-900 placeholder-slate-500'
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="mb-6">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 border ${
                                    isDarkMode
                                        ? 'border-gray-700/50 text-gray-300 hover:bg-gray-700/50'
                                        : 'border-gray-300/50 text-gray-700 hover:bg-gray-100/80'
                                }`}
                            >
                                <span className="flex items-center">
                                    <Filter className="w-5 h-5 mr-2" />
                                    Filter & Kategori
                                </span>
                                <div className={`transform transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`}>
                                    ↓
                                </div>
                            </button>

                            {showFilters && (
                                <div className="mt-4 space-y-4">
                                    {/* Province Filter */}
                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${
                                            isDarkMode ? 'text-slate-300' : 'text-slate-700'
                                        }`}>
                                            Provinsi
                                        </label>
                                        <select
                                            value={selectedProvince}
                                            onChange={(e) => setSelectedProvince(e.target.value)}
                                            className={`w-full p-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${
                                                isDarkMode
                                                    ? 'border-slate-600 text-white'
                                                    : 'border-slate-300 text-slate-900'
                                            }`}
                                            style={isDarkMode ? { colorScheme: 'dark' } : {}}
                                        >
                                            {provinces.map(province => (
                                                <option
                                                    key={province}
                                                    value={province}
                                                    style={{ color: 'black', backgroundColor: 'white' }}
                                                >
                                                    {province}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Category Filter */}
                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${
                                            isDarkMode ? 'text-slate-300' : 'text-slate-700'
                                        }`}>
                                            Kategori
                                        </label>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className={`w-full p-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${
                                                isDarkMode
                                                    ? 'border-slate-600 text-white'
                                                    : 'border-slate-300 text-slate-900'
                                            }`}
                                            style={isDarkMode ? { colorScheme: 'dark' } : {}}
                                        >
                                            {categories.map(category => (
                                                <option
                                                    key={category}
                                                    value={category}
                                                    style={{ color: 'black', backgroundColor: 'white' }}
                                                >
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Results Count */}
                        <div className={`mb-4 text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            Ditemukan {filteredSites.length} lokasi budaya
                        </div>

                        {/* Quick Stats */}
                        {showStats && (
                            <div className={`mb-6 p-4 rounded-xl border ${
                                isDarkMode
                                    ? 'border-gray-700/30'
                                    : 'border-gray-200/50'
                            }`}>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className={`font-medium ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                        Statistik Singkat
                                    </h4>
                                    <button
                                        onClick={() => setShowStats(!showStats)}
                                        className={`text-xs ${
                                            isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                    >
                                        Sembunyikan
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className={`p-2 rounded-lg border ${
                                        isDarkMode ? 'border-slate-700/50' : 'border-white/60'
                                    }`}>
                                        <div className="text-slate-600 font-semibold">
                                            {culturalSites.reduce((acc, site) => acc + site.articles, 0)}
                                        </div>
                                        <div className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                                            Total Artikel
                                        </div>
                                    </div>
                                    <div className={`p-2 rounded-lg border ${
                                        isDarkMode ? 'border-slate-700/50' : 'border-white/60'
                                    }`}>
                                        <div className="text-slate-500 font-semibold">
                                            {culturalSites.reduce((acc, site) => acc + site.photos, 0)}
                                        </div>
                                        <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                            Total Foto
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sites List */}
                        <div className="space-y-3">
                            {filteredSites.map(site => (
                                <div
                                    key={site.id}
                                    onClick={() => handleSiteSelect(site)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border group site-card-hover ${
                                        selectedSite?.id === site.id
                                            ? isDarkMode
                                                ? 'border-slate-500/50'
                                                : 'border-slate-400/40'
                                            : isDarkMode
                                                ? 'border-slate-700/30 hover:border-slate-600/50'
                                                : 'border-slate-200/60 hover:border-slate-300/80'
                                    }`}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className={`p-2 rounded-lg border ${
                                            selectedSite?.id === site.id
                                                ? 'border-slate-500/30'
                                                : isDarkMode
                                                    ? 'border-slate-700/50'
                                                    : 'border-slate-100/80'
                                        }`}>
                                            <MapPin className={`w-4 h-4 ${
                                                selectedSite?.id === site.id
                                                    ? 'text-slate-600'
                                                    : isDarkMode
                                                        ? 'text-slate-400'
                                                        : 'text-slate-500'
                                            }`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`font-medium mb-1 ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {site.name}
                                            </h3>
                                            <p className={`text-sm mb-2 ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                {site.province} • {site.category}
                                            </p>
                                            <p className={`text-xs line-clamp-2 ${
                                                isDarkMode ? 'text-gray-500' : 'text-gray-500'
                                            }`}>
                                                {site.description}
                                            </p>
                                            <div className={`flex items-center space-x-4 mt-2 text-xs ${
                                                isDarkMode ? 'text-gray-500' : 'text-gray-500'
                                            }`}>
                                                <span className="flex items-center">
                                                    <BookOpen className="w-3 h-3 mr-1" />
                                                    {site.articles}
                                                </span>
                                                <span className="flex items-center">
                                                    <Camera className="w-3 h-3 mr-1" />
                                                    {site.photos}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Map Area */}
                    <div className="flex-1 relative">
                        <div className={`h-full backdrop-blur-xl rounded-2xl overflow-hidden border relative map-container ${
                            isDarkMode
                                ? 'border-gray-700/50'
                                : 'border-gray-200/70'
                        }`}>
                            {/* Map Placeholder - Sekarang menggunakan InteractiveMap component */}
                            <InteractiveMap
                                theme={isDarkMode ? 'dark' : 'light'}
                                sites={filteredSites}
                                selectedSite={selectedSite}
                                onSiteSelect={handleSiteSelect}
                                zoomLevel={5}
                            />

                            {/* Selected Site Info Panel */}
                            {selectedSite && (
                                <div className={`absolute bottom-4 right-4 w-80 backdrop-blur-xl rounded-2xl p-6 border floating-info-panel ${
                                    isDarkMode
                                        ? 'border-gray-700/50'
                                        : 'border-gray-200/70'
                                }`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className={`font-bold text-lg mb-1 font-space-grotesk ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {selectedSite.name}
                                            </h3>
                                            <p className={`text-sm ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                {selectedSite.province} • {selectedSite.category}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedSite(null)}
                                            className={`p-2 rounded-lg transition-colors duration-300 ${
                                                isDarkMode
                                                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                                            }`}
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <p className={`text-sm mb-4 ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                        {selectedSite.description}
                                    </p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex space-x-4 text-sm">
                                            <div className="flex items-center">
                                                <BookOpen className={`w-4 h-4 mr-1 ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`} />
                                                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                                    {selectedSite.articles} artikel
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <Camera className={`w-4 h-4 mr-1 ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`} />
                                                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                                    {selectedSite.photos} foto
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3">
                                        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-white rounded-xl font-medium hover:from-[#8b6635] hover:to-[#a4773e] transition-all duration-300 text-sm">
                                            Lihat Detail
                                        </button>
                                        <button className={`px-4 py-2 rounded-xl border transition-all duration-300 text-sm ${
                                            isDarkMode
                                                ? 'border-gray-600 text-gray-300 hover:bg-gray-800/50'
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-50/50'
                                        }`}>
                                            <Info className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tutorial Modal */}
                {showTutorial && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className={`max-w-2xl w-full rounded-2xl p-8 border ${
                            isDarkMode
                                ? 'border-gray-700/50'
                                : 'border-gray-200/70'
                        }`}>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className={`text-2xl font-bold font-space-grotesk ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Panduan Peta Interaktif
                                </h3>
                                <button
                                    onClick={() => setShowTutorial(false)}
                                    className={`p-2 rounded-lg transition-colors duration-300 ${
                                        isDarkMode
                                            ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                                    }`}
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className={`p-4 rounded-xl border ${
                                        isDarkMode ? 'border-slate-800/30' : 'border-slate-50/80'
                                    }`}>
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center mr-3">
                                                <Search className="w-4 h-4 text-white" />
                                            </div>
                                            <h4 className={`font-semibold ${
                                                isDarkMode ? 'text-white' : 'text-slate-900'
                                            }`}>
                                                Pencarian
                                            </h4>
                                        </div>
                                        <p className={`text-sm ${
                                            isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                        }`}>
                                            Gunakan kotak pencarian untuk menemukan lokasi budaya tertentu.
                                            Anda dapat mencari berdasarkan nama atau deskripsi.
                                        </p>
                                    </div>

                                    <div className={`p-4 rounded-xl ${
                                        isDarkMode ? 'border-gray-800/30' : 'border-gray-50/80'
                                    }`}>
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center mr-3">
                                                <Filter className="w-4 h-4 text-white" />
                                            </div>
                                            <h4 className={`font-semibold ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                Filter
                                            </h4>
                                        </div>
                                        <p className={`text-sm ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            Filter berdasarkan provinsi dan kategori untuk mempersempit hasil pencarian.
                                        </p>
                                    </div>

                                    <div className={`p-4 rounded-xl ${
                                        isDarkMode ? 'border-gray-800/30' : 'border-gray-50/80'
                                    }`}>
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                                                <MapPin className="w-4 h-4 text-white" />
                                            </div>
                                            <h4 className={`font-semibold ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                Marker Interaktif
                                            </h4>
                                        </div>
                                        <p className={`text-sm ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            Klik pada marker biru di peta atau item di sidebar untuk melihat detail lokasi budaya.
                                        </p>
                                    </div>
                                </div>

                                <div className={`p-4 rounded-xl border-l-4 border-slate-500 border ${
                                    isDarkMode ? 'border-slate-600/10' : 'border-slate-100/50'
                                }`}>
                                    <h4 className={`font-semibold mb-2 ${
                                        isDarkMode ? 'text-white' : 'text-slate-900'
                                    }`}>
                                        💡 Tips Penggunaan
                                    </h4>
                                    <ul className={`text-sm space-y-1 ${
                                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                                    }`}>
                                        <li>• Klik pada daerah/pulau di peta untuk filter otomatis berdasarkan wilayah</li>
                                        <li>• Gunakan kombinasi pencarian dan filter untuk hasil yang lebih spesifik</li>
                                        <li>• Panel informasi akan muncul ketika Anda memilih suatu lokasi</li>
                                        <li>• Scroll di sidebar untuk melihat semua hasil pencarian</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex justify-end mt-8">
                                <button
                                    onClick={() => setShowTutorial(false)}
                                    className="px-6 py-3 bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-white rounded-xl font-medium hover:from-[#8b6635] hover:to-[#a4773e] transition-all duration-300"
                                >
                                    Mengerti
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default function Map() {
    return <MapContent />;
}
