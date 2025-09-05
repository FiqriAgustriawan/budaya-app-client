import { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Eye, 
  DollarSign, 
  Calendar,
  User,
  Building,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    title: 'Penarikan',
    href: '/admin/withdrawals',
  },
];

interface WithdrawalType {
  id: number;
  amount: number;
  bank_name: string;
  account_number: string;
  account_name: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requested_at: string;
  processed_at?: string;
  admin_notes?: string;
  seller: {
    id: number;
    name: string;
    email: string;
  };
  processed_by?: {
    id: number;
    name: string;
  };
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  withdrawals: {
    data: WithdrawalType[];
    links: PaginationLink[];
    total: number;
    current_page: number;
    last_page: number;
  };
  filters: {
    status?: string;
    search?: string;
  };
}

export default function WithdrawalsIndex({ withdrawals, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [status, setStatus] = useState(filters.status || 'all');

  const handleSearch = () => {
    const params: Record<string, string> = {};
    
    if (search.trim()) params.search = search.trim();
    if (status !== 'all') params.status = status;

    router.get('/admin/withdrawals', params, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const resetFilters = () => {
    setSearch('');
    setStatus('all');
    router.get('/admin/withdrawals');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'approved':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu';
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
      <Head title="Kelola Penarikan" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Kelola Penarikan</h1>
            <p className="text-muted-foreground">
              Kelola permintaan penarikan dari seller
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Menunggu</p>
                  <p className="text-2xl font-bold">
                    {withdrawals.data.filter(w => w.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Disetujui</p>
                  <p className="text-2xl font-bold">
                    {withdrawals.data.filter(w => w.status === 'approved').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Selesai</p>
                  <p className="text-2xl font-bold">
                    {withdrawals.data.filter(w => w.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Nilai</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(withdrawals.data.reduce((sum, w) => sum + w.amount, 0))}
                  </p>
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
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Cari seller, bank..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>

              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-48">
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

              <Button onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                Cari
              </Button>

              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Withdrawals Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Penarikan ({withdrawals.total})</CardTitle>
          </CardHeader>
          <CardContent>
            {withdrawals.data.length > 0 ? (
              <div className="space-y-4">
                {withdrawals.data.map((withdrawal) => (
                  <div key={withdrawal.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{withdrawal.seller.name}</span>
                        <Badge className={getStatusColor(withdrawal.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(withdrawal.status)}
                            {getStatusText(withdrawal.status)}
                          </div>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-semibold text-foreground">
                            {formatCurrency(withdrawal.amount)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span>{withdrawal.bank_name} - {withdrawal.account_number}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(withdrawal.requested_at).toLocaleDateString('id-ID')}</span>
                        </div>
                      </div>

                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="font-medium">Atas Nama:</span> {withdrawal.account_name}
                        </p>
                        {withdrawal.admin_notes && (
                          <p className="text-sm text-muted-foreground mt-1">
                            <span className="font-medium">Catatan:</span> {withdrawal.admin_notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/withdrawals/${withdrawal.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          Detail
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tidak ada penarikan</h3>
                <p className="text-muted-foreground">
                  Belum ada permintaan penarikan yang sesuai dengan filter
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {withdrawals.links.length > 0 && (
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {withdrawals.links.map((link, index) => (
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