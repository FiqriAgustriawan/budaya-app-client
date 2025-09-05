import { QuizConfig } from '@/types/quiz';

export const indonesiaQuiz: QuizConfig = {
  id: 'indonesia',
  name: 'Quiz Budaya Indonesia',
  province: 'Indonesia',
  description: 'Jelajahi kekayaan Bhinneka Tunggal Ika dan warisan budaya Nusantara yang beragam',
  timeLimit: 20,
  passingScore: 75,
  theme: {
    primaryColor: '#DC2626', // Red
    secondaryColor: '#FFFFFF', // White
    backgroundColor: 'linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #FFFFFF 100%)',
    backgroundImage: '/images/garuda-pattern.png',
    icon: '🇮🇩',
    customElements: {
      patternOverlay: 'national',
      fontFamily: 'patriotic',
      soundEffects: 'anthem'
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
      id: 'id001',
      question: 'Motto bangsa Indonesia yang berarti "Berbeda-beda tetapi tetap satu" adalah?',
      options: [
        'Bhinneka Tunggal Ika',
        'Pancasila',
        'Indonesia Raya',
        'Garuda Pancasila'
      ],
      correctAnswer: 0,
      explanation: 'Bhinneka Tunggal Ika adalah motto Indonesia yang berasal dari bahasa Jawa Kuno yang berarti "berbeda-beda tetapi tetap satu", melambangkan persatuan dalam keragaman.',
      difficulty: 'mudah',
      category: 'Nasional',
      hint: 'Motto ini berasal dari bahasa Jawa Kuno dan tertulis di lambang negara',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'id002',
      question: 'Jumlah sila dalam Pancasila adalah?',
      options: [
        'Tiga',
        'Empat',
        'Lima',
        'Enam'
      ],
      correctAnswer: 2,
      explanation: 'Pancasila terdiri dari lima sila yang menjadi dasar negara Indonesia: Ketuhanan, Kemanusiaan, Persatuan, Kerakyatan, dan Keadilan.',
      difficulty: 'mudah',
      category: 'Pancasila',
      hint: 'Nama "Pancasila" sendiri sudah menunjukkan jumlahnya',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'id003',
      question: 'Burung yang menjadi lambang negara Indonesia adalah?',
      options: [
        'Elang',
        'Garuda',
        'Rajawali',
        'Condor'
      ],
      correctAnswer: 1,
      explanation: 'Garuda adalah burung mitologi yang menjadi lambang negara Indonesia, melambangkan kekuatan, keagungan, dan kemerdekaan.',
      difficulty: 'mudah',
      category: 'Simbol Nasional',
      hint: 'Burung ini berasal dari mitologi Hindu-Buddha dan menjadi kendaraan Dewa Wisnu',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'id004',
      question: 'Lagu kebangsaan Indonesia yang diciptakan oleh W.R. Supratman adalah?',
      options: [
        'Bagimu Negeri',
        'Gugur Bunga',
        'Indonesia Raya',
        'Hari Merdeka'
      ],
      correctAnswer: 2,
      explanation: 'Indonesia Raya adalah lagu kebangsaan Indonesia yang diciptakan oleh Wage Rudolf Supratman pada tahun 1928 dan pertama kali dikumandangkan dalam Kongres Pemuda II.',
      difficulty: 'mudah',
      category: 'Simbol Nasional',
      hint: 'Lagu ini pertama kali dikumandangkan pada Kongres Pemuda II tahun 1928',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'id005',
      question: 'Hari kemerdekaan Indonesia diperingati pada tanggal?',
      options: [
        '17 Agustus 1945',
        '20 Mei 1908',
        '28 Oktober 1928',
        '1 Juni 1945'
      ],
      correctAnswer: 0,
      explanation: 'Indonesia merdeka pada tanggal 17 Agustus 1945 yang diproklamasikan oleh Soekarno-Hatta di Jalan Pegangsaan Timur 56, Jakarta.',
      difficulty: 'mudah',
      category: 'Sejarah',
      hint: 'Tanggal ini diperingati setiap tahun sebagai Hari Kemerdekaan RI',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'id006',
      question: 'Presiden pertama Republik Indonesia adalah?',
      options: [
        'Mohammad Hatta',
        'Soekarno',
        'Soeharto',
        'Sjahrir'
      ],
      correctAnswer: 1,
      explanation: 'Soekarno adalah presiden pertama Republik Indonesia yang menjabat dari tahun 1945-1967 dan dikenal sebagai Proklamator Kemerdekaan bersama Mohammad Hatta.',
      difficulty: 'mudah',
      category: 'Sejarah',
      hint: 'Beliau adalah Proklamator Kemerdekaan Indonesia bersama Mohammad Hatta',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'id007',
      question: 'Sumpah Pemuda yang berisi tiga ikrar diucapkan pada tahun?',
      options: [
        '1926',
        '1928',
        '1945',
        '1949'
      ],
      correctAnswer: 1,
      explanation: 'Sumpah Pemuda diikrarkan pada tanggal 28 Oktober 1928 dalam Kongres Pemuda II di Jakarta, berisi tiga ikrar: satu tanah air, satu bangsa, satu bahasa.',
      difficulty: 'menengah',
      category: 'Sejarah',
      hint: 'Peristiwa ini terjadi dalam Kongres Pemuda II di Jakarta',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'id008',
      question: 'Jumlah provinsi di Indonesia saat ini adalah?',
      options: [
        '32',
        '33',
        '34',
        '38'
      ],
      correctAnswer: 3,
      explanation: 'Indonesia saat ini memiliki 38 provinsi setelah pemekaran beberapa daerah, termasuk Papua Selatan, Papua Tengah, dan Papua Pegunungan yang terbaru.',
      difficulty: 'menengah',
      category: 'Geografi',
      hint: 'Jumlah ini termasuk provinsi-provinsi hasil pemekaran terbaru',
      points: 15,
      timeLimit: 45
    },
    {
      id: 'id009',
      question: 'Filosofi Pancasila yang pertama berbunyi?',
      options: [
        'Kemanusiaan yang adil dan beradab',
        'Ketuhanan Yang Maha Esa',
        'Persatuan Indonesia',
        'Kerakyatan yang dipimpin oleh hikmat'
      ],
      correctAnswer: 1,
      explanation: 'Sila pertama Pancasila adalah "Ketuhanan Yang Maha Esa" yang menegaskan bahwa bangsa Indonesia mengakui adanya Tuhan dan menjamin kebebasan beragama.',
      difficulty: 'mudah',
      category: 'Pancasila',
      hint: 'Sila ini berkaitan dengan kepercayaan kepada Tuhan',
      points: 10,
      timeLimit: 30
    },
    {
      id: 'id010',
      question: 'Organisasi pergerakan nasional pertama di Indonesia adalah?',
      options: [
        'Budi Utomo',
        'Sarekat Islam',
        'Indische Partij',
        'Perhimpunan Indonesia'
      ],
      correctAnswer: 0,
      explanation: 'Budi Utomo didirikan pada 20 Mei 1908 oleh dr. Sutomo dan merupakan organisasi pergerakan nasional pertama di Indonesia yang menandai awal kebangkitan nasional.',
      difficulty: 'sulit',
      category: 'Sejarah',
      hint: 'Organisasi ini didirikan pada tanggal yang diperingati sebagai Hari Kebangkitan Nasional',
      points: 20,
      timeLimit: 60
    }
  ]
};
