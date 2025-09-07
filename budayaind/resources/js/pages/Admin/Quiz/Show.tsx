import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    ArrowLeft,
    Edit,
    Trash2,
    BookOpen,
    Globe,
    CheckCircle,
    Clock,
    Calendar
} from 'lucide-react';
import type { QuizQuestion } from '@/types/quiz';
import type { BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';

interface Props {
    quizQuestion: QuizQuestion;
}

export default function QuizShow({ quizQuestion }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Kelola Soal Quiz', href: '/admin/quiz' },
        { title: 'Detail Soal', href: `/admin/quiz/${quizQuestion.id}` },
    ];

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
            router.delete(route('admin.quiz.destroy', quizQuestion.id), {
                onSuccess: () => {
                    router.visit('/admin/quiz');
                },
                onError: () => {
                    alert('Gagal menghapus soal quiz!');
                },
            });
        }
    };

    const getOptionLabel = (option: string) => {
        switch (option) {
            case 'A': return 'option_a';
            case 'B': return 'option_b';
            case 'C': return 'option_c';
            case 'D': return 'option_d';
            default: return 'option_a';
        }
    };

    const getCorrectAnswerText = () => {
        const optionKey = getOptionLabel(quizQuestion.correct_answer);
        return quizQuestion[optionKey as keyof QuizQuestion] as string;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Soal Quiz - ${quizQuestion.question.substring(0, 50)}...`} />

            <div className="space-y-8">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-white">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <Link href="/admin/quiz">
                                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Kembali
                                        </Button>
                                    </Link>
                                </div>
                                <h1 className="text-3xl font-bold tracking-tight">Detail Soal Quiz</h1>
                                <p className="text-blue-100 text-lg">
                                    Lihat detail lengkap soal quiz budaya Indonesia
                                </p>
                            </div>
                            <BookOpen className="h-16 w-16 text-white/80" />
                        </div>
                    </div>
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
                    <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/5"></div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Link href={route('admin.quiz.edit', quizQuestion.id)}>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Soal
                        </Button>
                    </Link>

                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        className="hover:bg-red-600"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Hapus Soal
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Question Card */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5" />
                                    Pertanyaan Quiz
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-lg text-gray-900 leading-relaxed">
                                        {quizQuestion.question}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Answer Options Card */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5" />
                                    Pilihan Jawaban
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    {['A', 'B', 'C', 'D'].map((option) => {
                                        const optionKey = getOptionLabel(option);
                                        const optionText = quizQuestion[optionKey as keyof QuizQuestion] as string;
                                        const isCorrect = quizQuestion.correct_answer === option;

                                        return (
                                            <div
                                                key={option}
                                                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                                    isCorrect
                                                        ? 'border-green-500 bg-green-50'
                                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                                        isCorrect
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-gray-200 text-gray-700'
                                                    }`}>
                                                        {option}
                                                    </div>
                                                    <p className={`flex-1 ${
                                                        isCorrect ? 'text-green-900 font-medium' : 'text-gray-900'
                                                    }`}>
                                                        {optionText}
                                                    </p>
                                                    {isCorrect && (
                                                        <Badge className="bg-green-500 hover:bg-green-600">
                                                            <CheckCircle className="h-3 w-3 mr-1" />
                                                            Jawaban Benar
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {/* Quiz Info Card */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-lg">Informasi Soal</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Globe className="h-5 w-5 text-blue-600" />
                                        <div>
                                            <p className="text-sm text-gray-600">Wilayah/Pulau</p>
                                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                                                {quizQuestion.island}
                                            </Badge>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <div>
                                            <p className="text-sm text-gray-600">Jawaban Benar</p>
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                Opsi {quizQuestion.correct_answer}
                                            </Badge>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-600">Tanggal Dibuat</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {new Date(quizQuestion.created_at).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-600">Terakhir Diupdate</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {new Date(quizQuestion.updated_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Correct Answer Highlight */}
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                            <CardHeader>
                                <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5" />
                                    Jawaban Benar
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-green-500 hover:bg-green-600">
                                            Opsi {quizQuestion.correct_answer}
                                        </Badge>
                                    </div>
                                    <p className="text-green-800 font-medium">
                                        {getCorrectAnswerText()}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-lg">Aksi Cepat</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href={route('admin.quiz.edit', quizQuestion.id)} className="block">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Soal Quiz
                                    </Button>
                                </Link>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={handleDelete}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Hapus Soal Quiz
                                </Button>

                                <Separator />

                                <Link href="/admin/quiz" className="block">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Kembali ke Daftar
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
