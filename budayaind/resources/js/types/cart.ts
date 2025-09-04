import { Ticket } from './ticket';

export interface CartItem {
    id: number;
    ticket_id: number;
    ticket: Ticket;
    quantity: number;
    price: number;
    subtotal: number;
}

export interface Cart {
    items: CartItem[];
    total_items: number;
    total_amount: number;
}

export interface CheckoutData {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    visit_date: string;
    special_requests?: string;
}
