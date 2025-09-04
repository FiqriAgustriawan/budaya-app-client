import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Upload, Package, MapPin, DollarSign, FileText, Tag, Users, Calendar, Clock, Camera, Plus, X } from 'lucide-react';

interface TicketForm {
  title: string;
  description: string;
  price: string;
  destination: string;
  category: string;
  access_features: string[];
  start_date: string;
  end_date: string;
  available_quantity: string;
  is_active: boolean;
  image: File | null;
  general?: string; // Added for general error messages
}

export default function CreateTicket() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newFeature, setNewFeature] = useState('');

  // Get tomorrow's date as default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];

  const { data, setData, post, processing, errors, reset } = useForm<TicketForm>({
    title: '',
    description: '',
    price: '',
    destination: '',
    category: 'basic',
    access_features: [],
    start_date: tomorrowString,
    end_date: tomorrowString,
    available_quantity: '100',
    is_active: true,
    image: null,
  });

  // Destination options - sama seperti di Edit
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

  // Access feature options - sama seperti di Edit
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setData('image', file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const addAccessFeature = (feature: string) => {
    if (!data.access_features.includes(feature)) {
      setData('access_features', [...data.access_features, feature]);
    }
  };

  const addCustomFeature = () => {
    if (newFeature.trim() && !data.access_features.includes(newFeature.trim())) {
      setData('access_features', [...data.access_features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeAccessFeature = (feature: string) => {
    setData('access_features', data.access_features.filter(f => f !== feature));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Submitting form with data:', data);
    
    post(route('seller.tickets.store'), {
      preserveScroll: true,
      onSuccess: (page) => {
        console.log('Success response:', page);
        reset();
        setImagePreview(null);
      },
      onError: (errors) => {
        console.error('Form errors:', errors);
      },
      onFinish: () => {
        console.log('Form submission finished');
      }
    });
  };

  const formatPrice = (value: string) => {
    const number = value.replace(/\D/g, '');
    return new Intl.NumberFormat('id-ID').format(parseInt(number) || 0);
  };

  return (
    <AppLayout>
      <Head title="Buat Tiket Baru" />
      
      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={route('seller.tickets.index')}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Buat Tiket Wisata Baru
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Tambahkan tiket wisata budaya untuk dijual di platform
              </p>
            </div>
          </div>
        </div>

        {/* Debug Information */}
        {Object.keys(errors).length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-red-800 mb-2">Error Debug Info:</h3>
              <pre className="text-sm text-red-600 whitespace-pre-wrap">
                {JSON.stringify(errors, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Basic Information */}
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
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <Label htmlFor="destination">Destinasi *</Label>
                    <Select value={data.destination} onValueChange={(value) => setData('destination', value)}>
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
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
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
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        className={errors.price ? 'border-red-500' : ''}
                      />
                      {data.price && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatPrice(data.price)} rupiah
                        </p>
                      )}
                      {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                    </div>

                    <div>
                      <Label htmlFor="category">Kategori</Label>
                      <Select value={data.category} onValueChange={(value) => setData('category', value)}>
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
                      value={data.available_quantity}
                      onChange={(e) => setData('available_quantity', e.target.value)}
                      className={errors.available_quantity ? 'border-red-500' : ''}
                    />
                    {errors.available_quantity && <p className="text-sm text-red-500 mt-1">{errors.available_quantity}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start_date">Tanggal Mulai *</Label>
                      <Input
                        id="start_date"
                        type="date"
                        value={data.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={errors.start_date ? 'border-red-500' : ''}
                      />
                      {errors.start_date && <p className="text-sm text-red-500 mt-1">{errors.start_date}</p>}
                    </div>

                    <div>
                      <Label htmlFor="end_date">Tanggal Berakhir *</Label>
                      <Input
                        id="end_date"
                        type="date"
                        value={data.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                        min={data.start_date}
                        className={errors.end_date ? 'border-red-500' : ''}
                      />
                      {errors.end_date && <p className="text-sm text-red-500 mt-1">{errors.end_date}</p>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={data.is_active}
                      onCheckedChange={(checked) => setData('is_active', checked)}
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
                                setImagePreview(null);
                                setData('image', null);
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
                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
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
                  {data.access_features.length > 0 && (
                    <div className="space-y-2">
                      <Label>Fitur yang dipilih:</Label>
                      <div className="flex flex-wrap gap-2">
                        {data.access_features.map((feature, index) => (
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
                        .filter(feature => !data.access_features.includes(feature))
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

          {/* General Error */}
          {errors.general && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-sm text-red-600 font-medium">Error:</p>
                <p className="text-sm text-red-600">{errors.general}</p>
              </CardContent>
            </Card>
          )}

          {/* Submit Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 justify-end">
                <Link href={route('seller.tickets.index')}>
                  <Button type="button" variant="outline" disabled={processing}>
                    Batal
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Menyimpan...
                    </>
                  ) : (
                    'Simpan Tiket'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </AppLayout>
  );
}