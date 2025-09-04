import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Ticket, TicketFilter } from '@/types/ticket';
import TicketCard from '@/components/Tickets/TicketCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Filter } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Seller Dashboard',
    href: '/seller/dashboard',
  },
  {
    title: 'Kelola Tiket',
    href: '/seller/tickets',
  },
];

interface TicketStats {
  total_tickets: number;
  active_tickets: number;
  total_sales: number;
  total_revenue: number;
}

interface Props {
  tickets: {
    data: Ticket[];
    links?: any[];
    meta?: any;
  };
  filters: TicketFilter;
  stats: TicketStats;
}

export default function TicketIndex({ tickets, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [category, setCategory] = useState(filters.category || 'all');
  const [status, setStatus] = useState(
    filters.is_active === true ? 'active' : 
    filters.is_active === false ? 'inactive' : 
    filters.is_active || 'all'
  );

  const handleSearch = () => {
    router.get('/seller/tickets', {
      search,
      category,
      is_active: status,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleDelete = (ticket: Ticket) => {
    if (confirm('Apakah Anda yakin ingin menghapus tiket ini?')) {
      router.delete(`/seller/tickets/${ticket.id}`, {
        onSuccess: () => {
          // Show success message
        }
      });
    }
  };

  const handleEdit = (ticket: Ticket) => {
    router.visit(`/seller/tickets/${ticket.id}/edit`);
  };

  const handleView = (ticket: Ticket) => {
    router.visit(`/seller/tickets/${ticket.id}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Safe access to data
  const ticketsData = tickets?.data || [];
  const hasTickets = ticketsData.length > 0;
  const hasPagination = tickets?.meta && tickets.meta.last_page > 1;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Tiket" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Kelola Tiket Wisata
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Kelola tiket wisata budaya yang Anda jual
            </p>
          </div>
          <Link href="/seller/tickets/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Tiket
            </Button>
          </Link>
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
                  placeholder="Cari tiket..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="w-48">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-48">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                Cari
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tickets Grid */}
        {hasTickets ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ticketsData.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                variant="seller"
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                onAddToCart={() => { }} // Not used in seller variant
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-muted-foreground mb-4">
                Belum ada tiket yang dibuat
              </div>
              <Link href="/seller/tickets/create">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Tiket Pertama
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {hasPagination && (
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {tickets.links?.map((link: any, index: number) => (
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