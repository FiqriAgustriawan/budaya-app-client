import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight, Home } from 'lucide-react';

interface Order {
  id: number;
  order_number: string;
  total_amount: number;
}

interface Props {
  order: Order | null;
}

export default function PaymentPending({ order }: Props) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <AppLayout>
      <Head title="Pembayaran Pending" />

      <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-yellow-600 mb-2">
                Menunggu Pembayaran
              </h1>
              <p className="text-muted-foreground">
                Pembayaran Anda sedang diproses. Mohon tunggu konfirmasi.
              </p>
            </div>

            {order && (
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-mono font-bold">{order.order_number}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-bold text-lg">{formatCurrency(order.total_amount)}</p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Link href="/customer/orders">
                <Button className="w-full">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Lihat Status Pesanan
                </Button>
              </Link>

              <Link href="/">
                <Button variant="outline" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}