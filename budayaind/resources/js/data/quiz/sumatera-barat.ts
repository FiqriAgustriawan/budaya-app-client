import { QuizConfig } from '@/types/quiz';

export const sumateraBaratQuiz: QuizConfig = {
    id: 'sumatera-barat',
    name: 'Quiz Budaya Sumatera Barat',
    province: 'Sumatera Barat',
    description: 'Explore budaya Minangkabau yang kaya dengan tradisi matrilineal dan rumah gadang',
    timeLimit: 15,
    passingScore: 70,
    theme: {
        primaryColor: '#ef4444',
        secondaryColor: '#dc2626',
        backgroundColor: 'linear-gradient(135deg, #fee2e2 0%, #ef4444 100%)',
        backgroundImage: '/images/minang-pattern.png',
        icon: '🏠',
        customElements: {
            patternOverlay: 'songket',
            fontFamily: 'minang',
            soundEffects: 'talempong'
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
            id: 'sb001',
            question: 'Apa nama rumah tradisional Minangkabau?',
            options: [
                'Rumah Gadang',
                'Rumah Lontik',
                'Rumah Adat',
                'Rumah Bagonjong'
            ],
            correctAnswer: 0,
            explanation: 'Rumah Gadang adalah rumah tradisional Minangkabau dengan atap berbentuk tanduk kerbau',
            difficulty: 'mudah',
            category: 'Arsitektur',
            image: '/images/quiz/rumah-gadang.jpg',
            hint: 'Atapnya menyerupai tanduk kerbau',
            points: 10,
            timeLimit: 30
        },
        {
            id: 'sb002',
            question: 'Sistem kekerabatan Minangkabau menggunakan garis keturunan?',
            options: [
                'Patrilineal (garis ayah)',
                'Matrilineal (garis ibu)',
                'Bilateral (kedua garis)',
                'Tidak ada sistem tertentu'
            ],
            correctAnswer: 1,
            explanation: 'Minangkabau menganut sistem matrilineal, dimana keturunan dihitung dari garis ibu',
            difficulty: 'menengah',
            category: 'Tradisi',
            hint: 'Keturunan dihitung dari pihak perempuan',
            points: 15,
            timeLimit: 40
        },
        {
            id: 'sb003',
            question: 'Apa nama tarian tradisional Minangkabau yang meniru gerakan ayam?',
            options: [
                'Tari Piring',
                'Tari Payung',
                'Tari Indang',
                'Tari Pasambahan'
            ],
            correctAnswer: 0,
            explanation: 'Tari Piring meniru gerakan ayam jantan yang sedang berkelahi, menggunakan piring di kedua tangan',
            difficulty: 'mudah',
            category: 'Seni Tari',
            video: '/videos/tari-piring.mp4',
            hint: 'Menggunakan piring sebagai properti',
            points: 10,
            timeLimit: 30
        },
        {
            id: 'sb004',
            question: 'Makanan khas Minang yang menggunakan santan kental berwarna kuning adalah?',
            options: [
                'Gulai',
                'Rendang',
                'Sate Padang',
                'Dendeng Balado'
            ],
            correctAnswer: 1,
            explanation: 'Rendang adalah masakan daging dengan santan dan rempah yang dimasak hingga kering',
            difficulty: 'mudah',
            category: 'Kuliner',
            image: '/images/quiz/rendang.jpg',
            hint: 'Masakan yang diakui UNESCO',
            points: 10,
            timeLimit: 25
        },
        {
            id: 'sb005',
            question: 'Apa nama alat musik tradisional Minangkabau yang terbuat dari logam?',
            options: [
                'Saluang',
                'Talempong',
                'Rabab',
                'Bansi'
            ],
            correctAnswer: 1,
            explanation: 'Talempong adalah alat musik tradisional Minangkabau yang terbuat dari kuningan dan dimainkan dengan dipukul',
            difficulty: 'menengah',
            category: 'Musik',
            audio: '/audio/talempong.mp3',
            hint: 'Terbuat dari kuningan dan dipukul',
            points: 15,
            timeLimit: 40
        },
        {
            id: 'sb006',
            question: 'Dalam adat Minangkabau, siapa yang memiliki wewenang tertinggi dalam keluarga?',
            options: [
                'Ayah (Bapak)',
                'Ibu (Amak)',
                'Mamak (Saudara laki-laki ibu)',
                'Kakek (Datuk)'
            ],
            correctAnswer: 2,
            explanation: 'Mamak (saudara laki-laki ibu) memiliki wewenang tertinggi dalam keluarga matrilineal Minangkabau',
            difficulty: 'sulit',
            category: 'Tradisi',
            hint: 'Saudara laki-laki dari pihak ibu',
            points: 20,
            timeLimit: 50
        },
        {
            id: 'sb007',
            question: 'Apa filosofi utama dalam pepatah Minang "Adat Basandi Syarak, Syarak Basandi Kitabullah"?',
            options: [
                'Adat bersumber dari tradisi nenek moyang',
                'Adat didasarkan pada agama Islam',
                'Adat lebih penting dari agama',
                'Adat dan agama terpisah'
            ],
            correctAnswer: 1,
            explanation: 'Filosofi ini berarti adat bersendikan agama, dan agama bersendikan Al-Quran',
            difficulty: 'sulit',
            category: 'Filosofi',
            hint: 'Menggabungkan adat dan agama Islam',
            points: 20,
            timeLimit: 60
        },
        {
            id: 'sb008',
            question: 'Apa nama upacara adat saat anak laki-laki Minang meninggalkan rumah untuk merantau?',
            options: [
                'Baralek',
                'Batagak Pangulu',
                'Turun Mandi',
                'Manjapuik Marapulai'
            ],
            correctAnswer: 1,
            explanation: 'Batagak Pangulu adalah upacara pengangkatan seseorang menjadi penghulu (pemimpin adat)',
            difficulty: 'sulit',
            category: 'Tradisi',
            hint: 'Berkaitan dengan kepemimpinan adat',
            points: 20,
            timeLimit: 55
        },
        {
            id: 'sb009',
            question: 'Kain tradisional Minangkabau yang menggunakan benang emas disebut?',
            options: [
                'Songket',
                'Tenun',
                'Batik',
                'Ulos'
            ],
            correctAnswer: 0,
            explanation: 'Songket adalah kain tradisional Minangkabau yang ditenun dengan benang emas atau perak',
            difficulty: 'menengah',
            category: 'Kerajinan',
            image: '/images/quiz/songket-minang.jpg',
            hint: 'Menggunakan benang emas dalam tenunan',
            points: 15,
            timeLimit: 40
        },
        {
            id: 'sb010',
            question: 'Dalam tradisi Minang, istilah "merantau" memiliki makna?',
            options: [
                'Pergi untuk berdagang',
                'Keluar dari kampung untuk mencari ilmu dan pengalaman',
                'Pindah ke kota besar',
                'Berkeliling Indonesia'
            ],
            correctAnswer: 1,
            explanation: 'Merantau dalam budaya Minang adalah tradisi pergi meninggalkan kampung halaman untuk mencari ilmu, pengalaman, dan penghidupan',
            difficulty: 'menengah',
            category: 'Tradisi',
            hint: 'Tradisi mencari pengalaman di luar kampung',
            points: 15,
            timeLimit: 45
        }
    ]
};
