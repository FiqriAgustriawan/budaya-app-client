import { Ticket } from '@/types/ticket';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MapPin, Users, Calendar, Star, Clock, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface CustomerTicketCardProps {
  ticket: Ticket;
  onView: (ticket: Ticket) => void;
  onAddToCart: (ticket: Ticket) => void;
}

export default function CustomerTicketCard({ ticket, onView, onAddToCart }: CustomerTicketCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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

  const isAvailable = ticket.available_quantity > ticket.sold_quantity;
  const isActive = ticket.is_active && new Date(ticket.end_date) > new Date();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart(ticket);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <div className="relative">
        <img
          src={ticket.image || '/placeholder-ticket.jpg'}
          alt={ticket.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Badge className={getCategoryColor(ticket.category)}>
            {ticket.category.toUpperCase()}
          </Badge>
          {!isActive && (
            <Badge variant="destructive">
              Tidak Tersedia
            </Badge>
          )}
          {isActive && !isAvailable && (
            <Badge variant="secondary">
              Sold Out
            </Badge>
          )}
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <Star className="w-3 h-3 mr-1" />
            4.8
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary cursor-pointer"
            onClick={() => onView(ticket)}>
            {ticket.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{ticket.destination}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {ticket.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4" />
            <span className={!isAvailable ? 'text-red-500' : ''}>
              {isAvailable ? `${ticket.available_quantity - ticket.sold_quantity} tersisa` : 'Habis'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            <span>
              Berlaku s/d {new Date(ticket.end_date).toLocaleDateString('id-ID')}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>Tiket Digital - Langsung Aktif</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-sm font-medium">Akses yang didapat:</div>
          <div className="flex flex-wrap gap-1">
            {(ticket.access_features || []).slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {(ticket.access_features || []).length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{(ticket.access_features || []).length - 2} lainnya
              </Badge>
            )}
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary">
                {formatPrice(ticket.price)}
              </div>
              <div className="text-xs text-muted-foreground">
                per orang
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                {ticket.sold_quantity} terjual
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            onClick={() => onView(ticket)}
            className="flex-1"
          >
            Lihat Detail
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={!isActive || !isAvailable || isAddingToCart}
            className="flex-1"
          >
            {isAddingToCart ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Menambah...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isActive && isAvailable ? 'Tambah ke Keranjang' : 'Tidak Tersedia'}
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}