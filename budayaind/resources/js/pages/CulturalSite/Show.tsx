import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    MapPin,
    Share2,
    Heart,
    BookOpen,
    Camera,
    Video,
    Calendar,
    Globe,
    Eye,
    ExternalLink,
    Play,
    Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';
import PreviewMap from '@/components/PreviewMap';

interface CulturalSite {
    id: number;
    name: string;
    slug: string;
    province: string;
    category: string;
    latitude: string | number;
    longitude: string | number;
    description: string;
    content: string | null;
    image: string | null;
    photos: string[] | string;
    youtube_video: string | null;
    articles_count: number;
    photos_count: number;
    videos_count: number;
    is_active?: boolean;
    created_at: string;
    updated_at?: string;
}

interface RelatedSite {
    id: number;
    name: string;
    slug: string;
    province: string;
    category: string;
    description: string;
    image: string | null;
    articles_count: number;
    photos_count: number;
}

interface Props {
    site?: CulturalSite;
    culturalSite?: CulturalSite;
    relatedSites?: RelatedSite[];
    nearbySites?: RelatedSite[];
}

// Loading Component
function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-600 dark:text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Memuat detail budaya...</p>
            </div>
        </div>
    );
}

function DetailContent({ site, culturalSite, relatedSites = [], nearbySites = [] }: Props) {
    const { appearance } = useAppearance();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showImageGallery, setShowImageGallery] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    // Use site data or fallback to culturalSite
    const siteData = site || culturalSite;

    // Early return if no data
    if (!siteData) {
        return <LoadingSpinner />;
    }

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

    // Safe parsing of images with error handling
    const allImages = (() => {
        try {
            const images = [];

            if (siteData.image) {
                images.push(siteData.image);
            }

            if (siteData.photos) {
                if (Array.isArray(siteData.photos)) {
                    images.push(...siteData.photos);
                } else if (typeof siteData.photos === 'string') {
                    try {
                        const parsedPhotos = JSON.parse(siteData.photos);
                        if (Array.isArray(parsedPhotos)) {
                            images.push(...parsedPhotos);
                        }
                    } catch (parseError) {
                        console.warn('Failed to parse photos JSON:', parseError);
                    }
                }
            }

            return images;
        } catch (error) {
            console.warn('Error processing images:', error);
            return siteData.image ? [siteData.image] : [];
        }
    })();

    const getYouTubeEmbedUrl = (url: string | null) => {
        if (!url) return null;

        try {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);

            return match && match[2].length === 11
                ? `https://www.youtube.com/embed/${match[2]}`
                : null;
        } catch (error) {
            console.warn('Error parsing YouTube URL:', error);
            return null;
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Tidak diketahui';

        try {
            return new Date(dateString).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch (error) {
            console.warn('Error formatting date:', error);
            return 'Tidak diketahui';
        }
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: siteData.name,
                    text: siteData.description,
                    url: window.location.href,
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link berhasil disalin ke clipboard!');
            }
        } catch (err) {
            console.log('Error sharing:', err);
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Link berhasil disalin ke clipboard!');
        }
    };

    const getCoordinate = (coord: string | number): number => {
        if (typeof coord === 'number') return coord;
        return parseFloat(coord.toString()) || 0;
    };

    return (
        <>
            <Head title={`${siteData.name} - BudayaInd`}>
                <meta name="description" content={siteData.description} />
                <meta property="og:title" content={`${siteData.name} - BudayaInd`} />
                <meta property="og:description" content={siteData.description} />
                <meta property="og:image" content={siteData.image || ''} />
            </Head>

            <div className="min-h-screen bg-white dark:bg-gray-900">
                {/* Header */}
                <header className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-40">
                    <div className="max-w-4xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/map"
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </Link>
                                <div>
                                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        BudayaInd
                                    </h1>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleShare}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>

                                <button
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={`p-2 rounded-lg transition-colors ${isLiked
                                            ? 'text-red-600 bg-red-50 dark:bg-red-900/20'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                </button>

                                <AnimatedThemeToggler />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <article className="max-w-4xl mx-auto px-4 py-8">
                    {/* Article Header */}
                    <header className="mb-8">
                        <div className="mb-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                                    {siteData.category}
                                </span>
                                <span>•</span>
                                <span className="flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {siteData.province}
                                </span>
                                <span>•</span>
                                <span>{formatDate(siteData.created_at)}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            {siteData.name}
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            {siteData.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 border-t border-b border-gray-200 dark:border-gray-700 py-4">
                            <div className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-1" />
                                <span>{siteData.articles_count || 0} Artikel</span>
                            </div>
                            <div className="flex items-center">
                                <Camera className="w-4 h-4 mr-1" />
                                <span>{siteData.photos_count || 0} Foto</span>
                            </div>
                            <div className="flex items-center">
                                <Video className="w-4 h-4 mr-1" />
                                <span>{siteData.videos_count || 0} Video</span>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {allImages.length > 0 && (
                        <div className="mb-8">
                            <div className="relative">
                                <img
                                    src={allImages[selectedImageIndex]}
                                    alt={siteData.name}
                                    className="w-full h-64 md:h-96 object-cover rounded-lg"
                                    onError={(e) => {
                                        const nextIndex = selectedImageIndex + 1;
                                        if (nextIndex < allImages.length) {
                                            setSelectedImageIndex(nextIndex);
                                        } else {
                                            e.currentTarget.style.display = 'none';
                                        }
                                    }}
                                />

                                {allImages.length > 1 && (
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex space-x-2">
                                                {allImages.slice(0, 5).map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setSelectedImageIndex(index)}
                                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedImageIndex === index
                                                                ? 'bg-white'
                                                                : 'bg-white/50 hover:bg-white/75'
                                                            }`}
                                                    />
                                                ))}
                                                {allImages.length > 5 && (
                                                    <button
                                                        onClick={() => setShowImageGallery(true)}
                                                        className="text-white text-xs bg-black/50 px-2 py-1 rounded-full hover:bg-black/70 transition-colors"
                                                    >
                                                        +{allImages.length - 5}
                                                    </button>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => setShowImageGallery(true)}
                                                className="text-white bg-black/50 p-2 rounded-lg hover:bg-black/70 transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                                {siteData.name} - {siteData.province}
                            </p>
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
                        {siteData.content ? (
                            <div dangerouslySetInnerHTML={{ __html: siteData.content }} />
                        ) : (
                            <div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {siteData.description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* YouTube Video */}
                    {siteData.youtube_video && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Video
                            </h2>
                            {getYouTubeEmbedUrl(siteData.youtube_video) ? (
                                <div className="aspect-video rounded-lg overflow-hidden">
                                    <iframe
                                        src={getYouTubeEmbedUrl(siteData.youtube_video) || ''}
                                        title={`${siteData.name} Video`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            ) : (
                                <a
                                    href={siteData.youtube_video}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    {siteData.youtube_video}
                                    <ExternalLink className="w-4 h-4 ml-1" />
                                </a>
                            )}
                        </div>
                    )}

                    {/* Map Section */}
                    {siteData.latitude && siteData.longitude && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Lokasi
                            </h2>
                            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                <PreviewMap
                                    latitude={getCoordinate(siteData.latitude)}
                                    longitude={getCoordinate(siteData.longitude)}
                                    title={siteData.name}
                                    description={siteData.description}
                                    height="400px"
                                />
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                Koordinat: {getCoordinate(siteData.latitude).toFixed(6)}, {getCoordinate(siteData.longitude).toFixed(6)}
                            </p>
                        </div>
                    )}

                    {/* Related Articles */}
                    {relatedSites && relatedSites.length > 0 && (
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Artikel Terkait
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedSites.slice(0, 4).map((site) => (
                                    <Link
                                        key={site.id}
                                        href={`/cultural-sites/${site.slug}`}
                                        className="group block"
                                    >
                                        <article className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                            {site.image ? (
                                                <img
                                                    src={site.image}
                                                    alt={site.name}
                                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                    <Camera className="w-12 h-12 text-gray-400" />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {site.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                    {site.province} • {site.category}
                                                </p>
                                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                                                    {site.description}
                                                </p>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </article>

                {/* Image Gallery Modal */}
                {showImageGallery && allImages.length > 0 && (
                    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="max-w-4xl w-full">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white text-xl font-semibold">
                                    Galeri {siteData.name}
                                </h3>
                                <button
                                    onClick={() => setShowImageGallery(false)}
                                    className="text-white hover:text-gray-300 p-2 text-2xl"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto">
                                {allImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${siteData.name} ${index + 1}`}
                                        className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                                        onClick={() => {
                                            setSelectedImageIndex(index);
                                            setShowImageGallery(false);
                                        }}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default function Detail(props: Props) {
    console.log('Detail props:', props);

    return <DetailContent {...props} />;
}