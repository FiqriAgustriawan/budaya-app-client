import { useState, useEffect, useCallback } from 'react';
import { QuizConfig, QuizAnswer, QuizState } from '@/types/quiz';
import { Clock, Heart, Lightbulb, Check, X, SkipForward, Pause, Play } from 'lucide-react';

interface QuizGameProps {
    config: QuizConfig;
    onComplete: (answers: QuizAnswer[], score: number) => void;
    onExit: () => void;
}

export function QuizGame({ config, onComplete, onExit }: QuizGameProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(config.timeLimit * 60); // Convert to seconds
    const [questionTimeRemaining, setQuestionTimeRemaining] = useState<number | null>(null);
    const [state, setState] = useState<QuizState>('active');
    const [showHint, setShowHint] = useState(false);
    const [lives, setLives] = useState(3);
    const [streak, setStreak] = useState(0);
    const [totalScore, setTotalScore] = useState(0);

    const currentQuestion = config.questions[currentQuestionIndex];
    const progress = (currentQuestionIndex / config.questions.length) * 100;

    // Timer untuk keseluruhan quiz
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

    // Timer untuk pertanyaan individual
    useEffect(() => {
        if (!currentQuestion?.timeLimit || state !== 'active') return;

        setQuestionTimeRemaining(currentQuestion.timeLimit);

        const timer = setInterval(() => {
            setQuestionTimeRemaining((prev) => {
                if (prev === null || prev <= 1) {
                    // Auto submit when time runs out
                    handleSubmitAnswer(null);
                    return null;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestionIndex, state, currentQuestion?.timeLimit, handleSubmitAnswer]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSubmitAnswer = useCallback((answerIndex: number | null) => {
        if (showExplanation) return;

        const isCorrect = answerIndex === currentQuestion.correctAnswer;
        const timeSpent = currentQuestion.timeLimit
            ? currentQuestion.timeLimit - (questionTimeRemaining || 0)
            : 0;

        let pointsEarned = 0;
        if (isCorrect) {
            pointsEarned = currentQuestion.points;
            // Bonus points for speed
            if (questionTimeRemaining && questionTimeRemaining > currentQuestion.timeLimit! * 0.7) {
                pointsEarned += Math.floor(currentQuestion.points * 0.2);
            }
            setStreak(prev => prev + 1);
        } else {
            setLives(prev => prev - 1);
            setStreak(0);
        }

        const answer: QuizAnswer = {
            questionId: currentQuestion.id,
            selectedAnswer: answerIndex ?? -1,
            isCorrect,
            timeSpent,
            pointsEarned
        };

        setAnswers(prev => [...prev, answer]);
        setTotalScore(prev => prev + pointsEarned);
        setSelectedOption(answerIndex);
        setShowExplanation(true);

        // Auto proceed after showing explanation
        setTimeout(() => {
            if (currentQuestionIndex < config.questions.length - 1) {
                nextQuestion();
            } else {
                finishQuiz();
            }
        }, 3000);
    }, [currentQuestion, questionTimeRemaining, currentQuestionIndex, config.questions.length, showExplanation]);

    const finishQuiz = useCallback(() => {
        setState('completed');
        const finalScore = answers.reduce((sum, answer) => sum + answer.pointsEarned, 0);
        onComplete(answers, finalScore);
    }, [answers, onComplete]);

    const nextQuestion = useCallback(() => {
        if (currentQuestionIndex < config.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setShowExplanation(false);
            setShowHint(false);
        } else {
            finishQuiz();
        }
    }, [currentQuestionIndex, config.questions.length, finishQuiz]);

    const togglePause = () => {
        setState(prev => prev === 'active' ? 'paused' : 'active');
    };

    const handleOptionClick = (optionIndex: number) => {
        if (showExplanation || selectedOption !== null) return;
        handleSubmitAnswer(optionIndex);
    };

    if (state === 'completed') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4"
                 style={{ background: config.theme.backgroundColor }}>
                <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-2xl p-8 text-center">
                    <div className="text-6xl mb-4">{config.theme.icon}</div>
                    <h2 className="text-2xl font-bold mb-4">Quiz Selesai!</h2>
                    <div className="space-y-2 mb-6">
                        <p>Skor: {totalScore}</p>
                        <p>Benar: {answers.filter(a => a.isCorrect).length}/{config.questions.length}</p>
                        <p>Akurasi: {Math.round((answers.filter(a => a.isCorrect).length / config.questions.length) * 100)}%</p>
                    </div>
                    <button
                        onClick={onExit}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium"
                    >
                        Kembali ke Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden"
             style={{ background: config.theme.backgroundColor }}>

            {/* Background Pattern */}
            {config.theme.backgroundImage && (
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url(${config.theme.backgroundImage})`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '200px'
                    }}
                />
            )}

            {/* Header */}
            <header className="relative z-10 p-4 bg-black/20 backdrop-blur-sm">
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <div className="text-2xl">{config.theme.icon}</div>
                        <div>
                            <h1 className="text-white font-bold">{config.name}</h1>
                            <p className="text-white/70 text-sm">
                                Soal {currentQuestionIndex + 1} dari {config.questions.length}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Lives */}
                        <div className="flex items-center space-x-1">
                            {[...Array(3)].map((_, i) => (
                                <Heart
                                    key={i}
                                    className={`w-5 h-5 ${i < lives ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                                />
                            ))}
                        </div>

                        {/* Timer */}
                        <div className="flex items-center space-x-2 text-white">
                            <Clock className="w-5 h-5" />
                            <span className="font-mono">{formatTime(timeRemaining)}</span>
                        </div>

                        {/* Pause/Resume */}
                        <button
                            onClick={togglePause}
                            className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
                        >
                            {state === 'paused' ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                        </button>

                        {/* Exit */}
                        <button
                            onClick={onExit}
                            className="px-4 py-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600/80 transition-colors"
                        >
                            Keluar
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="max-w-4xl mx-auto mt-4">
                    <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                            className="h-2 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </header>

            {/* Pause Overlay */}
            {state === 'paused' && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-8 text-center">
                        <Pause className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                        <h2 className="text-2xl font-bold mb-4">Quiz Dijeda</h2>
                        <button
                            onClick={togglePause}
                            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                        >
                            Lanjutkan
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="relative z-10 max-w-4xl mx-auto p-6">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
                    {/* Question Timer */}
                    {questionTimeRemaining && (
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Waktu tersisa untuk soal ini:</span>
                                <span className="font-mono font-bold text-red-600">
                                    {formatTime(questionTimeRemaining)}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="h-2 bg-gradient-to-r from-green-500 to-red-500 rounded-full transition-all duration-1000"
                                    style={{
                                        width: `${((questionTimeRemaining) / (currentQuestion.timeLimit || 1)) * 100}%`
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Score & Streak */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-2xl font-bold" style={{ color: config.theme.primaryColor }}>
                            Skor: {totalScore}
                        </div>
                        {streak > 1 && (
                            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                🔥 Streak {streak}
                            </div>
                        )}
                    </div>

                    {/* Question */}
                    <div className="mb-8">
                        {/* Category & Difficulty */}
                        <div className="flex items-center space-x-4 mb-4">
                            <span
                                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                                style={{ backgroundColor: config.theme.primaryColor }}
                            >
                                {currentQuestion.category}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                currentQuestion.difficulty === 'mudah' ? 'bg-green-100 text-green-800' :
                                currentQuestion.difficulty === 'menengah' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {currentQuestion.difficulty}
                            </span>
                            <span className="text-sm text-gray-600">
                                {currentQuestion.points} poin
                            </span>
                        </div>

                        {/* Question Text */}
                        <h2 className="text-2xl font-bold mb-6 leading-relaxed">
                            {currentQuestion.question}
                        </h2>

                        {/* Media */}
                        {currentQuestion.image && (
                            <div className="mb-6">
                                <img
                                    src={currentQuestion.image}
                                    alt="Question illustration"
                                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                                />
                            </div>
                        )}

                        {currentQuestion.video && (
                            <div className="mb-6">
                                <video
                                    src={currentQuestion.video}
                                    controls
                                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                                />
                            </div>
                        )}

                        {currentQuestion.audio && (
                            <div className="mb-6">
                                <audio
                                    src={currentQuestion.audio}
                                    controls
                                    className="w-full max-w-md mx-auto"
                                />
                            </div>
                        )}
                    </div>

                    {/* Options */}
                    <div className="space-y-4 mb-6">
                        {currentQuestion.options.map((option, index) => {
                            let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium ";

                            if (showExplanation) {
                                if (index === currentQuestion.correctAnswer) {
                                    buttonClass += "border-green-500 bg-green-50 text-green-800";
                                } else if (index === selectedOption) {
                                    buttonClass += "border-red-500 bg-red-50 text-red-800";
                                } else {
                                    buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                                }
                            } else {
                                buttonClass += selectedOption === index
                                    ? `border-2 bg-blue-50 text-blue-800`
                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
                                buttonClass += " cursor-pointer";
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                    disabled={showExplanation}
                                    className={buttonClass}
                                    style={{
                                        borderColor: selectedOption === index && !showExplanation
                                            ? config.theme.primaryColor
                                            : undefined
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option}</span>
                                        {showExplanation && (
                                            <div className="ml-4">
                                                {index === currentQuestion.correctAnswer ? (
                                                    <Check className="w-6 h-6 text-green-600" />
                                                ) : index === selectedOption ? (
                                                    <X className="w-6 h-6 text-red-600" />
                                                ) : null}
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Hint */}
                    {config.features.hasHints && currentQuestion.hint && !showExplanation && (
                        <div className="mb-6">
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                <Lightbulb className="w-5 h-5" />
                                <span>{showHint ? 'Sembunyikan Petunjuk' : 'Lihat Petunjuk'}</span>
                            </button>
                            {showHint && (
                                <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-blue-800">💡 {currentQuestion.hint}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Explanation */}
                    {showExplanation && (
                        <div className="mb-6">
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <h3 className="font-semibold mb-2">Penjelasan:</h3>
                                <p className="text-gray-700">{currentQuestion.explanation}</p>
                            </div>
                        </div>
                    )}

                    {/* Next Button */}
                    {showExplanation && (
                        <div className="flex justify-end">
                            <button
                                onClick={nextQuestion}
                                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                                style={{
                                    background: `linear-gradient(135deg, ${config.theme.primaryColor}, ${config.theme.secondaryColor})`
                                }}
                            >
                                <span>
                                    {currentQuestionIndex < config.questions.length - 1 ? 'Soal Selanjutnya' : 'Selesai'}
                                </span>
                                <SkipForward className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
