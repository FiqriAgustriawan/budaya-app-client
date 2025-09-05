import { useState } from 'react';
import { Head, router, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  MapPin,
  User,
  Calendar,
  Users,
  Star,
  Share2,
  Heart,
  ShoppingCart,
  LogIn,
  Camera,
  Clock,
  Award,
  Shield
} from 'lucide-react';
import { MagicCard } from '@/components/magicui/magic-card';
import { BorderBeam } from '@/components/magicui/border-beam';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { getDashboardUrl } from '@/utils/navigation';

interface TicketType {
  id: number;
  title: string;
  description: string;
  price: number;
  destination: string;
  category: string;
  image?: string;
  available_dates?: string[];
  max_participants?: number;
  access_features?: string[];
  seller?: {
    id: number;
    name: string;
    email?: string;
  };
}

interface Props {
  ticket: TicketType;
  related_tickets: TicketType[];
}

export default function PublicTicketShow({ ticket, related_tickets }: Props) {
  const { auth } = usePage<SharedData>().props;
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Get dashboard URL based on user role
  const dashboardUrl = auth?.user ? getDashboardUrl(auth.user.role as string) : '/customer/dashboard';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
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
    if (!imagePath) return '/images/placeholder-ticket.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('tickets/')) return `/storage/${imagePath}`;
    return `/storage/tickets/${imagePath}`;
  };

  const handleBookNow = () => {
    if (!auth.user) {
      router.visit('/login');
      return;
    }

    router.post('/customer/cart/add', {
      ticket_id: ticket.id,
      quantity: selectedQuantity
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

  return (
    <>
      <Head title={`${ticket.title} - BudayaInd`} />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/tickets">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                  </Link>
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#a4773e] to-[#d4a574] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">BI</span>
                  </div>
                  <span className="font-semibold text-transparent bg-gradient-to-r from-[#a4773e] to-[#d4a574] bg-clip-text">
                    BudayaInd
                  </span>
                </Link>
              </div>

              <div className="flex items-center space-x-3">
                {auth?.user ? (
                  <Button asChild>
                    <Link href={dashboardUrl}>
                      {auth.user.role === 'admin' ? 'Admin Panel' : 
                       auth.user.role === 'seller' ? 'Seller Panel' : 'Dashboard'}
                    </Link>
                  </Button>
                ) : (
                  <div className="flex items-center space-x-2">
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

        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Image */}
              <MagicCard className="overflow-hidden">
                <div className="relative">
                  <img
                    src={getImageUrl(ticket.image)}
                    alt={ticket.title}
                    className="w-full h-96 object-cover"
                  />
                  <BorderBeam size={300} duration={12} delay={9} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(ticket.category)}>
                        {ticket.category?.toUpperCase()}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </MagicCard>

              {/* Ticket Info */}
              <div className="space-y-6">
                <div>
                  <AnimatedGradientText className="mb-2">
                    🎭 <span className="inline animate-gradient bg-gradient-to-r from-[#a4773e] via-[#d4a574] to-[#a4773e] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
                      Wisata Budaya Premium
                    </span>
                  </AnimatedGradientText>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-4">{ticket.title}</h1>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{ticket.destination}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>by {ticket.seller?.name}</span>
                    </div>
                    {ticket.max_participants && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>Max {ticket.max_participants} orang</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Deskripsi</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {ticket.description}
                  </p>
                </div>

                {/* Features */}
                {ticket.access_features && ticket.access_features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Yang Anda Dapatkan</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {ticket.access_features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                          <Award className="w-5 h-5 text-[#a4773e] flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Dates */}
                {ticket.available_dates && ticket.available_dates.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Tanggal Tersedia</h3>
                    <div className="flex flex-wrap gap-2">
                      {ticket.available_dates.map((date, index) => (
                        <Badge key={index} variant="outline" className="px-3 py-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(date).toLocaleDateString('id-ID')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Safety & Trust */}
                <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200">Terjamin & Terpercaya</h4>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Semua tiket telah diverifikasi dan menjamin pengalaman wisata budaya yang autentik
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Booking Card */}
                <MagicCard>
                  <Card className="border-0">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-[#a4773e]">
                            {formatCurrency(ticket.price)}
                          </div>
                          <div className="text-sm text-muted-foreground">per orang</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">4.8</span>
                          <span className="text-sm text-muted-foreground">(124 ulasan)</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Quantity Selector */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Jumlah Tiket</label>
                        <select
                          value={selectedQuantity}
                          onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4773e] focus:border-transparent"
                        >
                          {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num} orang</option>
                          ))}
                        </select>
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center py-3 border-t">
                        <span className="font-medium">Total Pembayaran</span>
                        <span className="text-xl font-bold text-[#a4773e]">
                          {formatCurrency(ticket.price * selectedQuantity)}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      {auth.user ? (
                        <div className="space-y-3">
                          <Button
                            onClick={handleBookNow}
                            className="w-full bg-[#a4773e] hover:bg-[#8b6635] text-white py-3 text-lg font-semibold"
                            size="lg"
                          >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Pesan Sekarang
                          </Button>
                          <Button variant="outline" className="w-full" size="lg">
                            <Heart className="w-5 h-5 mr-2" />
                            Simpan ke Favorit
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Button
                            onClick={() => router.visit('/login')}
                            className="w-full bg-[#a4773e] hover:bg-[#8b6635] text-white py-3 text-lg font-semibold"
                            size="lg"
                          >
                            <LogIn className="w-5 h-5 mr-2" />
                            Masuk untuk Memesan
                          </Button>
                          <p className="text-sm text-center text-muted-foreground">
                            Belum punya akun? <Link href="/register" className="text-[#a4773e] hover:underline">Daftar sekarang</Link>
                          </p>
                        </div>
                      )}

                      {/* Quick Info */}
                      <div className="space-y-2 pt-4 border-t text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>Konfirmasi instan</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Camera className="w-4 h-4" />
                          <span>Bebas foto</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Shield className="w-4 h-4" />
                          <span>Garansi uang kembali</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </MagicCard>

                {/* Seller Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informasi Penjual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#a4773e]/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-[#a4773e]" />
                      </div>
                      <div>
                        <div className="font-medium">{ticket.seller?.name}</div>
                        <div className="text-sm text-muted-foreground">Penjual Terpercaya</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">4.9 (89 ulasan)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Related Tickets */}
          {related_tickets && related_tickets.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Tiket Serupa</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {related_tickets.map((relatedTicket) => (
                  <MagicCard key={relatedTicket.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/tickets/${relatedTicket.id}`}>
                      <div className="relative">
                        <img
                          src={getImageUrl(relatedTicket.image)}
                          alt={relatedTicket.title}
                          className="w-full h-40 object-cover"
                        />
                        <Badge className={`absolute top-2 right-2 ${getCategoryColor(relatedTicket.category)}`}>
                          {relatedTicket.category?.toUpperCase()}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold line-clamp-2 mb-2">{relatedTicket.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{relatedTicket.destination}</span>
                        </div>
                        <div className="text-lg font-bold text-[#a4773e]">
                          {formatCurrency(relatedTicket.price)}
                        </div>
                      </CardContent>
                    </Link>
                  </MagicCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}