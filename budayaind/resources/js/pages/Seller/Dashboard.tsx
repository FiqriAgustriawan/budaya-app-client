import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Ticket,
  ShoppingCart,
  TrendingUp,
  Eye,
  Plus,
  Calendar,
  MapPin,
  Users,
  IndianRupee
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Seller Dashboard',
    href: '/seller/dashboard',
  },
];

interface Stats {
  total_tickets: number;
  active_tickets: number;
  total_orders: number;
  paid_orders: number;
  total_revenue: number;
}

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  payment_status: string;
  total_amount: number;
  created_at: string;
  items: any[];
}

interface TopTicket {
  id: number;
  title: string;
  destination: string;
  category: string;
  price: number;
  order_items_count: number;
}

interface MonthlyRevenue {
  month: string;
  revenue: number;
}

interface Props {
  seller: any;
  stats: Stats;
  recent_orders: Order[];
  top_tickets: TopTicket[];
  monthly_revenue: MonthlyRevenue[];
}

export default function SellerDashboard({
  seller,
  stats,
  recent_orders,
  top_tickets,
  monthly_revenue
}: Props) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getPaymentStatusBadge = (status: string) => {
    const config = {
      pending: { label: 'Pending', variant: 'secondary' as const },
      paid: { label: 'Berhasil', variant: 'default' as const },
      failed: { label: 'Gagal', variant: 'destructive' as const },
    };
    const statusConfig = config[status as keyof typeof config] || config.pending;
    return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const config = {
      basic: { label: 'Basic', variant: 'outline' as const },
      premium: { label: 'Premium', variant: 'secondary' as const },
      vip: { label: 'VIP', variant: 'default' as const },
    };
    const categoryConfig = config[category as keyof typeof config] || config.basic;
    return <Badge variant={categoryConfig.variant}>{categoryConfig.label}</Badge>;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Seller Dashboard" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Selamat datang, {seller.name}!
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Kelola bisnis wisata budaya Anda dan promosikan warisan Indonesia.
          </p>
          <div className="flex gap-3">
            <Link href="/seller/tickets/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Buat Tiket Baru
              </Button>
            </Link>
            <Link href="/seller/tickets">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Lihat Semua Tiket
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Ticket className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Tiket</p>
                  <p className="text-2xl font-bold">{stats.total_tickets}</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.active_tickets} aktif
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Pesanan</p>
                  <p className="text-2xl font-bold">{stats.total_orders}</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.paid_orders} berhasil
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.total_revenue)}</p>
                  <p className="text-xs text-muted-foreground">
                    Dari {stats.paid_orders} pesanan
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">
                    {stats.total_orders > 0 ? Math.round((stats.paid_orders / stats.total_orders) * 100) : 0}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pesanan berhasil
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Pesanan Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recent_orders.length > 0 ? (
                <div className="space-y-4">
                  {recent_orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">#{order.order_number}</span>
                          {getPaymentStatusBadge(order.payment_status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.customer_name} • {formatDate(order.created_at)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.items.length} item(s)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(order.total_amount)}</p>
                      </div>
                    </div>
                  ))}
                  <Link href="/seller/orders">
                    <Button variant="outline" className="w-full">
                      Lihat Semua Pesanan
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  Belum ada pesanan
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Performing Tickets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Tiket Terlaris
              </CardTitle>
            </CardHeader>
            <CardContent>
              {top_tickets.length > 0 ? (
                <div className="space-y-4">
                  {top_tickets.map((ticket, index) => (
                    <div key={ticket.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{ticket.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{ticket.destination}</span>
                          {getCategoryBadge(ticket.category)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {ticket.order_items_count} terjual • {formatCurrency(ticket.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Link href="/seller/tickets">
                    <Button variant="outline" className="w-full">
                      Kelola Tiket
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>Belum ada tiket yang terjual</p>
                  <Link href="/seller/tickets/create">
                    <Button className="mt-3">
                      <Plus className="w-4 h-4 mr-2" />
                      Buat Tiket Pertama
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Monthly Revenue Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5" />
              Revenue 6 Bulan Terakhir
            </CardTitle>
          </CardHeader>
          <CardContent>
            {monthly_revenue.length > 0 ? (
              <div className="space-y-3">
                {monthly_revenue.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm font-medium">{item.month}</span>
                    <span className="text-sm">{formatCurrency(item.revenue)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                Belum ada data revenue
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}