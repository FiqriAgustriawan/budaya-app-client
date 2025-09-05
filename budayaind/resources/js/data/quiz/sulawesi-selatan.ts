import { QuizConfig } from '@/types/quiz';

export const sulawesiSelatanQuiz: QuizConfig = {
  id: 'sulawesi-selatan',
  name: 'Quiz Budaya Sulawesi Selatan',
  province: 'Sulawesi Selatan',
  description: 'Jelajahi budaya maritim dan tradisi pelaut Bugis-Makassar yang legendaris',
  timeLimit: 15,
  passingScore: 70,
  theme: {
    primaryColor: '#0EA5E9', // Ocean blue
    secondaryColor: '#0284C7',
    backgroundColor: 'linear-gradient(135deg, #0C4A6E 0%, #0EA5E9 50%, #38BDF8 100%)',
    backgroundImage: '/images/bugis-pattern.png',
    icon: '⛵',
    customElements: {
      patternOverlay: 'maritime',
      fontFamily: 'seafaring',
      soundEffects: 'ocean'
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
      id: 'ss001',
      question: 'Suku yang terkenal sebagai pelaut handal dan tersebar di seluruh Nusantara adalah?',
      options: [
        'Suku Bugis',
        'Suku Jawa',
        'Suku Batak',
        'Suku Dayak'
      ],
      correctAnswer: 0,
      explanation: 'Suku Bugis adalah pelaut legendaris dari Sulawesi Selatan yang terkenal dengan kemampuan berlayar dan berdagang hingga ke seluruh Nusantara bahkan Asia Tenggara.',
      difficulty: 'mudah',
      category: 'Suku & Budaya',
      hint: 'Suku ini terkenal dengan perahu phinisinya yang megah',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'ss002',
      question: 'Kapal tradisional Sulawesi Selatan yang terkenal dengan bentuknya yang megah adalah?',
      options: [
        'Perahu Jukung',
        'Phinisi',
        'Perahu Sandeq',
        'Kapal Pinisi'
      ],
      correctAnswer: 1,
      explanation: 'Phinisi adalah kapal tradisional Bugis-Makassar yang terkenal dengan bentuknya yang megah dan kemampuan berlayar jauh, kini menjadi ikon maritim Indonesia.',
      difficulty: 'mudah',
      category: 'Transportasi Tradisional',
      hint: 'Kapal ini memiliki layar yang besar dan bentuk yang sangat ikonik',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'ss003',
      question: 'Makanan khas Sulawesi Selatan yang terbuat dari ikan dan memiliki rasa asam pedas adalah?',
      options: [
        'Rendang',
        'Coto Makassar',
        'Pallubasa',
        'Konro'
      ],
      correctAnswer: 1,
      explanation: 'Coto Makassar adalah makanan khas Sulawesi Selatan berupa sup jeroan sapi dengan kuah yang kaya rempah dan disajikan dengan ketupat atau burasa.',
      difficulty: 'mudah',
      category: 'Kuliner',
      hint: 'Makanan ini berupa sup dengan kuah kental dan biasa dimakan dengan ketupat',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'ss004',
      question: 'Rumah tradisional Sulawesi Selatan yang berbentuk panggung adalah?',
      options: [
        'Rumah Gadang',
        'Tongkonan',
        'Balla',
        'Honai'
      ],
      correctAnswer: 2,
      explanation: 'Balla adalah rumah tradisional Bugis-Makassar yang berbentuk panggung dengan atap yang tinggi, dirancang untuk melindungi dari banjir dan hewan buas.',
      difficulty: 'menengah',
      category: 'Arsitektur',
      hint: 'Rumah ini berbentuk panggung dan merupakan rumah tradisional suku Bugis',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'ss005',
      question: 'Kerajaan besar yang pernah berkuasa di Sulawesi Selatan adalah?',
      options: [
        'Kerajaan Majapahit',
        'Kerajaan Gowa',
        'Kerajaan Sriwijaya',
        'Kerajaan Mataram'
      ],
      correctAnswer: 1,
      explanation: 'Kerajaan Gowa adalah kerajaan besar yang berkuasa di Sulawesi Selatan pada abad ke-14 hingga ke-17, terkenal dengan kekuatan maritim dan perdagangannya.',
      difficulty: 'menengah',
      category: 'Sejarah',
      hint: 'Kerajaan ini menjadi pusat kekuatan maritim di Sulawesi Selatan',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'ss006',
      question: 'Tarian tradisional Sulawesi Selatan yang menggambarkan kegembiraan setelah panen adalah?',
      options: [
        'Tari Pakarena',
        'Tari Saman',
        'Tari Kecak',
        'Tari Tor-tor'
      ],
      correctAnswer: 0,
      explanation: 'Tari Pakarena adalah tarian tradisional Makassar yang menggambarkan kegembiraan dan syukur setelah panen, ditarikan dengan gerakan yang lemah gemulai.',
      difficulty: 'menengah',
      category: 'Seni Tari',
      hint: 'Tarian ini berasal dari Makassar dan menggambarkan rasa syukur',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'ss007',
      question: 'Pahlawan nasional dari Sulawesi Selatan yang terkenal melawan Belanda adalah?',
      options: [
        'Cut Nyak Dien',
        'Sultan Hasanuddin',
        'Diponegoro',
        'Tuanku Imam Bonjol'
      ],
      correctAnswer: 1,
      explanation: 'Sultan Hasanuddin adalah Raja Gowa XVI yang dikenal sebagai "Ayam Jantan dari Timur" karena keberaniannya melawan penjajah Belanda.',
      difficulty: 'sulit',
      category: 'Sejarah',
      hint: 'Beliau dijuluki "Ayam Jantan dari Timur" oleh Belanda',
      points: 20,
      timeLimit: 60
    },
    {
      id: 'ss008',
      question: 'Alat musik tradisional Sulawesi Selatan yang dimainkan dengan cara dipukul adalah?',
      options: [
        'Sasando',
        'Angklung',
        'Gandrang',
        'Kolintang'
      ],
      correctAnswer: 2,
      explanation: 'Gandrang adalah alat musik pukul tradisional Sulawesi Selatan yang terbuat dari kayu dan kulit sapi, sering dimainkan dalam upacara adat.',
      difficulty: 'sulit',
      category: 'Musik Tradisional',
      hint: 'Alat musik ini terbuat dari kayu dan kulit hewan',
      points: 20,
      timeLimit: 60
    },
    {
      id: 'ss009',
      question: 'Bahasa daerah yang digunakan oleh suku Bugis adalah?',
      options: [
        'Bahasa Makassar',
        'Bahasa Bugis',
        'Bahasa Mandar',
        'Bahasa Toraja'
      ],
      correctAnswer: 1,
      explanation: 'Bahasa Bugis adalah bahasa daerah yang digunakan oleh suku Bugis di Sulawesi Selatan, memiliki aksara tersendiri yang disebut Lontara.',
      difficulty: 'mudah',
      category: 'Bahasa',
      hint: 'Bahasa ini memiliki aksara tersendiri yang disebut Lontara',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'ss010',
      question: 'Pelabuhan utama di Sulawesi Selatan yang menjadi pintu gerbang perdagangan adalah?',
      options: [
        'Pelabuhan Tanjung Perak',
        'Pelabuhan Soekarno-Hatta',
        'Pelabuhan Makassar',
        'Pelabuhan Balikpapan'
      ],
      correctAnswer: 2,
      explanation: 'Pelabuhan Makassar (Soekarno-Hatta) adalah pelabuhan utama di Sulawesi Selatan yang menjadi pintu gerbang perdagangan dan transportasi di kawasan timur Indonesia.',
      difficulty: 'mudah',
      category: 'Geografi',
      hint: 'Pelabuhan ini berada di ibu kota Sulawesi Selatan',
      points: 10,
      timeLimit: 30
    }
  ]
};
