import { QuizConfig } from '@/types/quiz';

export const sumateraQuiz: QuizConfig = {
  id: 'sumatera',
  name: 'Quiz Budaya Pulau Sumatera',
  province: 'Pulau Sumatera',
  description: 'Keragaman budaya dari Aceh hingga Lampung',
  timeLimit: 20,
  passingScore: 70,
  theme: {
    primaryColor: '#EA580C', // Orange-600
    secondaryColor: '#DC2626', // Red-600
    backgroundColor: 'linear-gradient(135deg, #EA580C 0%, #DC2626 50%, #FACC15 100%)',
    backgroundImage: '/images/sumatera-pattern.png',
    icon: '🏔️',
    customElements: {
      patternOverlay: 'sumatera',
      fontFamily: 'traditional',
      soundEffects: 'gamelan_melayu'
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
      id: 'sum001',
      question: 'Provinsi paling utara di Pulau Sumatera adalah?',
      options: [
        'Sumatera Utara',
        'Aceh',
        'Riau',
        'Sumatera Barat'
      ],
      correctAnswer: 1,
      explanation: 'Aceh adalah provinsi paling utara di Pulau Sumatera dan dikenal dengan sebutan Serambi Makkah.',
      difficulty: 'mudah',
      category: 'Geografi',
      hint: 'Provinsi ini dikenal sebagai Serambi Makkah'
    },
    {
      id: 'sum002',
      question: 'Rumah tradisional khas Sumatera Barat yang berbentuk seperti tanduk kerbau adalah?',
      options: [
        'Rumah Gadang',
        'Rumah Limas',
        'Rumah Bolon',
        'Rumah Panggung'
      ],
      correctAnswer: 0,
      explanation: 'Rumah Gadang adalah rumah tradisional Minangkabau dengan atap yang melengkung menyerupai tanduk kerbau.',
      difficulty: 'mudah',
      category: 'Arsitektur',
      hint: 'Rumah ini memiliki atap yang menyerupai tanduk kerbau'
    },
    {
      id: 'sum003',
      question: 'Danau terbesar di Pulau Sumatera yang terletak di Sumatera Utara adalah?',
      options: [
        'Danau Maninjau',
        'Danau Toba',
        'Danau Singkarak',
        'Danau Ranau'
      ],
      correctAnswer: 1,
      explanation: 'Danau Toba adalah danau vulkanik terbesar di dunia yang terletak di Sumatera Utara dan menjadi rumah suku Batak.',
      difficulty: 'mudah',
      category: 'Alam',
      hint: 'Danau vulkanik terbesar di dunia'
    },
    {
      id: 'sum004',
      question: 'Tarian tradisional dari Aceh yang menggambarkan kegembiraan adalah?',
      options: [
        'Tari Saman',
        'Tari Seudati',
        'Tari Ranup Lampuan',
        'Tari Ratoh Jaroe'
      ],
      correctAnswer: 1,
      explanation: 'Tari Seudati adalah tarian tradisional Aceh yang menggambarkan kegembiraan dan biasanya dibawakan oleh laki-laki.',
      difficulty: 'menengah',
      category: 'Seni Tari',
      hint: 'Tarian ini dibawakan oleh laki-laki dan menggambarkan kegembiraan'
    },
    {
      id: 'sum005',
      question: 'Makanan khas Sumatera Barat yang terbuat dari daging dan santan dengan bumbu rempah adalah?',
      options: [
        'Rendang',
        'Gulai',
        'Dendeng',
        'Kalio'
      ],
      correctAnswer: 0,
      explanation: 'Rendang adalah masakan khas Minangkabau yang telah diakui UNESCO sebagai makanan terlezat di dunia.',
      difficulty: 'mudah',
      category: 'Kuliner',
      hint: 'Makanan ini diakui UNESCO sebagai makanan terlezat di dunia'
    },
    {
      id: 'sum006',
      question: 'Suku asli Sumatera Utara yang mendiami sekitar Danau Toba adalah?',
      options: [
        'Suku Batak',
        'Suku Nias',
        'Suku Mentawai',
        'Suku Melayu'
      ],
      correctAnswer: 0,
      explanation: 'Suku Batak adalah suku asli yang mendiami kawasan Danau Toba dengan berbagai sub-suku seperti Batak Toba, Karo, dan Simalungun.',
      difficulty: 'mudah',
      category: 'Budaya',
      hint: 'Suku ini memiliki banyak sub-suku seperti Toba, Karo, dan Simalungun'
    },
    {
      id: 'sum007',
      question: 'Alat musik tradisional khas Sumatera Utara yang terbuat dari bambu adalah?',
      options: [
        'Gordang Sambilan',
        'Sarune',
        'Hasapi',
        'Guarantee'
      ],
      correctAnswer: 2,
      explanation: 'Hasapi adalah alat musik petik tradisional Batak yang terbuat dari kayu dan memiliki senar.',
      difficulty: 'menengah',
      category: 'Musik Tradisional',
      hint: 'Alat musik petik tradisional Batak'
    },
    {
      id: 'sum008',
      question: 'Kain tradisional Sumatera yang memiliki motif emas dan perak adalah?',
      options: [
        'Songket',
        'Batik',
        'Tenun',
        'Jumputan'
      ],
      correctAnswer: 0,
      explanation: 'Songket adalah kain tradisional yang menggunakan benang emas dan perak, populer di berbagai daerah Sumatera.',
      difficulty: 'mudah',
      category: 'Kerajinan',
      hint: 'Kain ini menggunakan benang emas dan perak'
    },
    {
      id: 'sum009',
      question: 'Pulau di lepas pantai Sumatera Barat yang terkenal dengan budaya surfingnya adalah?',
      options: [
        'Pulau Weh',
        'Pulau Mentawai',
        'Pulau Nias',
        'Pulau Enggano'
      ],
      correctAnswer: 1,
      explanation: 'Pulau Mentawai terkenal dengan ombaknya yang cocok untuk surfing dan budaya suku Mentawai yang unik.',
      difficulty: 'menengah',
      category: 'Alam',
      hint: 'Pulau ini terkenal dengan ombak untuk surfing'
    },
    {
      id: 'sum010',
      question: 'Sistem kekerabatan matrilineal di Sumatera Barat dikenal dengan istilah?',
      options: [
        'Adat Basandi Syarak',
        'Adat Minangkabau',
        'Sistem Mamak',
        'Bundo Kanduang'
      ],
      correctAnswer: 1,
      explanation: 'Adat Minangkabau menganut sistem matrilineal dimana garis keturunan dihitung dari pihak ibu.',
      difficulty: 'menengah',
      category: 'Budaya',
      hint: 'Sistem dimana garis keturunan dihitung dari pihak ibu'
    },
    {
      id: 'sum011',
      question: 'Tari tradisional Lampung yang menggunakan topeng adalah?',
      options: [
        'Tari Melinting',
        'Tari Jangget',
        'Tari Bedana',
        'Tari Sembah'
      ],
      correctAnswer: 1,
      explanation: 'Tari Jangget adalah tarian tradisional Lampung yang menggunakan topeng dan menggambarkan kehidupan rakyat.',
      difficulty: 'sulit',
      category: 'Seni Tari',
      hint: 'Tarian ini menggunakan topeng dan berasal dari Lampung'
    },
    {
      id: 'sum012',
      question: 'Kerajaan Islam pertama di Sumatera yang berpusat di Aceh adalah?',
      options: [
        'Kerajaan Aceh Darussalam',
        'Kerajaan Samudera Pasai',
        'Kerajaan Perlak',
        'Kerajaan Aru'
      ],
      correctAnswer: 2,
      explanation: 'Kerajaan Perlak adalah kerajaan Islam pertama di Nusantara yang berdiri di Aceh pada abad ke-9.',
      difficulty: 'sulit',
      category: 'Sejarah',
      hint: 'Kerajaan Islam pertama di Nusantara'
    },
    {
      id: 'sum013',
      question: 'Makanan tradisional Jambi yang terbuat dari ikan dan bumbu kuning adalah?',
      options: [
        'Gulai Ikan Patin',
        'Tempoyak',
        'Gulai Ikan Semah',
        'Ikan Baung'
      ],
      correctAnswer: 0,
      explanation: 'Gulai Ikan Patin adalah makanan khas Jambi yang menggunakan ikan patin dengan bumbu kuning yang kaya rempah.',
      difficulty: 'menengah',
      category: 'Kuliner',
      hint: 'Makanan khas Jambi dengan ikan air tawar'
    },
    {
      id: 'sum014',
      question: 'Upacara adat Batak untuk menyambut kelahiran anak adalah?',
      options: [
        'Mangupa',
        'Mamungkah',
        'Mangokal Holi',
        'Marboru'
      ],
      correctAnswer: 0,
      explanation: 'Mangupa adalah upacara adat Batak untuk menyambut kelahiran anak dengan memberikan nama dan doa.',
      difficulty: 'sulit',
      category: 'Budaya',
      hint: 'Upacara untuk menyambut kelahiran anak dalam budaya Batak'
    },
    {
      id: 'sum015',
      question: 'Kota yang dijuluki "Venesia dari Timur" di Sumatera Selatan adalah?',
      options: [
        'Palembang',
        'Prabumulih',
        'Lubuklinggau',
        'Lahat'
      ],
      correctAnswer: 0,
      explanation: 'Palembang dijuluki "Venesia dari Timur" karena banyaknya sungai dan kanal yang membelah kota.',
      difficulty: 'menengah',
      category: 'Geografi',
      hint: 'Kota ini memiliki banyak sungai dan kanal'
    }
  ]
};
