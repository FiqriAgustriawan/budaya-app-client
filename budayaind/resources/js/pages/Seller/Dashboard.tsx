import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Seller Dashboard',
    href: '/seller/dashboard',
  },
];

export default function SellerDashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Seller Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Welcome to Seller Dashboard
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage your cultural destinations and promote Indonesian heritage.
          </p>
        </div>

        {/* Quick Stats Placeholder */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                Destinations
              </span>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                Tickets Sold
              </span>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                Revenue
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative min-h-[50vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-neutral-600 dark:text-neutral-400 font-medium">
              Seller Dashboard Content Area
            </span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}