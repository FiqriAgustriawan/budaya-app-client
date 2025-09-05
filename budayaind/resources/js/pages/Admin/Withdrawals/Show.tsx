import { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft,
  DollarSign,
  Building,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Copy,
  Download,
  FileText
} from 'lucide-react';

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
    phone?: string;
    balance: number;
    total_earnings: number;
  };
  processed_by?: {
    id: number;
    name: string;
  };
}

interface Props {
  withdrawal: WithdrawalType;
}

export default function WithdrawalShow({ withdrawal }: Props) {
  const [processing, setProcessing] = useState(false);
  const [adminNotes, setAdminNotes] = useState(withdrawal.admin_notes || '');
  const [showConfirm, setShowConfirm] = useState<'approve' | 'reject' | 'complete' | null>(null);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
    },
    {
      title: 'Penarikan',
      href: '/admin/withdrawals',
    },
    {
      title: `Detail #${withdrawal.id}`,
      href: `/admin/withdrawals/${withdrawal.id}`,
    },
  ];

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
        return <Clock className="w-5 h-5" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'rejected':
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const handleAction = (action: 'approve' | 'reject' | 'complete') => {
    setProcessing(true);
    
    const data = adminNotes ? { admin_notes: adminNotes } : {};
    
    router.put(`/admin/withdrawals/${withdrawal.id}/${action}`, data, {
      onSuccess: () => {
        setShowConfirm(null);
      },
      onError: (errors) => {
        console.error('Action error:', errors);
        alert('Gagal memproses permintaan.');
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Berhasil disalin ke clipboard');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Detail Penarikan #${withdrawal.id}`} />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/withdrawals">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Detail Penarikan #{withdrawal.id}</h1>
              <p className="text-muted-foreground">
                Kelola permintaan penarikan dari seller
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(withdrawal.status)}>
              <div className="flex items-center gap-1">
                {getStatusIcon(withdrawal.status)}
                {withdrawal.status.toUpperCase()}
              </div>
            </Badge>
          </div>
        </div>

        {/* Alert untuk status pending */}
        {withdrawal.status === 'pending' && (
          <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800 dark:text-yellow-200">
              Permintaan penarikan ini menunggu persetujuan Anda. Periksa detail dengan teliti sebelum memproses.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Withdrawal Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Detail Penarikan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">ID Penarikan</label>
                  <p className="font-medium">{withdrawal.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Jumlah</label>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(withdrawal.amount)}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Tanggal Permintaan</label>
                <p className="font-medium">{new Date(withdrawal.requested_at).toLocaleString('id-ID')}</p>
              </div>

              {withdrawal.processed_at && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tanggal Diproses</label>
                  <p className="font-medium">{new Date(withdrawal.processed_at).toLocaleString('id-ID')}</p>
                </div>
              )}

              {withdrawal.processed_by && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Diproses Oleh</label>
                  <p className="font-medium">{withdrawal.processed_by.name}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bank Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Detail Bank
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nama Bank</label>
                <p className="font-medium">{withdrawal.bank_name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Nomor Rekening</label>
                <div className="flex items-center gap-2">
                  <p className="font-medium font-mono">{withdrawal.account_number}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(withdrawal.account_number)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Atas Nama</label>
                <p className="font-medium">{withdrawal.account_name}</p>
              </div>
            </CardContent>
          </Card>

          {/* Seller Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Detail Seller
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nama</label>
                <p className="font-medium">{withdrawal.seller.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="font-medium">{withdrawal.seller.email}</p>
              </div>

              {withdrawal.seller.phone && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telepon</label>
                  <p className="font-medium">{withdrawal.seller.phone}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Saldo Saat Ini</label>
                  <p className="font-bold text-blue-600">{formatCurrency(withdrawal.seller.balance)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Pendapatan</label>
                  <p className="font-bold text-green-600">{formatCurrency(withdrawal.seller.total_earnings)}</p>
                </div>
              </div>

              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={`/admin/users/${withdrawal.seller.id}`}>
                  Lihat Profile Seller
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Admin Notes & Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Catatan Admin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Tambahkan catatan untuk penarikan ini..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
                disabled={withdrawal.status !== 'pending'}
              />

              {withdrawal.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowConfirm('approve')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={processing}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Setujui
                  </Button>
                  <Button
                    onClick={() => setShowConfirm('reject')}
                    variant="destructive"
                    className="flex-1"
                    disabled={processing}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Tolak
                  </Button>
                </div>
              )}

              {withdrawal.status === 'approved' && (
                <Button
                  onClick={() => setShowConfirm('complete')}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={processing}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Tandai Selesai
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>
                  Konfirmasi {showConfirm === 'approve' ? 'Persetujuan' : showConfirm === 'reject' ? 'Penolakan' : 'Penyelesaian'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Apakah Anda yakin ingin{' '}
                  {showConfirm === 'approve' ? 'menyetujui' : showConfirm === 'reject' ? 'menolak' : 'menyelesaikan'}{' '}
                  penarikan senilai <strong>{formatCurrency(withdrawal.amount)}</strong>?
                </p>
                
                {showConfirm === 'reject' && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      Penolakan ini akan dikembalikan ke saldo seller dan tidak dapat dibatalkan.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAction(showConfirm)}
                    disabled={processing}
                    className={
                      showConfirm === 'approve' ? 'bg-blue-600 hover:bg-blue-700' :
                      showConfirm === 'reject' ? 'bg-red-600 hover:bg-red-700' :
                      'bg-green-600 hover:bg-green-700'
                    }
                  >
                    Ya, {showConfirm === 'approve' ? 'Setujui' : showConfirm === 'reject' ? 'Tolak' : 'Selesaikan'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirm(null)}
                    disabled={processing}
                  >
                    Batal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}