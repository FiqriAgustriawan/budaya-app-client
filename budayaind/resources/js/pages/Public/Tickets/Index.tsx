import { useState } from 'react';
import { Head, router, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Star, 
  Package, 
  ShoppingCart, 
  Eye, 
  Heart,
  Share2,
  User,
  ArrowLeft,
  LogIn
} from 'lucide-react';
import { getDashboardUrl } from '@/utils/navigation';

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

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  tickets?: {
    data?: TicketType[];
    links?: PaginationLink[];
    meta?: any;
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
    from?: number;
    to?: number;
  };
  filters?: {
    search?: string;
    category?: string;
    destination?: string;
    price_min?: number;
    price_max?: number;
    sort?: string;
  };
  featured_destinations?: string[];
}

export default function PublicTicketsIndex({ 
  tickets = { data: [] }, 
  filters = {}, 
  featured_destinations = [] 
}: Props) {
  // Safe destructuring with proper defaults
  const safeTickets = tickets || { data: [] };
  const safeFilters = filters || {};
  const safeFeaturedDestinations = Array.isArray(featured_destinations) ? featured_destinations : [];

  const { auth } = usePage<SharedData>().props;
  
  // Get dashboard URL based on user role
  const dashboardUrl = auth?.user ? getDashboardUrl(auth.user.role as string) : '/customer/dashboard';

  const [search, setSearch] = useState(safeFilters.search || '');
  const [category, setCategory] = useState(safeFilters.category || 'all');
  const [destination, setDestination] = useState(safeFilters.destination || 'all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState(safeFilters.sort || 'newest');
  const [showFilters, setShowFilters] = useState(false);

  // Safe access to tickets data dengan multiple fallbacks
  const ticketsData = Array.isArray(safeTickets.data) ? safeTickets.data : [];
  const ticketsTotal = safeTickets.total || safeTickets.meta?.total || ticketsData.length || 0;
  const hasTickets = ticketsData.length > 0;
  const hasFeaturedDestinations = safeFeaturedDestinations.length > 0;

  const handleSearch = () => {
    const params: Record<string, string> = {};

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
    if (amount === null || amount === undefined) return 'Rp 0';

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
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'premium':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'vip':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
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

  const handleBookNow = (ticket: TicketType) => {
    if (!auth?.user) {
      router.visit('/login');
      return;
    }

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
    <>
      <Head title="Jelajahi Tiket Wisata Budaya Indonesia" />

      <div className="min-h-screen bg-background">
        {/* Header Navigation */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#a4773e] to-[#d4a574] rounded-xl flex items-center justify-center shadow-lg shadow-[#a4773e]/25">
                  <span className="text-white font-bold text-sm">BI</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-[#a4773e] to-[#d4a574] bg-clip-text">
                    BudayaInd
                  </h1>
                </div>
              </Link>

              {/* Navigation Actions */}
              <div className="flex items-center space-x-4">
                <Link
                  href="/map"
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Peta</span>
                </Link>

                {auth?.user ? (
                  <div className="flex items-center space-x-3">
                    <Link
                      href={dashboardUrl}
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {auth.user.role === 'admin' ? 'Admin Panel' : 
                       auth.user.role === 'seller' ? 'Seller Panel' : 'Dashboard'}
                    </Link>
                    {auth.user.role === 'customer' && (
                      <Button asChild size="sm">
                        <Link href="/customer/cart">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Keranjang
                        </Link>
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Button variant="ghost" asChild size="sm">
                      <Link href="/login">
                        <LogIn className="w-4 h-4 mr-2" />
                        Masuk
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href="/register">Daftar</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 lg:px-6 py-6 space-y-8">
          {/* Hero Section - Seperti Customer Tickets */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#a4773e] to-[#d4a574] text-white p-8">
            <div className="relative z-10">
              <div className="text-lg mb-4 flex items-center gap-2">
                <span>🎭</span>
                <span className="font-semibold">Portal Wisata Budaya Indonesia</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Jelajahi Kekayaan
                <br />
                <span className="text-yellow-200">Budaya Nusantara</span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-2xl">
                Temukan pengalaman wisata budaya terbaik dengan akses eksklusif ke destinasi bersejarah dan tradisi Indonesia
              </p>
              
              <div className="flex flex-wrap gap-4 items-center">
                <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 text-white border-white/30">
                  {ticketsTotal}+ Tiket Tersedia
                </Badge>
                <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 text-white border-white/30">
                  <Star className="w-5 h-5 mr-2" />
                  Destinasi Premium
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Access Login Reminder */}
          {!auth?.user && (
            <Card className="border-dashed border-2 border-[#a4773e]/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#a4773e]/10 rounded-full flex items-center justify-center">
                      <LogIn className="w-6 h-6 text-[#a4773e]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#a4773e]">Ingin Memesan Tiket?</h3>
                      <p className="text-sm text-muted-foreground">Masuk atau daftar untuk melakukan pemesanan tiket wisata budaya</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" asChild>
                      <Link href="/login">Masuk</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register">Daftar Sekarang</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Featured Destinations */}
          {hasFeaturedDestinations && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#a4773e]" />
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
                      className="flex items-center gap-2 hover:bg-[#a4773e]/10 hover:border-[#a4773e]/30"
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
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#a4773e]" />
                  Cari & Filter Tiket
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden"
                >
                  {showFilters ? 'Sembunyikan' : 'Tampilkan'} Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`space-y-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      placeholder="Cari destinasi, aktivitas..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="focus:border-[#a4773e]"
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

                <div className="flex gap-2">
                  <Button onClick={handleSearch} className="flex items-center gap-2 bg-[#a4773e] hover:bg-[#8b6635]">
                    <Search className="w-4 h-4" />
                    Cari Tiket
                  </Button>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Info */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
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

          {/* Tickets Grid - Sama seperti Customer Tickets */}
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
                    <div className="absolute top-2 left-2">
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/80 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
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
                      <User className="w-4 h-4" />
                      <span>by {ticket.seller?.name || 'Unknown Seller'}</span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {ticket.description || 'No description available'}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-[#a4773e]">
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
                        onClick={() => handleBookNow(ticket)}
                        className="flex-1 bg-[#a4773e] hover:bg-[#8b6635]"
                        disabled={!auth?.user}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        {auth?.user ? 'Pesan' : 'Login'}
                      </Button>
                    </div>

                    <div className="flex justify-center mt-2">
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Share2 className="w-3 h-3 mr-1" />
                        Bagikan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Tidak ada tiket ditemukan</h3>
                <p className="text-muted-foreground mb-4 text-center">
                  Coba ubah kriteria pencarian atau filter Anda untuk menemukan tiket yang sesuai
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Lihat Semua Tiket
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Pagination */}
          {safeTickets.links && Array.isArray(safeTickets.links) && safeTickets.links.length > 0 && (
            <div className="flex justify-center">
              <div className="flex space-x-2">
                {safeTickets.links.map((link: PaginationLink, index: number) => (
                  <Button
                    key={index}
                    variant={link.active ? "default" : "outline"}
                    size="sm"
                    disabled={!link.url}
                    onClick={() => link.url && router.visit(link.url)}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={link.active ? 'bg-[#a4773e] hover:bg-[#8b6635]' : ''}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}