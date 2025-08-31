import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
  FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, FiFileText,
  FiCalendar, FiCheck, FiX, FiEye, FiDownload, FiAlertCircle,
  FiClock, FiEdit3, FiSave, FiImage
} from 'react-icons/fi';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  created_at: string;
}

interface Reviewer {
  name: string;
}

interface SellerRequest {
  id: number;
  nama_tempat_wisata: string;
  email_tempat: string;
  deskripsi_tempat: string;
  asal_daerah: string;
  nomor_telepon: string;
  alamat_tempat: string;
  foto_ktp: string;
  foto_tempat: string[];
  status: string;
  status_badge: {
    color: string;
    label: string;
  };
  admin_notes?: string;
  reviewed_at?: string;
  created_at: string;
  user: User;
  reviewer?: Reviewer;
}

interface Props {
  sellerRequest: SellerRequest;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Seller Requests',
    href: '/admin/seller-requests',
  },
  {
    title: 'Detail Request',
    href: '#',
  },
];

export default function SellerRequestShow({ sellerRequest }: Props) {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  const getStatusBadgeClasses = (color: string) => {
    const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';

    switch (color) {
      case 'yellow':
        return `${baseClasses} bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800`;
      case 'green':
        return `${baseClasses} bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800`;
      case 'red':
        return `${baseClasses} bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800`;
      default:
        return `${baseClasses} bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800`;
    }
  };

  const handleApprove = () => {
    setProcessing(true);
    router.patch(`/admin/seller-requests/${sellerRequest.id}/approve`, {
      admin_notes: adminNotes
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setShowApproveModal(false);
        setAdminNotes('');
      },
      onFinish: () => setProcessing(false)
    });
  };

  const handleReject = () => {
    if (!adminNotes.trim()) {
      alert('Alasan penolakan harus diisi!');
      return;
    }

    setProcessing(true);
    router.patch(`/admin/seller-requests/${sellerRequest.id}/reject`, {
      admin_notes: adminNotes
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setShowRejectModal(false);
        setAdminNotes('');
      },
      onFinish: () => setProcessing(false)
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Request: ${sellerRequest.nama_tempat_wisata}`} />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

        {/* Header */}
        <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/seller-requests"
                className="inline-flex items-center px-3 py-2 border border-sidebar-border rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Back to List
              </Link>

              <div>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {sellerRequest.nama_tempat_wisata}
                </h1>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Request ID: #{sellerRequest.id}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={getStatusBadgeClasses(sellerRequest.status_badge.color)}>
                {sellerRequest.status_badge.label}
              </span>

              {sellerRequest.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-700 rounded-lg text-sm font-medium text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <FiX className="w-4 h-4 mr-2" />
                    Reject
                  </button>
                  <button
                    onClick={() => setShowApproveModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors"
                  >
                    <FiCheck className="w-4 h-4 mr-2" />
                    Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">

            {/* Customer Information */}
            <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
              <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
                  <FiUser className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Customer Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                        Full Name
                      </label>
                      <p className="text-neutral-900 dark:text-neutral-100 font-medium">
                        {sellerRequest.user.name}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                        Email Address
                      </label>
                      <p className="text-neutral-900 dark:text-neutral-100 flex items-center">
                        <FiMail className="w-4 h-4 mr-2 text-neutral-400" />
                        {sellerRequest.user.email}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                        Phone Number
                      </label>
                      <p className="text-neutral-900 dark:text-neutral-100 flex items-center">
                        <FiPhone className="w-4 h-4 mr-2 text-neutral-400" />
                        {sellerRequest.user.phone || 'Not provided'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                        Customer Since
                      </label>
                      <p className="text-neutral-900 dark:text-neutral-100 flex items-center">
                        <FiCalendar className="w-4 h-4 mr-2 text-neutral-400" />
                        {new Date(sellerRequest.user.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                        Current Address
                      </label>
                      <p className="text-neutral-900 dark:text-neutral-100 flex items-start">
                        <FiMapPin className="w-4 h-4 mr-2 text-neutral-400 mt-0.5 flex-shrink-0" />
                        <span>{sellerRequest.user.address || 'Not provided'}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tourism Place Information */}
            <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
              <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
                  <FiMapPin className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                  Tourism Place Details
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                        Place Name
                      </label>
                      <p className="text-neutral-900 dark:text-neutral-100 font-medium">
                        {sellerRequest.nama_tempat_wisata}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                        Business Email
                      </label>
                      <p className="text-neutral-900 dark:text-neutral-100 flex items-center">
                        <FiMail className="w-4 h-4 mr-2 text-neutral-400" />
                        {sellerRequest.email_tempat}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                        Cultural Origin
                      </label>
                      <p className="text-neutral-900 dark:text-neutral-100">
                        {sellerRequest.asal_daerah}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                        Contact Number
                      </label>
                      <p className="text-neutral-900 dark:text-neutral-100 flex items-center">
                        <FiPhone className="w-4 h-4 mr-2 text-neutral-400" />
                        {sellerRequest.nomor_telepon}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                      Address
                    </label>
                    <p className="text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                      {sellerRequest.alamat_tempat}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                      Description
                    </label>
                    <div className="text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {sellerRequest.deskripsi_tempat}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
              <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
                  <FiFileText className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                  Documents & Photos
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">

                  {/* KTP Photo */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">
                      ID Card (KTP)
                    </label>
                    <div className="border border-sidebar-border rounded-lg p-4 bg-neutral-50 dark:bg-neutral-800">
                      <img
                        src={`/storage/${sellerRequest.foto_ktp}`}
                        alt="KTP"
                        className="max-w-full h-auto max-h-64 rounded-lg shadow-sm"
                      />
                      <div className="mt-3 flex gap-2">
                        <a
                          href={`/storage/${sellerRequest.foto_ktp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 border border-sidebar-border rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        >
                          <FiEye className="w-4 h-4 mr-2" />
                          View Full Size
                        </a>
                        <a
                          href={`/storage/${sellerRequest.foto_ktp}`}
                          download
                          className="inline-flex items-center px-3 py-2 border border-sidebar-border rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        >
                          <FiDownload className="w-4 h-4 mr-2" />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Place Photos */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">
                      Tourism Place Photos ({sellerRequest.foto_tempat.length} photos)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {sellerRequest.foto_tempat.map((photo, index) => (
                        <div key={index} className="border border-sidebar-border rounded-lg p-3 bg-neutral-50 dark:bg-neutral-800">
                          <img
                            src={`/storage/${photo}`}
                            alt={`Place ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg shadow-sm"
                          />
                          <div className="mt-2 flex gap-2">
                            <a
                              href={`/storage/${photo}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-2 py-1 border border-sidebar-border rounded text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                            >
                              <FiEye className="w-3 h-3 mr-1" />
                              View
                            </a>
                            <a
                              href={`/storage/${photo}`}
                              download
                              className="inline-flex items-center px-2 py-1 border border-sidebar-border rounded text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                            >
                              <FiDownload className="w-3 h-3 mr-1" />
                              Download
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Request Timeline */}
            <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
              <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
                  <FiClock className="w-5 h-5 mr-2 text-orange-600 dark:text-orange-400" />
                  Request Timeline
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        Request Submitted
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {new Date(sellerRequest.created_at).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {sellerRequest.reviewed_at && (
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${sellerRequest.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          Request {sellerRequest.status === 'approved' ? 'Approved' : 'Rejected'}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {new Date(sellerRequest.reviewed_at).toLocaleString('id-ID')}
                        </p>
                        {sellerRequest.reviewer && (
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            by {sellerRequest.reviewer.name}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Admin Notes */}
            {sellerRequest.admin_notes && (
              <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
                <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
                    <FiEdit3 className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                    Admin Notes
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-neutral-900 dark:text-neutral-100 whitespace-pre-wrap">
                    {sellerRequest.admin_notes}
                  </p>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
              <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Quick Info
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Request ID</span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">#{sellerRequest.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Documents</span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {sellerRequest.foto_tempat.length + 1} files
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Status</span>
                    <span className={`text-sm font-medium capitalize ${sellerRequest.status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
                      sellerRequest.status === 'approved' ? 'text-green-600 dark:text-green-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                      {sellerRequest.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-sidebar rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Approve Seller Request
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                Are you sure you want to approve this seller request? This will create a new seller account.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Admin Notes (Optional)
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-sidebar-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  placeholder="Add notes about the approval..."
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="px-4 py-2 border border-sidebar-border rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  disabled={processing}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {processing ? 'Approving...' : 'Approve Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-sidebar rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Reject Seller Request
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                Please provide a reason for rejecting this seller request.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Rejection Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-sidebar-border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  placeholder="Explain why this request is being rejected..."
                  required
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 border border-sidebar-border rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={processing || !adminNotes.trim()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {processing ? 'Rejecting...' : 'Reject Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}