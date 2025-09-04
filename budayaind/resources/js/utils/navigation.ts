import { type NavItem } from '@/types';
import {
    DollarSign,
    FileText,
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
                    href: '/dashboard',
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
                    title: 'Withdrawals',
                    href: '/admin/withdrawals',
                    icon: Wallet,
                },
                {
                    title: 'Reports',
                    href: '/admin/reports',
                    icon: FileText,
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
            ];

        case 'customer':
        default:
            return [
                {
                    title: 'Jelajahi Tiket',
                    href: '/tickets',
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
