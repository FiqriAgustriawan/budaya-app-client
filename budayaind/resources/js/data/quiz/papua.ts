import { QuizConfig } from '@/types/quiz';

export const papuaQuiz: QuizConfig = {
  id: 'papua',
  name: 'Quiz Budaya Papua',
  province: 'Papua',
  description: 'Jelajahi kekayaan budaya dan alam Papua yang eksotis dan beragam',
  timeLimit: 15,
  passingScore: 70,
  theme: {
    primaryColor: '#15803D', // Forest green
    secondaryColor: '#F97316', // Orangew
    backgroundColor: 'linear-gradient(135deg, #064E3B 0%, #15803D 50%, #F97316 100%)',
    backgroundImage: '/images/papua-pattern.png',
    icon: '🦅',
    customElements: {
      patternOverlay: 'tribal',
      fontFamily: 'natural',
      soundEffects: 'nature'
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
      id: 'pp001',
      question: 'Burung yang menjadi simbol Papua dan dikenal dengan keindahan bulunya adalah?',
      options: [
        'Burung Cendrawasih',
        'Burung Garuda',
        'Burung Kakatua',
        'Burung Elang'
      ],
      correctAnswer: 0,
      explanation: 'Burung Cendrawasih atau Bird of Paradise adalah burung endemik Papua yang terkenal dengan bulu ekornya yang indah dan menjadi simbol kebanggaan Papua.',
      difficulty: 'mudah',
      category: 'Flora Fauna',
      hint: 'Burung ini disebut juga Bird of Paradise dan memiliki bulu ekor yang spektakuler',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'pp002',
      question: 'Rumah tradisional Papua yang berbentuk bulat dan terbuat dari jerami adalah?',
      options: [
        'Rumah Gadang',
        'Honai',
        'Tongkonan',
        'Balai Adat'
      ],
      correctAnswer: 1,
      explanation: 'Honai adalah rumah tradisional suku Dani di Papua yang berbentuk bulat, terbuat dari kayu dan jerami, dirancang untuk melindungi dari cuaca dingin pegunungan.',
      difficulty: 'mudah',
      category: 'Arsitektur',
      hint: 'Rumah ini khusus dibuat untuk daerah pegunungan yang dingin di Papua',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'pp003',
      question: 'Pakaian tradisional pria Papua yang terbuat dari labu kering adalah?',
      options: [
        'Sarong',
        'Cawat',
        'Koteka',
        'Selendang'
      ],
      correctAnswer: 2,
      explanation: 'Koteka adalah pakaian tradisional pria Papua yang terbuat dari labu kering, digunakan oleh suku-suku di daerah pegunungan Papua sebagai penutup tubuh.',
      difficulty: 'menengah',
      category: 'Pakaian Tradisional',
      hint: 'Pakaian ini terbuat dari tanaman labu yang dikeringkan',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'pp004',
      question: 'Makanan pokok suku-suku di Papua yang berasal dari pohon sagu adalah?',
      options: [
        'Beras',
        'Jagung',
        'Sagu',
        'Ubi'
      ],
      correctAnswer: 2,
      explanation: 'Sagu adalah makanan pokok utama di Papua yang diolah dari empulur pohon sagu. Sagu dapat diolah menjadi berbagai makanan seperti papeda.',
      difficulty: 'mudah',
      category: 'Kuliner',
      hint: 'Makanan ini diolah dari pohon yang tumbuh di daerah rawa-rawa',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'pp005',
      question: 'Danau terbesar di Papua yang juga merupakan danau terbesar di Indonesia adalah?',
      options: [
        'Danau Toba',
        'Danau Sentani',
        'Danau Paniai',
        'Danau Habema'
      ],
      correctAnswer: 2,
      explanation: 'Danau Paniai adalah danau terbesar di Papua dan Indonesia, terletak di dataran tinggi Papua dengan pemandangan yang sangat indah.',
      difficulty: 'menengah',
      category: 'Geografi',
      hint: 'Danau ini terletak di dataran tinggi dan merupakan yang terbesar di Indonesia',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'pp006',
      question: 'Tarian perang tradisional Papua yang dilakukan oleh suku Dani adalah?',
      options: [
        'Tari Saman',
        'Tari Yospan',
        'Tari Perang',
        'Tari Musyoh'
      ],
      correctAnswer: 2,
      explanation: 'Tari Perang adalah tarian tradisional suku Dani yang menggambarkan semangat berperang dan keberanian, biasanya dilakukan dengan menggunakan tombak dan perisai.',
      difficulty: 'menengah',
      category: 'Seni Tari',
      hint: 'Tarian ini menggambarkan semangat tempur suku Dani',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'pp007',
      question: 'Puncak tertinggi di Papua dan Indonesia yang diselimuti salju abadi adalah?',
      options: [
        'Puncak Jaya',
        'Puncak Mandala',
        'Puncak Trikora',
        'Puncak Yamin'
      ],
      correctAnswer: 0,
      explanation: 'Puncak Jaya (Carstensz Pyramid) adalah puncak tertinggi di Papua dan Indonesia dengan ketinggian 4.884 meter, merupakan satu-satunya tempat bersalju di Indonesia.',
      difficulty: 'menengah',
      category: 'Geografi',
      hint: 'Puncak ini memiliki gletser dan merupakan yang tertinggi di Indonesia',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'pp008',
      question: 'Suku terbesar di Papua yang terkenal dengan tradisi bakar batu adalah?',
      options: [
        'Suku Asmat',
        'Suku Dani',
        'Suku Yali',
        'Suku Sentani'
      ],
      correctAnswer: 1,
      explanation: 'Suku Dani adalah suku terbesar di Papua yang terkenal dengan tradisi bakar batu (barapen), sebuah cara memasak tradisional menggunakan batu panas.',
      difficulty: 'sulit',
      category: 'Suku & Budaya',
      hint: 'Suku ini tinggal di daerah Lembah Baliem dan terkenal dengan tradisi memasaknya',
      points: 20,
      timeLimit: 60
    },
    {
      id: 'pp009',
      question: 'Alat musik tradisional Papua yang terbuat dari bambu dan dimainkan dengan cara ditiup adalah?',
      options: [
        'Angklung',
        'Suling',
        'Tifa',
        'Pikon'
      ],
      correctAnswer: 3,
      explanation: 'Pikon adalah alat musik tiup tradisional Papua yang terbuat dari bambu, sering dimainkan dalam upacara adat dan ritual tradisional.',
      difficulty: 'sulit',
      category: 'Musik Tradisional',
      hint: 'Alat musik ini dimainkan dengan cara ditiup dan terbuat dari bambu',
      points: 20,
      timeLimit: 60
    },
    {
      id: 'pp010',
      question: 'Festival budaya Papua yang menampilkan berbagai suku dan budaya di Papua adalah?',
      options: [
        'Festival Danau Sentani',
        'Festival Lembah Baliem',
        'Festival Sagu',
        'Festival Raja Ampat'
      ],
      correctAnswer: 1,
      explanation: 'Festival Lembah Baliem adalah festival budaya tahunan yang memamerkan kekayaan budaya berbagai suku di Papua, termasuk pakaian adat, tarian, dan tradisi.',
      difficulty: 'menengah',
      category: 'Festival',
      hint: 'Festival ini diadakan di lembah yang terkenal sebagai tempat tinggal suku Dani',
      points: 15,
      timeLimit: 45
    }
  ]
};
