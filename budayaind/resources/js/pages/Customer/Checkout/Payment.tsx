import { useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard,
  Clock,
  Shield,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

declare global {
  interface Window {
    snap: {
      pay: (token: string, options: {
        onSuccess: (result: any) => void;
        onPending: (result: any) => void;
        onError: (result: any) => void;
        onClose: () => void;
      }) => void;
    };
  }
}

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  platform_fee: number;
  status: string;
  payment_status: string;
  items: Array<{
    id: number;
    quantity: number;
    price: number;
    subtotal: number;
    ticket: {
      id: string;
      title: string;
      destination: string;
    };
  }>;
}

interface Props {
  order: Order;
  snapToken: string;
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
  {
    title: 'Pembayaran',
    href: '#',
  },
];

export default function CheckoutPayment({ order, snapToken }: Props) {
  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    if (isNaN(numericPrice) || !isFinite(numericPrice)) {
      return 'Rp 0';
    }

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numericPrice);
  };

  const calculateTotalAmount = () => {
    const totalAmount = parseFloat(order.total_amount?.toString() || '0');
    const platformFee = parseFloat(order.platform_fee?.toString() || '0');

    if (isNaN(totalAmount) || isNaN(platformFee)) {
      return 0;
    }

    return totalAmount + platformFee;
  };

  const totalAmount = calculateTotalAmount();

  const handlePayment = () => {
    if (window.snap) {
      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          router.visit(`/customer/orders/${order.id}/payment/success`, {
            data: {
              transaction_id: result.transaction_id,
              order_id: result.order_id
            }
          });
        },
        onPending: function (result) {
          router.visit(`/customer/orders/${order.id}/payment/pending`, {
            data: {
              transaction_id: result.transaction_id,
              order_id: result.order_id
            }
          });
        },
        onError: function (result) {
          router.visit(`/customer/orders/${order.id}/payment/failed`, {
            data: {
              transaction_id: result.transaction_id,
              order_id: result.order_id
            }
          });
        },
        onClose: function () {
          console.log('Payment popup closed');
        }
      });
    } else {
      alert('Payment system not loaded. Please refresh the page.');
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY || '');
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Pembayaran - ${order.order_number}`} />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Pembayaran</h1>
            <p className="text-muted-foreground">
              Order #{order.order_number}
            </p>
          </div>
          <Button variant="outline" onClick={() => router.visit('/customer/checkout')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Informasi Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">
                      Selesaikan Pembayaran dalam 24 Jam
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Pesanan akan otomatis dibatalkan jika tidak dibayar dalam 24 jam.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Nama Pemesan</span>
                  <span className="font-medium">{order.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email</span>
                  <span className="font-medium">{order.customer_email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nomor Telepon</span>
                  <span className="font-medium">{order.customer_phone}</span>
                </div>
              </div>

              <Separator />

              <Button
                onClick={handlePayment}
                className="w-full"
                size="lg"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Bayar Sekarang - {formatPrice(totalAmount)}
              </Button>

              <div className="text-xs text-muted-foreground text-center space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Pembayaran dienkripsi SSL</span>
                </div>
                <p>Powered by Midtrans</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.ticket.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity}x • {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatPrice(item.subtotal)}
                    </div>
                  </div>
                )) || (
                    <p className="text-sm text-muted-foreground">Tidak ada item</p>
                  )}
              </div>

              <Separator />

              {/* Cost Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.total_amount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Biaya Platform (5%)</span>
                  <span>{formatPrice(order.platform_fee)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total Bayar</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>

              {/* Warning */}
              <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">
                    <p className="font-medium">Penting!</p>
                    <p>Tiket akan otomatis dikirim ke email setelah pembayaran berhasil.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}