import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard,
  User,
  Mail,
  Phone,
  Calendar,
  ShoppingCart,
  Shield,
  Clock,
  ArrowLeft,
  MapPin
} from 'lucide-react';

interface CartTicket {
  id: string;
  title: string;
  destination: string;
  price: number;
  image: string;
  seller?: {
    id: number;
    name: string;
  };
}

interface CartItemType {
  id: number;
  ticket_id: string;
  quantity: number;
  subtotal: number;
  visit_date?: string;
  special_requests?: string;
  ticket: CartTicket;
}

interface Cart {
  items: CartItemType[];
  total_items: number;
  total_quantity: number;
  total_amount: number;
  platform_fee: number;
  grand_total: number;
}

interface CheckoutData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  visit_date: string;
  special_requests: string;
}

interface Props {
  cart: Cart;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Beranda',
    href: '/',
  },
  {
    title: 'Keranjang',
    href: '/customer/cart',
  },
  {
    title: 'Checkout',
    href: '/customer/checkout',
  },
];

export default function CheckoutIndex({ cart }: Props) {
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    visit_date: '',
    special_requests: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (field: keyof CheckoutData, value: string) => {
    setCheckoutData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    router.post('/customer/checkout', { ...checkoutData }, {
      onFinish: () => setIsProcessing(false),
      onError: () => setIsProcessing(false),
    });
  };

  const goBackToCart = () => {
    router.visit('/customer/cart');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Checkout" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Checkout
            </h1>
            <p className="text-muted-foreground">
              Lengkapi informasi pemesanan Anda
            </p>
          </div>

          <Button variant="outline" onClick={goBackToCart}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Keranjang
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Customer Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informasi Pemesan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer_name">Nama Lengkap *</Label>
                    <Input
                      id="customer_name"
                      type="text"
                      value={checkoutData.customer_name}
                      onChange={(e) => handleInputChange('customer_name', e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer_email">Email *</Label>
                      <Input
                        id="customer_email"
                        type="email"
                        value={checkoutData.customer_email}
                        onChange={(e) => handleInputChange('customer_email', e.target.value)}
                        placeholder="email@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer_phone">Nomor Telepon *</Label>
                      <Input
                        id="customer_phone"
                        type="tel"
                        value={checkoutData.customer_phone}
                        onChange={(e) => handleInputChange('customer_phone', e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visit Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Informasi Kunjungan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="visit_date">Tanggal Kunjungan *</Label>
                    <Input
                      id="visit_date"
                      type="date"
                      value={checkoutData.visit_date}
                      onChange={(e) => handleInputChange('visit_date', e.target.value)}
                      min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // Tomorrow
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Pilih tanggal kunjungan minimal 1 hari dari sekarang
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="special_requests">Catatan Khusus (Opsional)</Label>
                    <Textarea
                      id="special_requests"
                      value={checkoutData.special_requests}
                      onChange={(e) => handleInputChange('special_requests', e.target.value)}
                      placeholder="Tambahkan catatan khusus untuk kunjungan Anda..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                        Pembayaran Aman
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Transaksi Anda dilindungi dengan enkripsi SSL dan sistem keamanan Midtrans.
                        Tiket digital akan dikirim ke email setelah pembayaran berhasil.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Ringkasan Pesanan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.ticket.image}
                          alt={item.ticket.title}
                          className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                          onError={(e) => {
                            e.currentTarget.src = '/images/placeholder-ticket.jpg';
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2">
                            {item.ticket.title}
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            <span>{item.ticket.destination}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">
                              {item.quantity}x {formatPrice(item.ticket.price)}
                            </span>
                            <span className="font-medium text-sm">
                              {formatPrice(item.subtotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Cost Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({cart.total_quantity} tiket)</span>
                      <span>{formatPrice(cart.total_amount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Biaya Platform (5%)</span>
                      <span>{formatPrice(cart.platform_fee)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Bayar</span>
                    <span>{formatPrice(cart.grand_total)}</span>
                  </div>

                  {/* Payment Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                        Memproses...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Lanjut ke Pembayaran
                      </>
                    )}
                  </Button>

                  {/* Additional Info */}
                  <div className="text-xs text-muted-foreground text-center space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Selesaikan pembayaran dalam 24 jam</span>
                    </div>
                    <p>Tiket akan dikirim ke email setelah pembayaran berhasil</p>
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