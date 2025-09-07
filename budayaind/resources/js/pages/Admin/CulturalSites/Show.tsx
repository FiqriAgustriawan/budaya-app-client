import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    MapPin,
    Edit,
    Trash2,
    ToggleLeft,
    ToggleRight,
    Calendar,
    Image as ImageIcon,
    Youtube,
    ExternalLink,
    ArrowLeft,
} from 'lucide-react';

interface CulturalSite {
    id: number;
    name: string;
    slug: string;
    province: string;
    category: string;
    latitude: number;
    longitude: number;
    description: string;
    content: string;
    image: string | null;
    youtube_video: string;
    articles_count: number;
    photos_count: number;
    videos_count: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    culturalSite: CulturalSite;
}

export default function Show({ culturalSite }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
        },
        {
            title: 'Cultural Sites',
            href: '/admin/cultural-sites',
        },
        {
            title: culturalSite.name,
            href: `/admin/cultural-sites/${culturalSite.id}`,
        },
    ];

    const handleToggleStatus = () => {
        router.patch(`/admin/cultural-sites/${culturalSite.id}/toggle-status`, {}, {
            preserveState: true,
        });
    };

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${culturalSite.name}"? This action cannot be undone.`)) {
            router.delete(`/admin/cultural-sites/${culturalSite.id}`, {
                onSuccess: () => {
                    router.visit('/admin/cultural-sites');
                },
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getYouTubeEmbedUrl = (url: string) => {
        if (!url) return null;
        
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        
        return match && match[2].length === 11 
            ? `https://www.youtube.com/embed/${match[2]}`
            : null;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={culturalSite.name} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">{culturalSite.name}</h1>
                            <Badge variant={culturalSite.is_active ? "default" : "secondary"}>
                                {culturalSite.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                        </div>
                        <p className="text-gray-600 text-lg">{culturalSite.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {culturalSite.province}
                            </span>
                            <span>•</span>
                            <span>{culturalSite.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Created {formatDate(culturalSite.created_at)}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        <Link href="/admin/cultural-sites">
                            <Button variant="outline" className="flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Back to List
                            </Button>
                        </Link>
                        
                        <Button
                            variant="outline"
                            onClick={handleToggleStatus}
                            className="flex items-center gap-2"
                        >
                            {culturalSite.is_active ? (
                                <>
                                    <ToggleLeft className="w-4 h-4" />
                                    Deactivate
                                </>
                            ) : (
                                <>
                                    <ToggleRight className="w-4 h-4" />
                                    Activate
                                </>
                            )}
                        </Button>
                        
                        <Link href={`/admin/cultural-sites/${culturalSite.id}/edit`}>
                            <Button className="flex items-center gap-2">
                                <Edit className="w-4 h-4" />
                                Edit
                            </Button>
                        </Link>
                        
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            className="flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Image */}
                        {culturalSite.image && (
                            <Card>
                                <CardContent className="p-0">
                                    <img
                                        src={culturalSite.image}
                                        alt={culturalSite.name}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Content */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About This Site</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {culturalSite.content ? (
                                    <div
                                        className="prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: culturalSite.content }}
                                    />
                                ) : (
                                    <p className="text-gray-500 italic">No detailed content available.</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* YouTube Video */}
                        {culturalSite.youtube_video && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Youtube className="w-5 h-5 text-red-600" />
                                        Video
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {getYouTubeEmbedUrl(culturalSite.youtube_video) ? (
                                        <div className="aspect-video">
                                            <iframe
                                                src={getYouTubeEmbedUrl(culturalSite.youtube_video) || ''}
                                                title={`${culturalSite.name} Video`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full rounded"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 p-4 bg-gray-50 rounded">
                                            <Youtube className="w-5 h-5 text-gray-400" />
                                            <span className="text-gray-600">Video URL: </span>
                                            <a
                                                href={culturalSite.youtube_video}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline flex items-center gap-1"
                                            >
                                                {culturalSite.youtube_video}
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Location Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    Location Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Province</Label>
                                    <p className="font-medium">{culturalSite.province}</p>
                                </div>
                                
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Category</Label>
                                    <p className="font-medium">{culturalSite.category}</p>
                                </div>
                                
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Coordinates</Label>
                                    <p className="font-mono text-sm">
                                        {culturalSite.latitude.toFixed(6)}, {culturalSite.longitude.toFixed(6)}
                                    </p>
                                    <a
                                        href={`https://www.google.com/maps?q=${culturalSite.latitude},${culturalSite.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline text-sm flex items-center gap-1 mt-1"
                                    >
                                        View on Google Maps
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                                
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Slug</Label>
                                    <p className="font-mono text-sm text-gray-600">{culturalSite.slug}</p>
                                    <Link
                                        href={`/cultural-sites/${culturalSite.slug}`}
                                        className="text-blue-600 hover:underline text-sm flex items-center gap-1 mt-1"
                                    >
                                        View Public Page
                                        <ExternalLink className="w-3 h-3" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Statistics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5" />
                                    Content Statistics
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Articles</span>
                                    <Badge variant="outline">{culturalSite.articles_count}</Badge>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Photos</span>
                                    <Badge variant="outline">{culturalSite.photos_count}</Badge>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Videos</span>
                                    <Badge variant="outline">{culturalSite.videos_count}</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* System Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>System Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div>
                                    <Label className="text-gray-600">Site ID</Label>
                                    <p className="font-mono">{culturalSite.id}</p>
                                </div>
                                
                                <div>
                                    <Label className="text-gray-600">Status</Label>
                                    <p>
                                        <Badge variant={culturalSite.is_active ? "default" : "secondary"}>
                                            {culturalSite.is_active ? 'Active & Visible' : 'Inactive & Hidden'}
                                        </Badge>
                                    </p>
                                </div>
                                
                                <div>
                                    <Label className="text-gray-600">Created At</Label>
                                    <p>{formatDate(culturalSite.created_at)}</p>
                                </div>
                                
                                <div>
                                    <Label className="text-gray-600">Last Updated</Label>
                                    <p>{formatDate(culturalSite.updated_at)}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link href={`/admin/cultural-sites/${culturalSite.id}/edit`}>
                                    <Button variant="outline" className="w-full justify-start">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Details
                                    </Button>
                                </Link>
                                
                                <Button
                                    variant="outline"
                                    onClick={handleToggleStatus}
                                    className="w-full justify-start"
                                >
                                    {culturalSite.is_active ? (
                                        <>
                                            <ToggleLeft className="w-4 h-4 mr-2" />
                                            Deactivate Site
                                        </>
                                    ) : (
                                        <>
                                            <ToggleRight className="w-4 h-4 mr-2" />
                                            Activate Site
                                        </>
                                    )}
                                </Button>
                                
                                <Link href={`/cultural-sites/${culturalSite.slug}`}>
                                    <Button variant="outline" className="w-full justify-start">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        View Public Page
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}