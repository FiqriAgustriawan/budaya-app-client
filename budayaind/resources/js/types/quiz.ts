export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: 'mudah' | 'menengah' | 'sulit';
    category: string;
    image?: string;
    audio?: string;
    video?: string;
    hint?: string;
    points?: number;
    timeLimit?: number; // in seconds
}

export interface QuizAnswer {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    timeSpent: number;
    pointsEarned?: number;
}

export interface QuizProgress {
    currentQuestionIndex: number;
    totalQuestions: number;
    answeredQuestions: QuizAnswer[];
    totalScore: number;
    totalPossibleScore: number;
    timeRemaining: number;
    isCompleted: boolean;
    startTime: Date;
    endTime?: Date;
}

export interface QuizConfig {
    id: string;
    name: string;
    province: string;
    description: string;
    questions: QuizQuestion[];
    timeLimit: number; // total time in minutes
    passingScore: number; // percentage needed to pass
    theme: {
        primaryColor: string;
        secondaryColor: string;
        backgroundColor: string;
        backgroundImage?: string;
        icon: string;
        customElements?: Record<string, unknown>;
    };
    features: {
        hasHints: boolean;
        hasTimer: boolean;
        showExplanations: boolean;
        allowRetake: boolean;
        randomizeQuestions: boolean;
        randomizeOptions: boolean;
    };
}

export interface QuizResult {
    quizId: string;
    userId?: string;
    score: number;
    percentage: number;
    totalQuestions: number;
    correctAnswers: number;
    timeSpent: number;
    passed: boolean;
    answers: QuizAnswer[];
    completedAt: Date;
    rank?: number;
    achievements?: string[];
}

export interface QuizStatistics {
    totalAttempts: number;
    averageScore: number;
    highestScore: number;
    averageTimeSpent: number;
    mostDifficultQuestion: string;
    easiestQuestion: string;
    popularChoices: Record<string, number>;
}

export type QuizState = 'idle' | 'starting' | 'active' | 'paused' | 'completed' | 'failed';

export interface QuizSession {
    config: QuizConfig;
    progress: QuizProgress;
    state: QuizState;
    currentQuestion?: QuizQuestion;
}
