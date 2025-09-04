import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { SellerEarnings, WithdrawalRequest, Transaction } from '@/types/earnings';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DollarSign,
  TrendingUp,
  Wallet,
  CreditCard,
  Download,
  Plus,
  Eye,
  Calendar,
  Filter,
  Search
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
];

interface Props {
  earnings: SellerEarnings;
  recent_transactions: Transaction[];
  withdrawal_requests: WithdrawalRequest[];
  filters: {
    period?: string;
    search?: string;
  };
}

export default function SellerEarningsIndex({
  earnings,
  recent_transactions,
  withdrawal_requests,
  filters
}: Props) {
  const [period, setPeriod] = useState(filters.period || 'this_month');
  const [search, setSearch] = useState(filters.search || '');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleFilter = () => {
    router.get('/seller/earnings', {
      period: period !== 'this_month' ? period : undefined,
      search: search || undefined,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'approved':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
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
      <Head title="Pendapatan" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Pendapatan & Penarikan
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Kelola pendapatan dari penjualan tiket dan ajukan penarikan dana
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Laporan
            </Button>
            <Link href="/seller/earnings/withdraw">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Ajukan Penarikan
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Saldo Tersedia
                  </p>
                  <div className="text-2xl font-bold text-green-600">
                    {formatPrice(earnings.available_balance)}
                  </div>
                </div>
                <Wallet className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Siap untuk ditarik
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Saldo Pending
                  </p>
                  <div className="text-2xl font-bold text-yellow-600">
                    {formatPrice(earnings.pending_balance)}
                  </div>
                </div>
                <CreditCard className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Menunggu settlement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Pendapatan
                  </p>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatPrice(earnings.total_earned)}
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {earnings.total_sales} transaksi
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Ditarik
                  </p>
                  <div className="text-2xl font-bold text-purple-600">
                    {formatPrice(earnings.withdrawn_amount)}
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Fee platform: {earnings.platform_fee_percentage}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter & Pencarian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Input
                  placeholder="Cari transaksi, customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                />
              </div>
              <div className="w-48">
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
              <Button onClick={handleFilter}>
                <Search className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Transaksi Terbaru</span>
                <Link href="/seller/earnings/transactions">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Lihat Semua
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recent_transactions.length > 0 ? (
                <div className="space-y-4">
                  {recent_transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{transaction.ticket_title}</div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.customer_name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(transaction.created_at).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          +{formatPrice(transaction.seller_amount)}
                        </div>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Belum ada transaksi</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Withdrawal Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Permintaan Penarikan</span>
                <Link href="/seller/earnings/withdrawals">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Lihat Semua
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {withdrawal_requests.length > 0 ? (
                <div className="space-y-4">
                  {withdrawal_requests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">
                          {formatPrice(request.amount)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {request.bank_name} - {request.account_number}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(request.requested_at).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                        {request.processed_at && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Diproses: {new Date(request.processed_at).toLocaleDateString('id-ID')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Belum ada permintaan penarikan</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/seller/earnings/withdraw">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <Plus className="w-6 h-6" />
                  <span>Ajukan Penarikan</span>
                </Button>
              </Link>
              <Link href="/seller/earnings/transactions">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <TrendingUp className="w-6 h-6" />
                  <span>Lihat Transaksi</span>
                </Button>
              </Link>
              <Link href="/seller/earnings/report">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <Download className="w-6 h-6" />
                  <span>Download Laporan</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}