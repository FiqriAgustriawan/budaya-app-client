import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Eye, Package, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Seller Dashboard',
    href: '/seller/dashboard',
  },
  {
    title: 'Orders',
    href: '/seller/orders',
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
  total_revenue: number;
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
    date_range?: string;
  };
  stats: OrderStats;
}

export default function OrdersIndex({ orders, filters, stats }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [status, setStatus] = useState(filters.status || 'all');
  const [paymentStatus, setPaymentStatus] = useState(filters.payment_status || 'all');
  const [dateRange, setDateRange] = useState(filters.date_range || 'all');

  const handleSearch = () => {
    router.get('/seller/orders', {
      search,
      status,
      payment_status: paymentStatus,
      date_range: dateRange,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pending', variant: 'secondary' as const },
      paid: { label: 'Dibayar', variant: 'default' as const },
      confirmed: { label: 'Dikonfirmasi', variant: 'default' as const },
      completed: { label: 'Selesai', variant: 'default' as const },
      cancelled: { label: 'Dibatalkan', variant: 'destructive' as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (paymentStatus: string) => {
    const statusConfig = {
      pending: { label: 'Menunggu', variant: 'secondary' as const },
      paid: { label: 'Berhasil', variant: 'default' as const },
      failed: { label: 'Gagal', variant: 'destructive' as const },
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

  // Safe access to pagination data
  const hasOrders = orders?.data && orders.data.length > 0;
  const hasPagination = orders?.meta && orders.meta.last_page > 1;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Orders" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Kelola Pesanan
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Pantau dan kelola pesanan tiket wisata Anda
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
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(stats?.total_revenue || 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="md:col-span-2">
                <Input
                  placeholder="Cari pesanan (nomor, nama, email)..."
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
                    <SelectItem value="paid">Berhasil</SelectItem>
                    <SelectItem value="failed">Gagal</SelectItem>
                    <SelectItem value="expired">Kedaluwarsa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Periode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Periode</SelectItem>
                    <SelectItem value="today">Hari Ini</SelectItem>
                    <SelectItem value="this_week">Minggu Ini</SelectItem>
                    <SelectItem value="this_month">Bulan Ini</SelectItem>
                    <SelectItem value="last_month">Bulan Lalu</SelectItem>
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

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Pesanan</CardTitle>
          </CardHeader>
          <CardContent>
            {hasOrders ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No. Pesanan</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Tiket</TableHead>
                      <TableHead>Tanggal Kunjungan</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pembayaran</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.data.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.order_number}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.customer_name}</div>
                            <div className="text-sm text-muted-foreground">{order.customer_email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {order.items?.map((item) => (
                              <div key={item.id} className="text-sm">
                                <div className="font-medium">{item.ticket.title}</div>
                                <div className="text-muted-foreground">
                                  {item.quantity}x - {formatCurrency(item.subtotal)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(order.visit_date).toLocaleDateString('id-ID')}
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(order.total_amount)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(order.status)}
                        </TableCell>
                        <TableCell>
                          {getPaymentStatusBadge(order.payment_status)}
                        </TableCell>
                        <TableCell>
                          {formatDate(order.created_at)}
                        </TableCell>
                        <TableCell>
                          <Link href={`/seller/orders/${order.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Detail
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Belum Ada Pesanan</h3>
                <p className="text-muted-foreground">
                  Pesanan akan muncul di sini setelah customer membeli tiket Anda.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {hasPagination && (
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