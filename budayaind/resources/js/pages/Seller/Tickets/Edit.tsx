import { useState, FormEvent, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Ticket, TicketFormData } from '@/types/ticket';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, DollarSign, Users, Camera, Plus, X } from 'lucide-react';

interface Props {
  ticket: Ticket;
}

export default function EditTicket({ ticket }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Seller Dashboard',
      href: '/seller/dashboard',
    },
    {
      title: 'Kelola Tiket',
      href: '/seller/tickets',
    },
    {
      title: 'Edit Tiket',
      href: `/seller/tickets/${ticket.id}/edit`,
    },
  ];

  const [formData, setFormData] = useState<TicketFormData>({
    title: ticket.title,
    description: ticket.description,
    destination: ticket.destination,
    price: ticket.price,
    category: ticket.category,
    access_features: [...(ticket.access_features || [])],
    available_quantity: ticket.available_quantity,
    start_date: ticket.start_date,
    end_date: ticket.end_date,
    is_active: ticket.is_active || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(ticket.image || null);

  const destinationOptions = [
    'Taman Garuda Wisnu Kencana (GWK)',
    'Candi Borobudur',
    'Candi Prambanan',
    'Keraton Yogyakarta',
    'Pura Tanah Lot',
    'Pura Uluwatu',
    'Museum Nasional Indonesia',
    'Taman Mini Indonesia Indah',
    'Benteng Vredeburg',
    'Istana Maimun',
  ];

  const accessFeatureOptions = [
    'Akses masuk area utama',
    'Pertunjukan tari tradisional',
    'Kunjungan museum',
    'Audio guide bahasa Indonesia',
    'Audio guide bahasa Inggris',
    'Foto dengan kostum tradisional',
    'Workshop kerajinan tangan',
    'Makanan dan minuman tradisional',
    'Souvenir eksklusif',
    'Akses VIP lounge',
    'Meet & greet dengan seniman',
    'Dokumentasi profesional',
    'Transportasi dalam area',
    'Panduan wisata pribadi',
  ];

  const handleInputChange = (field: keyof TicketFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addAccessFeature = (feature: string) => {
    if (!formData.access_features.includes(feature)) {
      handleInputChange('access_features', [...formData.access_features, feature]);
    }
  };

  const addCustomFeature = () => {
    if (newFeature.trim() && !formData.access_features.includes(newFeature.trim())) {
      handleInputChange('access_features', [...formData.access_features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeAccessFeature = (feature: string) => {
    handleInputChange('access_features', formData.access_features.filter(f => f !== feature));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul tiket wajib diisi';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi tiket wajib diisi';
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destinasi wajib dipilih';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Harga harus lebih dari 0';
    }

    if (formData.available_quantity <= 0) {
      newErrors.available_quantity = 'Jumlah tiket harus lebih dari 0';
    }

    if (formData.available_quantity < ticket.sold_quantity) {
      newErrors.available_quantity = `Jumlah tiket tidak boleh kurang dari tiket yang sudah terjual (${ticket.sold_quantity})`;
    }

    if (!formData.start_date) {
      newErrors.start_date = 'Tanggal mulai wajib diisi';
    }

    if (!formData.end_date) {
      newErrors.end_date = 'Tanggal berakhir wajib diisi';
    }

    if (formData.start_date && formData.end_date && new Date(formData.start_date) >= new Date(formData.end_date)) {
      newErrors.end_date = 'Tanggal berakhir harus setelah tanggal mulai';
    }

    if (formData.access_features.length === 0) {
      newErrors.access_features = 'Minimal satu akses fitur harus dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setProcessing(true);

    const submitData = new FormData();
    submitData.append('_method', 'PUT');

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'access_features') {
        submitData.append(key, JSON.stringify(value));
      } else if (key === 'image' && value instanceof File) {
        submitData.append(key, value);
      } else if (value !== undefined && value !== null) {
        submitData.append(key, value.toString());
      }
    });

    router.post(`/seller/tickets/${ticket.id}`, submitData, {
      onSuccess: () => {
        // Will redirect to tickets index
      },
      onError: (errors) => {
        setErrors(errors);
        setProcessing(false);
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit ${ticket.title}`} />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Edit Tiket Wisata
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Update informasi tiket: {ticket.title}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={ticket.is_active ? 'default' : 'secondary'}>
              {ticket.is_active ? 'Aktif' : 'Tidak Aktif'}
            </Badge>
            <Badge variant="outline">
              {ticket.sold_quantity} / {ticket.available_quantity} terjual
            </Badge>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Informasi Dasar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Judul Tiket *</Label>
                    <Input
                      id="title"
                      placeholder="Misal: Tiket Masuk GWK + Pertunjukan Tari Kecak"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <Label htmlFor="destination">Destinasi *</Label>
                    <Select value={formData.destination} onValueChange={(value) => handleInputChange('destination', value)}>
                      <SelectTrigger className={errors.destination ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Pilih destinasi" />
                      </SelectTrigger>
                      <SelectContent>
                        {destinationOptions.map((destination) => (
                          <SelectItem key={destination} value={destination}>
                            {destination}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.destination && <p className="text-sm text-red-500 mt-1">{errors.destination}</p>}
                  </div>

                  <div>
                    <Label htmlFor="description">Deskripsi *</Label>
                    <Textarea
                      id="description"
                      placeholder="Deskripsikan pengalaman yang akan didapat wisatawan..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className={errors.description ? 'border-red-500' : ''}
                    />
                    {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Pricing & Availability */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Harga & Ketersediaan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Harga (IDR) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0"
                        value={formData.price || ''}
                        onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                        className={errors.price ? 'border-red-500' : ''}
                      />
                      {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                    </div>

                    <div>
                      <Label htmlFor="category">Kategori</Label>
                      <Select value={formData.category} onValueChange={(value: 'basic' | 'premium' | 'vip') => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="vip">VIP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="available_quantity">Jumlah Tiket Tersedia *</Label>
                    <Input
                      id="available_quantity"
                      type="number"
                      placeholder="100"
                      value={formData.available_quantity || ''}
                      onChange={(e) => handleInputChange('available_quantity', parseInt(e.target.value) || 0)}
                      className={errors.available_quantity ? 'border-red-500' : ''}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Tiket terjual: {ticket.sold_quantity} | Sisa: {ticket.available_quantity - ticket.sold_quantity}
                    </p>
                    {errors.available_quantity && <p className="text-sm text-red-500 mt-1">{errors.available_quantity}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start_date">Tanggal Mulai *</Label>
                      <Input
                        id="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => handleInputChange('start_date', e.target.value)}
                        className={errors.start_date ? 'border-red-500' : ''}
                      />
                      {errors.start_date && <p className="text-sm text-red-500 mt-1">{errors.start_date}</p>}
                    </div>

                    <div>
                      <Label htmlFor="end_date">Tanggal Berakhir *</Label>
                      <Input
                        id="end_date"
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => handleInputChange('end_date', e.target.value)}
                        className={errors.end_date ? 'border-red-500' : ''}
                      />
                      {errors.end_date && <p className="text-sm text-red-500 mt-1">{errors.end_date}</p>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                    />
                    <Label htmlFor="is_active">Tiket aktif dan dapat dibeli</Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Foto Tiket
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {imagePreview ? (
                        <div className="space-y-4">
                          <img src={imagePreview} alt="Preview" className="mx-auto max-h-48 rounded-lg" />
                          <div className="flex gap-2 justify-center">
                            <Label htmlFor="image" className="cursor-pointer">
                              <Button type="button" variant="outline" asChild>
                                <span>Ganti Foto</span>
                              </Button>
                            </Label>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setImagePreview(ticket.image);
                                setFormData(prev => ({ ...prev, image: undefined }));
                              }}
                            >
                              Reset
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Camera className="mx-auto w-12 h-12 text-gray-400" />
                          <div>
                            <Label htmlFor="image" className="cursor-pointer">
                              <span className="text-blue-600 hover:text-blue-500">Upload foto baru</span>
                              <span className="text-gray-500"> atau drag & drop</span>
                            </Label>
                          </div>
                          <p className="text-sm text-gray-500">PNG, JPG hingga 2MB</p>
                        </div>
                      )}
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Access Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Akses & Fitur yang Didapat *
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Selected Features */}
                  {formData.access_features.length > 0 && (
                    <div className="space-y-2">
                      <Label>Fitur yang dipilih:</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.access_features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {feature}
                            <button
                              type="button"
                              onClick={() => removeAccessFeature(feature)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Feature Options */}
                  <div className="space-y-2">
                    <Label>Pilih dari fitur yang tersedia:</Label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {accessFeatureOptions
                        .filter(feature => !formData.access_features.includes(feature))
                        .map((feature) => (
                          <Button
                            key={feature}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addAccessFeature(feature)}
                            className="text-xs"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            {feature}
                          </Button>
                        ))}
                    </div>
                  </div>

                  {/* Custom Feature */}
                  <div className="space-y-2">
                    <Label>Atau tambah fitur kustom:</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Fitur khusus..."
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomFeature())}
                      />
                      <Button type="button" onClick={addCustomFeature} disabled={!newFeature.trim()}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {errors.access_features && <p className="text-sm text-red-500">{errors.access_features}</p>}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Submit Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.visit('/seller/tickets')}
                  disabled={processing}
                >
                  Batal
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.visit(`/seller/tickets/${ticket.id}`)}
                  disabled={processing}
                >
                  Lihat Detail
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Menyimpan...' : 'Update Tiket'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </AppLayout>
  );
}