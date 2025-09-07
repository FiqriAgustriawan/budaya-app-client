import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Save,
  MapPin,
  Upload,
  Plus,
  X,
  Youtube,
  Map,
} from 'lucide-react';
import { useState, useRef } from 'react';
import MapPicker from '@/components/MapPicker';

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
    title: 'Create New Site',
    href: '/admin/cultural-sites/create',
  },
];

// 🏛️ Daftar Provinsi & Kepulauan Indonesia Lengkap
const DEFAULT_PROVINCES = [
  // Sumatera
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Sumatera Selatan",
  "Kepulauan Bangka Belitung",
  "Bengkulu",
  "Lampung",

  // Jawa
  "DKI Jakarta",
  "Jawa Barat",
  "Banten",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",

  // Bali & Nusa Tenggara
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",

  // Kalimantan
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",

  // Sulawesi
  "Sulawesi Utara",
  "Gorontalo",
  "Sulawesi Tengah",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",

  // Maluku & Papua
  "Maluku",
  "Maluku Utara",
  "Papua Barat",
  "Papua Barat Daya",
  "Papua",
  "Papua Pegunungan",
  "Papua Tengah",
  "Papua Selatan"
];

// 🎭 Kategori Budaya Indonesia Lengkap
const DEFAULT_CATEGORIES = [
  // Arsitektur & Bangunan
  "Candi",
  "Masjid Bersejarah",
  "Gereja Bersejarah",
  "Pura",
  "Vihara",
  "Istana",
  "Benteng",
  "Rumah Adat",
  "Arsitektur Kolonial",
  "Monumen",
  "Makam Bersejarah",

  // Seni Pertunjukan
  "Tarian Tradisional",
  "Musik Tradisional",
  "Teater Tradisional",
  "Wayang",
  "Opera Tradisional",
  "Pertunjukan Ritual",

  // Kerajinan & Seni Rupa
  "Batik",
  "Tenun",
  "Ukiran",
  "Keramik",
  "Kerajinan Logam",
  "Kerajinan Bambu",
  "Kerajinan Rotan",
  "Lukisan Tradisional",
  "Patung Tradisional",
  "Perhiasan Tradisional",

  // Kuliner
  "Makanan Tradisional",
  "Minuman Tradisional",
  "Bumbu & Rempah",
  "Kue Tradisional",
  "Teknik Memasak Tradisional",

  // Tradisi & Upacara
  "Upacara Adat",
  "Festival Budaya",
  "Ritual Keagamaan",
  "Tradisi Pernikahan",
  "Upacara Kematian",
  "Tradisi Pertanian",
  "Tradisi Nelayan",

  // Pakaian & Aksesoris
  "Pakaian Adat",
  "Aksesoris Tradisional",
  "Topi Tradisional",
  "Sepatu Tradisional",

  // Permainan & Olahraga
  "Permainan Tradisional",
  "Olahraga Tradisional",
  "Senjata Tradisional",

  // Bahasa & Sastra
  "Bahasa Daerah",
  "Sastra Lisan",
  "Aksara Tradisional",
  "Dongeng & Legenda",

  // Tempat Bersejarah
  "Situs Arkeologi",
  "Museum",
  "Kampung Adat",
  "Kawasan Bersejarah",
  "Tempat Kelahiran Tokoh",

  // Alam & Lingkungan
  "Hutan Adat",
  "Danau Sakral",
  "Gunung Sakral",
  "Gua Bersejarah",
  "Pantai Bersejarah"
];

interface Props {
  existingProvinces?: string[];
  existingCategories?: string[];
}

interface CulturalSiteForm {
  name: string;
  province: string;
  category: string;
  latitude: string;
  longitude: string;
  description: string;
  content: string;
  image: File | null;
  photos: File[];
  youtube_video: string;
  articles_count: number;
  photos_count: number;
  videos_count: number;
  is_active: boolean;
}

export default function Create({ existingProvinces = [], existingCategories = [] }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photosInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [photosPreviews, setPhotosPreviews] = useState<string[]>([]);
  const [isMapPickerOpen, setIsMapPickerOpen] = useState(false);

  // 🔄 Gabungkan data existing dengan default, hapus duplikat, dan urutkan
  const allProvinces = Array.from(new Set([...DEFAULT_PROVINCES, ...existingProvinces])).sort();
  const allCategories = Array.from(new Set([...DEFAULT_CATEGORIES, ...existingCategories])).sort();

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    province: '',
    category: '',
    latitude: '',
    longitude: '',
    description: '',
    content: '',
    image: null as File | null,
    photos: [] as File[],
    youtube_video: '',
    articles_count: 0,
    photos_count: 0,
    videos_count: 0,
    is_active: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/cultural-sites', {
      forceFormData: true,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('image', file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setData('photos', [...data.photos, ...files]);

      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotosPreviews(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = data.photos.filter((_, i) => i !== index);
    const newPreviews = photosPreviews.filter((_, i) => i !== index);

    setData('photos', newPhotos);
    setPhotosPreviews(newPreviews);
  };

  const handleMapLocationSelect = (lat: number, lng: number) => {
    setData({
      ...data,
      latitude: lat.toString(),
      longitude: lng.toString(),
    });
  };

  const openMapPicker = () => {
    setIsMapPickerOpen(true);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Cultural Site" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Cultural Site</h1>
            <p className="text-gray-600">Add a new cultural heritage site to the map</p>
          </div>

          <Link href="/admin/cultural-sites">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to List
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Site Name *</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="e.g., Candi Borobudur, Rumah Gadang, Tari Kecak"
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Province & Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 🏛️ Enhanced Province Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="province">Province *</Label>
                      <Select value={data.province} onValueChange={(value) => setData('province', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select province or region" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {/* Group by Region */}
                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Sumatera
                          </div>
                          {allProvinces.filter(p =>
                            ['Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau', 'Jambi', 'Sumatera Selatan', 'Kepulauan Bangka Belitung', 'Bengkulu', 'Lampung'].includes(p)
                          ).map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}

                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t mt-2 pt-2">
                            Jawa
                          </div>
                          {allProvinces.filter(p =>
                            ['DKI Jakarta', 'Jawa Barat', 'Banten', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur'].includes(p)
                          ).map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}

                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t mt-2 pt-2">
                            Bali & Nusa Tenggara
                          </div>
                          {allProvinces.filter(p =>
                            ['Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur'].includes(p)
                          ).map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}

                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t mt-2 pt-2">
                            Kalimantan
                          </div>
                          {allProvinces.filter(p =>
                            ['Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara'].includes(p)
                          ).map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}

                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t mt-2 pt-2">
                            Sulawesi
                          </div>
                          {allProvinces.filter(p =>
                            ['Sulawesi Utara', 'Gorontalo', 'Sulawesi Tengah', 'Sulawesi Barat', 'Sulawesi Selatan', 'Sulawesi Tenggara'].includes(p)
                          ).map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}

                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t mt-2 pt-2">
                            Maluku & Papua
                          </div>
                          {allProvinces.filter(p =>
                            ['Maluku', 'Maluku Utara', 'Papua Barat', 'Papua Barat Daya', 'Papua', 'Papua Pegunungan', 'Papua Tengah', 'Papua Selatan'].includes(p)
                          ).map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Or type custom province name"
                        value={data.province}
                        onChange={(e) => setData('province', e.target.value)}
                        className="text-sm"
                      />
                      {errors.province && (
                        <p className="text-sm text-red-600">{errors.province}</p>
                      )}
                    </div>

                    {/* 🎭 Enhanced Category Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cultural category" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {/* Group by Type */}
                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            🏛️ Arsitektur & Bangunan
                          </div>
                          {allCategories.filter(c =>
                            ['Candi', 'Masjid Bersejarah', 'Gereja Bersejarah', 'Pura', 'Vihara', 'Istana', 'Benteng', 'Rumah Adat', 'Arsitektur Kolonial', 'Monumen', 'Makam Bersejarah'].includes(c)
                          ).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}

                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t mt-2 pt-2">
                            🎭 Seni Pertunjukan
                          </div>
                          {allCategories.filter(c =>
                            ['Tarian Tradisional', 'Musik Tradisional', 'Teater Tradisional', 'Wayang', 'Opera Tradisional', 'Pertunjukan Ritual'].includes(c)
                          ).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}

                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t mt-2 pt-2">
                            🎨 Kerajinan & Seni Rupa
                          </div>
                          {allCategories.filter(c =>
                            ['Batik', 'Tenun', 'Ukiran', 'Keramik', 'Kerajinan Logam', 'Kerajinan Bambu', 'Kerajinan Rotan', 'Lukisan Tradisional', 'Patung Tradisional', 'Perhiasan Tradisional'].includes(c)
                          ).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}

                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t mt-2 pt-2">
                            🍽️ Kuliner
                          </div>
                          {allCategories.filter(c =>
                            ['Makanan Tradisional', 'Minuman Tradisional', 'Bumbu & Rempah', 'Kue Tradisional', 'Teknik Memasak Tradisional'].includes(c)
                          ).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}

                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t mt-2 pt-2">
                            🎪 Tradisi & Upacara
                          </div>
                          {allCategories.filter(c =>
                            ['Upacara Adat', 'Festival Budaya', 'Ritual Keagamaan', 'Tradisi Pernikahan', 'Upacara Kematian', 'Tradisi Pertanian', 'Tradisi Nelayan'].includes(c)
                          ).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}

                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t mt-2 pt-2">
                            👘 Pakaian & Aksesoris
                          </div>
                          {allCategories.filter(c =>
                            ['Pakaian Adat', 'Aksesoris Tradisional', 'Topi Tradisional', 'Sepatu Tradisional'].includes(c)
                          ).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}

                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t mt-2 pt-2">
                            🎮 Permainan & Olahraga
                          </div>
                          {allCategories.filter(c =>
                            ['Permainan Tradisional', 'Olahraga Tradisional', 'Senjata Tradisional'].includes(c)
                          ).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}

                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t mt-2 pt-2">
                            📚 Bahasa & Sastra
                          </div>
                          {allCategories.filter(c =>
                            ['Bahasa Daerah', 'Sastra Lisan', 'Aksara Tradisional', 'Dongeng & Legenda'].includes(c)
                          ).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}

                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t mt-2 pt-2">
                            🏛️ Tempat Bersejarah
                          </div>
                          {allCategories.filter(c =>
                            ['Situs Arkeologi', 'Museum', 'Kampung Adat', 'Kawasan Bersejarah', 'Tempat Kelahiran Tokoh'].includes(c)
                          ).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}

                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t mt-2 pt-2">
                            🌿 Alam & Lingkungan
                          </div>
                          {allCategories.filter(c =>
                            ['Hutan Adat', 'Danau Sakral', 'Gunung Sakral', 'Gua Bersejarah', 'Pantai Bersejarah'].includes(c)
                          ).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Or type custom category name"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        className="text-sm"
                      />
                      {errors.category && (
                        <p className="text-sm text-red-600">{errors.category}</p>
                      )}
                    </div>
                  </div>

                  {/* Coordinates Section */}
                  <div className="space-y-2">
                    <Label>Coordinates *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                          id="latitude"
                          placeholder="e.g., -6.1751"
                          type="number"
                          step="0.000001"
                          value={data.latitude}
                          onChange={(e) => setData('latitude', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                          id="longitude"
                          placeholder="e.g., 106.8650"
                          type="number"
                          step="0.000001"
                          value={data.longitude}
                          onChange={(e) => setData('longitude', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Map Picker Button */}
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={openMapPicker}
                        className="flex items-center gap-2"
                      >
                        <Map className="w-4 h-4" />
                        Pick Location on Map
                      </Button>

                      {data.latitude && data.longitude && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded border border-green-200">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">
                            Location: {parseFloat(data.latitude).toFixed(4)}, {parseFloat(data.longitude).toFixed(4)}
                          </span>
                        </div>
                      )}
                    </div>

                    {(errors.latitude || errors.longitude) && (
                      <p className="text-sm text-red-600">
                        {errors.latitude || errors.longitude}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description *</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Brief description of the cultural site..."
                      rows={3}
                      maxLength={1000}
                      required
                    />
                    <p className="text-sm text-gray-500">
                      {data.description.length}/1000 characters
                    </p>
                    {errors.description && (
                      <p className="text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="content">Article Content</Label>
                    <Textarea
                      id="content"
                      value={data.content}
                      onChange={(e) => setData('content', e.target.value)}
                      placeholder="Detailed article content about the cultural site..."
                      rows={10}
                    />
                    <p className="text-sm text-gray-500">
                      You can use HTML tags for formatting
                    </p>
                    {errors.content && (
                      <p className="text-sm text-red-600">{errors.content}</p>
                    )}
                  </div>

                  {/* YouTube Video */}
                  <div className="space-y-2">
                    <Label htmlFor="youtube_video">YouTube Video URL</Label>
                    <div className="relative">
                      <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="youtube_video"
                        value={data.youtube_video}
                        onChange={(e) => setData('youtube_video', e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="pl-10"
                      />
                    </div>
                    {errors.youtube_video && (
                      <p className="text-sm text-red-600">{errors.youtube_video}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status & Counts */}
              <Card>
                <CardHeader>
                  <CardTitle>Status & Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Active Status */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_active"
                      checked={data.is_active}
                      onCheckedChange={(checked) => {
                        setData('is_active', checked === true);
                      }}
                    />
                    <Label htmlFor="is_active">Active (visible on map)</Label>
                  </div>

                  {/* Content Counts */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="articles_count">Articles Count</Label>
                      <Input
                        id="articles_count"
                        type="number"
                        min="0"
                        value={data.articles_count}
                        onChange={(e) => setData('articles_count', parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="photos_count">Photos Count</Label>
                      <Input
                        id="photos_count"
                        type="number"
                        min="0"
                        value={data.photos_count}
                        onChange={(e) => setData('photos_count', parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="videos_count">Videos Count</Label>
                      <Input
                        id="videos_count"
                        type="number"
                        min="0"
                        value={data.videos_count}
                        onChange={(e) => setData('videos_count', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Main Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Choose Image
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setData('image', null);
                            setImagePreview(null);
                          }}
                          className="absolute top-2 right-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {errors.image && (
                      <p className="text-sm text-red-600">{errors.image}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Photos */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Photos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => photosInputRef.current?.click()}
                    className="w-full flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Photos
                  </Button>
                  <input
                    ref={photosInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotosChange}
                    className="hidden"
                  />

                  {photosPreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {photosPreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-20 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 w-6 h-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <Button
                      type="submit"
                      disabled={processing}
                      className="w-full flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {processing ? 'Creating...' : 'Create Site'}
                    </Button>

                    <Link href="/admin/cultural-sites">
                      <Button variant="outline" className="w-full">
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>

        {/* Map Picker Modal */}
        <MapPicker
          isOpen={isMapPickerOpen}
          onClose={() => setIsMapPickerOpen(false)}
          onLocationSelect={handleMapLocationSelect}
          initialLat={data.latitude ? parseFloat(data.latitude) : undefined}
          initialLng={data.longitude ? parseFloat(data.longitude) : undefined}
        />
      </div>
    </AppLayout>
  );
}