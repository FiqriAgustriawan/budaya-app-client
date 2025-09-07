import { QuizConfig } from '@/types/quiz';

export const kalimantanQuiz: QuizConfig = {
  id: 'kalimantan',
  name: 'Quiz Budaya Kalimantan',
  province: 'Kalimantan',
  description: 'Jelajahi kekayaan hutan tropis dan budaya Dayak yang memikat di Pulau Borneo',
  timeLimit: 15,
  passingScore: 70,
  theme: {
    primaryColor: '#16A34A', // Forest green
    secondaryColor: '#15803D',
    backgroundColor: 'linear-gradient(135deg, #14532D 0%, #16A34A 50%, #22C55E 100%)',
    backgroundImage: '/images/dayak-pattern.png',
    icon: '🦧',
    customElements: {
      patternOverlay: 'forest',
      fontFamily: 'nature',
      soundEffects: 'jungle'
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
      id: 'kl001',
      question: 'Suku asli Kalimantan yang terkenal dengan rumah betang adalah?',
      options: [
        'Suku Dayak',
        'Suku Banjar',
        'Suku Kutai',
        'Suku Melayu'
      ],
      correctAnswer: 0,
      explanation: 'Suku Dayak adalah suku asli Kalimantan yang terkenal dengan rumah betang (rumah panjang) dan kearifan lokal dalam menjaga hutan.',
      difficulty: 'mudah',
      category: 'Suku & Budaya',
      hint: 'Suku ini terkenal dengan rumah panjang yang dapat menampung banyak keluarga',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'kl002',
      question: 'Hewan endemik Kalimantan yang terancam punah dan hidup di pohon adalah?',
      options: [
        'Harimau',
        'Orangutan',
        'Gajah',
        'Badak'
      ],
      correctAnswer: 1,
      explanation: 'Orangutan adalah primata endemik Kalimantan yang hidup di pohon dan saat ini terancam punah akibat deforestasi dan perburuan liar.',
      difficulty: 'mudah',
      category: 'Flora Fauna',
      hint: 'Primata ini memiliki rambut kemerahan dan sangat pandai memanjat',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'kl003',
      question: 'Pasar terapung yang terkenal di Kalimantan Selatan adalah?',
      options: [
        'Pasar Klewer',
        'Pasar Lok Baintan',
        'Pasar Beringharjo',
        'Pasar Tanah Abang'
      ],
      correctAnswer: 1,
      explanation: 'Pasar Lok Baintan adalah pasar terapung tradisional di Kalimantan Selatan dimana pedagang berjualan di atas perahu di sungai.',
      difficulty: 'menengah',
      category: 'Wisata',
      hint: 'Pasar ini berada di atas air dan pedagangnya menggunakan perahu',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'kl004',
      question: 'Rumah tradisional Dayak yang berbentuk panjang dan dapat menampung banyak keluarga adalah?',
      options: [
        'Rumah Betang',
        'Rumah Gadang',
        'Tongkonan',
        'Honai'
      ],
      correctAnswer: 0,
      explanation: 'Rumah Betang adalah rumah tradisional Dayak yang berbentuk panjang dan dapat menampung puluhan keluarga, melambangkan kebersamaan dan gotong royong.',
      difficulty: 'mudah',
      category: 'Arsitektur',
      hint: 'Rumah ini sangat panjang dan ditinggali oleh banyak keluarga sekaligus',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'kl005',
      question: 'Makanan tradisional Kalimantan yang terbuat dari ikan haruan adalah?',
      options: [
        'Pempek',
        'Amplang',
        'Ketupat Kandangan',
        'Soto Banjar'
      ],
      correctAnswer: 1,
      explanation: 'Amplang adalah makanan khas Kalimantan yang terbuat dari ikan haruan yang digoreng kering dan dibentuk seperti kerupuk.',
      difficulty: 'menengah',
      category: 'Kuliner',
      hint: 'Makanan ini berbentuk seperti kerupuk dan terbuat dari ikan',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'kl006',
      question: 'Tarian tradisional Dayak yang meniru gerakan burung enggang adalah?',
      options: [
        'Tari Enggang',
        'Tari Saman',
        'Tari Kancet Papatai',
        'Tari Hudoq'
      ],
      correctAnswer: 2,
      explanation: 'Tari Kancet Papatai adalah tarian perang tradisional Dayak Kenyah yang meniru gerakan burung enggang, hewan yang dianggap suci oleh suku Dayak.',
      difficulty: 'sulit',
      category: 'Seni Tari',
      hint: 'Tarian ini merupakan tarian perang dan meniru gerakan burung yang dianggap suci',
      points: 20,
      timeLimit: 60
    },
    {
      id: 'kl007',
      question: 'Sungai terpanjang di Kalimantan yang menjadi jalur transportasi utama adalah?',
      options: [
        'Sungai Musi',
        'Sungai Kapuas',
        'Sungai Barito',
        'Sungai Mahakam'
      ],
      correctAnswer: 1,
      explanation: 'Sungai Kapuas adalah sungai terpanjang di Indonesia yang mengalir di Kalimantan Barat dan menjadi jalur transportasi serta sumber kehidupan masyarakat.',
      difficulty: 'menengah',
      category: 'Geografi',
      hint: 'Sungai ini adalah yang terpanjang di Indonesia',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'kl008',
      question: 'Alat musik tradisional Dayak yang dimainkan dengan cara dipetik adalah?',
      options: [
        'Sasando',
        'Sape',
        'Kecapi',
        'Hasapi'
      ],
      correctAnswer: 1,
      explanation: 'Sape adalah alat musik petik tradisional Dayak yang terbuat dari kayu dan dimainkan dalam berbagai upacara adat dan ritual tradisional.',
      difficulty: 'sulit',
      category: 'Musik Tradisional',
      hint: 'Alat musik ini dimainkan dengan cara dipetik dan merupakan khas suku Dayak',
      points: 20,
      timeLimit: 60
    },
    {
      id: 'kl009',
      question: 'Hasil hutan Kalimantan yang sangat terkenal dan bernilai ekonomi tinggi adalah?',
      options: [
        'Karet',
        'Kayu Ulin',
        'Rotan',
        'Semua jawaban benar'
      ],
      correctAnswer: 3,
      explanation: 'Kalimantan kaya akan hasil hutan seperti karet, kayu ulin (kayu besi), dan rotan yang semuanya memiliki nilai ekonomi tinggi dan menjadi komoditas unggulan.',
      difficulty: 'menengah',
      category: 'Ekonomi',
      hint: 'Semua pilihan jawaban merupakan hasil hutan yang terkenal dari Kalimantan',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'kl010',
      question: 'Upacara adat Dayak untuk memohon perlindungan dari roh jahat adalah?',
      options: [
        'Gawai Dayak',
        'Tiwah',
        'Hudoq',
        'Erau'
      ],
      correctAnswer: 2,
      explanation: 'Hudoq adalah upacara adat Dayak Bahau yang dilakukan untuk memohon perlindungan dari roh jahat dan mendoakan hasil panen yang baik.',
      difficulty: 'sulit',
      category: 'Tradisi',
      hint: 'Upacara ini berkaitan dengan perlindungan dari roh jahat dan hasil panen',
      points: 20,
      timeLimit: 60
    }
  ]
};
