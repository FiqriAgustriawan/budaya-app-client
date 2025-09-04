export interface SellerEarnings {
    total_earned: number;
    available_balance: number;
    pending_balance: number;
    withdrawn_amount: number;
    total_sales: number;
    platform_fee_percentage: number;
}

export interface WithdrawalRequest {
    id: number;
    seller_id: number;
    amount: number;
    bank_name: string;
    account_number: string;
    account_holder: string;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    requested_at: string;
    processed_at?: string;
    notes?: string;
    admin_notes?: string;
}

export interface Transaction {
    id: number;
    order_id: number;
    ticket_title: string;
    customer_name: string;
    amount: number;
    seller_amount: number;
    platform_fee: number;
    status: 'pending' | 'success' | 'failed';
    created_at: string;
}
