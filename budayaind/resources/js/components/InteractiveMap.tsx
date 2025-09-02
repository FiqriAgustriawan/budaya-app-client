import { useState, useEffect, useCallback } from 'react';

interface CulturalSite {
    id: number;
    name: string;
    province: string;
    category: string;
    coordinates: { lat: number; lng: number };
    description: string;
    image: string;
    articles: number;
    photos: number;
    videos: number;
}

interface MapComponentProps {
    theme: 'dark' | 'light';
    sites: CulturalSite[];
    selectedSite: CulturalSite | null;
    onSiteSelect: (site: CulturalSite) => void;
    zoomLevel: number;
}

export function InteractiveMap({ theme, sites, selectedSite, onSiteSelect }: MapComponentProps) {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panX, setPanX] = useState(0);
    const [panY, setPanY] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Simulate map loading
        const timer = setTimeout(() => {
            setMapLoaded(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Fungsi untuk mengkonversi koordinat geografis ke koordinat SVG
    const convertCoordinates = (lat: number, lng: number) => {
        // Menggunakan geoViewBox dari SVG: "95.220250 7.356505 141.009728 -10.946766"
        // SVG dimensions: width="792.54596" height="316.66394"

        const geoBox = {
            minLng: 95.220250,
            maxLat: 7.356505,
            maxLng: 141.009728,
            minLat: -10.946766
        };

        const svgBox = {
            width: 792.54596,
            height: 316.66394
        };

        // Konversi longitude ke x
        const x = ((lng - geoBox.minLng) / (geoBox.maxLng - geoBox.minLng)) * svgBox.width;

        // Konversi latitude ke y (dibalik karena SVG y dimulai dari atas)
        const y = ((geoBox.maxLat - lat) / (geoBox.maxLat - geoBox.minLat)) * svgBox.height;

        return { x, y };
    };

    // Fungsi untuk zoom ke tempat wisata yang dipilih
    const zoomToSite = useCallback((site: CulturalSite) => {
        setIsAnimating(true);
        const { x, y } = convertCoordinates(site.coordinates.lat, site.coordinates.lng);

        // Zoom level 2.5x untuk fokus ke tempat wisata
        const targetZoom = 2.5;
        setZoomLevel(targetZoom);

        // Hitung posisi pan untuk center ke tempat wisata
        const svgWidth = 792.54596;
        const svgHeight = 316.66394;
        const targetPanX = (svgWidth / 2) - (x * targetZoom);
        const targetPanY = (svgHeight / 2) - (y * targetZoom);

        setPanX(targetPanX);
        setPanY(targetPanY);

        // Selesai animasi setelah 500ms
        setTimeout(() => setIsAnimating(false), 500);
    }, []);

    // Fungsi untuk reset zoom
    const resetZoom = useCallback(() => {
        setIsAnimating(true);
        setZoomLevel(1);
        setPanX(0);
        setPanY(0);
        setTimeout(() => setIsAnimating(false), 500);
    }, []);

    // Fungsi untuk handle zoom in/out manual
    const handleZoomIn = useCallback(() => {
        if (zoomLevel < 4) {
            setIsAnimating(true);
            setZoomLevel(prev => Math.min(prev + 0.5, 4));
            setTimeout(() => setIsAnimating(false), 300);
        }
    }, [zoomLevel]);

    const handleZoomOut = useCallback(() => {
        if (zoomLevel > 1) {
            setIsAnimating(true);
            setZoomLevel(prev => Math.max(prev - 0.5, 1));
            if (zoomLevel <= 1.5) {
                setPanX(0);
                setPanY(0);
            }
            setTimeout(() => setIsAnimating(false), 300);
        }
    }, [zoomLevel]);

    // Auto zoom when site selected
    useEffect(() => {
        if (selectedSite && mapLoaded) {
            zoomToSite(selectedSite);
        } else if (!selectedSite && mapLoaded) {
            // Reset zoom ketika tidak ada situs yang dipilih
            resetZoom();
        }
    }, [selectedSite, mapLoaded, zoomToSite, resetZoom]);

    return (
        <div className="w-full h-full relative">
            {!mapLoaded && (
                <div className={`absolute inset-0 flex items-center justify-center ${
                    theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'
                }`}>
                    <div className="text-center">
                        <div className={`w-16 h-16 border-4 border-t-slate-500 rounded-full animate-spin mx-auto mb-4 ${
                            theme === 'dark' ? 'border-slate-600' : 'border-slate-200'
                        }`}></div>
                        <p className={`text-sm ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                            Memuat peta interaktif Indonesia...
                        </p>
                    </div>
                </div>
            )}

            {mapLoaded && (
                <div className="w-full h-full relative overflow-hidden">
                    {/* Zoom Controls */}
                    <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
                        {/* Zoom Level Indicator */}
                        <div className={`px-3 py-1 rounded-lg text-xs font-medium ${
                            theme === 'dark'
                                ? 'bg-slate-800/90 text-slate-200 border border-slate-600'
                                : 'bg-white/90 text-slate-700 border border-slate-200'
                        } backdrop-blur-sm shadow-sm`}>
                            {zoomLevel.toFixed(1)}x
                        </div>

                        <button
                            onClick={handleZoomIn}
                            disabled={zoomLevel >= 4}
                            className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-200 ${
                                theme === 'dark'
                                    ? 'bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600 shadow-lg'
                                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-md'
                            } ${zoomLevel >= 4 ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl'} backdrop-blur-sm`}
                            title="Zoom In"
                        >
                            +
                        </button>
                        <button
                            onClick={handleZoomOut}
                            disabled={zoomLevel <= 1}
                            className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-200 ${
                                theme === 'dark'
                                    ? 'bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600 shadow-lg'
                                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-md'
                            } ${zoomLevel <= 1 ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl'} backdrop-blur-sm`}
                            title="Zoom Out"
                        >
                            −
                        </button>
                        {zoomLevel > 1 && (
                            <button
                                onClick={resetZoom}
                                className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm transition-all duration-200 ${
                                    theme === 'dark'
                                        ? 'bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600 shadow-lg'
                                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-md'
                                } hover:scale-105 hover:shadow-xl backdrop-blur-sm`}
                                title="Reset Zoom"
                            >
                                ⌂
                            </button>
                        )}
                    </div>

                    <svg
                        viewBox="0 0 792.54596 316.66394"
                        className="w-full h-full"
                        style={{
                            filter: theme === 'dark'
                                ? 'drop-shadow(0 0 20px rgba(100, 116, 139, 0.3))'
                                : 'drop-shadow(0 0 20px rgba(100, 116, 139, 0.2))'
                        }}
                    >
                        {/* Background */}
                        <rect
                            width="100%"
                            height="100%"
                            fill={theme === 'dark' ? 'rgba(30, 41, 59, 0.4)' : 'rgba(248, 250, 252, 0.6)'}
                        />

                        {/* Main Map Group dengan transformasi zoom dan pan */}
                        <g
                            transform={`translate(${panX}, ${panY}) scale(${zoomLevel})`}
                            style={{
                                transition: isAnimating ? 'transform 0.5s ease-in-out' : 'none'
                            }}
                        >
                            {/* Indonesia Map - menggunakan external SVG */}
                            <image
                                href="/indonesia.svg"
                                width="792.54596"
                                height="316.66394"
                                opacity={theme === 'dark' ? 0.85 : 0.95}
                                style={{
                                    filter: theme === 'dark'
                                        ? 'hue-rotate(15deg) brightness(0.7) contrast(1.1) saturate(0.8)'
                                        : 'hue-rotate(0deg) brightness(1) contrast(1) saturate(0.9)'
                                }}
                            />

                            {/* Cultural Site Markers */}
                            {sites.map(site => {
                                const { x, y } = convertCoordinates(site.coordinates.lat, site.coordinates.lng);
                                const isSelected = selectedSite?.id === site.id;

                                return (
                                    <g key={site.id}>
                                        {/* Marker Shadow */}
                                        <circle
                                            cx={x + 1}
                                            cy={y + 1}
                                            r={isSelected ? "8" : "5"}
                                            fill="rgba(0,0,0,0.3)"
                                            className="pointer-events-none"
                                        />

                                        {/* Main Marker */}
                                        <circle
                                            cx={x}
                                            cy={y}
                                            r={isSelected ? "6" : "4"}
                                            fill={isSelected ? "#64748b" : theme === 'dark' ? "#94a3b8" : "#475569"}
                                            stroke="white"
                                            strokeWidth="2"
                                            className={`cursor-pointer transition-all duration-300 map-marker ${
                                                isSelected ? 'selected' : ''
                                            } hover:r-7`}
                                            onClick={() => onSiteSelect(site)}
                                        />

                                        {/* Marker Inner Dot */}
                                        <circle
                                            cx={x}
                                            cy={y}
                                            r="1.5"
                                            fill="white"
                                            className="pointer-events-none"
                                        />

                                        {/* Selection Ring - hanya tampil saat dipilih */}
                                        {isSelected && (
                                            <>
                                                <circle
                                                    cx={x}
                                                    cy={y}
                                                    r="12"
                                                    fill="none"
                                                    stroke="#64748b"
                                                    strokeWidth="2"
                                                    opacity="0.7"
                                                    className="animate-ping"
                                                />
                                                <circle
                                                    cx={x}
                                                    cy={y}
                                                    r="16"
                                                    fill="none"
                                                    stroke="#64748b"
                                                    strokeWidth="1"
                                                    opacity="0.4"
                                                    className="animate-ping"
                                                    style={{ animationDelay: '0.5s' }}
                                                />
                                            </>
                                        )}

                                        {/* Site Label - hanya tampil saat zoom atau dipilih */}
                                        {(zoomLevel > 1.5 || isSelected) && (
                                            <text
                                                x={x}
                                                y={y - (isSelected ? 12 : 8)}
                                                fill={theme === 'dark' ? '#e2e8f0' : '#334155'}
                                                fontSize={zoomLevel > 2 ? "8" : "6"}
                                                textAnchor="middle"
                                                className="pointer-events-none font-medium"
                                                style={{
                                                    filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))',
                                                    opacity: isSelected ? 1 : 0.8
                                                }}
                                            >
                                                {site.name.length > 12 ? site.name.substring(0, 12) + '...' : site.name}
                                            </text>
                                        )}
                                    </g>
                                );
                            })}
                        </g>

                        {/* Map Info Panel */}
                        <g transform="translate(20, 20)">
                            <rect
                                width="120"
                                height="50"
                                rx="8"
                                fill={theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)'}
                                stroke={theme === 'dark' ? 'rgba(164, 119, 62, 0.5)' : 'rgba(164, 119, 62, 0.3)'}
                            />
                            <text
                                x="10"
                                y="20"
                                fill={theme === 'dark' ? 'white' : 'black'}
                                fontSize="10"
                                className="font-semibold"
                            >
                                Peta Indonesia
                            </text>
                            <text
                                x="10"
                                y="35"
                                fill={theme === 'dark' ? '#a4773e' : '#8b6914'}
                                fontSize="8"
                                className="font-medium"
                            >
                                {sites.length} Situs Budaya
                            </text>
                        </g>

                        {/* Compass */}
                        <g transform="translate(750, 50)">
                            <circle
                                cx="0"
                                cy="0"
                                r="20"
                                fill={theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)'}
                                stroke={theme === 'dark' ? 'rgba(164, 119, 62, 0.5)' : 'rgba(164, 119, 62, 0.3)'}
                            />
                            <polygon
                                points="0,-12 4,0 0,12 -4,0"
                                fill="#a4773e"
                            />
                            <text
                                x="0"
                                y="-25"
                                fill={theme === 'dark' ? 'white' : 'black'}
                                fontSize="10"
                                textAnchor="middle"
                                className="font-bold"
                            >
                                U
                            </text>
                        </g>
                    </svg>
                </div>
            )}
        </div>
    );
}
