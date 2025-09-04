import { Ticket } from "./ticket";

export interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    total_amount: number;
    status: 'pending' | 'paid' | 'cancelled' | 'refunded';
    payment_id?: number;
    payment?: Payment;
    items: OrderItem[];
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    ticket_id: number;
    ticket: Ticket;
    quantity: number;
    price: number;
    subtotal: number;
}

export interface Payment {
    id: number;
    order_id: number;
    payment_method: string;
    amount: number;
    status: 'pending' | 'success' | 'failed' | 'cancelled';
    midtrans_transaction_id?: string;
    midtrans_payment_type?: string;
    paid_at?: string;
    created_at: string;
    updated_at: string;
}
