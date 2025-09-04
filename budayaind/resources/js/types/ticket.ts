export interface Ticket {
    id: number;
    seller_id: number;
    title: string;
    description: string;
    price: number;
    destination: string;
    category: 'basic' | 'premium' | 'vip';
    access_features?: string[]; // Make optional for backward compatibility
    start_date: string;
    end_date: string;
    start_time?: string;
    end_time?: string;
    duration_hours?: number;
    available_quantity: number;
    sold_quantity: number;
    image: string | null;
    status: 'active' | 'inactive' | 'sold_out';
    is_active?: boolean; // Make optional for backward compatibility
    created_at: string;
    updated_at: string;
    seller?: {
        id: number;
        name: string;
        email: string;
    };
}

export interface TicketFormData {
    title: string;
    description: string;
    destination: string;
    price: number;
    category: 'basic' | 'premium' | 'vip';
    access_features: string[];
    image?: File;
    available_quantity: number;
    start_date: string;
    end_date: string;
    is_active: boolean;
}

export interface TicketFilter {
    sort: string;
    search?: string;
    category?: string;
    destination?: string;
    price_min?: number;
    price_max?: number;
    is_active?: boolean;
}
interface TicketCardProps {
    ticket: Ticket;
    onView: (ticket: Ticket) => void;
    onAddToCart: (ticket: Ticket) => void;
}
