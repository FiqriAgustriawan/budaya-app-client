import { useState, useEffect, useCallback } from 'react';
import { QuizConfig, LegacyQuizQuestion, GameQuizQuestion } from '@/types/quiz';

interface UseQuizDataReturn {
    quizConfig: QuizConfig | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
    refreshQuestions: () => void;
}

interface ApiResponse {
    success: boolean;
    questions: LegacyQuizQuestion[];
    total: number;
}

type IslandKey = 'indonesia' | 'jawa' | 'sumatera' | 'kalimantan' | 'sulawesi' | 'papua';

interface IslandConfigData {
    name: string;
    province: string;
    description: string;
    theme: {
        primaryColor: string;
        secondaryColor: string;
        backgroundColor: string;
        gradientFrom: string;
        gradientTo: string;
        icon: string;
    };
}

export function useQuizData(island: string, limit?: number): UseQuizDataReturn {
    const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastFetch, setLastFetch] = useState<number>(0);

    // Dynamic question count - jika tidak ada limit, ambil semua soal yang tersedia
    const questionLimit = limit || 50; // Default maksimal 50 soal jika tidak dibatasi

    const getIslandConfig = (island: string): IslandConfigData => {
        const configs: Record<IslandKey, IslandConfigData> = {
            indonesia: {
                name: 'Quiz Budaya Indonesia',
                province: 'Indonesia',
                description: 'Jelajahi kekayaan budaya Nusantara dari Sabang sampai Merauke',
                theme: {
                    primaryColor: '#3B82F6',
                    secondaryColor: '#FFFFFF',
                    backgroundColor: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 50%, #1E40AF 100%)',
                    gradientFrom: '#3B82F6',
                    gradientTo: '#1E40AF',
                    icon: '🇮🇩',
                },
            },
            jawa: {
                name: 'Quiz Budaya Pulau Jawa',
                province: 'Jawa',
                description: 'Pusat Peradaban Nusantara',
                theme: {
                    primaryColor: '#EA580C',
                    secondaryColor: '#FFFFFF',
                    backgroundColor: 'linear-gradient(135deg, #EA580C 0%, #DC2626 50%, #B91C1C 100%)',
                    gradientFrom: '#EA580C',
                    gradientTo: '#B91C1C',
                    icon: '🏛️',
                },
            },
            sumatera: {
                name: 'Quiz Budaya Pulau Sumatera',
                province: 'Sumatera',
                description: 'Tanah Melayu yang Kaya Budaya',
                theme: {
                    primaryColor: '#16A34A',
                    secondaryColor: '#FFFFFF',
                    backgroundColor: 'linear-gradient(135deg, #16A34A 0%, #15803D 50%, #166534 100%)',
                    gradientFrom: '#16A34A',
                    gradientTo: '#166534',
                    icon: '🌿',
                },
            },
            kalimantan: {
                name: 'Quiz Budaya Pulau Kalimantan',
                province: 'Kalimantan',
                description: 'Hutan Tropis dan Budaya Dayak',
                theme: {
                    primaryColor: '#7C3AED',
                    secondaryColor: '#FFFFFF',
                    backgroundColor: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #5B21B6 100%)',
                    gradientFrom: '#7C3AED',
                    gradientTo: '#5B21B6',
                    icon: '🌳',
                },
            },
            sulawesi: {
                name: 'Quiz Budaya Pulau Sulawesi',
                province: 'Sulawesi',
                description: 'Tanah Toraja dan Kekayaan Adat',
                theme: {
                    primaryColor: '#DB2777',
                    secondaryColor: '#FFFFFF',
                    backgroundColor: 'linear-gradient(135deg, #DB2777 0%, #BE185D 50%, #9D174D 100%)',
                    gradientFrom: '#DB2777',
                    gradientTo: '#9D174D',
                    icon: '🏺',
                },
            },
            papua: {
                name: 'Quiz Budaya Pulau Papua',
                province: 'Papua',
                description: 'Tanah Surga di Ujung Timur',
                theme: {
                    primaryColor: '#F59E0B',
                    secondaryColor: '#FFFFFF',
                    backgroundColor: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
                    gradientFrom: '#F59E0B',
                    gradientTo: '#B45309',
                    icon: '🦜',
                },
            },
        };

        return configs[island as IslandKey] || configs.indonesia;
    };

    const transformLegacyToGameQuestion = (legacyQuestion: LegacyQuizQuestion): GameQuizQuestion => {
        return {
            id: legacyQuestion.id,
            question: legacyQuestion.question,
            options: legacyQuestion.options,
            correctAnswer: legacyQuestion.correctAnswer,
            explanation: legacyQuestion.explanation || '',
        };
    };

    const fetchQuizData = useCallback(async (forceRefresh = false) => {
        const now = Date.now();
        
        // Jika data sudah di-fetch dalam 5 menit terakhir dan bukan force refresh, skip
        if (!forceRefresh && lastFetch && (now - lastFetch) < 300000) {
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Cache busting dengan timestamp
            const timestamp = forceRefresh ? `&_t=${now}` : '';
            const url = `/api/quiz/questions/${island}?limit=${questionLimit}${timestamp}`;
            
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Cache-Control': forceRefresh ? 'no-cache' : 'default',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiResponse = await response.json();

            if (!data.success || !data.questions) {
                throw new Error('Format response tidak valid');
            }

            if (data.questions.length === 0) {
                throw new Error(`Tidak ada soal tersedia untuk pulau ${island}`);
            }

            const islandConfig = getIslandConfig(island);
            const gameQuestions = data.questions.map(transformLegacyToGameQuestion);

            const config: QuizConfig = {
                id: island,
                name: islandConfig.name,
                province: islandConfig.province,
                description: islandConfig.description,
                questions: gameQuestions,
                timeLimit: 60,
                passingScore: 70,
                theme: islandConfig.theme,
                features: {
                    hasHints: false,
                    hasTimer: true,
                    showExplanations: true,
                    allowRetake: true,
                    randomizeQuestions: false,
                    randomizeOptions: false,
                },
            };

            setQuizConfig(config);
            setLastFetch(now);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Gagal memuat data quiz';
            setError(errorMessage);
            console.error('Error fetching quiz data:', err);
        } finally {
            setLoading(false);
        }
    }, [island, questionLimit, lastFetch]);

    // Auto-refresh saat user kembali ke tab/window
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                const now = Date.now();
                // Jika sudah lebih dari 5 menit sejak fetch terakhir, refresh otomatis
                if (lastFetch && (now - lastFetch) > 300000) {
                    fetchQuizData(true);
                }
            }
        };

        const handleFocus = () => {
            const now = Date.now();
            if (lastFetch && (now - lastFetch) > 300000) {
                fetchQuizData(true);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleFocus);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleFocus);
        };
    }, [fetchQuizData, lastFetch]);

    useEffect(() => {
        fetchQuizData();
    }, [fetchQuizData]);

    const refetch = () => {
        fetchQuizData(true);
    };

    const refreshQuestions = () => {
        fetchQuizData(true);
    };

    return { quizConfig, loading, error, refetch, refreshQuestions };
}
