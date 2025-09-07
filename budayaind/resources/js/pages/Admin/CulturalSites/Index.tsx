import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Calendar,
  Eye,
  Edit,
  ToggleLeft,
  ToggleRight,
  Trash2,
  MoreHorizontal,
  ExternalLink,
  Image as ImageIcon,
  Youtube,
  BookOpen,
  Camera,
  Video
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    title: 'Cultural Sites',
    href: '/admin/cultural-sites',
  },
];

interface CulturalSite {
  id: number;
  name: string;
  slug: string;
  province: string;
  category: string;
  latitude: number;
  longitude: number;
  description: string;
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
  culturalSites: {
    data: CulturalSite[];
    links?: any[];
    meta?: any;
  } | CulturalSite[]; // Support both paginated and simple array format
  provinces?: string[];
  categories?: string[];
  filters?: {
    search?: string;
    province?: string;
    category?: string;
    status?: string;
  };
}

export default function Index({ culturalSites, provinces = [], categories = [], filters = {} }: Props) {
  // Handle both paginated and simple array format
  const sitesData = Array.isArray(culturalSites) ? culturalSites : culturalSites.data || [];
  const sitesLinks = Array.isArray(culturalSites) ? [] : culturalSites.links || [];
  const sitesMeta = Array.isArray(culturalSites) ? null : culturalSites.meta || null;
  
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [selectedProvince, setSelectedProvince] = useState(filters.province || 'all');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
  const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [siteToDelete, setSiteToDelete] = useState<CulturalSite | null>(null);

  const handleSearch = () => {
    router.get('/admin/cultural-sites', {
      search: searchTerm || undefined,
      province: selectedProvince !== 'all' ? selectedProvince : undefined,
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      status: selectedStatus !== 'all' ? selectedStatus : undefined,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedProvince('all');
    setSelectedCategory('all');
    setSelectedStatus('all');
    
    router.get('/admin/cultural-sites', {}, {
      preserveState: true,
    });
  };

  const handleToggleStatus = (site: CulturalSite) => {
    router.patch(`/admin/cultural-sites/${site.id}/toggle-status`, {}, {
      preserveState: true,
      onSuccess: () => {
        // Optional: Show success message
      },
    });
  };

  const handleDeleteClick = (site: CulturalSite) => {
    setSiteToDelete(site);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (siteToDelete) {
      router.delete(`/admin/cultural-sites/${siteToDelete.id}`, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSiteToDelete(null);
        },
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Calculate totals for display
  const totalSites = sitesMeta?.total || sitesData.length;
  const fromSite = sitesMeta?.from || (sitesData.length > 0 ? 1 : 0);
  const toSite = sitesMeta?.to || sitesData.length;

  const ActionMenu = ({ site }: { site: CulturalSite }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href={`/admin/cultural-sites/${site.id}`} className="flex items-center w-full">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href={`/admin/cultural-sites/${site.id}/edit`} className="flex items-center w-full">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/cultural-sites/${site.slug}`} target="_blank" className="flex items-center w-full">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Public Page
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={() => handleToggleStatus(site)}
          className="flex items-center cursor-pointer"
        >
          {site.is_active ? (
            <>
              <ToggleLeft className="mr-2 h-4 w-4" />
              Deactivate
            </>
          ) : (
            <>
              <ToggleRight className="mr-2 h-4 w-4" />
              Activate
            </>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={() => handleDeleteClick(site)}
          className="flex items-center text-red-600 focus:text-red-600 cursor-pointer"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Cultural Sites Management" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cultural Sites</h1>
            <p className="text-gray-600">Manage cultural heritage sites across Indonesia</p>
          </div>
          
          <Link href="/admin/cultural-sites/create">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Site
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search sites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>

              {/* Province Filter */}
              <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                <SelectTrigger>
                  <SelectValue placeholder="All Provinces" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Provinces</SelectItem>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="0">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={handleSearch} className="flex-1">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" onClick={resetFilters}>
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                Cultural Sites ({totalSites} total)
              </CardTitle>
              {totalSites > 0 && (
                <div className="text-sm text-gray-500">
                  Showing {fromSite}-{toSite} of {totalSites}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {sitesData.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cultural sites found</h3>
                <p className="text-gray-500 mb-4">
                  {filters.search || filters.province !== 'all' || filters.category !== 'all' || filters.status !== 'all'
                    ? 'Try adjusting your filters or search terms.'
                    : 'Get started by creating your first cultural site.'}
                </p>
                <Link href="/admin/cultural-sites/create">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Cultural Site
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {sitesData.map((site) => (
                  <div
                    key={site.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {/* Image */}
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {site.image ? (
                            <img
                              src={site.image}
                              alt={site.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                <Link 
                                  href={`/admin/cultural-sites/${site.id}`}
                                  className="hover:text-blue-600 transition-colors"
                                >
                                  {site.name}
                                </Link>
                              </h3>
                              <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {site.province}
                                </span>
                                <span>•</span>
                                <span>{site.category}</span>
                                {site.created_at && (
                                  <>
                                    <span>•</span>
                                    <span className="flex items-center">
                                      <Calendar className="w-4 h-4 mr-1" />
                                      {formatDate(site.created_at)}
                                    </span>
                                  </>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                {site.description}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2 ml-4">
                              <Badge variant={site.is_active ? "default" : "secondary"}>
                                {site.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                              <ActionMenu site={site} />
                            </div>
                          </div>

                          {/* Statistics */}
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <span className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-1" />
                              {site.articles_count || 0} articles
                            </span>
                            <span className="flex items-center">
                              <Camera className="w-4 h-4 mr-1" />
                              {site.photos_count || 0} photos
                            </span>
                            <span className="flex items-center">
                              <Video className="w-4 h-4 mr-1" />
                              {site.videos_count || 0} videos
                            </span>
                            {site.youtube_video && (
                              <span className="flex items-center">
                                <Youtube className="w-4 h-4 mr-1 text-red-500" />
                                Video available
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                {sitesLinks && sitesLinks.length > 0 && (
                  <div className="flex justify-center mt-6">
                    <div className="flex space-x-1">
                      {sitesLinks.map((link, index) => (
                        <Link
                          key={index}
                          href={link.url || '#'}
                          className={`px-3 py-2 text-sm border rounded ${
                            link.active
                              ? 'bg-blue-500 text-white border-blue-500'
                              : link.url
                              ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                              : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                          }`}
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the cultural site
              "{siteToDelete?.name}" and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSiteToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}