import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Ticket } from '@/types/ticket';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Clock,
  Image as ImageIcon
} from 'lucide-react';

interface Props {
  ticket: Ticket;
}

export default function ShowTicket({ ticket }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Seller Dashboard',
      href: '/seller/dashboard',
    },
    {
      title: 'Kelola Tiket',
      href: '/seller/tickets',
    },
    {
      title: ticket.title,
      href: `/seller/tickets/${ticket.id}`,
    },
  ];

  // Fix image path - sama seperti di TicketCard
  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) {
      return null;
    }

    // Jika path sudah lengkap (http/https), gunakan langsung
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // Untuk path storage, tambahkan prefix yang benar
    if (imagePath.startsWith('tickets/')) {
      return `/storage/${imagePath}`;
    }

    return `/storage/tickets/${imagePath}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'premium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'vip':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleDelete = () => {
    if (confirm('Apakah Anda yakin ingin menghapus tiket ini? Tindakan ini tidak dapat dibatalkan.')) {
      router.delete(`/seller/tickets/${ticket.id}`, {
        onSuccess: () => {
          router.visit('/seller/tickets');
        }
      });
    }
  };

  const toggleStatus = () => {
    router.patch(`/seller/tickets/${ticket.id}/toggle-status`, {}, {
      onSuccess: () => {
        // Page will refresh with updated data
      }
    });
  };

  const remainingTickets = ticket.available_quantity - ticket.sold_quantity;
  const salesPercentage = (ticket.sold_quantity / ticket.available_quantity) * 100;

  // Handle access features - bisa null/undefined untuk data lama
  const accessFeatures = ticket.access_features || [];
  const imageUrl = getImageUrl(ticket.image);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={ticket.title} />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {ticket.title}
              </h1>
              <Badge className={getCategoryColor(ticket.category)}>
                {ticket.category.toUpperCase()}
              </Badge>
              <Badge variant={ticket.is_active ? 'default' : 'secondary'}>
                {ticket.is_active ? 'Aktif' : 'Tidak Aktif'}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{ticket.destination}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={toggleStatus}
              className="flex items-center gap-2"
            >
              {ticket.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {ticket.is_active ? 'Nonaktifkan' : 'Aktifkan'}
            </Button>
            <Link href={`/seller/tickets/${ticket.id}/edit`}>
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </Link>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Hapus
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <Card>
              <CardContent className="p-0">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={ticket.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                    onError={(e) => {
                      // Fallback jika gambar gagal load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}

                {/* Fallback placeholder - tampil jika no image atau error */}
                <div className={`w-full h-64 bg-muted rounded-t-lg flex items-center justify-center ${imageUrl ? 'hidden' : ''}`}>
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                    <p>Tidak ada gambar</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Deskripsi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {ticket.description}
                </p>
              </CardContent>
            </Card>

            {/* Access Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Akses & Fitur yang Didapat
                </CardTitle>
              </CardHeader>
              <CardContent>
                {accessFeatures.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {accessFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Belum ada fitur akses yang ditambahkan</p>
                    <p className="text-xs mt-1">
                      Edit tiket untuk menambahkan fitur dan akses yang tersedia
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            {/* Price & Category */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Harga
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {formatPrice(ticket.price)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Kategori {ticket.category}
                </p>
              </CardContent>
            </Card>

            {/* Sales Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Statistik Penjualan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Terjual</span>
                    <span className="font-medium">{ticket.sold_quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tersedia</span>
                    <span className="font-medium">{remainingTickets}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total</span>
                    <span className="font-medium">{ticket.available_quantity}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Persentase Terjual</span>
                    <span className="font-medium">{salesPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${salesPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Pendapatan</span>
                    <span className="font-medium">
                      {formatPrice(ticket.sold_quantity * ticket.price)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Potensi Pendapatan</span>
                    <span className="font-medium text-muted-foreground">
                      {formatPrice(ticket.available_quantity * ticket.price)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Jadwal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Mulai</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(ticket.start_date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Berakhir</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(ticket.end_date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Lihat Pesanan
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Laporan Penjualan
                </Button>
                <Link href={`/seller/tickets/${ticket.id}/edit`}>
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Tiket
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}