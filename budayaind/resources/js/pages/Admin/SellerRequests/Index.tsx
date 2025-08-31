import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
  FiUsers, FiClock, FiCheck, FiX, FiSearch, FiFilter,
  FiEye, FiCalendar, FiMail, FiMapPin, FiMoreHorizontal
} from 'react-icons/fi';

interface User {
  id: number;
  name: string;
  email: string;
}

interface SellerRequest {
  id: number;
  nama_tempat_wisata: string;
  email_tempat: string;
  asal_daerah: string;
  status: string;
  status_badge: {
    color: string;
    label: string;
  };
  created_at: string;
  reviewed_at?: string;
  user: User;
  reviewer?: {
    name: string;
  };
}

interface Props {
  sellerRequests: {
    data: SellerRequest[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  filters: {
    status: string;
    search: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Seller Requests',
    href: '/admin/seller-requests',
  },
];

export default function SellerRequestsIndex({ sellerRequests, stats, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');

  const handleSearch = () => {
    router.get('/admin/seller-requests', {
      search: search,
      status: filters.status
    }, {
      preserveState: true,
      replace: true
    });
  };

  const handleStatusFilter = (status: string) => {
    router.get('/admin/seller-requests', {
      search: filters.search,
      status
    }, {
      preserveState: true,
      replace: true
    });
  };

  const getStatusBadgeClasses = (color: string) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

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

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Seller Requests" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

        {/* Header */}
        <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Seller Requests
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300">
                Kelola permintaan menjadi seller dari customer
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiUsers className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Total Requests</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiClock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Pending</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Approved</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{stats.approved}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiX className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Rejected</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">

            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full px-4 py-2 pl-10 border border-sidebar-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-sidebar text-neutral-900 dark:text-neutral-100"
                  placeholder="Search by name, email, tempat wisata..."
                />
                <FiSearch className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Search
            </button>

            {/* Status Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => handleStatusFilter('all')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filters.status === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => handleStatusFilter('pending')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filters.status === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
              >
                Pending
              </button>
              <button
                onClick={() => handleStatusFilter('approved')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filters.status === 'approved'
                  ? 'bg-green-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
              >
                Approved
              </button>
              <button
                onClick={() => handleStatusFilter('rejected')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filters.status === 'rejected'
                  ? 'bg-red-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
              >
                Rejected
              </button>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-sidebar-border">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Customer & Tempat Wisata
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-sidebar divide-y divide-sidebar-border">
                {sellerRequests.data.map((request) => (
                  <tr key={request.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {request.nama_tempat_wisata}
                        </div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          by {request.user.name}
                        </div>
                        <div className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center mt-1">
                          <FiMapPin className="w-3 h-3 mr-1" />
                          {request.asal_daerah}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900 dark:text-neutral-100 flex items-center">
                        <FiMail className="w-3 h-3 mr-1" />
                        {request.email_tempat}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {request.user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadgeClasses(request.status_badge.color)}>
                        {request.status_badge.label}
                      </span>
                      {request.reviewer && (
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                          by {request.reviewer.name}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center">
                        <FiCalendar className="w-3 h-3 mr-1" />
                        {new Date(request.created_at).toLocaleDateString('id-ID')}
                      </div>
                      {request.reviewed_at && (
                        <div className="text-xs text-neutral-400 mt-1">
                          Reviewed: {new Date(request.reviewed_at).toLocaleDateString('id-ID')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/seller-requests/${request.id}`}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm rounded-md text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        <FiEye className="w-4 h-4 mr-1" />
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {sellerRequests.last_page > 1 && (
            <div className="bg-white dark:bg-sidebar px-6 py-3 border-t border-sidebar-border">
              <div className="flex items-center justify-between">
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  Showing {((sellerRequests.current_page - 1) * sellerRequests.per_page) + 1} to{' '}
                  {Math.min(sellerRequests.current_page * sellerRequests.per_page, sellerRequests.total)} of{' '}
                  {sellerRequests.total} results
                </div>
                <div className="flex gap-2">
                  {sellerRequests.current_page > 1 && (
                    <Link
                      href={`/admin/seller-requests?page=${sellerRequests.current_page - 1}&status=${filters.status}&search=${filters.search}`}
                      className="px-3 py-1 border border-sidebar-border rounded-md text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      Previous
                    </Link>
                  )}
                  {sellerRequests.current_page < sellerRequests.last_page && (
                    <Link
                      href={`/admin/seller-requests?page=${sellerRequests.current_page + 1}&status=${filters.status}&search=${filters.search}`}
                      className="px-3 py-1 border border-sidebar-border rounded-md text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      Next
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {sellerRequests.data.length === 0 && (
          <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar p-12 shadow-sm text-center">
            <FiUsers className="mx-auto h-12 w-12 text-neutral-300 dark:text-neutral-600 mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              No seller requests found
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400">
              {filters.search || filters.status !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Belum ada customer yang mengajukan permintaan menjadi seller.'}
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}