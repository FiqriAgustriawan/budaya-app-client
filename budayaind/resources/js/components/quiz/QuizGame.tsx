import { useState, useEffect, useCallback } from 'react';
import { QuizConfig, QuizAnswer, QuizState } from '@/types/quiz';
import { Clock, Lightbulb, Check, X, Pause, Play } from 'lucide-react';

interface QuizGameProps {
    config: QuizConfig;
    onComplete: (answers: QuizAnswer[], score: number) => void;
    onExit: () => void;
}

export function QuizGame({ config, onComplete, onExit }: QuizGameProps) {
    // Semua hooks harus dipanggil terlebih dahulu
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(config?.timeLimit ? config.timeLimit * 60 : 0);
    const [state, setState] = useState<QuizState>('active');
    const [showHint, setShowHint] = useState(false);
    // State untuk menyimpan jawaban sementara untuk setiap soal
    const [tempAnswers, setTempAnswers] = useState<Map<number, number | null>>(new Map());
    // State untuk countdown timer per soal
    const [questionTimeRemaining, setQuestionTimeRemaining] = useState<number>(30);

    // Callback functions
    const finishQuiz = useCallback(() => {
        setState('completed');
        // Convert tempAnswers to final answers
        const finalAnswers: QuizAnswer[] = [];
        config.questions.forEach((question, index) => {
            const selectedAnswer = tempAnswers.get(index);
            const isCorrect = selectedAnswer === question.correctAnswer;
            const answer: QuizAnswer = {
                questionId: question.id,
                selectedAnswer: selectedAnswer ?? -1,
                isCorrect,
                timeSpent: 0,
                pointsEarned: question.points ? (isCorrect ? question.points : 0) : undefined
            };
            finalAnswers.push(answer);
        });

        const finalScore = finalAnswers.reduce((sum, answer) => sum + (answer.pointsEarned || 0), 0);
        onComplete(finalAnswers, finalScore);
    }, [tempAnswers, config.questions, onComplete]);

    const nextQuestion = useCallback(() => {
        if (config?.questions && currentQuestionIndex < config.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setShowExplanation(false);
            setShowHint(false);
            setQuestionTimeRemaining(30); // Reset timer
        } else {
            finishQuiz();
        }
    }, [currentQuestionIndex, config?.questions, finishQuiz]);

    const handleSubmitAnswer = useCallback((answerIndex: number | null) => {
        if (showExplanation || !config?.questions) return;

        const currentQuestion = config.questions[currentQuestionIndex];
        if (!currentQuestion) return;

        // Simpan jawaban sementara
        setTempAnswers(prev => new Map(prev.set(currentQuestionIndex, answerIndex)));

        setSelectedOption(answerIndex);
        setShowExplanation(true);

        // Langsung lanjut ke soal berikutnya tanpa delay
        setTimeout(() => {
            nextQuestion();
        }, 2000); // Hanya 2 detik untuk melihat penjelasan
    }, [showExplanation, config?.questions, currentQuestionIndex, nextQuestion]);

    // Effects
    useEffect(() => {
        if (state !== 'active') return;

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    setState('completed');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [state]);

    // Question countdown timer effect
    useEffect(() => {
        if (state !== 'active' || showExplanation) return;

        setQuestionTimeRemaining(30); // Reset timer untuk setiap soal baru

        const questionTimer = setInterval(() => {
            setQuestionTimeRemaining((prev) => {
                if (prev <= 1) {
                    // Waktu habis, auto lanjut ke soal berikutnya
                    nextQuestion();
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(questionTimer);
    }, [currentQuestionIndex, state, showExplanation, nextQuestion]);

    // Utility functions
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const togglePause = () => {
        setState(prev => prev === 'active' ? 'paused' : 'active');
    };

    const handleOptionClick = (optionIndex: number) => {
        if (showExplanation || selectedOption !== null) return;
        setQuestionTimeRemaining(0); // Stop countdown saat user pilih jawaban
        handleSubmitAnswer(optionIndex);
    };

    // Safety checks setelah hooks
    if (!config || !config.questions || config.questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error: Quiz tidak ditemukan</h2>
                    <p className="text-gray-600 mb-4">Data quiz tidak tersedia atau rusak.</p>
                    <button
                        onClick={onExit}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = config.questions[currentQuestionIndex];

    if (!currentQuestion) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error: Soal tidak ditemukan</h2>
                    <p className="text-gray-600 mb-4">Soal quiz dengan index {currentQuestionIndex} tidak tersedia.</p>
                    <button
                        onClick={onExit}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        );
    }

    const progress = (currentQuestionIndex / config.questions.length) * 100;

    if (state === 'completed') {
        // Hitung statistik dari tempAnswers - semua soal yang tidak dijawab dianggap salah
        let correctAnswers = 0;
        const totalQuestions = config.questions.length;

        config.questions.forEach((question, index) => {
            const selectedAnswer = tempAnswers.get(index);
            if (selectedAnswer !== undefined && selectedAnswer !== null && selectedAnswer === question.correctAnswer) {
                correctAnswers++;
            }
        });

        const wrongAnswers = totalQuestions - correctAnswers;

        return (
            <div className="min-h-screen flex items-center justify-center p-4"
                 style={{ background: config.theme.backgroundColor }}>
                <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-2xl p-8 text-center">
                    <h2 className="text-3xl font-bold text-green-600 mb-6">Quiz Selesai!</h2>

                    {/* Detailed Statistics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <div className="text-2xl font-bold text-green-600 mb-1">{correctAnswers}</div>
                            <div className="text-sm font-medium text-green-700">Jawaban Benar</div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <div className="text-2xl font-bold text-red-600 mb-1">{wrongAnswers}</div>
                            <div className="text-sm font-medium text-red-700">Jawaban Salah</div>
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                            <span>Total Soal:</span>
                            <span className="font-bold text-gray-700">
                                {totalQuestions}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Terjawab:</span>
                            <span className="font-bold text-gray-700">
                                {tempAnswers.size}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tidak Dijawab:</span>
                            <span className="font-bold text-red-600">
                                {totalQuestions - tempAnswers.size}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Akurasi:</span>
                            <span className="font-bold">
                                {Math.round((correctAnswers / totalQuestions) * 100)}%
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onExit}
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Selesai
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden"
             style={{ background: config.theme.backgroundColor }}>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0"
                     style={{
                         backgroundImage: `radial-gradient(circle at 25% 25%, ${config.theme.primaryColor} 0%, transparent 50%),
                                         radial-gradient(circle at 75% 75%, ${config.theme.secondaryColor} 0%, transparent 50%)`
                     }}
                />
            </div>

            {/* Header */}
            <div className="relative z-10 p-4 bg-white/10 backdrop-blur-md border-b border-white/20">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button
                        onClick={onExit}
                        className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
                    >
                        <X className="w-6 h-6" />
                        <span>Keluar</span>
                    </button>

                    <div className="flex items-center space-x-6">
                        {/* Timer */}
                        <div className="flex items-center space-x-2 text-white">
                            <Clock className="w-5 h-5" />
                            <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
                        </div>

                        {/* Pause/Play */}
                        <button
                            onClick={togglePause}
                            className="text-white hover:text-white/80 transition-colors"
                        >
                            {state === 'paused' ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="max-w-4xl mx-auto mt-4">
                    <div className="flex items-center justify-between text-white/80 text-sm mb-2">
                        <span>Soal {currentQuestionIndex + 1} dari {config.questions.length}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                            className="bg-white rounded-full h-2 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {state === 'paused' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 text-center">
                        <Pause className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-4">Quiz Dijeda</h3>
                        <button
                            onClick={togglePause}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Lanjutkan
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="relative z-10 p-4 pt-8">
                <div className="max-w-4xl mx-auto">
                    {/* Question Card */}
                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 mb-6 shadow-xl">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-4">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        {currentQuestion.category}
                                    </span>
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        {currentQuestion.difficulty}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-relaxed">
                                    {currentQuestion.question}
                                </h2>
                            </div>

                            {/* Question Timer */}
                            {!showExplanation && (
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="relative w-16 h-16">
                                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                                            {/* Background circle */}
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                fill="transparent"
                                                className="text-gray-200"
                                            />
                                            {/* Progress circle */}
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                fill="transparent"
                                                strokeDasharray={`${2 * Math.PI * 40}`}
                                                strokeDashoffset={`${2 * Math.PI * 40 * (1 - questionTimeRemaining / 30)}`}
                                                className={`transition-all duration-1000 ${
                                                    questionTimeRemaining <= 5 ? 'text-red-500' : 'text-blue-500'
                                                }`}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className={`text-lg font-bold ${
                                                questionTimeRemaining <= 5 ? 'text-red-500' : 'text-gray-700'
                                            }`}>
                                                {questionTimeRemaining}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium">Otomatis Lanjut</span>
                                </div>
                            )}

                        </div>

                        {/* Options */}
                        <div className="grid gap-4">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = selectedOption === index;
                                const isCorrect = index === currentQuestion.correctAnswer;

                                let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ";

                                if (showExplanation) {
                                    if (isCorrect) {
                                        buttonClass += "border-green-500 bg-green-50 text-green-800";
                                    } else if (isSelected) {
                                        buttonClass += "border-red-500 bg-red-50 text-red-800";
                                    } else {
                                        buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                                    }
                                } else {
                                    buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-800";
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionClick(index)}
                                        disabled={showExplanation}
                                        className={buttonClass}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">
                                                {String.fromCharCode(65 + index)}
                                            </div>
                                            <span className="flex-1 text-lg">{option}</span>
                                            {showExplanation && isCorrect && (
                                                <Check className="w-6 h-6 text-green-600" />
                                            )}
                                            {showExplanation && isSelected && !isCorrect && (
                                                <X className="w-6 h-6 text-red-600" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Explanation */}
                        {showExplanation && currentQuestion.explanation && (
                            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                                <div className="flex items-start space-x-2">
                                    <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-blue-800 mb-2">Penjelasan:</h4>
                                        <p className="text-blue-700">{currentQuestion.explanation}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Hint Button */}
                        {!showExplanation && currentQuestion.hint && (
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={() => setShowHint(!showHint)}
                                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    <Lightbulb className="w-5 h-5" />
                                    <span>{showHint ? 'Sembunyikan Petunjuk' : 'Tampilkan Petunjuk'}</span>
                                </button>
                            </div>
                        )}

                        {/* Hint */}
                        {showHint && currentQuestion.hint && (
                            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                                <div className="flex items-start space-x-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-yellow-800 mb-2">Petunjuk:</h4>
                                        <p className="text-yellow-700">{currentQuestion.hint}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    {!showExplanation && (
                        <div className="flex justify-center space-x-4">
                            {/* Tombol Selesai Quiz - bisa dipanggil kapan saja */}
                            <button
                                onClick={finishQuiz}
                                className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                                <Check className="w-5 h-5" />
                                <span>Selesai Quiz</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
