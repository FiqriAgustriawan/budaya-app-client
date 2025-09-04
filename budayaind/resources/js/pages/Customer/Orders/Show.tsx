import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, Package, Download } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'My Orders',
    href: '/customer/orders',
  },
  {
    title: 'Detail Pesanan',
    href: '#',
  },
];

interface OrderItem {
  id: number;
  ticket_id: number;
  quantity: number;
  price: number;
  subtotal: number;
  ticket: {
    id: number;
    title: string;
    destination: string;
    category: string;
    image?: string;
    access_features: string[];
    seller?: {  // UBAH: Tambahkan ? untuk optional
      id: number;
      name: string;
    } | null;   // TAMBAHKAN: null sebagai kemungkinan
  };
}

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  visit_date: string;
  special_requests?: string;
  total_amount: number;
  platform_fee: number;
  status: string;
  payment_status: string;
  created_at: string;
  items: OrderItem[];
}

interface Props {
  order: Order;
}

export default function CustomerOrderShow({ order }: Props) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pending', variant: 'secondary' as const },
      confirmed: { label: 'Dikonfirmasi', variant: 'default' as const },
      completed: { label: 'Selesai', variant: 'default' as const },
      cancelled: { label: 'Dibatalkan', variant: 'destructive' as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (paymentStatus: string) => {
    const statusConfig = {
      pending: { label: 'Menunggu Pembayaran', variant: 'secondary' as const },
      paid: { label: 'Pembayaran Berhasil', variant: 'default' as const }, // UBAH: success -> paid
      failed: { label: 'Pembayaran Gagal', variant: 'destructive' as const },
      expired: { label: 'Kedaluwarsa', variant: 'destructive' as const },
    };

    const config = statusConfig[paymentStatus as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Order ${order.order_number}`} />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/customer/orders">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Pesanan #{order.order_number}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Dipesan pada {formatDate(order.created_at)}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {getStatusBadge(order.status)}
            {getPaymentStatusBadge(order.payment_status)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informasi Pemesan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{order.customer_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{order.customer_email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{order.customer_phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Tanggal kunjungan: {new Date(order.visit_date).toLocaleDateString('id-ID')}</span>
                </div>
                {order.special_requests && (
                  <div>
                    <h4 className="font-medium mb-2">Permintaan Khusus:</h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                      {order.special_requests}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Tiket yang Dipesan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      {item.ticket.image && (
                        <img
                          src={`/storage/${item.ticket.image}`}
                          alt={item.ticket.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium">{item.ticket.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {item.ticket.destination}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {item.ticket.category.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Penjual: {item.ticket.seller?.name || 'Unknown Seller'} {/* PERBAIKI: Tambahkan safe check */}
                        </p>

                        {/* Access Features - Tambahkan safe check */}
                        {item.ticket.access_features && item.ticket.access_features.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium mb-1">Fasilitas yang didapat:</p>
                            <div className="flex flex-wrap gap-1">
                              {item.ticket.access_features.map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm">
                            {formatCurrency(item.price)} x {item.quantity}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(item.subtotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(order.total_amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Biaya Platform:</span>
                    <span>{formatCurrency(order.platform_fee || 0)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total Dibayar:</span>
                    <span>{formatCurrency(order.total_amount + (order.platform_fee || 0))}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Status Pesanan:</span>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="flex justify-between">
                    <span>Status Pembayaran:</span>
                    {getPaymentStatusBadge(order.payment_status)}
                  </div>
                </div>

                {order.payment_status === 'paid' && (
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                      ✅ Pembayaran berhasil. Tiket Anda telah aktif dan siap digunakan.
                    </div>
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download E-Ticket
                    </Button>
                  </div>
                )}

                {order.payment_status === 'pending' && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                    ⏳ Menunggu pembayaran. Silakan selesaikan pembayaran Anda.
                  </div>
                )}

                {order.payment_status === 'failed' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                    ❌ Pembayaran gagal. Silakan hubungi customer service.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}