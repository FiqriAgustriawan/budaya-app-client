import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Users,
    ShoppingBag,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertTriangle,
    BarChart3,
    Activity,
    User,
    Package,

} from 'lucide-react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

interface Stats {
    total_users: number;
    total_sellers: number;
    total_customers: number;
    total_tickets: number;
    active_tickets: number;
    total_orders: number;
    total_revenue: number;
    pending_withdrawals: number;
}

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    total_amount: number;
    status: string;
    payment_status: string;
    created_at: string;
}

interface Ticket {
    id: number;
    title: string;
    price: number;
    total_sold: number;
    user?: {
        name: string;
    };
}

interface MonthlyData {
    month: string;
    revenue: number;
}

interface UserGrowthData {
    month: string;
    users: number;
}

interface Props {
    stats: Stats;
    recent_orders: Order[];
    top_tickets: Ticket[];
    monthly_revenue: MonthlyData[];
    user_growth: UserGrowthData[];
}

export default function AdminDashboard({
    stats,
    recent_orders = [],
    top_tickets = [],
    monthly_revenue = [],
    user_growth = [],
}: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount || 0);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { variant: 'secondary' as const, label: 'Pending' },
            confirmed: { variant: 'default' as const, label: 'Dikonfirmasi' },
            completed: { variant: 'default' as const, label: 'Selesai' },
            cancelled: { variant: 'destructive' as const, label: 'Dibatalkan' },
            paid: { variant: 'default' as const, label: 'Dibayar' },
            unpaid: { variant: 'secondary' as const, label: 'Belum Dibayar' },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || {
            variant: 'secondary' as const,
            label: status,
        };

        return (
            <Badge variant={config.variant} className="text-xs">
                {config.label}
            </Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
                        <p className="text-muted-foreground">
                            Selamat datang di panel admin ITTC Budaya Indonesia
                        </p>
                    </div>
                    <Link href="/admin/reports">
                        <Button variant="outline">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Lihat Laporan
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                                    <p className="text-2xl font-bold">{stats?.total_users?.toLocaleString() || 0}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {stats?.total_customers || 0} customers • {stats?.total_sellers || 0} sellers
                                    </p>
                                </div>
                                <Users className="h-8 w-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Tickets</p>
                                    <p className="text-2xl font-bold">{stats?.total_tickets?.toLocaleString() || 0}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {stats?.active_tickets || 0} aktif
                                    </p>
                                </div>
                                <Package className="h-8 w-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                                    <p className="text-2xl font-bold">{stats?.total_orders?.toLocaleString() || 0}</p>
                                </div>
                                <ShoppingBag className="h-8 w-8 text-purple-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                                    <p className="text-2xl font-bold">{formatCurrency(stats?.total_revenue || 0)}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {stats?.pending_withdrawals || 0} pending withdrawals
                                    </p>
                                </div>
                                <DollarSign className="h-8 w-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Orders */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5" />
                                Pesanan Terbaru
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recent_orders && recent_orders.length > 0 ? (
                                <div className="space-y-4">
                                    {recent_orders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                    <ShoppingBag className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">#{order.order_number || 'N/A'}</p>
                                                    <p className="text-sm text-muted-foreground">{order.customer_name || 'Guest'}</p>
                                                    <p className="text-xs text-muted-foreground">{order.created_at ? formatDate(order.created_at) : 'N/A'}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">{formatCurrency(order.total_amount || 0)}</p>
                                                <div className="flex gap-1 mt-1">
                                                    {getStatusBadge(order.payment_status || 'unknown')}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">Belum ada pesanan</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Top Tickets */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                Tiket Terlaris
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {top_tickets && top_tickets.length > 0 ? (
                                <div className="space-y-4">
                                    {top_tickets.map((ticket, index) => (
                                        <div key={ticket.id} className="flex items-center justify-between p-3 rounded-lg border">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{ticket.title || 'Untitled'}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        by {ticket.user?.name || 'Unknown Seller'}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">{formatCurrency(ticket.price || 0)}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">{ticket.total_sold || 0} terjual</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">Belum ada data penjualan</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Monthly Revenue */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" />
                                Pendapatan Bulanan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {monthly_revenue && monthly_revenue.length > 0 ? (
                                <div className="space-y-4">
                                    {monthly_revenue.map((month, index) => {
                                        const maxRevenue = Math.max(...monthly_revenue.map(m => m.revenue || 0));
                                        const percentage = maxRevenue > 0 ? ((month.revenue || 0) / maxRevenue) * 100 : 0;

                                        return (
                                            <div key={index} className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium">{month.month || 'N/A'}</span>
                                                    <span className="font-bold">{formatCurrency(month.revenue || 0)}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">Belum ada data revenue</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* User Growth */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Pertumbuhan User
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {user_growth && user_growth.length > 0 ? (
                                <div className="space-y-4">
                                    {user_growth.map((month, index) => {
                                        const maxUsers = Math.max(...user_growth.map(m => m.users || 0));
                                        const percentage = maxUsers > 0 ? ((month.users || 0) / maxUsers) * 100 : 0;

                                        return (
                                            <div key={index} className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium">{month.month || 'N/A'}</span>
                                                    <span className="font-bold">{month.users || 0} users</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">Belum ada data user growth</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
