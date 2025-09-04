import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, Package, Clock, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'My Orders',
    href: '/customer/orders', // FIXED: Sesuai dengan route
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
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  items: OrderItem[];
}

interface OrderStats {
  total_orders: number;
  pending_orders: number;
  completed_orders: number;
  total_spent: number;
}

interface Props {
  orders: {
    data: Order[];
    links?: any[];
    meta?: any;
  };
  filters: {
    search?: string;
    status?: string;
    payment_status?: string;
  };
  stats: OrderStats;
}

export default function CustomerOrdersIndex({ orders, filters, stats }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [status, setStatus] = useState(filters.status || 'all');
  const [paymentStatus, setPaymentStatus] = useState(filters.payment_status || 'all');

  const handleSearch = () => {
    router.get('/customer/orders', { // FIXED: Sesuai dengan route
      search: search || undefined,
      status: status !== 'all' ? status : undefined,
      payment_status: paymentStatus !== 'all' ? paymentStatus : undefined,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="My Orders" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Pesanan Saya
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Lihat dan kelola semua pesanan tiket wisata Anda
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{stats?.total_orders || 0}</div>
                  <p className="text-sm text-muted-foreground">Total Pesanan</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-orange-600">{stats?.pending_orders || 0}</div>
                  <p className="text-sm text-muted-foreground">Menunggu</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats?.completed_orders || 0}</div>
                  <p className="text-sm text-muted-foreground">Selesai</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(stats?.total_spent || 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Belanja</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter & Pencarian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2">
                <Input
                  placeholder="Cari pesanan atau tiket..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status Pesanan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
                    <SelectItem value="completed">Selesai</SelectItem>
                    <SelectItem value="cancelled">Dibatalkan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status Pembayaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="pending">Menunggu</SelectItem>
                    <SelectItem value="paid">Berhasil</SelectItem> {/* UBAH: success -> paid */}
                    <SelectItem value="failed">Gagal</SelectItem>
                    <SelectItem value="expired">Kedaluwarsa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                Cari
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {orders.data.length > 0 ? (
          <div className="space-y-4">
            {orders.data.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">#{order.order_number}</h3>
                        {getStatusBadge(order.status)}
                        {getPaymentStatusBadge(order.payment_status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Dipesan pada {formatDate(order.created_at)} •
                        Kunjungan: {new Date(order.visit_date).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{formatCurrency(order.total_amount)}</div>
                      <Link href={`/customer/orders/${order.id}`}> {/* FIXED: Sesuai dengan route */}
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Detail
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                        <img
                          src={item.ticket.image ? `/storage/${item.ticket.image}` : '/placeholder-ticket.jpg'}
                          alt={item.ticket.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.ticket.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.ticket.destination} • by {item.ticket.seller?.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {item.ticket.category.toUpperCase()}
                            </Badge>
                            <span className="text-sm">
                              {item.quantity}x {formatCurrency(item.price)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatCurrency(item.subtotal)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum Ada Pesanan</h3>
              <p className="text-muted-foreground mb-4">
                Anda belum memiliki pesanan. Jelajahi tiket wisata menarik!
              </p>
              <Link href="/">
                <Button>
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Mulai Belanja
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {orders.links && orders.links.length > 1 && (
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {orders.links?.map((link: any, index: number) => (
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

// Helper functions untuk status badges dan format currency
const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending: { label: 'Pending', variant: 'secondary' as const, icon: Clock },
    confirmed: { label: 'Dikonfirmasi', variant: 'default' as const, icon: CheckCircle },
    completed: { label: 'Selesai', variant: 'default' as const, icon: CheckCircle },
    cancelled: { label: 'Dibatalkan', variant: 'destructive' as const, icon: XCircle },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
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
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};