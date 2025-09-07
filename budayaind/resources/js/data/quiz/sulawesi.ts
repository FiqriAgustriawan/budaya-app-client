import { QuizConfig } from '@/types/quiz';

export const sulawesiQuiz: QuizConfig = {
  id: 'sulawesi',
  name: 'Quiz Budaya Pulau Sulawesi',
  province: 'Pulau Sulawesi',
  description: 'Pertemuan budaya Bugis, Makassar, Toraja, dan Minahasa',
  timeLimit: 20,
  passingScore: 70,
  theme: {
    primaryColor: '#0891B2', // Cyan-600
    secondaryColor: '#1D4ED8', // Blue-700
    backgroundColor: 'linear-gradient(135deg, #0891B2 0%, #1D4ED8 50%, #06B6D4 100%)',
    backgroundImage: '/images/sulawesi-pattern.png',
    icon: '🏛️',
    customElements: {
      patternOverlay: 'sulawesi',
      fontFamily: 'traditional',
      soundEffects: 'music_sulawesi'
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
      id: 'sul001',
      question: 'Rumah tradisional suku Toraja yang berbentuk perahu adalah?',
      options: [
        'Tongkonan',
        'Boyang',
        'Souraja',
        'Banua'
      ],
      correctAnswer: 0,
      explanation: 'Tongkonan adalah rumah tradisional suku Toraja yang berbentuk seperti perahu dengan atap melengkung dan memiliki makna spiritual yang mendalam.',
      difficulty: 'mudah',
      category: 'Arsitektur',
      hint: 'Rumah yang berbentuk seperti perahu dari Toraja'
    },
    {
      id: 'sul002',
      question: 'Kapal tradisional suku Bugis yang terkenal di seluruh Nusantara adalah?',
      options: [
        'Pinisi',
        'Paduakang',
        'Sandeq',
        'Lepa'
      ],
      correctAnswer: 0,
      explanation: 'Pinisi adalah kapal tradisional suku Bugis-Makassar yang terkenal dengan kemampuan navigasinya dan kini menjadi simbol kebanggaan maritim Indonesia.',
      difficulty: 'mudah',
      category: 'Budaya Maritim',
      hint: 'Kapal tradisional yang menjadi simbol maritim Indonesia'
    },
    {
      id: 'sul003',
      question: 'Upacara pemakaman suku Toraja yang sangat terkenal adalah?',
      options: [
        'Rambu Solo',
        'Rambu Tuka',
        'Ma\'bua',
        'Aluk Todolo'
      ],
      correctAnswer: 0,
      explanation: 'Rambu Solo adalah upacara pemakaman adat Toraja yang berlangsung berhari-hari dengan ritual yang kompleks dan penyembelihan kerbau.',
      difficulty: 'menengah',
      category: 'Budaya',
      hint: 'Upacara pemakaman yang berlangsung berhari-hari'
    },
    {
      id: 'sul004',
      question: 'Makanan khas Makassar yang terbuat dari ikan dengan kuah asam adalah?',
      options: [
        'Coto Makassar',
        'Pallubasa',
        'Ikan Bakar Juwana',
        'Es Pisang Ijo'
      ],
      correctAnswer: 1,
      explanation: 'Pallubasa adalah makanan khas Makassar berupa sup dengan kuah bening yang berisi jeroan sapi dan memiliki rasa yang gurih.',
      difficulty: 'menengah',
      category: 'Kuliner',
      hint: 'Sup khas Makassar dengan kuah bening'
    },
    {
      id: 'sul005',
      question: 'Suku yang mendiami wilayah Sulawesi Utara dan terkenal dengan budaya "Torang Samua Basudara" adalah?',
      options: [
        'Suku Minahasa',
        'Suku Sangir',
        'Suku Talaud',
        'Suku Bolaang Mongondow'
      ],
      correctAnswer: 0,
      explanation: 'Suku Minahasa adalah suku terbesar di Sulawesi Utara yang terkenal dengan semboyan "Torang Samua Basudara" (Kita Semua Bersaudara).',
      difficulty: 'mudah',
      category: 'Budaya',
      hint: 'Suku dengan semboyan "Kita Semua Bersaudara"'
    },
    {
      id: 'sul006',
      question: 'Tarian tradisional Sulawesi Selatan yang menggambarkan keperkasaan prajurit adalah?',
      options: [
        'Tari Pakarena',
        'Tari Bosara',
        'Tari Kipas',
        'Tari Ma\'gellu'
      ],
      correctAnswer: 1,
      explanation: 'Tari Bosara adalah tarian tradisional Bugis-Makassar yang menggambarkan keperkasaan dan keberanian prajurit dalam peperangan.',
      difficulty: 'menengah',
      category: 'Seni Tari',
      hint: 'Tarian yang menggambarkan keperkasaan prajurit'
    },
    {
      id: 'sul007',
      question: 'Alat musik tradisional Toraja yang terbuat dari bambu adalah?',
      options: [
        'Pa\'pelle',
        'Suling Lembang',
        'Pa\'ole ole',
        'Popondi'
      ],
      correctAnswer: 0,
      explanation: 'Pa\'pelle adalah alat musik tradisional Toraja yang terbuat dari bambu dan dimainkan dengan cara ditiup.',
      difficulty: 'sulit',
      category: 'Musik Tradisional',
      hint: 'Alat musik bambu yang ditiup dari Toraja'
    },
    {
      id: 'sul008',
      question: 'Kain tradisional Bugis yang memiliki motif geometris adalah?',
      options: [
        'Tenun Sabbe',
        'Lipa Sabbe',
        'Songket Bugis',
        'Sutera Wajo'
      ],
      correctAnswer: 1,
      explanation: 'Lipa Sabbe adalah kain tradisional Bugis yang memiliki motif kotak-kotak dan digunakan untuk berbagai upacara adat.',
      difficulty: 'sulit',
      category: 'Kerajinan',
      hint: 'Kain dengan motif kotak-kotak dari Bugis'
    },
    {
      id: 'sul009',
      question: 'Danau yang terletak di tengah Pulau Sulawesi dan menjadi habitat ikan endemik adalah?',
      options: [
        'Danau Poso',
        'Danau Towuti',
        'Danau Matano',
        'Danau Tempe'
      ],
      correctAnswer: 2,
      explanation: 'Danau Matano adalah danau terdalam di Indonesia dan Asia Tenggara yang menjadi habitat berbagai ikan endemik.',
      difficulty: 'menengah',
      category: 'Alam',
      hint: 'Danau terdalam di Indonesia'
    },
    {
      id: 'sul010',
      question: 'Festival budaya Toraja yang diadakan untuk merayakan panen adalah?',
      options: [
        'Ma\'nene',
        'Rambu Tuka',
        'Ma\'bua',
        'Aluk Pa\'rapuan'
      ],
      correctAnswer: 1,
      explanation: 'Rambu Tuka adalah serangkaian upacara yang berkaitan dengan kehidupan, termasuk upacara panen dan syukuran dalam budaya Toraja.',
      difficulty: 'sulit',
      category: 'Budaya',
      hint: 'Upacara yang berkaitan dengan kehidupan dan panen'
    },
    {
      id: 'sul011',
      question: 'Makanan khas Minahasa yang terbuat dari daging babi dengan bumbu rica-rica adalah?',
      options: [
        'Se\'i Babi',
        'Babi Rica',
        'Babi Putar',
        'Babi Kecap'
      ],
      correctAnswer: 1,
      explanation: 'Babi Rica adalah makanan khas Minahasa yang menggunakan cabai rawit sebagai bumbu utama sehingga memiliki rasa yang sangat pedas.',
      difficulty: 'menengah',
      category: 'Kuliner',
      hint: 'Makanan pedas khas Minahasa'
    },
    {
      id: 'sul012',
      question: 'Patung batu kuno yang ditemukan di Sulawesi Tengah adalah?',
      options: [
        'Kalamba',
        'Watu Pochong',
        'Megalith Bada',
        'Arca Tadulako'
      ],
      correctAnswer: 2,
      explanation: 'Megalith Bada adalah patung-patung batu kuno yang ditemukan di Lembah Bada, Sulawesi Tengah, yang masih misterius asal-usulnya.',
      difficulty: 'sulit',
      category: 'Sejarah',
      hint: 'Patung batu misterius di Lembah Bada'
    },
    {
      id: 'sul013',
      question: 'Kerajaan maritim terbesar di Sulawesi Selatan adalah?',
      options: [
        'Kerajaan Gowa',
        'Kerajaan Bone',
        'Kerajaan Wajo',
        'Kerajaan Soppeng'
      ],
      correctAnswer: 0,
      explanation: 'Kerajaan Gowa adalah kerajaan maritim terbesar di Sulawesi Selatan yang pernah menguasai sebagian besar wilayah Sulawesi.',
      difficulty: 'menengah',
      category: 'Sejarah',
      hint: 'Kerajaan maritim terbesar di Sulawesi Selatan'
    },
    {
      id: 'sul014',
      question: 'Tarian tradisional Minahasa yang menggambarkan kehidupan sehari-hari adalah?',
      options: [
        'Tari Maengket',
        'Tari Cakalele',
        'Tari Poco-poco',
        'Tari Kabasaran'
      ],
      correctAnswer: 0,
      explanation: 'Tari Maengket adalah tarian tradisional Minahasa yang menggambarkan kehidupan sehari-hari petani dan kegiatan gotong royong.',
      difficulty: 'menengah',
      category: 'Seni Tari',
      hint: 'Tarian yang menggambarkan kehidupan petani'
    },
    {
      id: 'sul015',
      question: 'Upacara adat Toraja untuk membersihkan dan mengganti pakaian jenazah leluhur adalah?',
      options: [
        'Ma\'nene',
        'Rambu Solo',
        'Ma\'bua',
        'Aluk Todolo'
      ],
      correctAnswer: 0,
      explanation: 'Ma\'nene adalah upacara adat Toraja untuk membersihkan dan mengganti pakaian jenazah leluhur yang dilakukan setiap beberapa tahun sekali.',
      difficulty: 'sulit',
      category: 'Budaya',
      hint: 'Upacara membersihkan dan mengganti pakaian jenazah leluhur'
    }
  ]
};
