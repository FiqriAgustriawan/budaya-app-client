import { type NavItem } from '@/types';
import {
    BarChart3,
    BookOpen,
    DollarSign,
    Heart,
    LayoutGrid,
    Package,
    Search,
    Settings,
    ShoppingCart,
    Ticket,
    User,
    UserCheck,
    Users,
    Wallet,
} from 'lucide-react';

export const getNavigationByRole = (role: string): NavItem[] => {
    switch (role.toLowerCase()) {
        case 'admin':
            return [
                {
                    title: 'Dashboard',
                    href: '/admin/dashboard', // Fixed href untuk admin dashboard
                    icon: LayoutGrid,
                },
                {
                    title: 'Users',
                    href: '/admin/users',
                    icon: Users,
                },
                {
                    title: 'Seller Requests',
                    href: '/admin/seller-requests',
                    icon: UserCheck,
                },
                {
                    title: 'Atur Soal Quiz',
                    href: '/admin/quiz',
                    icon: BookOpen,
                },
                {
                    title: 'Withdrawals',
                    href: '/admin/withdrawals',
                    icon: Wallet,
                },
                {
                    title: 'Reports',
                    href: '/admin/reports',
                    icon: BarChart3,
                },
                {
                    title: 'Settings',
                    href: '/admin/settings',
                    icon: Settings,
                },
            ];

        case 'seller':
            return [
                {
                    title: 'Dashboard',
                    href: '/seller/dashboard',
                    icon: LayoutGrid,
                },
                {
                    title: 'Kelola Tiket',
                    href: '/seller/tickets',
                    icon: Ticket,
                },
                {
                    title: 'Orders',
                    href: '/seller/orders',
                    icon: Package,
                },
                {
                    title: 'Earnings',
                    href: '/seller/earnings',
                    icon: DollarSign,
                },
                {
                    title: 'Withdrawals',
                    href: '/seller/withdrawals',
                    icon: Wallet,
                },
            ];

        case 'customer':
        default:
            return [
                {
                    title: 'Dashboard',
                    href: '/customer/dashboard',
                    icon: LayoutGrid,
                },
                {
                    title: 'Jelajahi Tiket',
                    href: '/customer/tickets',
                    icon: Search,
                },
                {
                    title: 'Keranjang',
                    href: '/customer/cart',
                    icon: ShoppingCart,
                },
                {
                    title: 'Pesanan Saya',
                    href: '/customer/orders',
                    icon: Package,
                },
                {
                    title: 'Favorit',
                    href: '/customer/favorites',
                    icon: Heart,
                },
                {
                    title: 'Profil',
                    href: '/customer/profile',
                    icon: User,
                },
            ];
    }
};

// Helper function untuk mendapatkan dashboard URL berdasarkan role
export const getDashboardUrl = (role: string): string => {
    switch (role.toLowerCase()) {
        case 'admin':
            return '/admin/dashboard';
        case 'seller':
            return '/seller/dashboard';
        case 'customer':
        default:
            return '/customer/dashboard';
    }
};

// Helper function untuk mendapatkan badge count (opsional)
interface NavigationStats {
    pending_withdrawals?: number;
    pending_seller_requests?: number;
    cart_items?: number;
}

export const getNavigationBadges = (role: string, stats?: NavigationStats): Record<string, number> => {
    const badges: Record<string, number> = {};

    if (role === 'admin' && stats) {
        if (stats.pending_withdrawals && stats.pending_withdrawals > 0) {
            badges['/admin/withdrawals'] = stats.pending_withdrawals;
        }
        if (stats.pending_seller_requests && stats.pending_seller_requests > 0) {
            badges['/admin/seller-requests'] = stats.pending_seller_requests;
        }
    }

    if (role === 'customer' && stats) {
        if (stats.cart_items && stats.cart_items > 0) {
            badges['/customer/cart'] = stats.cart_items;
        }
    }

    return badges;
};

// Navigation groups untuk better organization
export const getNavigationGroups = (role: string): { title: string; items: NavItem[] }[] => {
    switch (role.toLowerCase()) {
        case 'admin':
            return [
                {
                    title: 'Platform',
                    items: [
                        {
                            title: 'Dashboard',
                            href: '/admin/dashboard',
                            icon: LayoutGrid,
                        },
                        {
                            title: 'Users',
                            href: '/admin/users',
                            icon: Users,
                        },
                        {
                            title: 'Seller Requests',
                            href: '/admin/seller-requests',
                            icon: UserCheck,
                        },
                    ],
                },
                {
                    title: 'Finance',
                    items: [
                        {
                            title: 'Withdrawals',
                            href: '/admin/withdrawals',
                            icon: Wallet,
                        },
                        {
                            title: 'Reports',
                            href: '/admin/reports',
                            icon: BarChart3,
                        },
                    ],
                },
                {
                    title: 'System',
                    items: [
                        {
                            title: 'Settings',
                            href: '/admin/settings',
                            icon: Settings,
                        },
                    ],
                },
            ];

        case 'seller':
            return [
                {
                    title: 'Business',
                    items: [
                        {
                            title: 'Dashboard',
                            href: '/seller/dashboard',
                            icon: LayoutGrid,
                        },
                        {
                            title: 'Kelola Tiket',
                            href: '/seller/tickets',
                            icon: Ticket,
                        },
                        {
                            title: 'Orders',
                            href: '/seller/orders',
                            icon: Package,
                        },
                    ],
                },
                {
                    title: 'Finance',
                    items: [
                        {
                            title: 'Earnings',
                            href: '/seller/earnings',
                            icon: DollarSign,
                        },
                        {
                            title: 'Withdrawals',
                            href: '/seller/withdrawals',
                            icon: Wallet,
                        },
                    ],
                },
            ];

        case 'customer':
        default:
            return [
                {
                    title: 'Explore',
                    items: [
                        {
                            title: 'Dashboard',
                            href: '/customer/dashboard',
                            icon: LayoutGrid,
                        },
                        {
                            title: 'Jelajahi Tiket',
                            href: '/customer/tickets',
                            icon: Search,
                        },
                    ],
                },
                {
                    title: 'Shopping',
                    items: [
                        {
                            title: 'Keranjang',
                            href: '/customer/cart',
                            icon: ShoppingCart,
                        },
                        {
                            title: 'Pesanan Saya',
                            href: '/customer/orders',
                            icon: Package,
                        },
                        {
                            title: 'Favorit',
                            href: '/customer/favorites',
                            icon: Heart,
                        },
                    ],
                },
                {
                    title: 'Account',
                    items: [
                        {
                            title: 'Profil',
                            href: '/customer/profile',
                            icon: User,
                        },
                    ],
                },
            ];
    }
};
