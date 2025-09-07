import { useState, FormEvent, useEffect, useCallback } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
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
import { useAppearance } from '@/hooks/use-appearance';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Filter,
    BookOpen,
    Globe,
    TrendingUp,
    Users,
    Clock,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import type { QuizQuestion } from '@/types/quiz';
import type { PaginatedData, BreadcrumbItem } from '@/types';

interface Props {
    quizQuestions: PaginatedData<QuizQuestion>;
    islands: string[];
    questionsByIsland: Record<string, number>;
    selectedIsland: string;
    filters: {
        search?: string;
        island?: string;
    };
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

interface QuizFormProps {
    data: QuizFormData;
    setData: (key: keyof QuizFormData, value: string) => void;
    errors: Partial<Record<keyof QuizFormData, string>>;
    processing: boolean;
    onSubmit: (e: FormEvent) => void;
    onCancel: () => void;
    isEditing?: boolean;
    isDarkMode: boolean;
}

const QuizForm = ({
    data,
    setData,
    errors,
    processing,
    onSubmit,
    onCancel,
    isEditing = false,
    isDarkMode
}: QuizFormProps) => (
    <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="question" className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Pertanyaan Quiz</Label>
            <Textarea
                id="question"
                value={data.question}
                onChange={(e) => setData('question', e.target.value)}
                placeholder="Masukkan pertanyaan quiz tentang budaya Indonesia..."
                rows={4}
                className={`resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
            />
            {errors.question && <p className={`text-sm flex items-center gap-1 ${
                isDarkMode ? 'text-red-400' : 'text-red-600'
            }`}>
                <AlertCircle className="h-4 w-4" />
                {errors.question}
            </p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="option_a" className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>Opsi A</Label>
                <Input
                    id="option_a"
                    value={data.option_a}
                    onChange={(e) => setData('option_a', e.target.value)}
                    placeholder="Jawaban pilihan A"
                    className={`transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
                {errors.option_a && <p className={`text-sm ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>{errors.option_a}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="option_b" className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>Opsi B</Label>
                <Input
                    id="option_b"
                    value={data.option_b}
                    onChange={(e) => setData('option_b', e.target.value)}
                    placeholder="Jawaban pilihan B"
                    className={`transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
                {errors.option_b && <p className={`text-sm ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>{errors.option_b}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="option_c" className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>Opsi C</Label>
                <Input
                    id="option_c"
                    value={data.option_c}
                    onChange={(e) => setData('option_c', e.target.value)}
                    placeholder="Jawaban pilihan C"
                    className={`transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
                {errors.option_c && <p className={`text-sm ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>{errors.option_c}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="option_d" className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>Opsi D</Label>
                <Input
                    id="option_d"
                    value={data.option_d}
                    onChange={(e) => setData('option_d', e.target.value)}
                    placeholder="Jawaban pilihan D"
                    className={`transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
                {errors.option_d && <p className={`text-sm ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>{errors.option_d}</p>}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="correct_answer" className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>Jawaban Benar</Label>
                <Select value={data.correct_answer} onValueChange={(value: 'A' | 'B' | 'C' | 'D') => setData('correct_answer', value)}>
                    <SelectTrigger className={`transition-all duration-200 focus:ring-2 focus:ring-green-500 ${
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-100'
                            : 'bg-white border-gray-300 text-gray-900'
                    }`}>
                        <SelectValue placeholder="Pilih jawaban yang benar" />
                    </SelectTrigger>
                    <SelectContent className={
                        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }>
                        <SelectItem value="A" className={`flex items-center gap-2 ${
                            isDarkMode ? 'text-gray-100 hover:bg-gray-600' : 'text-gray-900 hover:bg-gray-100'
                        }`}>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Opsi A
                        </SelectItem>
                        <SelectItem value="B" className={`flex items-center gap-2 ${
                            isDarkMode ? 'text-gray-100 hover:bg-gray-600' : 'text-gray-900 hover:bg-gray-100'
                        }`}>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Opsi B
                        </SelectItem>
                        <SelectItem value="C" className={`flex items-center gap-2 ${
                            isDarkMode ? 'text-gray-100 hover:bg-gray-600' : 'text-gray-900 hover:bg-gray-100'
                        }`}>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Opsi C
                        </SelectItem>
                        <SelectItem value="D" className={`flex items-center gap-2 ${
                            isDarkMode ? 'text-gray-100 hover:bg-gray-600' : 'text-gray-900 hover:bg-gray-100'
                        }`}>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Opsi D
                        </SelectItem>
                    </SelectContent>
                </Select>
                {errors.correct_answer && <p className={`text-sm ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>{errors.correct_answer}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="island" className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>Pulau/Wilayah</Label>
                <Input
                    id="island"
                    value={data.island}
                    onChange={(e) => setData('island', e.target.value)}
                    placeholder="Contoh: Jawa, Sumatera, Bali"
                    className={`transition-all duration-200 focus:ring-2 focus:ring-orange-500 ${
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
                {errors.island && <p className={`text-sm ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>{errors.island}</p>}
            </div>
        </div>

        <DialogFooter className="gap-2">
            <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className={
                    isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }
            >
                Batal
            </Button>
            <Button
                type="submit"
                disabled={processing}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
                {processing ? (
                    <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Menyimpan...
                    </>
                ) : (
                    <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {isEditing ? 'Perbarui' : 'Tambah'} Soal
                    </>
                )}
            </Button>
        </DialogFooter>
    </form>
);

export default function QuizIndex({ quizQuestions, islands, questionsByIsland, selectedIsland, filters }: Props) {
    const { appearance } = useAppearance();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingQuiz, setEditingQuiz] = useState<QuizQuestion | null>(null);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [activeTab, setActiveTab] = useState(selectedIsland || 'all');

    // Update dark mode state based on appearance
    useEffect(() => {
        const isDark = appearance === 'dark' ||
            (appearance === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDarkMode(isDark);
    }, [appearance]);

    const { data, setData, post, put, processing, errors, reset } = useForm<QuizFormData>({
        question: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: '',
        island: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Kelola Soal Quiz', href: '/admin/quiz' },
    ];

    // Calculate stats
    const totalQuestions = quizQuestions.total;
    const islandsCount = islands.length;
    const questionsPerIsland = Math.floor(totalQuestions / islandsCount);

    const handleSearch = () => {
        router.get(route('admin.quiz.index'), {
            search: searchTerm,
            island: activeTab === 'all' ? '' : activeTab,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setActiveTab('all');
        router.get(route('admin.quiz.index'), {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handleTabChange = (island: string) => {
        setActiveTab(island);
        router.get(route('admin.quiz.index'), {
            search: searchTerm,
            island: island === 'all' ? '' : island,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleCreate = (e: FormEvent) => {
        e.preventDefault();

        post(route('admin.quiz.store'), {
            onSuccess: () => {
                alert('Soal quiz berhasil ditambahkan!');
                setIsCreateModalOpen(false);
                reset();
            },
            onError: () => {
                alert('Gagal menambahkan soal quiz!');
            },
        });
    };

    const openCreateModal = () => {
        reset();
        // Set default island to current active tab (if not 'all')
        if (activeTab !== 'all') {
            setData('island', activeTab);
        }
        setIsCreateModalOpen(true);
    };

    const handleEdit = (quiz: QuizQuestion) => {
        setEditingQuiz(quiz);
        setData({
            question: quiz.question,
            option_a: quiz.option_a,
            option_b: quiz.option_b,
            option_c: quiz.option_c,
            option_d: quiz.option_d,
            correct_answer: quiz.correct_answer,
            island: quiz.island,
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();

        if (!editingQuiz) return;

        put(route('admin.quiz.update', editingQuiz.id), {
            onSuccess: () => {
                alert('Soal quiz berhasil diperbarui!');
                setIsEditModalOpen(false);
                setEditingQuiz(null);
                reset();
            },
            onError: () => {
                alert('Gagal memperbarui soal quiz!');
            },
        });
    };

    const handleDelete = (quiz: QuizQuestion) => {
        if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
            router.delete(route('admin.quiz.destroy', quiz.id), {
                onSuccess: () => {
                    alert('Soal quiz berhasil dihapus!');
                },
                onError: () => {
                    alert('Gagal menghapus soal quiz!');
                },
            });
        }
    };

    const handleCancel = useCallback(() => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        reset();
    }, [reset]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Soal Quiz" />

            <div className="space-y-8">
                {/* Header Section */}
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${
                    isDarkMode
                        ? 'from-gray-800 via-gray-900 to-black'
                        : 'from-blue-600 via-purple-600 to-indigo-700'
                } p-8 ${isDarkMode ? 'text-gray-100' : 'text-white'}`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <h1 className={`text-3xl font-bold tracking-tight ${
                                    isDarkMode ? 'text-gray-100' : 'text-white'
                                }`}>Kelola Soal Quiz Budaya</h1>
                                <p className={`text-lg ${
                                    isDarkMode ? 'text-gray-300' : 'text-blue-100'
                                }`}>
                                    Kelola dan atur soal-soal quiz tentang kekayaan budaya Indonesia
                                </p>
                            </div>
                            <BookOpen className={`h-16 w-16 ${
                                isDarkMode ? 'text-gray-400' : 'text-white/80'
                            }`} />
                        </div>
                    </div>
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
                    <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/5"></div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                        isDarkMode
                            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
                            : 'bg-gradient-to-br from-blue-50 to-blue-100'
                    }`}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-sm font-medium ${
                                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`}>Total Soal</p>
                                    <p className={`text-2xl font-bold ${
                                        isDarkMode ? 'text-gray-100' : 'text-blue-900'
                                    }`}>{totalQuestions}</p>
                                </div>
                                <BookOpen className={`h-8 w-8 ${
                                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                        isDarkMode
                            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
                            : 'bg-gradient-to-br from-green-50 to-green-100'
                    }`}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-sm font-medium ${
                                        isDarkMode ? 'text-green-400' : 'text-green-600'
                                    }`}>Wilayah</p>
                                    <p className={`text-2xl font-bold ${
                                        isDarkMode ? 'text-gray-100' : 'text-green-900'
                                    }`}>{islandsCount}</p>
                                </div>
                                <Globe className={`h-8 w-8 ${
                                    isDarkMode ? 'text-green-400' : 'text-green-600'
                                }`} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                        isDarkMode
                            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
                            : 'bg-gradient-to-br from-orange-50 to-orange-100'
                    }`}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-sm font-medium ${
                                        isDarkMode ? 'text-orange-400' : 'text-orange-600'
                                    }`}>Rata-rata per Wilayah</p>
                                    <p className={`text-2xl font-bold ${
                                        isDarkMode ? 'text-gray-100' : 'text-orange-900'
                                    }`}>{questionsPerIsland}</p>
                                </div>
                                <TrendingUp className={`h-8 w-8 ${
                                    isDarkMode ? 'text-orange-400' : 'text-orange-600'
                                }`} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                        isDarkMode
                            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
                            : 'bg-gradient-to-br from-purple-50 to-purple-100'
                    }`}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-sm font-medium ${
                                        isDarkMode ? 'text-purple-400' : 'text-purple-600'
                                    }`}>Halaman Saat Ini</p>
                                    <p className={`text-2xl font-bold ${
                                        isDarkMode ? 'text-gray-100' : 'text-purple-900'
                                    }`}>{quizQuestions.current_page}</p>
                                </div>
                                <Users className={`h-8 w-8 ${
                                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                                }`} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Island Tabs */}
                <Card className={`border-0 shadow-lg ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}>
                    <CardContent className="p-6">
                        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                            <TabsList className={`grid w-full ${
                                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                            }`} style={{ gridTemplateColumns: `repeat(${islands.length + 1}, 1fr)` }}>
                                <TabsTrigger
                                    value="all"
                                    className={`flex items-center gap-2 ${
                                        isDarkMode
                                            ? 'data-[state=active]:bg-gray-600 data-[state=active]:text-gray-100 text-gray-300'
                                            : 'data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-600'
                                    }`}
                                >
                                    <Globe className="h-4 w-4" />
                                    Semua Pulau
                                    <Badge variant="secondary" className={`ml-1 ${
                                        isDarkMode
                                            ? 'bg-gray-600 text-gray-200'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}>
                                        {Object.values(questionsByIsland).reduce((sum, count) => sum + count, 0)}
                                    </Badge>
                                </TabsTrigger>
                                {islands.map((island) => (
                                    <TabsTrigger
                                        key={island}
                                        value={island}
                                        className={`flex items-center gap-2 ${
                                            isDarkMode
                                                ? 'data-[state=active]:bg-gray-600 data-[state=active]:text-gray-100 text-gray-300'
                                                : 'data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-600'
                                        }`}
                                    >
                                        <Globe className="h-4 w-4" />
                                        {island}
                                        <Badge variant="secondary" className={`ml-1 ${
                                            isDarkMode
                                                ? 'bg-gray-600 text-gray-200'
                                                : 'bg-gray-200 text-gray-700'
                                        }`}>
                                            {questionsByIsland[island] || 0}
                                        </Badge>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Action Bar */}
                <Card className={`border-0 shadow-lg ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}>
                    <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                            <div className="flex-1 w-full lg:w-auto">
                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-400'
                                        }`} />
                                        <Input
                                            placeholder="Cari soal quiz..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className={`pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
                                                isDarkMode
                                                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    onClick={handleSearch}
                                    variant="outline"
                                    className={`transition-all duration-200 ${
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-50'
                                    }`}
                                >
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>

                                <Button
                                    onClick={clearFilters}
                                    variant="ghost"
                                    className={`transition-all duration-200 ${
                                        isDarkMode
                                            ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    Reset
                                </Button>

                                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            onClick={openCreateModal}
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-white"
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Tambah Soal
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${
                                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                                    }`}>
                                        <DialogHeader>
                                            <DialogTitle className={`text-xl font-bold ${
                                                isDarkMode ? 'text-gray-100' : 'text-gray-900'
                                            }`}>
                                                Tambah Soal Quiz Baru
                                            </DialogTitle>
                                            <DialogDescription className={
                                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }>
                                                Buat soal quiz baru tentang budaya Indonesia untuk memperkaya pengetahuan pengguna.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <QuizForm
                                            data={data}
                                            setData={setData}
                                            errors={errors}
                                            processing={processing}
                                            onSubmit={handleCreate}
                                            onCancel={handleCancel}
                                            isDarkMode={isDarkMode}
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quiz Questions Table */}
                <Card className={`border-0 shadow-lg ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}>
                    <CardHeader>
                        <CardTitle className={`flex items-center gap-2 ${
                            isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                            <BookOpen className="h-5 w-5" />
                            Daftar Soal Quiz
                            {activeTab !== 'all' && (
                                <Badge variant="outline" className={`ml-2 ${
                                    isDarkMode
                                        ? 'border-gray-600 text-gray-300'
                                        : 'border-gray-300 text-gray-700'
                                }`}>
                                    <Globe className="mr-1 h-3 w-3" />
                                    {activeTab}
                                </Badge>
                            )}
                        </CardTitle>
                        <CardDescription className={
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }>
                            {activeTab === 'all'
                                ? 'Kelola dan edit soal-soal quiz tentang budaya Indonesia dari semua pulau'
                                : `Kelola dan edit soal-soal quiz tentang budaya ${activeTab}`
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className={
                                        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50'
                                    }>
                                        <TableHead className={`font-semibold ${
                                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                        }`}>Pertanyaan</TableHead>
                                        <TableHead className={`font-semibold ${
                                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                        }`}>Jawaban Benar</TableHead>
                                        <TableHead className={`font-semibold ${
                                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                        }`}>Tanggal Dibuat</TableHead>
                                        <TableHead className={`text-right font-semibold ${
                                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                        }`}>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {quizQuestions.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-12">
                                                <div className={`flex flex-col items-center gap-2 ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                    <BookOpen className={`h-12 w-12 ${
                                                        isDarkMode ? 'text-gray-600' : 'text-gray-300'
                                                    }`} />
                                                    <p className="text-lg font-medium">
                                                        {activeTab === 'all'
                                                            ? 'Tidak ada soal quiz ditemukan'
                                                            : `Tidak ada soal quiz untuk ${activeTab}`
                                                        }
                                                    </p>
                                                    <p className="text-sm">Mulai tambahkan soal quiz untuk melengkapi konten</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        quizQuestions.data.map((quiz, index) => (
                                            <TableRow
                                                key={quiz.id}
                                                className={`transition-colors duration-200 border-b ${
                                                    isDarkMode
                                                        ? 'border-gray-700 hover:bg-gray-700'
                                                        : 'border-gray-200 hover:bg-gray-50'
                                                }`}
                                            >
                                                <TableCell className="max-w-md">
                                                    <div className="space-y-1">
                                                        <Link
                                                            href={route('admin.quiz.show', quiz.id)}
                                                            className={`font-medium transition-colors duration-200 block truncate ${
                                                                isDarkMode
                                                                    ? 'text-gray-100 hover:text-blue-400'
                                                                    : 'text-gray-900 hover:text-blue-600'
                                                            }`}
                                                            title={quiz.question}
                                                        >
                                                            {quiz.question}
                                                        </Link>
                                                        <div className={`text-xs ${
                                                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                        }`}>
                                                            Soal #{((quizQuestions.current_page - 1) * quizQuestions.per_page) + index + 1}
                                                            {activeTab === 'all' && (
                                                                <Badge variant="outline" className={`ml-2 ${
                                                                    isDarkMode
                                                                        ? 'border-gray-600 text-gray-300'
                                                                        : 'border-gray-300 text-gray-700'
                                                                }`}>
                                                                    {quiz.island}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            isDarkMode
                                                                ? 'bg-green-900/20 text-green-400 border-green-700'
                                                                : 'bg-green-50 text-green-700 border-green-200'
                                                        }
                                                    >
                                                        <CheckCircle className="mr-1 h-3 w-3" />
                                                        Opsi {quiz.correct_answer}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className={
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                }>
                                                    {new Date(quiz.created_at).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleEdit(quiz)}
                                                            className={`transition-all duration-200 ${
                                                                isDarkMode
                                                                    ? 'hover:bg-blue-900/20 hover:text-blue-400'
                                                                    : 'hover:bg-blue-50 hover:text-blue-600'
                                                            }`}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>

                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete(quiz)}
                                                            className={`transition-all duration-200 ${
                                                                isDarkMode
                                                                    ? 'hover:bg-red-900/20 hover:text-red-400'
                                                                    : 'hover:bg-red-50 hover:text-red-600'
                                                            }`}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {quizQuestions.last_page > 1 && (
                            <div className={`border-t px-6 py-4 ${
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600'
                                    : 'bg-gray-50 border-gray-200'
                            }`}>
                                <div className="flex items-center justify-between">
                                    <div className={`text-sm ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                        Menampilkan <span className="font-medium">{quizQuestions.from}</span> - <span className="font-medium">{quizQuestions.to}</span> dari <span className="font-medium">{quizQuestions.total}</span> soal
                                    </div>
                                    <div className="flex gap-1">
                                        {quizQuestions.links.map((link, index) => (
                                            <Button
                                                key={index}
                                                variant={link.active ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => {
                                                    if (link.url) {
                                                        router.get(link.url);
                                                    }
                                                }}
                                                disabled={!link.url}
                                                className={`transition-all duration-200 ${
                                                    link.active
                                                        ? (isDarkMode
                                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                            : 'bg-blue-600 hover:bg-blue-700 text-white')
                                                        : (isDarkMode
                                                            ? 'bg-gray-600 border-gray-500 text-gray-200 hover:bg-gray-500'
                                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-600')
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                }`}>
                    <DialogHeader>
                        <DialogTitle className={`text-xl font-bold ${
                            isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                            Edit Soal Quiz
                        </DialogTitle>
                        <DialogDescription className={
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }>
                            Perbarui informasi soal quiz untuk meningkatkan kualitas konten.
                        </DialogDescription>
                    </DialogHeader>
                    <QuizForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={handleUpdate}
                        onCancel={handleCancel}
                        isEditing={true}
                        isDarkMode={isDarkMode}
                    />
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
