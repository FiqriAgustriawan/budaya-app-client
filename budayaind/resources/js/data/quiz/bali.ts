import { QuizConfig } from '@/types/quiz';

export const baliQuiz: QuizConfig = {
    id: 'bali',
    name: 'Quiz Budaya Bali',
    province: 'Bali',
    description: 'Jelajahi keindahan seni, tarian, dan tradisi Hindu-Bali yang mempesona',
    timeLimit: 15,
    passingScore: 70,
    theme: {
        primaryColor: '#10b981',
        secondaryColor: '#059669',
        backgroundColor: 'linear-gradient(135deg, #d1fae5 0%, #10b981 100%)',
        backgroundImage: '/images/bali-pattern.png',
        icon: '🌺',
        customElements: {
            patternOverlay: 'prada',
            fontFamily: 'balinese',
            soundEffects: 'gamelan-bali'
        }
    },
    features: {
        hasHints: true,
        hasTimer: true,
        showExplanations: true,
        allowRetake: true,
        randomizeQuestions: false,
        randomizeOptions: true
    },
    questions: [
        {
            id: 'bl001',
            question: 'Apa nama tarian Bali yang menceritakan pertarungan antara kebajikan dan kejahatan?',
            options: [
                'Legong',
                'Barong',
                'Kecak',
                'Janger'
            ],
            correctAnswer: 1,
            explanation: 'Tari Barong menceritakan pertarungan antara Barong (kebajikan) melawan Rangda (kejahatan)',
            difficulty: 'mudah',
            category: 'Seni Tari',
            image: '/images/quiz/barong.jpg',
            hint: 'Menampilkan sosok seperti singa yang baik hati',
            points: 10,
            timeLimit: 30
        },
        {
            id: 'bl002',
            question: 'Apa nama hari raya terbesar dalam agama Hindu Bali?',
            options: [
                'Galungan',
                'Nyepi',
                'Kuningan',
                'Saraswati'
            ],
            correctAnswer: 1,
            explanation: 'Nyepi adalah hari raya Hindu yang dirayakan sebagai tahun baru Saka dengan keheningan total',
            difficulty: 'mudah',
            category: 'Religi',
            image: '/images/quiz/nyepi.jpg',
            hint: 'Hari keheningan total',
            points: 10,
            timeLimit: 30
        },
        {
            id: 'bl003',
            question: 'Alat musik Bali yang menggunakan bambu dan dimainkan dengan cara dipukul adalah?',
            options: [
                'Rindik',
                'Jegogan',
                'Gong',
                'Kendang'
            ],
            correctAnswer: 0,
            explanation: 'Rindik adalah alat musik tradisional Bali yang terbuat dari bambu dan dimainkan dengan pemukul',
            difficulty: 'menengah',
            category: 'Musik',
            audio: '/audio/rindik.mp3',
            hint: 'Terbuat dari bambu dan bunyinya merdu',
            points: 15,
            timeLimit: 40
        },
        {
            id: 'bl004',
            question: 'Apa nama sistem irigasi tradisional Bali?',
            options: [
                'Subak',
                'Seka',
                'Banjar',
                'Desa Adat'
            ],
            correctAnswer: 0,
            explanation: 'Subak adalah sistem irigasi tradisional Bali yang diakui UNESCO sebagai warisan dunia',
            difficulty: 'menengah',
            category: 'Tradisi',
            image: '/images/quiz/subak.jpg',
            hint: 'Sistem pengairan sawah yang terkenal',
            points: 15,
            timeLimit: 45
        },
        {
            id: 'bl005',
            question: 'Tari Kecak menggunakan suara apa sebagai iringan musik?',
            options: [
                'Gamelan',
                'Suling',
                'Vokal "Cak"',
                'Kendang'
            ],
            correctAnswer: 2,
            explanation: 'Tari Kecak menggunakan suara vokal "cak" dari puluhan pria yang duduk melingkar',
            difficulty: 'mudah',
            category: 'Seni Tari',
            video: '/videos/kecak.mp4',
            hint: 'Dilakukan oleh puluhan pria yang mengelilingi penari',
            points: 10,
            timeLimit: 30
        },
        {
            id: 'bl006',
            question: 'Makanan khas Bali yang terbuat dari daging babi dan rempah-rempah adalah?',
            options: [
                'Bebek Betutu',
                'Babi Guling',
                'Ayam Pelalah',
                'Sate Lilit'
            ],
            correctAnswer: 1,
            explanation: 'Babi Guling adalah makanan khas Bali yang menggunakan daging babi yang dibakar dengan bumbu khas',
            difficulty: 'mudah',
            category: 'Kuliner',
            image: '/images/quiz/babi-guling.jpg',
            hint: 'Daging yang dibakar utuh dengan bumbu',
            points: 10,
            timeLimit: 25
        },
        {
            id: 'bl007',
            question: 'Apa nama pura terbesar dan paling suci di Bali?',
            options: [
                'Pura Tanah Lot',
                'Pura Besakih',
                'Pura Uluwatu',
                'Pura Luhur Batukaru'
            ],
            correctAnswer: 1,
            explanation: 'Pura Besakih dikenal sebagai "Mother Temple" dan merupakan pura terbesar serta tersuci di Bali',
            difficulty: 'menengah',
            category: 'Religi',
            image: '/images/quiz/besakih.jpg',
            hint: 'Dijuluki "Mother Temple"',
            points: 15,
            timeLimit: 40
        },
        {
            id: 'bl008',
            question: 'Filosofi "Tri Hita Karana" dalam budaya Bali mengajarkan keharmonisan antara?',
            options: [
                'Manusia dengan Tuhan, sesama, dan alam',
                'Tubuh, jiwa, dan roh',
                'Masa lalu, kini, dan masa depan',
                'Lahir, batin, dan spiritual'
            ],
            correctAnswer: 0,
            explanation: 'Tri Hita Karana mengajarkan keharmonisan antara hubungan manusia dengan Tuhan, sesama manusia, dan alam',
            difficulty: 'sulit',
            category: 'Filosofi',
            hint: 'Tiga hubungan harmonis dalam hidup',
            points: 20,
            timeLimit: 60
        },
        {
            id: 'bl009',
            question: 'Apa nama upacara pembakaran jenazah dalam tradisi Hindu Bali?',
            options: [
                'Ngaben',
                'Melasti',
                'Otonan',
                'Piodalan'
            ],
            correctAnswer: 0,
            explanation: 'Ngaben atau Pitra Yadnya adalah upacara pembakaran jenazah dalam tradisi Hindu Bali',
            difficulty: 'menengah',
            category: 'Religi',
            hint: 'Upacara untuk mengantar arwah ke alam baka',
            points: 15,
            timeLimit: 45
        },
        {
            id: 'bl010',
            question: 'Wayang kulit Bali menggunakan bahasa apa dalam pertunjukan?',
            options: [
                'Bahasa Indonesia',
                'Bahasa Jawa Kuno',
                'Bahasa Bali',
                'Bahasa Sanskerta'
            ],
            correctAnswer: 2,
            explanation: 'Wayang kulit Bali menggunakan bahasa Bali dalam dialog dan narasinya',
            difficulty: 'sulit',
            category: 'Seni Pertunjukan',
            hint: 'Bahasa daerah setempat',
            points: 20,
            timeLimit: 50
        }
    ]
};
