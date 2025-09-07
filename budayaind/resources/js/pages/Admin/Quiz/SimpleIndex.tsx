import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function QuizIndex() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Kelola Soal Quiz', href: '/admin/quiz' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Soal Quiz" />

            <div className="p-6">
                <h1 className="text-2xl font-bold">Kelola Soal Quiz</h1>
                <p className="text-gray-600 mt-2">Halaman untuk mengelola soal quiz</p>

                <div className="mt-4 p-4 bg-white rounded-lg border">
                    <p>Halaman ini sedang dalam pengembangan</p>
                </div>
            </div>
        </AppLayout>
    );
}
