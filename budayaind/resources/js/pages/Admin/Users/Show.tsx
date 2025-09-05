import { Head, router, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft,
  Users,
  Mail,
  Phone,
  Calendar,
  Shield,
  DollarSign,
  ShoppingBag,
  UserCheck,
  UserX,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Wallet
} from 'lucide-react';

interface UserType {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'seller' | 'customer';
  is_active: boolean;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  profile_image?: string;
  address?: string;
  balance?: number;
  last_login_at?: string;
}

interface ActivityType {
  type: 'order' | 'sale' | 'withdrawal';
  title: string;
  description: string;
  amount: number;
  status: string;
  created_at: string;
}

interface Props {
  user: UserType;
  stats: {
    total_orders?: number;
    completed_orders?: number;
    total_spent?: number;
    total_tickets?: number;
    active_tickets?: number;
    total_earnings?: number;
    total_withdrawals?: number;
    pending_withdrawals?: number;
    current_balance?: number;
  };
  recent_activities: ActivityType[];
}

export default function UserShow({ user, stats, recent_activities }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
    },
    {
      title: 'Users',
      href: '/admin/users',
    },
    {
      title: user.name,
      href: `/admin/users/${user.id}`,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const toggleUserStatus = () => {
    router.put(`/admin/users/${user.id}/status`, {
      is_active: !user.is_active
    }, {
      preserveScroll: true,
    });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">Admin</Badge>;
      case 'seller':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Seller</Badge>;
      case 'customer':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Customer</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled':
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`User: ${user.name}`} />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/users">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Detail User</h1>
              <p className="text-muted-foreground">
                Informasi lengkap tentang {user.name}
              </p>
            </div>
          </div>

          <Button
            onClick={toggleUserStatus}
            variant={user.is_active ? "destructive" : "default"}
            className="flex items-center gap-2"
          >
            {user.is_active ? (
              <>
                <UserX className="w-4 h-4" />
                Nonaktifkan User
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                Aktifkan User
              </>
            )}
          </Button>
        </div>

        {/* Status Alert */}
        {!user.is_active && (
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              User ini sedang dalam status nonaktif dan tidak dapat mengakses platform.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {/* User Profile */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Profil User
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.profile_image} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="text-xl font-bold">{user.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  {getRoleBadge(user.role)}
                  <Badge className={user.is_active ? 
                    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : 
                    "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                  }>
                    {user.is_active ? 'Aktif' : 'Nonaktif'}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user.email}</span>
                  {user.email_verified_at ? (
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                      Unverified
                    </Badge>
                  )}
                </div>

                {user.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Bergabung {new Date(user.created_at).toLocaleDateString('id-ID')}</span>
                </div>

                {user.last_login_at && (
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span>Login terakhir {new Date(user.last_login_at).toLocaleDateString('id-ID')}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {user.role === 'customer' && (
                <>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Pesanan</p>
                          <p className="text-2xl font-bold">{stats.total_orders || 0}</p>
                          <p className="text-xs text-muted-foreground">
                            {stats.completed_orders || 0} selesai
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Belanja</p>
                          <p className="text-xl font-bold">{formatCurrency(stats.total_spent || 0)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {user.role === 'seller' && (
                <>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Tiket</p>
                          <p className="text-2xl font-bold">{stats.total_tickets || 0}</p>
                          <p className="text-xs text-muted-foreground">
                            {stats.active_tickets || 0} aktif
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Pendapatan</p>
                          <p className="text-xl font-bold">{formatCurrency(stats.total_earnings || 0)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Saldo Saat Ini</p>
                          <p className="text-xl font-bold">{formatCurrency(stats.current_balance || 0)}</p>
                          {stats.pending_withdrawals && stats.pending_withdrawals > 0 && (
                            <p className="text-xs text-yellow-600">
                              {formatCurrency(stats.pending_withdrawals)} pending
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Aktivitas Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recent_activities.length > 0 ? (
                  <div className="space-y-4">
                    {recent_activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                        <div className="mt-0.5">
                          {getStatusIcon(activity.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(activity.created_at).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {formatCurrency(activity.amount)}
                          </p>
                          <Badge className={getStatusColor(activity.status)}>
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Belum ada aktivitas</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}