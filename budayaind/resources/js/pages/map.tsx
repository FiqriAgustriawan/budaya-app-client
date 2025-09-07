import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
    ArrowLeft,
    MapPin,
    Search,
    Filter,
    Info,
    Camera,
    BookOpen,
    Eye,
    Video,
    X,
    Play
} from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';
import { router } from '@inertiajs/react';

// Fix marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different categories
const createCustomIcon = (category: string, isSelected: boolean = false) => {
    const colors: { [key: string]: string } = {
        'Candi': '#dc2626',
        'Museum': '#2563eb',
        'Istana': '#7c3aed',
        'Benteng': '#059669',
        'Situs Bersejarah': '#ea580c',
        'Arsitektur': '#a4773e',
        'Tarian': '#d946ef',
        'Kerajinan': '#0891b2',
        'Musik': '#dc2626',
        'Kuliner': '#16a34a',
        'default': '#a4773e',
    };

    const color = colors[category] || colors.default;
    const size = isSelected ? 28 : 20;

    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="
                background-color: ${color};
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                ${isSelected ? 'transform: scale(1.2);' : ''}
            ">
                <div style="
                    width: ${size * 0.4}px;
                    height: ${size * 0.4}px;
                    background-color: white;
                    border-radius: 50%;
                "></div>
            </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
    });
};

interface CulturalSite {
    id: number;
    name: string;
    slug: string;
    province: string;
    category: string;
    latitude: number | string;
    longitude: number | string;
    description: string;
    image: string | null;
    youtube_video: string | null;
    articles_count: number;
    photos_count: number;
    videos_count: number;
    is_active: boolean;
    created_at: string;
}

interface Props {
    culturalSites: CulturalSite[];
    provinces: string[];
    categories: string[];
    filters?: {
        search?: string;
        province?: string;
        category?: string;
    };
}

// Component to handle map updates
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();

    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);

    return null;
}

// Helper functions
const parseCoordinate = (coord: number | string): number => {
    if (typeof coord === 'number') return coord;
    return parseFloat(coord.toString()) || 0;
};

export default function Map({ culturalSites, provinces, categories, filters = {} }: Props) {
    const { appearance } = useAppearance();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedSite, setSelectedSite] = useState<CulturalSite | null>(null);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedProvince, setSelectedProvince] = useState(filters.province || 'Semua Provinsi');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'Semua Kategori');
    const [mapCenter, setMapCenter] = useState<[number, number]>([-2.5489, 118.0149]);
    const [mapZoom, setMapZoom] = useState(5);
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

    // Add provinces and categories to the filter options if not present
    const allProvinces = ['Semua Provinsi', ...provinces];
    const allCategories = ['Semua Kategori', ...categories];

    const handleSiteClick = (site: CulturalSite) => {
        setSelectedSite(site);
        const lat = parseCoordinate(site.latitude);
        const lng = parseCoordinate(site.longitude);
        setMapCenter([lat, lng]);
        setMapZoom(12);
    };

    const handleSearch = () => {
        router.get('/map', {
            search: searchTerm || undefined,
            province: selectedProvince !== 'Semua Provinsi' ? selectedProvince : undefined,
            category: selectedCategory !== 'Semua Kategori' ? selectedCategory : undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedProvince('Semua Provinsi');
        setSelectedCategory('Semua Kategori');
        setMapCenter([-2.5489, 118.0149]);
        setMapZoom(5);
        setSelectedSite(null);

        router.get('/map', {}, {
            preserveState: true,
        });
    };

    return (
        <>
            <Head title="Peta Budaya Indonesia - BudayaInd">
                <meta name="description" content="Jelajahi warisan budaya Indonesia melalui peta interaktif" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>

            <div className={`min-h-screen transition-all duration-500 ${isDarkMode
                    ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
                    : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
                }`}>
                {/* Header */}
                <header className="relative z-30 p-4 lg:p-6">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        {/* Back Button & Logo */}
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className={`p-3 rounded-xl transition-all duration-300 group border ${isDarkMode
                                        ? 'border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50'
                                        : 'border-slate-200/80 bg-white/30 hover:bg-slate-50/80'
                                    } backdrop-blur-xl`}
                            >
                                <ArrowLeft className={`w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'
                                    }`} />
                            </Link>

                            <div className="flex items-center space-x-3">
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
                                <div>
                                    <h1 className={`text-xl font-bold font-space-grotesk ${isDarkMode ? 'text-white' : 'text-slate-900'
                                        }`}>
                                        Peta Budaya Indonesia
                                    </h1>
                                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                        }`}>Eksplorasi interaktif warisan nusantara</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-3">
                            <div className={`px-3 py-2 rounded-xl border backdrop-blur-xl ${isDarkMode
                                    ? 'border-slate-700/50 bg-slate-800/30 text-slate-300'
                                    : 'border-slate-200/80 bg-white/30 text-slate-700'
                                }`}>
                                <span className="flex items-center text-sm font-medium">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {culturalSites.length} Situs
                                </span>
                            </div>

                            <button
                                onClick={() => setShowTutorial(true)}
                                className={`p-3 rounded-xl transition-all duration-300 group border backdrop-blur-xl ${isDarkMode
                                        ? 'border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 text-slate-300'
                                        : 'border-slate-200/80 bg-white/30 hover:bg-slate-50/80 text-slate-700'
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
                    <div className={`w-80 backdrop-blur-xl rounded-2xl p-6 overflow-y-auto border ${isDarkMode
                            ? 'border-slate-700/50 bg-slate-800/20'
                            : 'border-slate-200/70 bg-white/20'
                        } custom-scrollbar`}>
                        {/* Search Bar */}
                        <div className="mb-6">
                            <div className="relative">
                                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'
                                    }`} />
                                <input
                                    type="text"
                                    placeholder="Cari lokasi budaya..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#a4773e] focus:border-transparent backdrop-blur-sm ${isDarkMode
                                            ? 'border-slate-600 bg-slate-800/30 text-white placeholder-slate-400'
                                            : 'border-slate-300 bg-white/50 text-slate-900 placeholder-slate-500'
                                        }`}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="mb-6">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 border backdrop-blur-sm ${isDarkMode
                                        ? 'border-slate-700/50 bg-slate-800/30 text-slate-300 hover:bg-slate-700/50'
                                        : 'border-slate-300/50 bg-white/50 text-slate-700 hover:bg-slate-100/80'
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
                                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'
                                            }`}>
                                            Provinsi
                                        </label>
                                        <select
                                            value={selectedProvince}
                                            onChange={(e) => setSelectedProvince(e.target.value)}
                                            className={`w-full p-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#a4773e] focus:border-transparent backdrop-blur-sm ${isDarkMode
                                                    ? 'border-slate-600 bg-slate-800/30 text-white'
                                                    : 'border-slate-300 bg-white/50 text-slate-900'
                                                }`}
                                            style={isDarkMode ? { colorScheme: 'dark' } : {}}
                                        >
                                            {allProvinces.map(province => (
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
                                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'
                                            }`}>
                                            Kategori
                                        </label>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className={`w-full p-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#a4773e] focus:border-transparent backdrop-blur-sm ${isDarkMode
                                                    ? 'border-slate-600 bg-slate-800/30 text-white'
                                                    : 'border-slate-300 bg-white/50 text-slate-900'
                                                }`}
                                            style={isDarkMode ? { colorScheme: 'dark' } : {}}
                                        >
                                            {allCategories.map(category => (
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

                                    {/* Action Buttons */}
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleSearch}
                                            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-white rounded-xl font-medium hover:from-[#8b6635] hover:to-[#a4773e] transition-all duration-300 text-sm"
                                        >
                                            <Search className="w-4 h-4 mr-2 inline" />
                                            Cari
                                        </button>
                                        <button
                                            onClick={resetFilters}
                                            className={`px-4 py-2 rounded-xl border transition-all duration-300 text-sm ${isDarkMode
                                                    ? 'border-slate-600 text-slate-300 hover:bg-slate-800/50'
                                                    : 'border-slate-300 text-slate-700 hover:bg-slate-50/50'
                                                }`}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Results Count */}
                        <div className={`mb-4 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                            Ditemukan {culturalSites.length} lokasi budaya
                        </div>

                        {/* Quick Stats */}
                        {showStats && (
                            <div className={`mb-6 p-4 rounded-xl border backdrop-blur-sm ${isDarkMode
                                    ? 'border-slate-700/30 bg-slate-800/20'
                                    : 'border-slate-200/50 bg-white/30'
                                }`}>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'
                                        }`}>
                                        Statistik Singkat
                                    </h4>
                                    <button
                                        onClick={() => setShowStats(!showStats)}
                                        className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-slate-500 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        Sembunyikan
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className={`p-2 rounded-lg border ${isDarkMode ? 'border-slate-700/50 bg-slate-800/30' : 'border-slate-200/60 bg-white/60'
                                        }`}>
                                        <div className="text-[#a4773e] font-semibold">
                                            {culturalSites.reduce((acc, site) => acc + site.articles_count, 0)}
                                        </div>
                                        <div className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                                            Total Artikel
                                        </div>
                                    </div>
                                    <div className={`p-2 rounded-lg border ${isDarkMode ? 'border-slate-700/50 bg-slate-800/30' : 'border-slate-200/60 bg-white/60'
                                        }`}>
                                        <div className="text-[#a4773e] font-semibold">
                                            {culturalSites.reduce((acc, site) => acc + site.photos_count, 0)}
                                        </div>
                                        <div className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                                            Total Foto
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sites List */}
                        <div className="space-y-3">
                            {culturalSites.length === 0 ? (
                                <div className={`p-6 rounded-xl border text-center backdrop-blur-sm ${isDarkMode
                                        ? 'border-slate-700/30 bg-slate-800/20'
                                        : 'border-slate-200/50 bg-white/30'
                                    }`}>
                                    <MapPin className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'
                                        }`} />
                                    <p className={`mb-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'
                                        }`}>
                                        Tidak ada situs budaya yang ditemukan.
                                    </p>
                                    <button
                                        onClick={resetFilters}
                                        className="px-4 py-2 bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-white rounded-xl font-medium hover:from-[#8b6635] hover:to-[#a4773e] transition-all duration-300 text-sm"
                                    >
                                        Reset Filter
                                    </button>
                                </div>
                            ) : (
                                culturalSites.map(site => (
                                    <div
                                        key={site.id}
                                        onClick={() => handleSiteClick(site)}
                                        className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border group backdrop-blur-sm ${selectedSite?.id === site.id
                                                ? isDarkMode
                                                    ? 'border-[#a4773e]/50 bg-[#a4773e]/10'
                                                    : 'border-[#a4773e]/40 bg-[#a4773e]/5'
                                                : isDarkMode
                                                    ? 'border-slate-700/30 bg-slate-800/20 hover:border-slate-600/50 hover:bg-slate-700/30'
                                                    : 'border-slate-200/60 bg-white/30 hover:border-slate-300/80 hover:bg-white/50'
                                            }`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            {site.image ? (
                                                <img
                                                    src={site.image}
                                                    alt={site.name}
                                                    className="w-16 h-16 rounded-xl object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                                        if (fallback) fallback.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${site.image ? 'hidden' : 'flex'
                                                } ${selectedSite?.id === site.id
                                                    ? 'bg-[#a4773e]/20'
                                                    : isDarkMode
                                                        ? 'bg-slate-700/50'
                                                        : 'bg-slate-200/50'
                                                }`}>
                                                <Camera className={`w-8 h-8 ${selectedSite?.id === site.id
                                                        ? 'text-[#a4773e]'
                                                        : isDarkMode
                                                            ? 'text-slate-500'
                                                            : 'text-slate-400'
                                                    }`} />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'
                                                    }`}>
                                                    {site.name}
                                                </h3>
                                                <p className={`text-sm mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                                    }`}>
                                                    {site.province} • {site.category}
                                                </p>
                                                <p className={`text-xs line-clamp-2 mb-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'
                                                    }`}>
                                                    {site.description}
                                                </p>
                                                <div className={`flex items-center space-x-4 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'
                                                    }`}>
                                                    <span className="flex items-center">
                                                        <BookOpen className="w-3 h-3 mr-1" />
                                                        {site.articles_count}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Camera className="w-3 h-3 mr-1" />
                                                        {site.photos_count}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Video className="w-3 h-3 mr-1" />
                                                        {site.videos_count}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Map Area */}
                    <div className="flex-1 relative">
                        <div className={`h-full backdrop-blur-xl rounded-2xl overflow-hidden border relative ${isDarkMode
                                ? 'border-slate-700/50 bg-slate-800/20'
                                : 'border-slate-200/70 bg-white/20'
                            }`}>
                            <MapContainer
                                center={mapCenter}
                                zoom={mapZoom}
                                style={{ height: '100%', width: '100%' }}
                                scrollWheelZoom={true}
                                className="rounded-2xl"
                            >
                                <MapUpdater center={mapCenter} zoom={mapZoom} />

                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {culturalSites.map((site) => {
                                    const lat = parseCoordinate(site.latitude);
                                    const lng = parseCoordinate(site.longitude);

                                    if (lat === 0 && lng === 0) return null;

                                    return (
                                        <Marker
                                            key={site.id}
                                            position={[lat, lng]}
                                            icon={createCustomIcon(site.category, selectedSite?.id === site.id)}
                                            eventHandlers={{
                                                click: () => handleSiteClick(site),
                                            }}
                                        >
                                            <Popup>
                                                <div className="p-2 min-w-[280px]">
                                                    <div className="flex items-start space-x-3 mb-3">
                                                        {site.image ? (
                                                            <img
                                                                src={site.image}
                                                                alt={site.name}
                                                                className="w-16 h-16 rounded object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                                                                <Camera className="w-8 h-8 text-gray-400" />
                                                            </div>
                                                        )}

                                                        <div className="flex-1">
                                                            <h3 className="font-bold text-lg text-gray-900">
                                                                {site.name}
                                                            </h3>
                                                            <p className="text-gray-600 text-sm mb-1">
                                                                {site.province}
                                                            </p>
                                                            <span className="inline-block px-2 py-1 bg-[#a4773e]/10 text-[#a4773e] text-xs rounded-full">
                                                                {site.category}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                                                        {site.description}
                                                    </p>

                                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                                        <span className="flex items-center">
                                                            <BookOpen className="w-3 h-3 mr-1" />
                                                            {site.articles_count} artikel
                                                        </span>
                                                        <span className="flex items-center">
                                                            <Camera className="w-3 h-3 mr-1" />
                                                            {site.photos_count} foto
                                                        </span>
                                                        <span className="flex items-center">
                                                            <Video className="w-3 h-3 mr-1" />
                                                            {site.videos_count} video
                                                        </span>
                                                    </div>

                                                    <Link
                                                        href={`/cultural-sites/${site.slug}`}
                                                        className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-white rounded-xl font-medium hover:from-[#8b6635] hover:to-[#a4773e] transition-all duration-300 text-sm"
                                                    >
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        Lihat Detail
                                                    </Link>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    );
                                })}
                            </MapContainer>

                            {/* Selected Site Info Panel */}
                            {selectedSite && (
                                <div className={`absolute bottom-4 right-4 w-80 backdrop-blur-xl rounded-2xl p-6 border ${isDarkMode
                                        ? 'border-slate-700/50 bg-slate-800/40'
                                        : 'border-slate-200/70 bg-white/40'
                                    } shadow-xl`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className={`font-bold text-lg mb-1 font-space-grotesk ${isDarkMode ? 'text-white' : 'text-slate-900'
                                                }`}>
                                                {selectedSite.name}
                                            </h3>
                                            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                                }`}>
                                                {selectedSite.province} • {selectedSite.category}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedSite(null)}
                                            className={`p-2 rounded-lg transition-colors duration-300 ${isDarkMode
                                                    ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
                                                }`}
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <p className={`text-sm mb-4 line-clamp-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'
                                        }`}>
                                        {selectedSite.description}
                                    </p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex space-x-4 text-sm">
                                            <div className="flex items-center">
                                                <BookOpen className={`w-4 h-4 mr-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'
                                                    }`} />
                                                <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                                                    {selectedSite.articles_count} artikel
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <Camera className={`w-4 h-4 mr-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'
                                                    }`} />
                                                <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                                                    {selectedSite.photos_count} foto
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <Video className={`w-4 h-4 mr-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'
                                                    }`} />
                                                <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                                                    {selectedSite.videos_count} video
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3">
                                        <Link
                                            href={`/cultural-sites/${selectedSite.slug}`}
                                            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-amber-50 rounded-xl font-medium hover:from-[#8b6635] hover:to-[#a4773e] transition-all duration-300 text-sm text-center"
                                        >
                                            <span className='text-amber-50'>Lihat Detail</span>
                                        </Link>
                                        <button className={`px-4 py-2 rounded-xl border transition-all duration-300 text-sm ${isDarkMode
                                                ? 'border-slate-600 text-slate-300 hover:bg-slate-800/50'
                                                : 'border-slate-300 text-slate-700 hover:bg-slate-50/50'
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
                        <div className={`max-w-2xl w-full rounded-2xl p-8 border backdrop-blur-xl ${isDarkMode
                                ? 'border-slate-700/50 bg-slate-800/40'
                                : 'border-slate-200/70 bg-white/40'
                            }`}>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className={`text-2xl font-bold font-space-grotesk ${isDarkMode ? 'text-white' : 'text-slate-900'
                                    }`}>
                                    Panduan Peta Interaktif
                                </h3>
                                <button
                                    onClick={() => setShowTutorial(false)}
                                    className={`p-2 rounded-lg transition-colors duration-300 ${isDarkMode
                                            ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
                                        }`}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-slate-700/30 bg-slate-800/20' : 'border-slate-200/50 bg-white/30'
                                        }`}>
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-[#a4773e] rounded-lg flex items-center justify-center mr-3">
                                                <Search className="w-4 h-4 text-white" />
                                            </div>
                                            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'
                                                }`}>
                                                Pencarian
                                            </h4>
                                        </div>
                                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                            }`}>
                                            Gunakan kotak pencarian untuk menemukan lokasi budaya tertentu.
                                            Anda dapat mencari berdasarkan nama atau deskripsi.
                                        </p>
                                    </div>

                                    <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-slate-700/30 bg-slate-800/20' : 'border-slate-200/50 bg-white/30'
                                        }`}>
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-[#d4a574] rounded-lg flex items-center justify-center mr-3">
                                                <Filter className="w-4 h-4 text-white" />
                                            </div>
                                            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'
                                                }`}>
                                                Filter
                                            </h4>
                                        </div>
                                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                            }`}>
                                            Filter berdasarkan provinsi dan kategori untuk mempersempit hasil pencarian.
                                        </p>
                                    </div>

                                    <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-slate-700/30 bg-slate-800/20' : 'border-slate-200/50 bg-white/30'
                                        }`}>
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-[#8b6635] rounded-lg flex items-center justify-center mr-3">
                                                <MapPin className="w-4 h-4 text-white" />
                                            </div>
                                            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'
                                                }`}>
                                                Marker Interaktif
                                            </h4>
                                        </div>
                                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                            }`}>
                                            Klik pada marker coklat di peta atau item di sidebar untuk melihat detail lokasi budaya.
                                        </p>
                                    </div>
                                </div>

                                <div className={`p-4 rounded-xl border-l-4 border-[#a4773e] ${isDarkMode ? 'border-r border-t border-b border-slate-700/30 bg-slate-800/20' : 'border-r border-t border-b border-slate-200/50 bg-white/30'
                                    }`}>
                                    <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'
                                        }`}>
                                        💡 Tips Penggunaan
                                    </h4>
                                    <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'
                                        }`}>
                                        <li>• Klik pada item di sidebar untuk zoom otomatis ke lokasi di peta</li>
                                        <li>• Gunakan kombinasi pencarian dan filter untuk hasil yang lebih spesifik</li>
                                        <li>• Panel informasi akan muncul ketika Anda memilih suatu lokasi</li>
                                        <li>• Scroll di peta untuk menjelajahi seluruh Indonesia</li>
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

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: ${isDarkMode ? '#64748b' : '#94a3b8'};
                    border-radius: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: ${isDarkMode ? '#475569' : '#64748b'};
                }
                .leaflet-popup-content-wrapper {
                    border-radius: 16px !important;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
                }
                .leaflet-popup-tip {
                    background: white !important;
                }
            `}</style>
        </>
    );
}
