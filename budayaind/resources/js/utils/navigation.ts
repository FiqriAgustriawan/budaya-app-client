import { type NavItem } from '@/types';
import { FileText, LayoutGrid, Settings, ShoppingCart, User, UserCheck, UserPlus, Users } from 'lucide-react';

export const getNavigationByRole = (role: string): NavItem[] => {
    switch (role.toLowerCase()) {
        case 'admin':
            return [
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

        case 'customer':
            return [
                {
                    title: 'Profile',
                    href: '/customer/profile',
                    icon: User,
                },
                {
                    title: 'Request Seller',
                    href: '/customer/request-seller',
                    icon: UserPlus,
                },
                {
                    title: 'My Orders',
                    href: '/customer/orders',
                    icon: ShoppingCart,
                },
                {
                    title: 'Settings',
                    href: '/customer/settings',
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
                    title: 'Products',
                    href: '/seller/products',
                    icon: ShoppingCart,
                },
                {
                    title: 'Orders',
                    href: '/seller/orders',
                    icon: FileText,
                },
                {
                    title: 'Settings',
                    href: '/seller/settings',
                    icon: Settings,
                },
            ];

        default:
            return [];
    }
};
