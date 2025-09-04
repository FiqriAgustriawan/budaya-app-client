import { useState, FormEvent } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { SellerEarnings } from '@/types/earnings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Wallet,
  CreditCard,
  AlertCircle,
  Info,
  DollarSign
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
    title: 'Ajukan Penarikan',
    href: '/seller/earnings/withdraw',
  },
];

interface Props {
  earnings: SellerEarnings;
}

interface WithdrawFormData {
  amount: number;
  bank_name: string;
  account_number: string;
  account_holder: string;
  notes: string;
}

export default function WithdrawPage({ earnings }: Props) {
  const [formData, setFormData] = useState<WithdrawFormData>({
    amount: 0,
    bank_name: '',
    account_number: '',
    account_holder: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const bankOptions = [
    'Bank Central Asia (BCA)',
    'Bank Mandiri',
    'Bank Negara Indonesia (BNI)',
    'Bank Rakyat Indonesia (BRI)',
    'Bank CIMB Niaga',
    'Bank Danamon',
    'Bank Permata',
    'Bank Maybank',
    'Bank OCBC NISP',
    'Bank Panin',
    'Jenius (BTPN)',
    'Bank Jago',
    'Lainnya',
  ];

  const minWithdrawAmount = 50000; // Minimum Rp 50.000
  const maxWithdrawAmount = earnings.available_balance;
  const adminFee = 2500; // Rp 2.500 admin fee
  const finalAmount = formData.amount - adminFee;

  const handleInputChange = (field: keyof WithdrawFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Jumlah penarikan wajib diisi';
    } else if (formData.amount < minWithdrawAmount) {
      newErrors.amount = `Jumlah minimum penarikan adalah ${formatPrice(minWithdrawAmount)}`;
    } else if (formData.amount > maxWithdrawAmount) {
      newErrors.amount = `Jumlah melebihi saldo tersedia (${formatPrice(maxWithdrawAmount)})`;
    }

    if (!formData.bank_name.trim()) {
      newErrors.bank_name = 'Bank tujuan wajib dipilih';
    }

    if (!formData.account_number.trim()) {
      newErrors.account_number = 'Nomor rekening wajib diisi';
    } else if (!/^[0-9]+$/.test(formData.account_number)) {
      newErrors.account_number = 'Nomor rekening hanya boleh berisi angka';
    }

    if (!formData.account_holder.trim()) {
      newErrors.account_holder = 'Nama pemilik rekening wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setProcessing(true);

    router.post('/seller/earnings/withdraw', { ...formData }, {
      onSuccess: () => {
        router.visit('/seller/earnings/withdrawals');
      },
      onError: (errors) => {
        setErrors(errors);
        setProcessing(false);
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  };

  const setQuickAmount = (percentage: number) => {
    const amount = Math.floor((earnings.available_balance * percentage) / 100);
    handleInputChange('amount', Math.max(minWithdrawAmount, amount));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ajukan Penarikan" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Ajukan Penarikan Dana
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Tarik dana dari saldo tersedia ke rekening bank Anda
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Balance Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Informasi Saldo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {formatPrice(earnings.available_balance)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Saldo Tersedia
                      </div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {formatPrice(earnings.pending_balance)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Saldo Pending
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Withdrawal Amount */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Jumlah Penarikan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Jumlah yang akan ditarik *</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0"
                      value={formData.amount || ''}
                      onChange={(e) => handleInputChange('amount', parseInt(e.target.value) || 0)}
                      className={errors.amount ? 'border-red-500' : ''}
                    />
                    {errors.amount && (
                      <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">
                      Minimum: {formatPrice(minWithdrawAmount)} | Maksimum: {formatPrice(maxWithdrawAmount)}
                    </p>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="space-y-2">
                    <Label>Atau pilih persentase:</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {[25, 50, 75, 100].map((percentage) => (
                        <Button
                          key={percentage}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setQuickAmount(percentage)}
                          disabled={earnings.available_balance < minWithdrawAmount}
                        >
                          {percentage}%
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bank Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Informasi Rekening Bank
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="bank_name">Bank Tujuan *</Label>
                    <Select value={formData.bank_name} onValueChange={(value) => handleInputChange('bank_name', value)}>
                      <SelectTrigger className={errors.bank_name ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Pilih bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {bankOptions.map((bank) => (
                          <SelectItem key={bank} value={bank}>
                            {bank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.bank_name && (
                      <p className="text-sm text-red-500 mt-1">{errors.bank_name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="account_number">Nomor Rekening *</Label>
                    <Input
                      id="account_number"
                      placeholder="1234567890"
                      value={formData.account_number}
                      onChange={(e) => handleInputChange('account_number', e.target.value)}
                      className={errors.account_number ? 'border-red-500' : ''}
                    />
                    {errors.account_number && (
                      <p className="text-sm text-red-500 mt-1">{errors.account_number}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="account_holder">Nama Pemilik Rekening *</Label>
                    <Input
                      id="account_holder"
                      placeholder="Nama sesuai rekening bank"
                      value={formData.account_holder}
                      onChange={(e) => handleInputChange('account_holder', e.target.value)}
                      className={errors.account_holder ? 'border-red-500' : ''}
                    />
                    {errors.account_holder && (
                      <p className="text-sm text-red-500 mt-1">{errors.account_holder}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">
                      Pastikan nama sesuai dengan nama di rekening bank
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="notes">Catatan (Opsional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Catatan tambahan untuk admin..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.visit('/seller/earnings')}
                      disabled={processing}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      disabled={processing || earnings.available_balance < minWithdrawAmount}
                    >
                      {processing ? 'Memproses...' : 'Ajukan Penarikan'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Ringkasan Penarikan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Jumlah penarikan</span>
                    <span className="font-medium">
                      {formatPrice(formData.amount || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Biaya admin</span>
                    <span>- {formatPrice(adminFee)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Yang akan diterima</span>
                    <span>
                      {formatPrice(Math.max(0, finalAmount))}
                    </span>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Dana akan diproses dalam 1-3 hari kerja setelah persetujuan admin.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Ketentuan Penarikan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Minimum penarikan {formatPrice(minWithdrawAmount)}</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Biaya admin {formatPrice(adminFee)} per transaksi</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Proses 1-3 hari kerja</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Pastikan data rekening benar</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}