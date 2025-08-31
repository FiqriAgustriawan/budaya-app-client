import { type NavItem } from '@/types';
import { FileText, LayoutGrid, Settings, ShoppingCart, User, Users } from 'lucide-react';

export const getNavigationByRole = (role: string): NavItem[] => {
    switch (role.toLowerCase()) {
        case 'customer':
            return [
                {
                    title: 'Profile',
                    href: '/customer/profile',
                    icon: User,
                },
                {
                    title: 'My Orders',
                    href: '/customer/orders',
                    icon: ShoppingCart,
                },
            ];

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

        case 'manager':
            return [
                {
                    title: 'Dashboard',
                    href: '/manager/dashboard',
                    icon: LayoutGrid,
                },
                {
                    title: 'Team',
                    href: '/manager/team',
                    icon: Users,
                },
                {
                    title: 'Reports',
                    href: '/manager/reports',
                    icon: FileText,
                },
            ];

        default:
            return [
                {
                    title: 'Dashboard',
                    href: '/dashboard',
                    icon: LayoutGrid,
                },
            ];
    }
};
