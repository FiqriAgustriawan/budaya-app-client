import { QuizConfig } from '@/types/quiz';

export const yogyakartaQuiz: QuizConfig = {
  id: 'yogyakarta',
  name: 'Quiz Budaya Yogyakarta',
  province: 'Daerah Istimewa Yogyakarta',
  description: 'Jelajahi warisan kerajaan dan budaya istimewa Daerah Istimewa Yogyakarta',
  timeLimit: 15,
  passingScore: 70,
  theme: {
    primaryColor: '#7C3AED', // Royal purple
    secondaryColor: '#A855F7',
    backgroundColor: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 50%, #A855F7 100%)',
    backgroundImage: '/images/keraton-pattern.png',
    icon: '🏰',
    customElements: {
      patternOverlay: 'royal',
      fontFamily: 'elegant',
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
      id: 'yk001',
      question: 'Apa nama makanan khas Yogyakarta yang terbuat dari nangka muda dan santan?',
      options: [
        'Gudeg',
        'Gado-gado',
        'Ketoprak',
        'Opor'
      ],
      correctAnswer: 0,
      explanation: 'Gudeg adalah makanan khas Yogyakarta yang terbuat dari nangka muda yang dimasak dengan santan dan gula jawa, memberikan rasa manis yang khas.',
      difficulty: 'mudah',
      category: 'Kuliner',
      hint: 'Makanan ini memiliki rasa manis dan sering disebut sebagai "Yogya dalam semangkuk"',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'yk002',
      question: 'Jalan terkenal di Yogyakarta yang menjadi pusat wisata belanja dan kuliner adalah?',
      options: [
        'Jalan Thamrin',
        'Malioboro',
        'Jalan Sudirman',
        'Jalan Diponegoro'
      ],
      correctAnswer: 1,
      explanation: 'Malioboro adalah jalan ikonik Yogyakarta yang membentang dari Tugu Yogyakarta hingga Keraton, menjadi pusat aktivitas wisata, belanja, dan kuliner.',
      difficulty: 'mudah',
      category: 'Geografi',
      hint: 'Jalan ini terkenal dengan pedagang lesehan dan angkringan di malam hari',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'yk003',
      question: 'Keraton Yogyakarta merupakan istana resmi dari?',
      options: [
        'Sultan Hamengku Buwono',
        'Pangeran Diponegoro',
        'Raja Mataram',
        'Sultan Agung'
      ],
      correctAnswer: 0,
      explanation: 'Keraton Yogyakarta adalah istana resmi Kasultanan Ngayogyakarta Hadiningrat yang dipimpin oleh Sultan Hamengku Buwono.',
      difficulty: 'mudah',
      category: 'Sejarah',
      hint: 'Dinasti ini masih berlanjut hingga sekarang dan memimpin Daerah Istimewa Yogyakarta',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'yk004',
      question: 'Batik dengan motif khas Yogyakarta yang melambangkan kesabaran dan ketenangan adalah?',
      options: [
        'Parang',
        'Kawung',
        'Sidomukti',
        'Truntum'
      ],
      correctAnswer: 3,
      explanation: 'Batik Truntum merupakan motif khas Yogyakarta yang melambangkan cinta kasih yang tumbuh kembali, kesabaran, dan ketenangan hati.',
      difficulty: 'menengah',
      category: 'Seni',
      hint: 'Motif ini sering digunakan dalam acara pernikahan tradisional Jawa',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'yk005',
      question: 'Candi terkenal yang terletak di Yogyakarta dan merupakan candi Buddha terbesar di dunia adalah?',
      options: [
        'Candi Prambanan',
        'Borobudur',
        'Candi Sewu',
        'Candi Plaosan'
      ],
      correctAnswer: 1,
      explanation: 'Candi Borobudur adalah candi Buddha terbesar di dunia yang dibangun pada abad ke-8 dan merupakan Situs Warisan Dunia UNESCO.',
      difficulty: 'mudah',
      category: 'Sejarah',
      hint: 'Candi ini memiliki bentuk mandala dengan 9 tingkat dan ribuan relief',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'yk006',
      question: 'Universitas tertua di Indonesia yang terletak di Yogyakarta adalah?',
      options: [
        'UGM (Universitas Gadjah Mada)',
        'UNY (Universitas Negeri Yogyakarta)',
        'UII (Universitas Islam Indonesia)',
        'UAD (Universitas Ahmad Dahlan)'
      ],
      correctAnswer: 0,
      explanation: 'Universitas Gadjah Mada (UGM) didirikan pada 19 Desember 1949 dan merupakan universitas pertama yang didirikan oleh Republik Indonesia.',
      difficulty: 'menengah',
      category: 'Pendidikan',
      hint: 'Nama universitas ini diambil dari nama seorang Mahapatih Majapahit',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'yk007',
      question: 'Tarian tradisional Yogyakarta yang menceritakan perang antara Arjuna dan raksasa adalah?',
      options: [
        'Srimpi',
        'Bedhaya',
        'Wireng',
        'Golek'
      ],
      correctAnswer: 2,
      explanation: 'Tari Wireng adalah tarian perang tradisional Yogyakarta yang menggambarkan pertempuran heroik, sering menceritakan kisah Arjuna melawan raksasa.',
      difficulty: 'sulit',
      category: 'Seni Tari',
      hint: 'Tarian ini memiliki gerakan yang energik dan dinamis seperti pertempuran',
      points: 20,
      timeLimit: 60
    },
    {
      id: 'yk008',
      question: 'Sebutan untuk Sultan Yogyakarta yang masih memerintah hingga sekarang adalah?',
      options: [
        'Sri Paduka',
        'Sinuhun',
        'Ngarso Dalem',
        'Kanjeng Ratu'
      ],
      correctAnswer: 2,
      explanation: 'Ngarso Dalem adalah sebutan hormat untuk Sultan Yogyakarta yang berarti "Yang Mulia di Depan" atau pemimpin yang memberikan teladan.',
      difficulty: 'sulit',
      category: 'Budaya',
      hint: 'Sebutan ini menunjukkan posisi Sultan sebagai pemimpin spiritual dan budaya',
      points: 20,
      timeLimit: 60
    },
    {
      id: 'yk009',
      question: 'Alun-alun Kidul Yogyakarta terkenal dengan pohon beringin kembar yang disebut?',
      options: [
        'Ringin Kurung',
        'Ringin Kembar',
        'Ringin Agung',
        'Ringin Pusat'
      ],
      correctAnswer: 0,
      explanation: 'Ringin Kurung adalah dua pohon beringin di Alun-alun Kidul yang dipercaya memiliki kekuatan magis dan menjadi tempat ritual spiritual.',
      difficulty: 'menengah',
      category: 'Budaya',
      hint: 'Konon, orang yang bisa berjalan di antara kedua pohon ini dengan mata tertutup akan mendapat berkah',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'yk010',
      question: 'Festival budaya tahunan di Yogyakarta yang memperingati pendirian kota adalah?',
      options: [
        'Jogja Java Carnival',
        'Festival Kesenian Yogyakarta',
        'Yogya Night Festival',
        'Malioboro Festival'
      ],
      correctAnswer: 1,
      explanation: 'Festival Kesenian Yogyakarta (FKY) adalah festival budaya tahunan yang menampilkan berbagai pertunjukan seni tradisional dan kontemporer.',
      difficulty: 'menengah',
      category: 'Budaya',
      hint: 'Festival ini biasanya digelar di berbagai tempat bersejarah di Yogyakarta',
      points: 15,
      timeLimit: 45
    }
  ]
};
