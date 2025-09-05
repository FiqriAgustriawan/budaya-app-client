import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingBag,
  BarChart3,
  PieChart,
  Filter,
  RefreshCw
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    title: 'Laporan',
    href: '/admin/reports',
  },
];

interface ReportData {
  summary: {
    total_revenue: number;
    total_orders: number;
    total_users: number;
    total_tickets: number;
    revenue_growth: number;
    orders_growth: number;
    users_growth: number;
  };
  monthly_revenue: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  top_destinations: Array<{
    destination: string;
    tickets_count: number;
    total_revenue: number;
  }>;
  top_sellers: Array<{
    id: number;
    name: string;
    total_revenue: number;
    total_orders: number;
    tickets_count: number;
  }>;
  recent_transactions: Array<{
    id: number;
    type: string;
    amount: number;
    description: string;
    created_at: string;
  }>;
}

interface Props {
  report_data?: ReportData;
  filters?: {
    period?: string;
    start_date?: string;
    end_date?: string;
  };
}

export default function ReportsIndex({ report_data, filters = {} }: Props) {
  // Provide default values
  const defaultReportData: ReportData = {
    summary: {
      total_revenue: 0,
      total_orders: 0,
      total_users: 0,
      total_tickets: 0,
      revenue_growth: 0,
      orders_growth: 0,
      users_growth: 0,
    },
    monthly_revenue: [],
    top_destinations: [],
    top_sellers: [],
    recent_transactions: [],
  };

  const data = report_data || defaultReportData;

  const [period, setPeriod] = useState(filters.period || 'monthly');
  const [startDate, setStartDate] = useState(filters.start_date || '');
  const [endDate, setEndDate] = useState(filters.end_date || '');
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${(value || 0).toFixed(1)}%`;
  };

  const handleFilterChange = () => {
    setLoading(true);
    const params: Record<string, string> = { period };

    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    router.get('/admin/reports', params, {
      preserveState: true,
      onFinish: () => setLoading(false),
    });
  };

  const handleExport = (type: 'pdf' | 'excel') => {
    const params = new URLSearchParams({
      period,
      export: type,
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    });

    window.open(`/admin/reports/export?${params.toString()}`, '_blank');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Laporan Admin" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Laporan & Analitik</h1>
            <p className="text-muted-foreground">
              Pantau performa platform dan bisnis
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport('excel')}>
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Laporan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Harian</SelectItem>
                  <SelectItem value="weekly">Mingguan</SelectItem>
                  <SelectItem value="monthly">Bulanan</SelectItem>
                  <SelectItem value="yearly">Tahunan</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>

              {period === 'custom' && (
                <>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Tanggal Mulai"
                  />
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="Tanggal Akhir"
                  />
                </>
              )}

              <Button onClick={handleFilterChange} disabled={loading}>
                {loading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <BarChart3 className="w-4 h-4 mr-2" />
                )}
                Update Laporan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">{formatCurrency(data.summary.total_revenue)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center mt-2">
                {data.summary.revenue_growth >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm ${data.summary.revenue_growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(data.summary.revenue_growth)}
                </span>
                <span className="text-sm text-muted-foreground ml-1">vs periode sebelumnya</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{data.summary.total_orders.toLocaleString()}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center mt-2">
                {data.summary.orders_growth >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm ${data.summary.orders_growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(data.summary.orders_growth)}
                </span>
                <span className="text-sm text-muted-foreground ml-1">vs periode sebelumnya</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{data.summary.total_users.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex items-center mt-2">
                {data.summary.users_growth >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm ${data.summary.users_growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(data.summary.users_growth)}
                </span>
                <span className="text-sm text-muted-foreground ml-1">vs periode sebelumnya</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tickets</p>
                  <p className="text-2xl font-bold">{data.summary.total_tickets.toLocaleString()}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Top Destinations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Destinasi Terpopuler
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.top_destinations.length > 0 ? (
                <div className="space-y-4">
                  {data.top_destinations.map((destination, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{destination.destination}</p>
                          <p className="text-sm text-muted-foreground">{destination.tickets_count} tiket</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(destination.total_revenue)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">Belum ada data destinasi</p>
              )}
            </CardContent>
          </Card>

          {/* Top Sellers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Seller Terbaik
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.top_sellers.length > 0 ? (
                <div className="space-y-4">
                  {data.top_sellers.map((seller, index) => (
                    <div key={seller.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{seller.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {seller.total_orders} orders • {seller.tickets_count} tiket
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(seller.total_revenue)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">Belum ada data seller</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Grafik Pendapatan Bulanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.monthly_revenue.length > 0 ? (
              <div className="space-y-4">
                {data.monthly_revenue.map((month, index) => {
                  const maxRevenue = Math.max(...data.monthly_revenue.map(m => m.revenue));
                  const percentage = maxRevenue > 0 ? (month.revenue / maxRevenue) * 100 : 0;

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{month.month}</span>
                        <div className="text-right">
                          <span className="font-bold">{formatCurrency(month.revenue)}</span>
                          <span className="text-sm text-muted-foreground ml-2">({month.orders} orders)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">Belum ada data revenue</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Transaksi Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.recent_transactions.length > 0 ? (
              <div className="space-y-3">
                {data.recent_transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.created_at).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        {transaction.type}
                      </Badge>
                      <p className="font-bold">{formatCurrency(transaction.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">Belum ada transaksi</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}