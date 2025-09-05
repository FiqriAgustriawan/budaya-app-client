import { QuizConfig } from '@/types/quiz';

export const jawaTengahQuiz: QuizConfig = {
    id: 'jawa-tengah',
    name: 'Quiz Budaya Jawa Tengah',
    province: 'Jawa Tengah',
    description: 'Uji pengetahuan Anda tentang budaya Jawa klasik, batik, dan tradisi keraton',
    timeLimit: 15,
    passingScore: 70,
    theme: {
        primaryColor: '#f59e0b',
        secondaryColor: '#d97706',
        backgroundColor: 'linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)',
        backgroundImage: '/images/batik-pattern.png',
        icon: '🏛️',
        customElements: {
            patternOverlay: 'batik',
            fontFamily: 'traditional',
            soundEffects: 'gamelan'
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
            id: 'jt001',
            question: 'Apa nama tarian klasik Jawa yang biasanya dipentaskan di keraton?',
            options: [
                'Saman',
                'Bedhaya',
                'Piring',
                'Tor-tor'
            ],
            correctAnswer: 1,
            explanation: 'Bedhaya adalah tarian klasik Jawa yang sacred dan biasanya dipentaskan di keraton oleh 9 penari wanita',
            difficulty: 'mudah',
            category: 'Seni Tari',
            image: '/images/quiz/bedhaya.jpg',
            hint: 'Tarian ini dipentaskan oleh 9 penari wanita',
            points: 10,
            timeLimit: 30
        },
        {
            id: 'jt002',
            question: 'Motif batik manakah yang dilarang dipakai oleh rakyat biasa pada zaman kerajaan?',
            options: [
                'Parang',
                'Kawung',
                'Mega Mendung',
                'Sidomukti'
            ],
            correctAnswer: 0,
            explanation: 'Motif Parang adalah motif larangan yang hanya boleh dipakai oleh keluarga raja dan bangsawan keraton',
            difficulty: 'menengah',
            category: 'Batik',
            image: '/images/quiz/batik-parang.jpg',
            hint: 'Motif ini berbentuk seperti ombak diagonal',
            points: 15,
            timeLimit: 45
        },
        {
            id: 'jt003',
            question: 'Apa nama alat musik tradisional Jawa yang terdiri dari serangkaian gong kecil?',
            options: [
                'Kendang',
                'Bonang',
                'Saron',
                'Demung'
            ],
            correctAnswer: 1,
            explanation: 'Bonang adalah alat musik gamelan yang terdiri dari serangkaian gong kecil berbentuk mangkuk yang disusun dalam dua baris',
            difficulty: 'mudah',
            category: 'Musik',
            audio: '/audio/bonang.mp3',
            hint: 'Bunyinya seperti gong kecil yang dipukul dengan pemukul khusus',
            points: 10,
            timeLimit: 30
        },
        {
            id: 'jt004',
            question: 'Siapa pencipta aksara Jawa?',
            options: [
                'Aji Saka',
                'Empu Sedah',
                'Sunan Kalijaga',
                'Sultan Agung'
            ],
            correctAnswer: 0,
            explanation: 'Menurut legenda, Aji Saka adalah tokoh yang memperkenalkan aksara Jawa ke tanah Jawa',
            difficulty: 'menengah',
            category: 'Sejarah',
            hint: 'Nama ini juga terkait dengan cerita Dewa Ruci',
            points: 15,
            timeLimit: 40
        },
        {
            id: 'jt005',
            question: 'Apa nama istana Sultan di Yogyakarta?',
            options: [
                'Kasunanan',
                'Keraton',
                'Puri',
                'Pendopo'
            ],
            correctAnswer: 1,
            explanation: 'Keraton Yogyakarta adalah istana Sultan yang masih berfungsi hingga sekarang',
            difficulty: 'mudah',
            category: 'Arsitektur',
            image: '/images/quiz/keraton-jogja.jpg',
            hint: 'Tempat tinggal Sultan yang terkenal',
            points: 10,
            timeLimit: 25
        },
        {
            id: 'jt006',
            question: 'Makanan khas Jawa Tengah yang terbuat dari tahu dan disiram kuah santan adalah?',
            options: [
                'Gado-gado',
                'Ketoprak',
                'Tahu Gimbal',
                'Lumpia'
            ],
            correctAnswer: 2,
            explanation: 'Tahu Gimbal adalah makanan khas Semarang yang terdiri dari tahu goreng dengan kuah santan',
            difficulty: 'mudah',
            category: 'Kuliner',
            image: '/images/quiz/tahu-gimbal.jpg',
            hint: 'Makanan khas Semarang ini',
            points: 10,
            timeLimit: 30
        },
        {
            id: 'jt007',
            question: 'Apa filosofi dari motif batik Kawung?',
            options: [
                'Kesuburan dan kemakmuran',
                'Kekuatan dan keberanian',
                'Kesucian dan kemurnian',
                'Kebijaksanaan dan kepemimpinan'
            ],
            correctAnswer: 0,
            explanation: 'Motif Kawung melambangkan kesuburan dan kemakmuran, terinspirasi dari buah kawung (aren)',
            difficulty: 'sulit',
            category: 'Batik',
            image: '/images/quiz/batik-kawung.jpg',
            hint: 'Terinspirasi dari buah pohon aren',
            points: 20,
            timeLimit: 60
        },
        {
            id: 'jt008',
            question: 'Upacara adat Jawa untuk anak yang baru lahir disebut?',
            options: [
                'Slametan',
                'Brokohan',
                'Sepasaran',
                'Wetonan'
            ],
            correctAnswer: 2,
            explanation: 'Sepasaran adalah upacara yang dilakukan pada hari ke-5 setelah kelahiran bayi',
            difficulty: 'menengah',
            category: 'Tradisi',
            hint: 'Dilakukan pada hari kelima setelah lahir',
            points: 15,
            timeLimit: 45
        },
        {
            id: 'jt009',
            question: 'Candi Borobudur dibangun pada masa kerajaan?',
            options: [
                'Majapahit',
                'Singhasari',
                'Sailendra',
                'Mataram'
            ],
            correctAnswer: 2,
            explanation: 'Candi Borobudur dibangun pada abad ke-8-9 Masehi pada masa Dinasti Sailendra',
            difficulty: 'menengah',
            category: 'Sejarah',
            image: '/images/quiz/borobudur.jpg',
            hint: 'Dinasti yang beragama Buddha',
            points: 15,
            timeLimit: 40
        },
        {
            id: 'jt010',
            question: 'Apa nama tradisi gotong royong dalam masyarakat Jawa?',
            options: [
                'Sambatan',
                'Rewang',
                'Gugur Gunung',
                'Semua benar'
            ],
            correctAnswer: 3,
            explanation: 'Sambatan, Rewang, dan Gugur Gunung semuanya adalah tradisi gotong royong dalam masyarakat Jawa',
            difficulty: 'sulit',
            category: 'Tradisi',
            hint: 'Ada beberapa istilah untuk gotong royong',
            points: 20,
            timeLimit: 50
        }
    ]
};
