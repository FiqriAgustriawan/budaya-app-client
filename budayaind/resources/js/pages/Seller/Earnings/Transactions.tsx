import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transaction } from '@/types/earnings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Search,
  Filter,
  Download,
  TrendingUp,
  DollarSign,
  Users,
  Calendar
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Seller Dashboard',
    href: '/seller/dashboard',
  },
  {
    title: 'Pendapatan',
    href: '/seller/earnings',
  },
  {
    title: 'Riwayat Transaksi',
    href: '/seller/earnings/transactions',
  },
];

interface Props {
  transactions: {
    data: Transaction[];
    links: any;
    meta: any;
  };
  filters: {
    status?: string;
    search?: string;
    period?: string;
  };
  summary: {
    total_amount: number;
    total_seller_amount: number;
    total_platform_fee: number;
    total_transactions: number;
  };
}

export default function TransactionsIndex({ transactions, filters, summary }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [status, setStatus] = useState(filters.status || 'all');
  const [period, setPeriod] = useState(filters.period || 'this_month');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleFilter = () => {
    router.get('/seller/earnings/transactions', {
      search: search || undefined,
      status: status !== 'all' ? status : undefined,
      period: period !== 'this_month' ? period : undefined,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const exportTransactions = () => {
    router.get('/seller/earnings/transactions/export', {
      search: search || undefined,
      status: status !== 'all' ? status : undefined,
      period: period !== 'this_month' ? period : undefined,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Riwayat Transaksi" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Riwayat Transaksi
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Pantau semua transaksi penjualan tiket Anda
            </p>
          </div>
          <Button onClick={exportTransactions}>
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Transaksi
                  </p>
                  <div className="text-2xl font-bold">
                    {summary.total_transactions}
                  </div>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Penjualan
                  </p>
                  <div className="text-2xl font-bold text-green-600">
                    {formatPrice(summary.total_amount)}
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pendapatan Anda
                  </p>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatPrice(summary.total_seller_amount)}
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Fee Platform
                  </p>
                  <div className="text-2xl font-bold text-orange-600">
                    {formatPrice(summary.total_platform_fee)}
                  </div>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Cari customer, tiket..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                />
              </div>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hari Ini</SelectItem>
                  <SelectItem value="this_week">Minggu Ini</SelectItem>
                  <SelectItem value="this_month">Bulan Ini</SelectItem>
                  <SelectItem value="last_month">Bulan Lalu</SelectItem>
                  <SelectItem value="this_year">Tahun Ini</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleFilter}>
                <Search className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch('');
                  setStatus('all');
                  setPeriod('this_month');
                  router.get('/seller/earnings/transactions');
                }}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        {transactions.data.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Daftar Transaksi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.data.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <div className="font-medium">{transaction.ticket_title}</div>
                        <div className="text-sm text-muted-foreground">
                          #{transaction.order_id.toString().padStart(6, '0')}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{transaction.customer_name}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(transaction.created_at).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          +{formatPrice(transaction.seller_amount)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          dari {formatPrice(transaction.amount)}
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <TrendingUp className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Belum Ada Transaksi</h3>
              <p className="text-muted-foreground mb-6 text-center">
                Transaksi akan muncul setelah ada customer yang membeli tiket Anda
              </p>
              <Button onClick={() => router.visit('/seller/tickets')}>
                Kelola Tiket
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Pagination will be added here */}
      </div>
    </AppLayout>
  );
}