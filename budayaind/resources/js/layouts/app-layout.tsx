import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { getNavigationByRole } from '@/utils/navigation';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface AppLayoutProps extends PropsWithChildren {
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs = [] }: AppLayoutProps) {
    const { auth } = usePage<SharedData>().props;

    // Get navigation items based on user role
    const mainNavItems = getNavigationByRole(auth.user.role as string);

    return (
        <SidebarProvider>
            <AppSidebar mainNavItems={mainNavItems} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center justify-between w-full px-4">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            {breadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={breadcrumbs} />}
                        </div>
                        <AnimatedThemeToggler />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
