import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { WithdrawalRequest } from '@/types/earnings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
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
    title: 'Riwayat Penarikan',
    href: '/seller/earnings/withdrawals',
  },
];

interface Props {
  withdrawals: {
    data: WithdrawalRequest[];
    links: any;
    meta: any;
  };
  filters: {
    status?: string;
    search?: string;
  };
}

export default function WithdrawalsIndex({ withdrawals, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [status, setStatus] = useState(filters.status || 'all');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleFilter = () => {
    router.get('/seller/earnings/withdrawals', {
      search: search || undefined,
      status: status !== 'all' ? status : undefined,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <AlertCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
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
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu Review';
      case 'approved':
        return 'Disetujui';
      case 'completed':
        return 'Selesai';
      case 'rejected':
        return 'Ditolak';
      default:
        return status;
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Riwayat Penarikan" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Riwayat Penarikan
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Kelola dan pantau status permintaan penarikan dana Anda
            </p>
          </div>
          <Button onClick={() => router.visit('/seller/earnings/withdraw')}>
            <Plus className="w-4 h-4 mr-2" />
            Ajukan Penarikan Baru
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {withdrawals.data.filter(w => w.status === 'pending').length}
                </div>
                <div className="text-sm text-muted-foreground">Menunggu</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {withdrawals.data.filter(w => w.status === 'approved').length}
                </div>
                <div className="text-sm text-muted-foreground">Disetujui</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {withdrawals.data.filter(w => w.status === 'completed').length}
                </div>
                <div className="text-sm text-muted-foreground">Selesai</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {withdrawals.data.filter(w => w.status === 'rejected').length}
                </div>
                <div className="text-sm text-muted-foreground">Ditolak</div>
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
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Input
                  placeholder="Cari berdasarkan bank, nomor rekening..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                />
              </div>
              <div className="w-48">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="pending">Menunggu</SelectItem>
                    <SelectItem value="approved">Disetujui</SelectItem>
                    <SelectItem value="completed">Selesai</SelectItem>
                    <SelectItem value="rejected">Ditolak</SelectItem>
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

        {/* Withdrawals List */}
        {withdrawals.data.length > 0 ? (
          <div className="space-y-4">
            {withdrawals.data.map((withdrawal) => (
              <Card key={withdrawal.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(withdrawal.status)}>
                          {getStatusIcon(withdrawal.status)}
                          <span className="ml-1">{getStatusText(withdrawal.status)}</span>
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          #{withdrawal.id.toString().padStart(6, '0')}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Jumlah</div>
                          <div className="text-lg font-semibold">
                            {formatPrice(withdrawal.amount)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Bank Tujuan</div>
                          <div className="font-medium">{withdrawal.bank_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {withdrawal.account_number} - {withdrawal.account_holder}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Tanggal</div>
                          <div className="font-medium">
                            {new Date(withdrawal.requested_at).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          {withdrawal.processed_at && (
                            <div className="text-sm text-muted-foreground">
                              Diproses: {new Date(withdrawal.processed_at).toLocaleDateString('id-ID')}
                            </div>
                          )}
                        </div>
                      </div>

                      {withdrawal.notes && (
                        <div>
                          <div className="text-sm text-muted-foreground">Catatan</div>
                          <div className="text-sm">{withdrawal.notes}</div>
                        </div>
                      )}

                      {withdrawal.admin_notes && (
                        <div className="p-3 bg-muted rounded-lg">
                          <div className="text-sm text-muted-foreground">Catatan Admin</div>
                          <div className="text-sm">{withdrawal.admin_notes}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.visit(`/seller/earnings/withdrawals/${withdrawal.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Detail
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Clock className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Belum Ada Permintaan Penarikan</h3>
              <p className="text-muted-foreground mb-6 text-center">
                Anda belum pernah mengajukan permintaan penarikan dana
              </p>
              <Button onClick={() => router.visit('/seller/earnings/withdraw')}>
                <Plus className="w-4 h-4 mr-2" />
                Ajukan Penarikan Pertama
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Pagination will be added here */}
      </div>
    </AppLayout>
  );
}