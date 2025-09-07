import { FormEvent } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ArrowLeft,
    Save,
    BookOpen,
    CheckCircle,
    AlertCircle,
    Clock
} from 'lucide-react';
import type { QuizQuestion } from '@/types/quiz';
import type { BreadcrumbItem } from '@/types';

interface Props {
    quizQuestion: QuizQuestion;
}

interface QuizFormData {
    question: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: 'A' | 'B' | 'C' | 'D' | '';
    island: string;
}

export default function QuizEdit({ quizQuestion }: Props) {
    const { data, setData, put, processing, errors } = useForm<QuizFormData>({
        question: quizQuestion.question,
        option_a: quizQuestion.option_a,
        option_b: quizQuestion.option_b,
        option_c: quizQuestion.option_c,
        option_d: quizQuestion.option_d,
        correct_answer: quizQuestion.correct_answer,
        island: quizQuestion.island,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Kelola Soal Quiz', href: '/admin/quiz' },
        { title: 'Edit Soal', href: `/admin/quiz/${quizQuestion.id}/edit` },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        put(route('admin.quiz.update', quizQuestion.id), {
            onSuccess: () => {
                // Redirect to show page after successful update
                window.location.href = route('admin.quiz.show', quizQuestion.id);
            },
            onError: () => {
                alert('Gagal memperbarui soal quiz!');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Soal Quiz - ${quizQuestion.question.substring(0, 50)}...`} />

            <div className="space-y-8">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-white">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <Link href={route('admin.quiz.show', quizQuestion.id)}>
                                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Kembali
                                        </Button>
                                    </Link>
                                </div>
                                <h1 className="text-3xl font-bold tracking-tight">Edit Soal Quiz</h1>
                                <p className="text-blue-100 text-lg">
                                    Perbarui soal quiz tentang budaya Indonesia
                                </p>
                            </div>
                            <BookOpen className="h-16 w-16 text-white/80" />
                        </div>
                    </div>
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
                    <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/5"></div>
                </div>

                {/* Edit Form */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Form Edit Soal Quiz
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Question Field */}
                            <div className="space-y-2">
                                <Label htmlFor="question" className="text-sm font-medium">Pertanyaan Quiz</Label>
                                <Textarea
                                    id="question"
                                    value={data.question}
                                    onChange={(e) => setData('question', e.target.value)}
                                    placeholder="Masukkan pertanyaan quiz tentang budaya Indonesia..."
                                    rows={4}
                                    className="resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.question && <p className="text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.question}
                                </p>}
                            </div>

                            {/* Options Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="option_a" className="text-sm font-medium">Opsi A</Label>
                                    <Input
                                        id="option_a"
                                        value={data.option_a}
                                        onChange={(e) => setData('option_a', e.target.value)}
                                        placeholder="Jawaban pilihan A"
                                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.option_a && <p className="text-sm text-red-600">{errors.option_a}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="option_b" className="text-sm font-medium">Opsi B</Label>
                                    <Input
                                        id="option_b"
                                        value={data.option_b}
                                        onChange={(e) => setData('option_b', e.target.value)}
                                        placeholder="Jawaban pilihan B"
                                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.option_b && <p className="text-sm text-red-600">{errors.option_b}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="option_c" className="text-sm font-medium">Opsi C</Label>
                                    <Input
                                        id="option_c"
                                        value={data.option_c}
                                        onChange={(e) => setData('option_c', e.target.value)}
                                        placeholder="Jawaban pilihan C"
                                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.option_c && <p className="text-sm text-red-600">{errors.option_c}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="option_d" className="text-sm font-medium">Opsi D</Label>
                                    <Input
                                        id="option_d"
                                        value={data.option_d}
                                        onChange={(e) => setData('option_d', e.target.value)}
                                        placeholder="Jawaban pilihan D"
                                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.option_d && <p className="text-sm text-red-600">{errors.option_d}</p>}
                                </div>
                            </div>

                            {/* Bottom Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="correct_answer" className="text-sm font-medium">Jawaban Benar</Label>
                                    <Select value={data.correct_answer} onValueChange={(value: 'A' | 'B' | 'C' | 'D') => setData('correct_answer', value)}>
                                        <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-green-500">
                                            <SelectValue placeholder="Pilih jawaban yang benar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="A" className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                Opsi A
                                            </SelectItem>
                                            <SelectItem value="B" className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                Opsi B
                                            </SelectItem>
                                            <SelectItem value="C" className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                Opsi C
                                            </SelectItem>
                                            <SelectItem value="D" className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                Opsi D
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.correct_answer && <p className="text-sm text-red-600">{errors.correct_answer}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="island" className="text-sm font-medium">Pulau/Wilayah</Label>
                                    <Input
                                        id="island"
                                        value={data.island}
                                        onChange={(e) => setData('island', e.target.value)}
                                        placeholder="Contoh: Jawa, Sumatera, Bali"
                                        className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                                    />
                                    {errors.island && <p className="text-sm text-red-600">{errors.island}</p>}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                >
                                    {processing ? (
                                        <>
                                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                                            Menyimpan Perubahan...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Simpan Perubahan
                                        </>
                                    )}
                                </Button>

                                <Link href={route('admin.quiz.show', quizQuestion.id)}>
                                    <Button type="button" variant="outline" className="px-8">
                                        Batal
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Preview Section */}
                <Card className="border-0 shadow-lg bg-gray-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Preview Soal
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-white rounded-lg border">
                            <h3 className="font-medium text-gray-900 mb-3">
                                {data.question || 'Pertanyaan akan muncul di sini...'}
                            </h3>
                            <div className="space-y-2">
                                {['A', 'B', 'C', 'D'].map((option) => {
                                    const optionKey = `option_${option.toLowerCase()}` as keyof QuizFormData;
                                    const optionText = data[optionKey] as string;
                                    const isCorrect = data.correct_answer === option;

                                    return (
                                        <div
                                            key={option}
                                            className={`p-3 rounded border transition-all ${
                                                isCorrect
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-200 bg-white'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                                                    isCorrect
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-gray-200 text-gray-700'
                                                }`}>
                                                    {option}
                                                </div>
                                                <span className={isCorrect ? 'text-green-900 font-medium' : 'text-gray-700'}>
                                                    {optionText || `Opsi ${option} akan muncul di sini...`}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {data.island && (
                                <div className="mt-3 pt-3 border-t">
                                    <span className="text-sm text-gray-600">Wilayah: </span>
                                    <span className="text-sm font-medium text-blue-600">{data.island}</span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
