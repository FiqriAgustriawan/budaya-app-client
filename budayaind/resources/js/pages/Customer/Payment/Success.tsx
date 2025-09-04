import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Mail, Home } from 'lucide-react';

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  platform_fee: number;
  items: Array<{
    id: number;
    quantity: number;
    price: number;
    subtotal: number;
    ticket: {
      title: string;
      destination: string;
    };
  }>;
}

interface Props {
  order: Order;
  transaction: {
    transaction_id: string;
    order_id: string;
    status: string;
  };
}

export default function PaymentSuccess({ order, transaction }: Props) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalAmount = order.total_amount + order.platform_fee;

  return (
    <AppLayout>
      <Head title="Pembayaran Berhasil" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Pembayaran Berhasil!
          </h1>
          <p className="text-muted-foreground">
            Terima kasih, pembayaran Anda telah berhasil diproses.
          </p>
        </div>

        <div className="max-w-2xl mx-auto w-full space-y-6">
          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detail Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nomor Pesanan</p>
                  <p className="font-semibold">{order.order_number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Pembayaran</p>
                  <p className="font-semibold text-green-600">{formatPrice(totalAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transaction ID</p>
                  <p className="font-mono text-sm">{transaction.transaction_id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold text-green-600">Berhasil</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Item yang Dibeli:</h4>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.ticket.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity}x • {formatPrice(item.price)}
                        </p>
                      </div>
                      <p className="font-medium">{formatPrice(item.subtotal)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Langkah Selanjutnya
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>E-tiket telah dikirim ke email Anda:</strong> {order.customer_email}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Silakan cek email Anda untuk mendapatkan e-tiket. Jika tidak ada di inbox,
                  periksa folder spam/junk.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.visit('/customer/orders')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Lihat Pesanan Saya
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => router.visit('/')}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Kembali ke Beranda
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}