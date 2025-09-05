import { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Eye, 
  UserCheck, 
  UserX,
  Users,
  Mail,
  Calendar,
  Shield,
  ShoppingBag,
  DollarSign,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    title: 'Users',
    href: '/admin/users',
  },
];

interface UserType {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'seller' | 'customer';
  is_active: boolean;
  email_verified_at: string | null;
  created_at: string;
  profile_image?: string;
  phone?: string;
  total_orders?: number;
  total_spent?: number;
  total_tickets?: number;
  total_earnings?: number;
  last_login_at?: string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  users: {
    data: UserType[];
    links: PaginationLink[];
    total: number;
    current_page: number;
    last_page: number;
  };
  filters: {
    role?: string;
    status?: string;
    search?: string;
  };
  stats: {
    total_users: number;
    active_users: number;
    sellers: number;
    customers: number;
  };
}

export default function UsersIndex({ users, filters, stats }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [role, setRole] = useState(filters.role || 'all');
  const [status, setStatus] = useState(filters.status || 'all');

  const handleSearch = () => {
    const params: Record<string, string> = {};
    
    if (search.trim()) params.search = search.trim();
    if (role !== 'all') params.role = role;
    if (status !== 'all') params.status = status;

    router.get('/admin/users', params, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const resetFilters = () => {
    setSearch('');
    setRole('all');
    setStatus('all');
    router.get('/admin/users');
  };

  const toggleUserStatus = (userId: number, currentStatus: boolean) => {
    router.put(`/admin/users/${userId}/status`, {
      is_active: !currentStatus
    }, {
      preserveScroll: true,
      onSuccess: () => {
        // Success message will be handled by the backend
      }
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
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

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Aktif</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Nonaktif</Badge>
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Users" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Kelola Users</h1>
            <p className="text-muted-foreground">
              Kelola semua pengguna di platform BudayaInd
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{stats.total_users}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Aktif</p>
                  <p className="text-2xl font-bold">{stats.active_users}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sellers</p>
                  <p className="text-2xl font-bold">{stats.sellers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customers</p>
                  <p className="text-2xl font-bold">{stats.customers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter & Pencarian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Cari nama, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>

              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Role</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                </SelectContent>
              </Select>

              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Nonaktif</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                Cari
              </Button>

              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Users ({users.total})</CardTitle>
          </CardHeader>
          <CardContent>
            {users.data.length > 0 ? (
              <div className="space-y-4">
                {users.data.map((user) => (
                  <div key={user.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.profile_image} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.is_active)}
                        {!user.email_verified_at && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                            Belum Verifikasi
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Bergabung {new Date(user.created_at).toLocaleDateString('id-ID')}</span>
                        </div>

                        {user.last_login_at && (
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            <span>Login terakhir {new Date(user.last_login_at).toLocaleDateString('id-ID')}</span>
                          </div>
                        )}
                      </div>

                      {/* Role-specific stats */}
                      {user.role === 'seller' && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Tiket:</span>
                            <span className="font-medium ml-1">{user.total_tickets || 0}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Pendapatan:</span>
                            <span className="font-medium ml-1 text-green-600">
                              {formatCurrency(user.total_earnings || 0)}
                            </span>
                          </div>
                        </div>
                      )}

                      {user.role === 'customer' && (
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Pesanan:</span>
                            <span className="font-medium ml-1">{user.total_orders || 0}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total Belanja:</span>
                            <span className="font-medium ml-1 text-blue-600">
                              {formatCurrency(user.total_spent || 0)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/users/${user.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          Detail
                        </Link>
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${user.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Lihat Detail
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => toggleUserStatus(user.id, user.is_active)}
                            className={user.is_active ? 'text-red-600' : 'text-green-600'}
                          >
                            {user.is_active ? (
                              <>
                                <UserX className="w-4 h-4 mr-2" />
                                Nonaktifkan
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Aktifkan
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tidak ada users</h3>
                <p className="text-muted-foreground">
                  Belum ada users yang sesuai dengan filter
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {users.links.length > 0 && (
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {users.links.map((link, index) => (
                <Button
                  key={index}
                  variant={link.active ? "default" : "outline"}
                  size="sm"
                  disabled={!link.url}
                  onClick={() => link.url && router.visit(link.url)}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}