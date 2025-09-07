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
  Trash2,
} from 'lucide-react';
import { useState, useRef } from 'react';

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
  existingProvinces: string[];
  existingCategories: string[];
}

export default function Edit({ culturalSite, existingProvinces, existingCategories }: Props) {
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
    {
      title: 'Edit',
      href: `/admin/cultural-sites/${culturalSite.id}/edit`,
    },
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const photosInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(culturalSite.image);
  const [photosPreviews, setPhotosPreviews] = useState<string[]>([]);

  const { data, setData, patch, processing, errors } = useForm({
    name: culturalSite.name,
    province: culturalSite.province,
    category: culturalSite.category,
    latitude: culturalSite.latitude.toString(),
    longitude: culturalSite.longitude.toString(),
    description: culturalSite.description,
    content: culturalSite.content || '',
    image: null as File | null,
    photos: [] as File[],
    youtube_video: culturalSite.youtube_video || '',
    articles_count: culturalSite.articles_count,
    photos_count: culturalSite.photos_count,
    videos_count: culturalSite.videos_count,
    is_active: culturalSite.is_active,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(`/admin/cultural-sites/${culturalSite.id}`, {
        forceFormData: true,
        onSuccess: () => {
            // Redirect to show page after successful update
        },
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

  const handleCoordinateClick = () => {
    const lat = prompt('Enter Latitude (-90 to 90):', data.latitude);
    const lng = prompt('Enter Longitude (-180 to 180):', data.longitude);

    if (lat && lng) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);

      if (latNum >= -90 && latNum <= 90 && lngNum >= -180 && lngNum <= 180) {
        setData('latitude', lat);
        setData('longitude', lng);
      } else {
        alert('Invalid coordinates. Please enter valid latitude (-90 to 90) and longitude (-180 to 180).');
      }
    }
  };

  const handleDeleteSite = () => {
    if (confirm(`Are you sure you want to delete "${culturalSite.name}"? This action cannot be undone.`)) {
      // Using router.delete for deletion
      window.location.href = `/admin/cultural-sites/${culturalSite.id}?_method=DELETE`;
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit ${culturalSite.name}`} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Cultural Site</h1>
            <p className="text-gray-600">Update information for "{culturalSite.name}"</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={handleDeleteSite}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Site
            </Button>

            <Link href={`/admin/cultural-sites/${culturalSite.id}`}>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Details
              </Button>
            </Link>
          </div>
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
                      placeholder="e.g., Candi Borobudur"
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Province & Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="province">Province *</Label>
                      <Select value={data.province} onValueChange={(value) => setData('province', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                          {existingProvinces.map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Or type new province"
                        value={data.province}
                        onChange={(e) => setData('province', e.target.value)}
                      />
                      {errors.province && (
                        <p className="text-sm text-red-600">{errors.province}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {existingCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Or type new category"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                      />
                      {errors.category && (
                        <p className="text-sm text-red-600">{errors.category}</p>
                      )}
                    </div>
                  </div>

                  {/* Coordinates */}
                  <div className="space-y-2">
                    <Label>Coordinates *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        placeholder="Latitude"
                        type="number"
                        step="0.000001"
                        value={data.latitude}
                        onChange={(e) => setData('latitude', e.target.value)}
                        required
                      />
                      <Input
                        placeholder="Longitude"
                        type="number"
                        step="0.000001"
                        value={data.longitude}
                        onChange={(e) => setData('longitude', e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCoordinateClick}
                        className="flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4" />
                        Update Location
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Current: {culturalSite.latitude.toFixed(6)}, {culturalSite.longitude.toFixed(6)}
                    </p>
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

                  {/* Site Info */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Created:</strong> {new Date(culturalSite.created_at).toLocaleDateString('id-ID')}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Last Updated:</strong> {new Date(culturalSite.updated_at).toLocaleDateString('id-ID')}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Slug:</strong> {culturalSite.slug}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Current Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Main Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Current Image Display */}
                  {imagePreview && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Current Image:</Label>
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Current image"
                          className="w-full h-32 object-cover rounded border"
                        />
                        {data.image && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setData('image', null);
                              setImagePreview(culturalSite.image);
                            }}
                            className="absolute top-2 right-2"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Upload New Image */}
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {imagePreview ? 'Change Image' : 'Upload Image'}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

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
                    Add More Photos
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
                            alt={`New photo ${index + 1}`}
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

                  <p className="text-sm text-gray-500">
                    Note: These are new photos to be added. Existing photos can be managed separately.
                  </p>
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
                      {processing ? 'Updating...' : 'Update Site'}
                    </Button>

                    <Link href={`/admin/cultural-sites/${culturalSite.id}`}>
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
      </div>
    </AppLayout>
  );
}