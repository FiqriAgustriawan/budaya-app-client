import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState, FormEvent, useEffect } from 'react';
import {
  FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiFileText,
  FiCamera, FiSave, FiAlertCircle, FiCheck, FiUpload, FiGlobe,
  FiX, FiClock, FiEye
} from 'react-icons/fi';

interface FlashMessages {
  success?: string;
  error?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface ExistingRequest {
  id: number;
  nama_tempat_wisata: string;
  email_tempat: string;
  status: string;
  status_badge: {
    color: string;
    label: string;
  };
  admin_notes?: string;
  reviewed_at?: string;
  created_at: string;
  reviewer?: {
    name: string;
  };
}

interface Props {
  user: User;
  existingRequest?: ExistingRequest;
  canRequest: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Request Seller',
    href: '/customer/request-seller',
  },
];

export default function RequestSeller({ user, existingRequest, canRequest }: Props) {
  const { auth } = usePage<SharedData>().props;
  const { flash } = usePage<{ flash: FlashMessages }>().props;

  // State untuk success page
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  const [ktpPreview, setKtpPreview] = useState<string | null>(null);
  const [tempatPreview, setTempatPreview] = useState<string[]>([]);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    nama_tempat_wisata: '',
    email_tempat: '',
    password_tempat: '',
    password_tempat_confirmation: '', // Ubah dari password_confirmation ke password_tempat_confirmation
    deskripsi_tempat: '',
    foto_ktp: null as File | null,
    nomor_telepon: user.phone || '',
    alamat_tempat: user.address || '',
    asal_daerah: '',
    foto_tempat: [] as File[],
  });
  // Update useEffect untuk password matching
  useEffect(() => {
    if (data.password_tempat && data.password_tempat_confirmation) {
      setPasswordMatch(data.password_tempat === data.password_tempat_confirmation);
    } else {
      setPasswordMatch(true); // Reset ke true jika salah satu kosong
    }
  }, [data.password_tempat, data.password_tempat_confirmation]);

  const handleKtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('foto_ktp', file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setKtpPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTempatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setData('foto_tempat', [...data.foto_tempat, ...files]);

      // Create previews
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setTempatPreview(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeTempatPhoto = (index: number) => {
    const newFiles = data.foto_tempat.filter((_, i) => i !== index);
    const newPreviews = tempatPreview.filter((_, i) => i !== index);
    setData('foto_tempat', newFiles);
    setTempatPreview(newPreviews);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearErrors();

    post(route('customer.request-seller.store'), {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        setShowSuccessPage(true);
        reset();
        setKtpPreview(null);
        setTempatPreview([]);
        setPasswordMatch(true);
      },
    });
  };

  // Show success page if submission successful
  if (showSuccessPage) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Request Berhasil Dikirim" />

        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

          {/* Success Message */}
          <div className="rounded-xl border border-green-200 bg-green-50 dark:border-green-800/30 dark:bg-green-900/20 p-8 shadow-sm text-center">
            <div className="flex flex-col items-center space-y-4">

              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50">
                <FiCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>

              {/* Success Title */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-green-800 dark:text-green-300">
                  Request Berhasil Dikirim!
                </h1>
                <p className="text-green-700 dark:text-green-400 max-w-md">
                  Permintaan Anda untuk menjadi seller telah berhasil dikirim dan sedang menunggu review dari admin.
                </p>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mt-6">
                <div className="bg-white dark:bg-sidebar border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <FiClock className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        Status Saat Ini
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        Menunggu Review Admin
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-sidebar border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <FiMail className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        Notifikasi
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        Kami akan mengirim email
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-white dark:bg-sidebar border border-green-200 dark:border-green-800/30 rounded-lg p-6 w-full max-w-2xl mt-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4 text-center">
                  Langkah Selanjutnya
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-sm font-medium">
                      1
                    </span>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      Admin akan mereview dokumen dan informasi yang Anda kirimkan
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-sm font-medium">
                      2
                    </span>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      Anda akan menerima notifikasi email mengenai status review
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-sm font-medium">
                      3
                    </span>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      Jika disetujui, Anda dapat mengakses dashboard seller
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={() => window.location.href = '/customer/profile'}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors shadow-sm"
                >
                  <FiUser className="w-4 h-4 mr-2" />
                  Kembali ke Profile
                </button>

                <button
                  onClick={() => setShowSuccessPage(false)}
                  className="inline-flex items-center px-6 py-3 border border-green-300 dark:border-green-700 text-sm font-medium rounded-lg text-green-700 dark:text-green-300 bg-white dark:bg-sidebar hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                >
                  <FiEye className="w-4 h-4 mr-2" />
                  Lihat Status Request
                </button>
              </div>

              {/* Contact Info */}
              <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
                <p>
                  Jika ada pertanyaan, silakan hubungi admin melalui{' '}
                  <a href="mailto:admin@budayaind.com" className="text-green-600 dark:text-green-400 hover:underline">
                    admin@budayaind.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Add this before the form
  if (existingRequest) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Request Seller" />

        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

          {/* Existing Request Status */}
          <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar p-6 shadow-sm">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Your Seller Request
              </h1>

              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${existingRequest.status_badge.color === 'yellow'
                ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800'
                : existingRequest.status_badge.color === 'green'
                  ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                }`}>
                {existingRequest.status_badge.label}
              </div>

              <div className="space-y-2">
                <p className="text-neutral-600 dark:text-neutral-300">
                  <span className="font-medium">Tempat Wisata:</span> {existingRequest.nama_tempat_wisata}
                </p>
                <p className="text-neutral-600 dark:text-neutral-300">
                  <span className="font-medium">Email:</span> {existingRequest.email_tempat}
                </p>
                <p className="text-neutral-600 dark:text-neutral-300">
                  <span className="font-medium">Submitted:</span> {new Date(existingRequest.created_at).toLocaleDateString('id-ID')}
                </p>

                {existingRequest.reviewed_at && (
                  <p className="text-neutral-600 dark:text-neutral-300">
                    <span className="font-medium">Reviewed:</span> {new Date(existingRequest.reviewed_at).toLocaleDateString('id-ID')}
                  </p>
                )}

                {existingRequest.reviewer && (
                  <p className="text-neutral-600 dark:text-neutral-300">
                    <span className="font-medium">Reviewed by:</span> {existingRequest.reviewer.name}
                  </p>
                )}
              </div>

              {existingRequest.admin_notes && (
                <div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Admin Notes:</p>
                  <p className="text-neutral-600 dark:text-neutral-400">{existingRequest.admin_notes}</p>
                </div>
              )}

              {existingRequest.status === 'rejected' && (
                <div className="mt-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                  >
                    Submit New Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Show form only if canRequest is true
  if (!canRequest) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Request Seller" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
          <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar p-6 shadow-sm text-center">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Request Not Available
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300">
              You already have a pending or approved seller request.
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Add useEffect untuk check session/requirements
  useEffect(() => {
    // Optional: Check if user came from requirements page
    const hasAcceptedRequirements = sessionStorage.getItem('seller_requirements_accepted');
    
    if (!hasAcceptedRequirements) {
      router.get('/customer/request-seller-requirements');
    }
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Request Seller" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

        {/* Flash Messages */}
        <div className="space-y-4">
          {flash.success && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm dark:border-green-800/30 dark:bg-green-900/20">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">{flash.success}</p>
                </div>
              </div>
            </div>
          )}

          {flash.error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm dark:border-red-800/30 dark:bg-red-900/20">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiAlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800 dark:text-red-300">{flash.error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Header */}
        <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar p-6 shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Request Seller Account
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300">
              Fill out the form below to request access as a cultural tourism seller
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Informasi Tempat Wisata */}
          <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
            <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
                <FiGlobe className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Informasi Tempat Wisata Budaya
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Nama Tempat Wisata */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Nama Tempat Wisata Budaya <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.nama_tempat_wisata}
                    onChange={(e) => setData('nama_tempat_wisata', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-sidebar text-neutral-900 dark:text-neutral-100 ${errors.nama_tempat_wisata
                      ? 'border-red-300 dark:border-red-700'
                      : 'border-sidebar-border'
                      }`}
                    placeholder="Masukkan nama tempat wisata budaya"
                    required
                  />
                  {errors.nama_tempat_wisata && (
                    <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.nama_tempat_wisata}
                    </p>
                  )}
                </div>

                {/* Email Tempat */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Email untuk Tempat Wisata <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={data.email_tempat}
                      onChange={(e) => setData('email_tempat', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10 bg-white dark:bg-sidebar text-neutral-900 dark:text-neutral-100 ${errors.email_tempat
                        ? 'border-red-300 dark:border-red-700'
                        : 'border-sidebar-border'
                        }`}
                      placeholder="email@tempatwisata.com"
                      required
                    />
                    <FiMail className="absolute left-3 top-3.5 w-4 h-4 text-neutral-400" />
                  </div>
                  {errors.email_tempat && (
                    <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.email_tempat}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password_tempat" // Tambahkan name attribute
                      value={data.password_tempat}
                      onChange={(e) => setData('password_tempat', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10 bg-white dark:bg-sidebar text-neutral-900 dark:text-neutral-100 ${errors.password_tempat
                        ? 'border-red-300 dark:border-red-700'
                        : 'border-sidebar-border'
                        }`}
                      placeholder="Minimal 8 karakter"
                      required
                    />
                    <FiLock className="absolute left-3 top-3.5 w-4 h-4 text-neutral-400" />
                  </div>
                  {errors.password_tempat && (
                    <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.password_tempat}
                    </p>
                  )}
                </div>

                {/* Konfirmasi Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Konfirmasi Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password_tempat_confirmation"
                      value={data.password_tempat_confirmation} // Update ini
                      onChange={(e) => setData('password_tempat_confirmation', e.target.value)} // Update ini
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 pl-10 pr-10 bg-white dark:bg-sidebar text-neutral-900 dark:text-neutral-100 ${errors.password_tempat_confirmation // Update ini
                        ? 'border-red-300 dark:border-red-700'
                        : !passwordMatch && data.password_tempat_confirmation // Update ini
                          ? 'border-red-300 dark:border-red-700'
                          : passwordMatch && data.password_tempat_confirmation // Update ini
                            ? 'border-green-300 dark:border-green-700 focus:ring-green-500'
                            : 'border-sidebar-border focus:ring-blue-500'
                        }`}
                      placeholder="Ulangi password"
                      required
                    />
                    <FiLock className="absolute left-3 top-3.5 w-4 h-4 text-neutral-400" />

                    {/* Visual indicator */}
                    {data.password_tempat_confirmation && (
                      <div className="absolute right-3 top-3.5">
                        {passwordMatch ? (
                          <FiCheck className="w-4 h-4 text-green-500" />
                        ) : (
                          <FiX className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>

                  {errors.password_tempat_confirmation && (
                    <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.password_tempat_confirmation}
                    </p>
                  )}

                  {!passwordMatch && data.password_tempat_confirmation && !errors.password_tempat_confirmation && (
                    <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      Password tidak cocok
                    </p>
                  )}

                  {passwordMatch && data.password_tempat_confirmation && data.password_tempat && (
                    <p className="text-green-600 dark:text-green-400 text-sm flex items-center">
                      <FiCheck className="w-4 h-4 mr-1" />
                      Password cocok
                    </p>
                  )}
                </div>

                {/* Asal Daerah */}
                <div className="space-y-2 lg:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Asal Daerah Budaya <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={data.asal_daerah}
                      onChange={(e) => setData('asal_daerah', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10 bg-white dark:bg-sidebar text-neutral-900 dark:text-neutral-100 ${errors.asal_daerah
                        ? 'border-red-300 dark:border-red-700'
                        : 'border-sidebar-border'
                        }`}
                      placeholder="Contoh: Yogyakarta, Bali, Toraja, dll"
                      required
                    />
                    <FiMapPin className="absolute left-3 top-3.5 w-4 h-4 text-neutral-400" />
                  </div>
                  {errors.asal_daerah && (
                    <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.asal_daerah}
                    </p>
                  )}
                </div>

                {/* Deskripsi */}
                <div className="space-y-2 lg:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Deskripsi Tempat Wisata Budaya <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={data.deskripsi_tempat}
                    onChange={(e) => setData('deskripsi_tempat', e.target.value)}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white dark:bg-sidebar text-neutral-900 dark:text-neutral-100 ${errors.deskripsi_tempat
                      ? 'border-red-300 dark:border-red-700'
                      : 'border-sidebar-border'
                      }`}
                    placeholder="Deskripsikan tempat wisata budaya, sejarah, keunikan, dan daya tariknya..."
                    required
                  />
                  {errors.deskripsi_tempat && (
                    <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.deskripsi_tempat}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Kontak & Lokasi */}
          <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
            <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
                <FiPhone className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                Informasi Kontak & Lokasi
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Nomor Telepon */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Nomor Telepon <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={data.nomor_telepon}
                      onChange={(e) => setData('nomor_telepon', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 pl-10 bg-white dark:bg-sidebar text-neutral-900 dark:text-neutral-100 ${errors.nomor_telepon
                        ? 'border-red-300 dark:border-red-700'
                        : 'border-sidebar-border'
                        }`}
                      placeholder="Contoh: +62812345678"
                      required
                    />
                    <FiPhone className="absolute left-3 top-3.5 w-4 h-4 text-neutral-400" />
                  </div>
                  {errors.nomor_telepon && (
                    <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.nomor_telepon}
                    </p>
                  )}
                </div>

                {/* Alamat Tempat */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Alamat Lengkap Tempat Wisata <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={data.alamat_tempat}
                      onChange={(e) => setData('alamat_tempat', e.target.value)}
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none bg-white dark:bg-sidebar text-neutral-900 dark:text-neutral-100 ${errors.alamat_tempat
                        ? 'border-red-300 dark:border-red-700'
                        : 'border-sidebar-border'
                        }`}
                      placeholder="Alamat lengkap tempat wisata budaya..."
                      required
                    />
                  </div>
                  {errors.alamat_tempat && (
                    <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.alamat_tempat}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dokumen & Foto */}
          <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
            <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
                <FiCamera className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                Dokumen & Foto
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">

                {/* Foto KTP */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Foto KTP <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-sidebar-border border-dashed rounded-lg cursor-pointer bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FiUpload className="w-8 h-8 mb-4 text-neutral-500 dark:text-neutral-400" />
                          <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
                            <span className="font-semibold">Click to upload</span> KTP
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">PNG, JPG up to 2MB</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={handleKtpChange}
                          required
                        />
                      </label>
                    </div>

                    {ktpPreview && (
                      <div className="relative">
                        <img
                          src={ktpPreview}
                          alt="Preview KTP"
                          className="w-full max-w-md h-40 object-cover rounded-lg border border-sidebar-border"
                        />
                      </div>
                    )}

                    {errors.foto_ktp && (
                      <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                        <FiAlertCircle className="w-4 h-4 mr-1" />
                        {errors.foto_ktp}
                      </p>
                    )}
                  </div>
                </div>

                {/* Foto Tempat */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Foto Tempat Wisata Budaya <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Upload minimal 3 foto tempat wisata</p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-sidebar-border border-dashed rounded-lg cursor-pointer bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FiUpload className="w-8 h-8 mb-4 text-neutral-500 dark:text-neutral-400" />
                          <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
                            <span className="font-semibold">Click to upload</span> foto tempat
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">PNG, JPG multiple files</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={handleTempatChange}
                          required
                        />
                      </label>
                    </div>

                    {tempatPreview.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {tempatPreview.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-sidebar-border"
                            />
                            <button
                              type="button"
                              onClick={() => removeTempatPhoto(index)}
                              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 text-xs transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {errors.foto_tempat && (
                      <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                        <FiAlertCircle className="w-4 h-4 mr-1" />
                        {errors.foto_tempat}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Dengan mengirim form ini, Anda menyetujui untuk menunggu proses verifikasi dari admin.
                </p>
              </div>
              <button
                type="submit"
                disabled={processing || !passwordMatch || !data.password_tempat || !data.password_tempat_confirmation}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-sidebar disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {processing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mengirim Request...
                  </>
                ) : (
                  <>
                    <FiSave className="w-4 h-4 mr-2" />
                    Kirim Request Seller
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}