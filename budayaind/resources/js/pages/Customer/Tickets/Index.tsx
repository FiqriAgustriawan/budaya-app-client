import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Calendar, Star, Package, ShoppingCart, Eye } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Beranda',
    href: '/',
  },
  {
    title: 'Tiket Wisata',
    href: '/tickets',
  },
];

interface TicketType {
  id: number;
  title: string;
  description: string;
  price: number;
  destination: string;
  category: string;
  image?: string;
  available_quantity?: number;
  sold_quantity?: number;
  seller?: {
    id: number;
    name: string;
    email?: string;
  };
}

interface Props {
  tickets: {
    data: TicketType[];
    links?: any[];
    meta?: any;
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
    from?: number;
    to?: number;
  };

  filters: {
    search: string;
    category: string;
    destination: string;
    price_min?: number;
    price_max?: number;
    sort: string;
  };

  featured_destinations: string[];
}

export default function CustomerTicketIndex({ tickets, filters, featured_destinations }: Props) {
  // Safe destructuring with defaults
  const safeTickets = tickets || { data: [] };
  const safeFilters = filters || { search: '', category: 'all', destination: 'all', sort: 'newest' };
  const safeFeaturedDestinations = featured_destinations || [];

  const [search, setSearch] = useState(safeFilters.search || '');
  const [category, setCategory] = useState(safeFilters.category || 'all');
  const [destination, setDestination] = useState(safeFilters.destination || 'all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState(safeFilters.sort || 'newest');

  // Safe access to tickets data
  const ticketsData = safeTickets.data || [];
  const ticketsTotal = safeTickets.total || ticketsData.length || 0;
  const hasTickets = Array.isArray(ticketsData) && ticketsData.length > 0;
  const hasFeaturedDestinations = Array.isArray(safeFeaturedDestinations) && safeFeaturedDestinations.length > 0;

  const handleSearch = () => {
    const params: any = {};

    if (search && search.trim()) params.search = search.trim();
    if (category && category !== 'all') params.category = category;
    if (destination && destination !== 'all') params.destination = destination;
    if (sortBy && sortBy !== 'newest') params.sort = sortBy;

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-');
      if (min) params.price_min = min;
      if (max && max !== '') params.price_max = max;
    }

    router.get('/tickets', params, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const formatCurrency = (amount: number | undefined | null) => {
    if (!amount && amount !== 0) return 'Rp 0';

    try {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(amount);
    } catch (error) {
      return `Rp ${amount.toLocaleString('id-ID')}`;
    }
  };

  const getCategoryColor = (category: string | undefined) => {
    switch (category?.toLowerCase()) {
      case 'basic':
        return 'bg-blue-100 text-blue-800';
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'vip':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getImageUrl = (imagePath: string | null | undefined) => {
    if (!imagePath) {
      return '/images/placeholder-ticket.jpg';
    }

    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    if (imagePath.startsWith('tickets/')) {
      return `/storage/${imagePath}`;
    }

    return `/storage/tickets/${imagePath}`;
  };

  const handleAddToCart = (ticket: TicketType) => {
    router.post('/customer/cart/add', {
      ticket_id: ticket.id,
      quantity: 1
    }, {
      onSuccess: () => {
        alert('Tiket berhasil ditambahkan ke keranjang!');
      },
      onError: (errors) => {
        console.error('Add to cart error:', errors);
        alert('Gagal menambahkan tiket ke keranjang.');
      }
    });
  };

  const resetFilters = () => {
    setSearch('');
    setCategory('all');
    setDestination('all');
    setPriceRange('all');
    setSortBy('newest');
    router.get('/tickets');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tiket Wisata Budaya Indonesia" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">
              Jelajahi Kekayaan Budaya Indonesia
            </h1>
            <p className="text-xl mb-6 opacity-90">
              Temukan pengalaman wisata budaya terbaik dengan akses eksklusif ke destinasi bersejarah
            </p>
            <div className="flex gap-4 items-center">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {ticketsTotal}+ Tiket Tersedia
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Destinasi Premium
              </Badge>
            </div>
          </div>
        </div>

        {/* Featured Destinations */}
        {hasFeaturedDestinations && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Destinasi Unggulan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {safeFeaturedDestinations.map((dest) => (
                  <Button
                    key={dest}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDestination(dest);
                      router.get('/tickets', { destination: dest });
                    }}
                    className="flex items-center gap-2"
                  >
                    <MapPin className="w-3 h-3" />
                    {dest}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Cari & Filter Tiket
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Cari destinasi, aktivitas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>

              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Destinasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Destinasi</SelectItem>
                  {safeFeaturedDestinations.map((dest) => (
                    <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Harga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Harga</SelectItem>
                  <SelectItem value="0-50000">&lt; Rp 50.000</SelectItem>
                  <SelectItem value="50000-100000">Rp 50.000 - 100.000</SelectItem>
                  <SelectItem value="100000-200000">Rp 100.000 - 200.000</SelectItem>
                  <SelectItem value="200000-">Rp 200.000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={handleSearch} className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Cari Tiket
              </Button>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Info */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {search || category !== 'all' || destination !== 'all' ? 'Hasil Pencarian' : 'Semua Tiket'}
            </h2>
            <p className="text-muted-foreground">
              Ditemukan {ticketsTotal} tiket
              {destination !== 'all' && ` di ${destination}`}
              {category !== 'all' && ` kategori ${category}`}
            </p>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Terbaru</SelectItem>
              <SelectItem value="price_low">Harga Terendah</SelectItem>
              <SelectItem value="price_high">Harga Tertinggi</SelectItem>
              <SelectItem value="popular">Terpopuler</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tickets Grid */}
        {hasTickets ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ticketsData.map((ticket) => (
              <Card key={ticket.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={getImageUrl(ticket.image)}
                    alt={ticket.title || 'Ticket'}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder-ticket.jpg';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={getCategoryColor(ticket.category)}>
                      {ticket.category?.toUpperCase() || 'BASIC'}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {ticket.title || 'Untitled Ticket'}
                  </h3>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{ticket.destination || 'Unknown Location'}</span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <Package className="w-4 h-4" />
                    <span>by {ticket.seller?.name || 'Unknown Seller'}</span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {ticket.description || 'No description available'}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {formatCurrency(ticket.price)}
                      </div>
                      <div className="text-xs text-muted-foreground">per orang</div>
                    </div>

                    {ticket.available_quantity && (
                      <div className="text-xs text-muted-foreground">
                        {(ticket.available_quantity - (ticket.sold_quantity || 0))} tersisa
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.visit(`/tickets/${ticket.id}`)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Detail
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(ticket)}
                      className="flex-1"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Tambah
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tidak ada tiket ditemukan</h3>
              <p className="text-muted-foreground mb-4">
                Coba ubah kriteria pencarian atau filter Anda
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Lihat Semua Tiket
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {safeTickets.links && Array.isArray(safeTickets.links) && (
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {safeTickets.links.map((link: any, index: number) => (
                <Button
                  key={index}
                  variant={link.active ? "default" : "outline"}
                  size="sm"
                  disabled={!link.url}
                  onClick={() => link.url && router.visit(link.url)}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}