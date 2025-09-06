import { QuizConfig } from '@/types/quiz';

export const jawaQuiz: QuizConfig = {
  id: 'jawa',
  name: 'Quiz Budaya Pulau Jawa',
  province: 'Pulau Jawa',
  description: 'Pusat peradaban dengan budaya Jawa, Sunda, dan Betawi',
  timeLimit: 20,
  passingScore: 70,
  theme: {
    primaryColor: '#F59E0B', // Amber-500
    secondaryColor: '#EA580C', // Orange-600
    backgroundColor: 'linear-gradient(135deg, #F59E0B 0%, #EA580C 50%, #FDE047 100%)',
    backgroundImage: '/images/jawa-pattern.png',
    icon: '🏛️',
    customElements: {
      patternOverlay: 'jawa',
      fontFamily: 'traditional',
      soundEffects: 'gamelan_jawa'
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
      id: 'jaw001',
      question: 'Candi Buddha terbesar di dunia yang terletak di Jawa Tengah adalah?',
      options: [
        'Candi Prambanan',
        'Candi Borobudur',
        'Candi Mendut',
        'Candi Sewu'
      ],
      correctAnswer: 1,
      explanation: 'Candi Borobudur adalah candi Buddha terbesar di dunia dan merupakan warisan dunia UNESCO yang terletak di Magelang, Jawa Tengah.',
      difficulty: 'mudah',
      category: 'Sejarah',
      hint: 'Candi Buddha yang merupakan warisan dunia UNESCO'
    },
    {
      id: 'jaw002',
      question: 'Kesenian tradisional Jawa yang menggunakan boneka kulit adalah?',
      options: [
        'Wayang Golek',
        'Wayang Kulit',
        'Wayang Orang',
        'Wayang Klitik'
      ],
      correctAnswer: 1,
      explanation: 'Wayang Kulit adalah pertunjukan tradisional Jawa menggunakan boneka dari kulit kerbau yang dimainkan oleh dalang.',
      difficulty: 'mudah',
      category: 'Seni Pertunjukan',
      hint: 'Pertunjukan yang dimainkan oleh dalang dengan boneka kulit'
    },
    {
      id: 'jaw003',
      question: 'Ibu kota Indonesia yang terletak di Pulau Jawa adalah?',
      options: [
        'Bandung',
        'Surabaya',
        'Jakarta',
        'Semarang'
      ],
      correctAnswer: 2,
      explanation: 'Jakarta adalah ibu kota Indonesia yang terletak di Pulau Jawa dan merupakan pusat pemerintahan serta bisnis.',
      difficulty: 'mudah',
      category: 'Geografi',
      hint: 'Pusat pemerintahan dan bisnis Indonesia'
    },
    {
      id: 'jaw004',
      question: 'Batik yang berasal dari Solo dan Yogyakarta memiliki ciri khas warna?',
      options: [
        'Merah dan Putih',
        'Biru dan Putih',
        'Coklat dan Putih',
        'Hitam dan Putih'
      ],
      correctAnswer: 2,
      explanation: 'Batik Jawa Tengah (Solo dan Yogyakarta) memiliki ciri khas warna coklat (sogan) dan putih dengan motif yang halus.',
      difficulty: 'menengah',
      category: 'Kerajinan',
      hint: 'Warna yang identik dengan batik klasik Jawa'
    },
    {
      id: 'jaw005',
      question: 'Makanan khas Yogyakarta yang terbuat dari nangka muda adalah?',
      options: [
        'Gudeg',
        'Gado-gado',
        'Pecel',
        'Lotek'
      ],
      correctAnswer: 0,
      explanation: 'Gudeg adalah makanan khas Yogyakarta yang terbuat dari nangka muda yang dimasak dengan santan dan bumbu.',
      difficulty: 'mudah',
      category: 'Kuliner',
      hint: 'Makanan manis khas Yogyakarta'
    },
    {
      id: 'jaw006',
      question: 'Alat musik gamelan yang berfungsi sebagai melodi utama adalah?',
      options: [
        'Kendang',
        'Saron',
        'Gong',
        'Rebab'
      ],
      correctAnswer: 3,
      explanation: 'Rebab adalah alat musik gesek dalam gamelan yang berfungsi sebagai pembawa melodi utama dan pemimpin lagu.',
      difficulty: 'menengah',
      category: 'Musik Tradisional',
      hint: 'Alat musik gesek yang memimpin melodi'
    },
    {
      id: 'jaw007',
      question: 'Tarian klasik Jawa yang biasanya dibawakan di keraton adalah?',
      options: [
        'Tari Kecak',
        'Tari Srimpi',
        'Tari Jaipong',
        'Tari Reog'
      ],
      correctAnswer: 1,
      explanation: 'Tari Srimpi adalah tarian klasik Jawa yang dibawakan oleh empat penari wanita dan berasal dari lingkungan keraton.',
      difficulty: 'menengah',
      category: 'Seni Tari',
      hint: 'Tarian klasik yang dibawakan oleh empat penari wanita'
    },
    {
      id: 'jaw008',
      question: 'Budaya khas Betawi Jakarta yang merupakan perpaduan berbagai etnis adalah?',
      options: [
        'Monokultur',
        'Asimilasi',
        'Multikultur',
        'Akulturasi'
      ],
      correctAnswer: 3,
      explanation: 'Budaya Betawi merupakan hasil akulturasi dari berbagai etnis seperti Melayu, Arab, Tionghoa, dan Eropa.',
      difficulty: 'menengah',
      category: 'Budaya',
      hint: 'Proses percampuran budaya dari berbagai etnis'
    },
    {
      id: 'jaw009',
      question: 'Kesenian tradisional Sunda yang menggunakan bambu adalah?',
      options: [
        'Angklung',
        'Calung',
        'Karinding',
        'Suling'
      ],
      correctAnswer: 0,
      explanation: 'Angklung adalah alat musik tradisional Sunda yang terbuat dari bambu dan telah diakui UNESCO sebagai warisan budaya dunia.',
      difficulty: 'mudah',
      category: 'Musik Tradisional',
      hint: 'Alat musik bambu yang diakui UNESCO'
    },
    {
      id: 'jaw010',
      question: 'Kerajaan Hindu terbesar di Jawa yang berpusat di Jawa Timur adalah?',
      options: [
        'Kerajaan Mataram',
        'Kerajaan Majapahit',
        'Kerajaan Singhasari',
        'Kerajaan Kediri'
      ],
      correctAnswer: 1,
      explanation: 'Kerajaan Majapahit adalah kerajaan Hindu-Buddha terbesar di Nusantara yang berpusat di Jawa Timur pada abad 13-16.',
      difficulty: 'menengah',
      category: 'Sejarah',
      hint: 'Kerajaan terbesar di Nusantara pada abad 13-16'
    },
    {
      id: 'jaw011',
      question: 'Upacara adat Jawa untuk memperingati 7 bulan kehamilan adalah?',
      options: [
        'Mitoni',
        'Tedhak Siten',
        'Sepasaran',
        'Slametan'
      ],
      correctAnswer: 0,
      explanation: 'Mitoni atau Tingkeban adalah upacara adat Jawa untuk memperingati kehamilan 7 bulan dengan berbagai ritual.',
      difficulty: 'sulit',
      category: 'Budaya',
      hint: 'Upacara untuk kehamilan 7 bulan'
    },
    {
      id: 'jaw012',
      question: 'Rumah tradisional Jawa yang memiliki pendopo di depannya adalah?',
      options: [
        'Joglo',
        'Limasan',
        'Kampung',
        'Panggang Pe'
      ],
      correctAnswer: 0,
      explanation: 'Rumah Joglo adalah rumah tradisional Jawa dengan atap berbentuk limas dan biasanya memiliki pendopo di bagian depan.',
      difficulty: 'menengah',
      category: 'Arsitektur',
      hint: 'Rumah dengan atap berbentuk limas dan pendopo'
    },
    {
      id: 'jaw013',
      question: 'Makanan khas Betawi yang berupa sayur dengan kuah santan adalah?',
      options: [
        'Soto Betawi',
        'Sayur Asem',
        'Asinan Betawi',
        'Kerak Telor'
      ],
      correctAnswer: 1,
      explanation: 'Sayur Asem adalah makanan khas Betawi berupa sayuran dengan kuah asam segar yang menggunakan asam jawa.',
      difficulty: 'menengah',
      category: 'Kuliner',
      hint: 'Sayuran dengan kuah asam segar'
    },
    {
      id: 'jaw014',
      question: 'Tarian dari Jawa Barat yang menggunakan selendang adalah?',
      options: [
        'Tari Merak',
        'Tari Jaipong',
        'Tari Topeng',
        'Tari Ronggeng'
      ],
      correctAnswer: 1,
      explanation: 'Tari Jaipong adalah tarian tradisional Jawa Barat yang energik dan sering menggunakan selendang sebagai properti.',
      difficulty: 'menengah',
      category: 'Seni Tari',
      hint: 'Tarian energik dari Jawa Barat'
    },
    {
      id: 'jaw015',
      question: 'Candi Hindu terbesar di Jawa Tengah yang didedikasikan untuk Siwa adalah?',
      options: [
        'Candi Borobudur',
        'Candi Prambanan',
        'Candi Gedong Songo',
        'Candi Dieng'
      ],
      correctAnswer: 1,
      explanation: 'Candi Prambanan adalah kompleks candi Hindu terbesar di Indonesia yang didedikasikan untuk Trimurti (Brahma, Wisnu, Siwa).',
      difficulty: 'menengah',
      category: 'Sejarah',
      hint: 'Kompleks candi Hindu terbesar di Indonesia'
    }
  ]
};
