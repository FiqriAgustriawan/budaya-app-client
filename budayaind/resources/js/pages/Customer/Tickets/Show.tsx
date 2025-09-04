import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Ticket } from '@/types/ticket';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Star,
  Clock,
  Shield,
  Award,
  CheckCircle,
  ShoppingCart,
  Minus,
  Plus
} from 'lucide-react';

interface Props {
  ticket: Ticket;
}

export default function CustomerTicketShow({ ticket }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Beranda',
      href: '/',
    },
    {
      title: 'Tiket Wisata',
      href: '/tickets',
    },
    {
      title: ticket.title,
      href: `/tickets/${ticket.id}`,
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'premium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'vip':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Fix image URL function
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

  const isAvailable = ticket.available_quantity > ticket.sold_quantity;
  const isActive = ticket.is_active && new Date(ticket.end_date) > new Date();
  const maxQuantity = Math.min(10, ticket.available_quantity - ticket.sold_quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    router.post('/customer/cart/add', {
      ticket_id: ticket.id,
      quantity: quantity
    }, {
      onSuccess: () => {
        // Show success message
      },
      onFinish: () => {
        setIsAddingToCart(false);
      }
    });
  };

  const handleBuyNow = () => {
    router.post('/customer/cart/add', {
      ticket_id: ticket.id,
      quantity: quantity
    }, {
      onSuccess: () => {
        router.visit('/customer/checkout');
      }
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={ticket.title} />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={getImageUrl(ticket.image)}
                  alt={ticket.title}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholder-ticket.jpg';
                  }}
                />
              </CardContent>
            </Card>

            {/* Title & Basic Info */}
            <Card>
              <CardHeader>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge className={getCategoryColor(ticket.category)}>
                          {ticket.category.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          4.8 (127 ulasan)
                        </Badge>
                      </div>
                      <h1 className="text-3xl font-bold">{ticket.title}</h1>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{ticket.destination}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Tentang Pengalaman Ini</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {ticket.description}
                </p>
              </CardContent>
            </Card>

            {/* Access Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Yang Akan Anda Dapatkan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(ticket.access_features || []).map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Penting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Jaminan Uang Kembali</div>
                      <div className="text-sm text-muted-foreground">Batal hingga 24 jam</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <Clock className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Tiket Digital</div>
                      <div className="text-sm text-muted-foreground">Langsung aktif</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <Award className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Terpercaya</div>
                      <div className="text-sm text-muted-foreground">Partner resmi</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking & Seller Info */}
          <div className="space-y-6">
            {/* Booking Card - Sticky dengan z-index tinggi */}
            <Card className="sticky top-4 z-20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Pesan Tiket</span>
                  {!isActive && (
                    <Badge variant="destructive">Tidak Tersedia</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {formatPrice(ticket.price)}
                  </div>
                  <div className="text-sm text-muted-foreground">per orang</div>
                </div>

                <Separator />

                {/* Quantity */}
                <div className="space-y-3">
                  <Label>Jumlah Tiket</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="text-center"
                      type="number"
                      min={1}
                      max={maxQuantity}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= maxQuantity}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Maksimal {maxQuantity} tiket per pemesanan
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Subtotal ({quantity} tiket)</span>
                    <span className="font-semibold">
                      {formatPrice(ticket.price * quantity)}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="w-full"
                    disabled={!isActive || !isAvailable || isAddingToCart}
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                        Menambah ke Keranjang...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Tambah ke Keranjang
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleBuyNow}
                    className="w-full"
                    disabled={!isActive || !isAvailable}
                  >
                    Beli Sekarang
                  </Button>
                </div>

                {/* Availability Info */}
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    <span className={!isAvailable ? 'text-red-500' : 'text-green-600'}>
                      {isAvailable
                        ? `${ticket.available_quantity - ticket.sold_quantity} tiket tersisa`
                        : 'Tiket habis'
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Berlaku hingga {new Date(ticket.end_date).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

          

            {/* Spacer untuk memberikan ruang di bawah */}
            <div className="h-20"></div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}