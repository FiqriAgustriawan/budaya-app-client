import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Calendar, Clock, Edit, Trash2, Eye } from 'lucide-react';
import { Ticket } from '@/types/ticket';

interface TicketCardProps {
  ticket: Ticket;
  variant?: 'customer' | 'seller';
  onEdit?: (ticket: Ticket) => void;
  onDelete?: (ticket: Ticket) => void;
  onView?: (ticket: Ticket) => void;
  onAddToCart?: (ticket: Ticket) => void;
}

export default function TicketCard({
  ticket,
  variant = 'customer',
  onEdit,
  onDelete,
  onView,
  onAddToCart
}: TicketCardProps) {

  // Fix image path - pastikan menggunakan storage URL yang benar
  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) {
      return '/images/default-ticket.jpg'; // Default image
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic':
        return 'bg-blue-100 text-blue-800';
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'vip':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageUrl(ticket.image)}
          alt={ticket.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback jika gambar gagal load
            e.currentTarget.src = '/images/default-ticket.jpg';
          }}
        />
        <div className="absolute top-3 right-3">
          <Badge className={getCategoryColor(ticket.category)}>
            {ticket.category.toUpperCase()}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title & Price */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">{ticket.title}</h3>
          <div className="text-right ml-2">
            <div className="text-xl font-bold text-green-600">
              {formatCurrency(ticket.price)}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {ticket.destination}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {ticket.description}
        </p>

        {/* Meta Info */}
        <div className="space-y-1 text-xs text-muted-foreground mb-4">
          {ticket.available_quantity && (
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {ticket.available_quantity - (ticket.sold_quantity || 0)} / {ticket.available_quantity} tersedia
            </div>
          )}

          {ticket.start_date && (
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(ticket.start_date)}
              {ticket.end_date && ticket.end_date !== ticket.start_date &&
                ` - ${formatDate(ticket.end_date)}`
              }
            </div>
          )}

          {ticket.duration_hours && (
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {ticket.duration_hours} jam
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {variant === 'seller' ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onView?.(ticket)}
              >
                <Eye className="w-4 h-4 mr-1" />
                Detail
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onEdit?.(ticket)}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete?.(ticket)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onView?.(ticket)}
              >
                Lihat Detail
              </Button>
              <Button
                className="flex-1"
                onClick={() => onAddToCart?.(ticket)}
              >
                Tambah ke Keranjang
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}