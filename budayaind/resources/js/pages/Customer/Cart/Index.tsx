import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Calendar,
  Package,
  CreditCard,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Beranda',
    href: '/',
  },
  {
    title: 'Keranjang',
    href: '/customer/cart',
  },
];

interface CartTicket {
  id: number;
  title: string;
  destination: string;
  price: number;
  image?: string;
  seller?: {
    id: number;
    name: string;
  };
}

interface CartItemType {
  id: number;
  quantity: number;
  visit_date?: string;
  special_requests?: string;
  ticket: CartTicket;
}

interface Props {
  cartItems?: CartItemType[];
  total?: number;
}

export default function CartIndex({ cartItems = [], total = 0 }: Props) {
  // Safe destructuring dengan default values
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const safeTotal = typeof total === 'number' ? total : 0;

  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
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

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setIsUpdating(itemId);

    try {
      await router.patch(`/customer/cart/${itemId}`, {
        quantity: newQuantity
      }, {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => setIsUpdating(null),
      });
    } catch (error) {
      console.error('Update quantity error:', error);
      setIsUpdating(null);
    }
  };

  const removeItem = (itemId: number) => {
    if (confirm('Hapus item ini dari keranjang?')) {
      router.delete(`/customer/cart/${itemId}`, {
        preserveState: true,
        preserveScroll: true,
      });
    }
  };

  const clearCart = () => {
    if (confirm('Kosongkan seluruh keranjang?')) {
      router.delete('/customer/cart', {
        preserveState: true,
        preserveScroll: true,
      });
    }
  };

  const proceedToCheckout = () => {
    router.visit('/customer/checkout');
  };

  const hasItems = safeCartItems.length > 0;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Keranjang Belanja" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              Keranjang Belanja
            </h1>
            <p className="text-muted-foreground">
              {hasItems ? `${safeCartItems.length} item dalam keranjang` : 'Keranjang kosong'}
            </p>
          </div>

          {hasItems && (
            <Button variant="outline" onClick={clearCart}>
              <Trash2 className="w-4 h-4 mr-2" />
              Kosongkan
            </Button>
          )}
        </div>

        {hasItems ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {safeCartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={getImageUrl(item.ticket?.image)}
                          alt={item.ticket?.title || 'Ticket'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/placeholder-ticket.jpg';
                          }}
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          {item.ticket?.title || 'Unknown Ticket'}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{item.ticket?.destination || 'Unknown Location'}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Package className="w-3 h-3" />
                          <span>by {item.ticket?.seller?.name || 'Unknown Seller'}</span>
                        </div>

                        {item.visit_date && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="w-3 h-3" />
                            <span>Tanggal kunjungan: {new Date(item.visit_date).toLocaleDateString('id-ID')}</span>
                          </div>
                        )}

                        {item.special_requests && (
                          <div className="text-sm text-muted-foreground mb-3">
                            <strong>Catatan:</strong> {item.special_requests}
                          </div>
                        )}

                        {/* Price & Quantity */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || isUpdating === item.id}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>

                            <span className="font-medium w-8 text-center">
                              {isUpdating === item.id ? '...' : item.quantity}
                            </span>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={isUpdating === item.id}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">
                              {formatCurrency(item.ticket?.price || 0)} x {item.quantity}
                            </div>
                            <div className="font-semibold text-lg">
                              {formatCurrency((item.ticket?.price || 0) * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="self-start"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Ringkasan Pesanan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({safeCartItems.length} item)</span>
                      <span>{formatCurrency(safeTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Biaya Platform (5%)</span>
                      <span>{formatCurrency(safeTotal * 0.05)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatCurrency(safeTotal * 1.05)}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={proceedToCheckout}
                    size="lg"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Lanjut ke Pembayaran
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Continue Shopping */}
              <Card>
                <CardContent className="pt-6">
                  <Link href="/tickets">
                    <Button variant="outline" className="w-full">
                      Lanjut Belanja
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Keranjang Belanja Kosong</h3>
              <p className="text-muted-foreground mb-6 text-center">
                Belum ada tiket dalam keranjang Anda.<br />
                Yuk, jelajahi koleksi tiket wisata budaya terbaik!
              </p>
              <Link href="/tickets">
                <Button size="lg">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Mulai Belanja
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}