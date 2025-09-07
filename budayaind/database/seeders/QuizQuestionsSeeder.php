<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\QuizQuestion;

class QuizQuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing quiz questions
        QuizQuestion::truncate();

        // Get all quiz data
        $allQuestions = $this->getAllQuizQuestions();

        // Insert all questions
        foreach ($allQuestions as $question) {
            QuizQuestion::create($question);
        }

        $totalQuestions = count($allQuestions);
        $questionsByIsland = [];

        foreach ($allQuestions as $question) {
            $island = $question['island'];
            if (!isset($questionsByIsland[$island])) {
                $questionsByIsland[$island] = 0;
            }
            $questionsByIsland[$island]++;
        }

        $this->command->info("Successfully seeded {$totalQuestions} quiz questions!");
        $this->command->info("Questions per island:");
        foreach ($questionsByIsland as $island => $count) {
            $this->command->info("- {$island}: {$count} questions");
        }
    }

    private function getAllQuizQuestions(): array
    {
        return array_merge(
            $this->getIndonesiaQuestions(),
            $this->getJawaQuestions(),
            $this->getKalimantanQuestions(),
            $this->getSulawesiQuestions(),
            $this->getPapuaQuestions(),
            $this->getSumateraQuestions()
        );
    }

    private function getIndonesiaQuestions(): array
    {
        return [
            [
                'question_id' => 'id001',
                'island' => 'indonesia',
                'question' => 'Motto bangsa Indonesia yang berarti "Berbeda-beda tetapi tetap satu" adalah?',
                'options' => ['Bhinneka Tunggal Ika', 'Pancasila', 'Indonesia Raya', 'Garuda Pancasila'],
                'correct_answer' => 0,
                'explanation' => 'Bhinneka Tunggal Ika adalah motto Indonesia yang berasal dari bahasa Jawa Kuno yang berarti "berbeda-beda tetapi tetap satu", melambangkan persatuan dalam keragaman.',
                'difficulty' => 'mudah',
                'category' => 'Nasional',
                'hint' => 'Motto ini berasal dari bahasa Jawa Kuno dan tertulis di lambang negara',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'id002',
                'island' => 'indonesia',
                'question' => 'Jumlah sila dalam Pancasila adalah?',
                'options' => ['Tiga', 'Empat', 'Lima', 'Enam'],
                'correct_answer' => 2,
                'explanation' => 'Pancasila terdiri dari lima sila yang menjadi dasar negara Indonesia: Ketuhanan, Kemanusiaan, Persatuan, Kerakyatan, dan Keadilan.',
                'difficulty' => 'mudah',
                'category' => 'Pancasila',
                'hint' => 'Nama "Pancasila" sendiri sudah menunjukkan jumlahnya',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'id003',
                'island' => 'indonesia',
                'question' => 'Burung yang menjadi lambang negara Indonesia adalah?',
                'options' => ['Elang', 'Garuda', 'Rajawali', 'Condor'],
                'correct_answer' => 1,
                'explanation' => 'Garuda adalah burung mitologi yang menjadi lambang negara Indonesia, melambangkan kekuatan, keagungan, dan kemerdekaan.',
                'difficulty' => 'mudah',
                'category' => 'Simbol Nasional',
                'hint' => 'Burung ini berasal dari mitologi Hindu-Buddha dan menjadi kendaraan Dewa Wisnu',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'id004',
                'island' => 'indonesia',
                'question' => 'Lagu kebangsaan Indonesia yang diciptakan oleh W.R. Supratman adalah?',
                'options' => ['Bagimu Negeri', 'Gugur Bunga', 'Indonesia Raya', 'Hari Merdeka'],
                'correct_answer' => 2,
                'explanation' => 'Indonesia Raya adalah lagu kebangsaan Indonesia yang diciptakan oleh Wage Rudolf Supratman pada tahun 1928 dan pertama kali dikumandangkan dalam Kongres Pemuda II.',
                'difficulty' => 'mudah',
                'category' => 'Simbol Nasional',
                'hint' => 'Lagu ini pertama kali dikumandangkan pada Kongres Pemuda II tahun 1928',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'id005',
                'island' => 'indonesia',
                'question' => 'Hari kemerdekaan Indonesia diperingati pada tanggal?',
                'options' => ['17 Agustus 1945', '20 Mei 1908', '28 Oktober 1928', '1 Juni 1945'],
                'correct_answer' => 0,
                'explanation' => 'Indonesia merdeka pada tanggal 17 Agustus 1945 yang diproklamasikan oleh Soekarno-Hatta di Jalan Pegangsaan Timur 56, Jakarta.',
                'difficulty' => 'mudah',
                'category' => 'Sejarah',
                'hint' => 'Tanggal ini diperingati setiap tahun sebagai Hari Kemerdekaan RI',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'id006',
                'island' => 'indonesia',
                'question' => 'Presiden pertama Republik Indonesia adalah?',
                'options' => ['Mohammad Hatta', 'Soekarno', 'Soeharto', 'Sjahrir'],
                'correct_answer' => 1,
                'explanation' => 'Soekarno adalah presiden pertama Republik Indonesia yang menjabat dari tahun 1945-1967 dan dikenal sebagai Proklamator Kemerdekaan bersama Mohammad Hatta.',
                'difficulty' => 'mudah',
                'category' => 'Sejarah',
                'hint' => 'Beliau adalah Proklamator Kemerdekaan Indonesia bersama Mohammad Hatta',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'id007',
                'island' => 'indonesia',
                'question' => 'Sumpah Pemuda yang berisi tiga ikrar diucapkan pada tahun?',
                'options' => ['1926', '1928', '1945', '1949'],
                'correct_answer' => 1,
                'explanation' => 'Sumpah Pemuda diikrarkan pada tanggal 28 Oktober 1928 dalam Kongres Pemuda II di Jakarta, berisi tiga ikrar: satu tanah air, satu bangsa, satu bahasa.',
                'difficulty' => 'menengah',
                'category' => 'Sejarah',
                'hint' => 'Peristiwa ini terjadi dalam Kongres Pemuda II di Jakarta',
                'points' => 15,
                'time_limit' => 45
            ],
            [
                'question_id' => 'id008',
                'island' => 'indonesia',
                'question' => 'Jumlah provinsi di Indonesia saat ini adalah?',
                'options' => ['32', '33', '34', '38'],
                'correct_answer' => 3,
                'explanation' => 'Indonesia saat ini memiliki 38 provinsi setelah pemekaran beberapa daerah, termasuk Papua Selatan, Papua Tengah, dan Papua Pegunungan yang terbaru.',
                'difficulty' => 'menengah',
                'category' => 'Geografi',
                'hint' => 'Jumlah ini termasuk provinsi-provinsi hasil pemekaran terbaru',
                'points' => 15,
                'time_limit' => 45
            ],
            [
                'question_id' => 'id009',
                'island' => 'indonesia',
                'question' => 'Filosofi Pancasila yang pertama berbunyi?',
                'options' => ['Kemanusiaan yang adil dan beradab', 'Ketuhanan Yang Maha Esa', 'Persatuan Indonesia', 'Kerakyatan yang dipimpin oleh hikmat'],
                'correct_answer' => 1,
                'explanation' => 'Sila pertama Pancasila adalah "Ketuhanan Yang Maha Esa" yang menegaskan bahwa bangsa Indonesia mengakui adanya Tuhan dan menjamin kebebasan beragama.',
                'difficulty' => 'mudah',
                'category' => 'Pancasila',
                'hint' => 'Sila ini berkaitan dengan kepercayaan kepada Tuhan',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'id010',
                'island' => 'indonesia',
                'question' => 'Organisasi pergerakan nasional pertama di Indonesia adalah?',
                'options' => ['Budi Utomo', 'Sarekat Islam', 'Indische Partij', 'Perhimpunan Indonesia'],
                'correct_answer' => 0,
                'explanation' => 'Budi Utomo didirikan pada 20 Mei 1908 oleh dr. Sutomo dan merupakan organisasi pergerakan nasional pertama di Indonesia yang menandai awal kebangkitan nasional.',
                'difficulty' => 'sulit',
                'category' => 'Sejarah',
                'hint' => 'Organisasi ini didirikan pada tanggal yang diperingati sebagai Hari Kebangkitan Nasional',
                'points' => 20,
                'time_limit' => 60
            ]
        ];
    }

    private function getJawaQuestions(): array
    {
        return [
            [
                'question_id' => 'jaw001',
                'island' => 'jawa',
                'question' => 'Candi Buddha terbesar di dunia yang terletak di Jawa Tengah adalah?',
                'options' => ['Candi Prambanan', 'Candi Borobudur', 'Candi Mendut', 'Candi Sewu'],
                'correct_answer' => 1,
                'explanation' => 'Candi Borobudur adalah candi Buddha terbesar di dunia dan merupakan warisan dunia UNESCO yang terletak di Magelang, Jawa Tengah.',
                'difficulty' => 'mudah',
                'category' => 'Sejarah',
                'hint' => 'Candi Buddha yang merupakan warisan dunia UNESCO',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'jaw002',
                'island' => 'jawa',
                'question' => 'Kesenian tradisional Jawa yang menggunakan boneka kulit adalah?',
                'options' => ['Wayang Golek', 'Wayang Kulit', 'Wayang Orang', 'Wayang Klitik'],
                'correct_answer' => 1,
                'explanation' => 'Wayang Kulit adalah pertunjukan tradisional Jawa menggunakan boneka dari kulit kerbau yang dimainkan oleh dalang.',
                'difficulty' => 'mudah',
                'category' => 'Seni Pertunjukan',
                'hint' => 'Pertunjukan yang dimainkan oleh dalang dengan boneka kulit',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'jaw003',
                'island' => 'jawa',
                'question' => 'Ibu kota Indonesia yang terletak di Pulau Jawa adalah?',
                'options' => ['Bandung', 'Surabaya', 'Jakarta', 'Semarang'],
                'correct_answer' => 2,
                'explanation' => 'Jakarta adalah ibu kota Indonesia yang terletak di Pulau Jawa dan merupakan pusat pemerintahan serta bisnis.',
                'difficulty' => 'mudah',
                'category' => 'Geografi',
                'hint' => 'Pusat pemerintahan dan bisnis Indonesia',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'jaw004',
                'island' => 'jawa',
                'question' => 'Batik yang berasal dari Solo dan Yogyakarta memiliki ciri khas warna?',
                'options' => ['Merah dan Putih', 'Biru dan Putih', 'Coklat dan Putih', 'Hitam dan Putih'],
                'correct_answer' => 2,
                'explanation' => 'Batik Jawa Tengah (Solo dan Yogyakarta) memiliki ciri khas warna coklat (sogan) dan putih dengan motif yang halus.',
                'difficulty' => 'menengah',
                'category' => 'Kerajinan',
                'hint' => 'Warna yang identik dengan batik klasik Jawa',
                'points' => 15,
                'time_limit' => 45
            ],
            [
                'question_id' => 'jaw005',
                'island' => 'jawa',
                'question' => 'Makanan khas Yogyakarta yang terbuat dari nangka muda adalah?',
                'options' => ['Gudeg', 'Gado-gado', 'Pecel', 'Lotek'],
                'correct_answer' => 0,
                'explanation' => 'Gudeg adalah makanan khas Yogyakarta yang terbuat dari nangka muda yang dimasak dengan santan dan bumbu.',
                'difficulty' => 'mudah',
                'category' => 'Kuliner',
                'hint' => 'Makanan manis khas Yogyakarta',
                'points' => 10,
                'time_limit' => 30
            ]
        ];
    }

    private function getKalimantanQuestions(): array
    {
        return [
            [
                'question_id' => 'kl001',
                'island' => 'kalimantan',
                'question' => 'Suku asli Kalimantan yang terkenal dengan rumah betang adalah?',
                'options' => ['Suku Dayak', 'Suku Banjar', 'Suku Kutai', 'Suku Melayu'],
                'correct_answer' => 0,
                'explanation' => 'Suku Dayak adalah suku asli Kalimantan yang terkenal dengan rumah betang (rumah panjang) dan kearifan lokal dalam menjaga hutan.',
                'difficulty' => 'mudah',
                'category' => 'Suku & Budaya',
                'hint' => 'Suku ini terkenal dengan rumah panjang yang dapat menampung banyak keluarga',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'kl002',
                'island' => 'kalimantan',
                'question' => 'Hewan endemik Kalimantan yang terancam punah dan hidup di pohon adalah?',
                'options' => ['Harimau', 'Orangutan', 'Gajah', 'Badak'],
                'correct_answer' => 1,
                'explanation' => 'Orangutan adalah primata endemik Kalimantan yang hidup di pohon dan saat ini terancam punah akibat deforestasi dan perburuan liar.',
                'difficulty' => 'mudah',
                'category' => 'Flora Fauna',
                'hint' => 'Primata ini memiliki rambut kemerahan dan sangat pandai memanjat',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'kl003',
                'island' => 'kalimantan',
                'question' => 'Pasar terapung yang terkenal di Kalimantan Selatan adalah?',
                'options' => ['Pasar Klewer', 'Pasar Lok Baintan', 'Pasar Beringharjo', 'Pasar Tanah Abang'],
                'correct_answer' => 1,
                'explanation' => 'Pasar Lok Baintan adalah pasar terapung tradisional di Kalimantan Selatan dimana pedagang berjualan di atas perahu di sungai.',
                'difficulty' => 'menengah',
                'category' => 'Wisata',
                'hint' => 'Pasar ini berada di atas air dan pedagangnya menggunakan perahu',
                'points' => 15,
                'time_limit' => 45
            ],
            [
                'question_id' => 'kl004',
                'island' => 'kalimantan',
                'question' => 'Rumah tradisional Dayak yang berbentuk panjang dan dapat menampung banyak keluarga adalah?',
                'options' => ['Rumah Betang', 'Rumah Gadang', 'Tongkonan', 'Honai'],
                'correct_answer' => 0,
                'explanation' => 'Rumah Betang adalah rumah tradisional Dayak yang berbentuk panjang dan dapat menampung puluhan keluarga, melambangkan kebersamaan dan gotong royong.',
                'difficulty' => 'mudah',
                'category' => 'Arsitektur',
                'hint' => 'Rumah ini sangat panjang dan ditinggali oleh banyak keluarga sekaligus',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'kl005',
                'island' => 'kalimantan',
                'question' => 'Makanan tradisional Kalimantan yang terbuat dari ikan haruan adalah?',
                'options' => ['Pempek', 'Amplang', 'Ketupat Kandangan', 'Soto Banjar'],
                'correct_answer' => 1,
                'explanation' => 'Amplang adalah makanan khas Kalimantan yang terbuat dari ikan haruan yang digoreng kering dan dibentuk seperti kerupuk.',
                'difficulty' => 'menengah',
                'category' => 'Kuliner',
                'hint' => 'Makanan ini berbentuk seperti kerupuk dan terbuat dari ikan',
                'points' => 15,
                'time_limit' => 45
            ]
        ];
    }

    private function getSulawesiQuestions(): array
    {
        return [
            [
                'question_id' => 'sul001',
                'island' => 'sulawesi',
                'question' => 'Rumah tradisional suku Toraja yang berbentuk perahu adalah?',
                'options' => ['Tongkonan', 'Boyang', 'Souraja', 'Banua'],
                'correct_answer' => 0,
                'explanation' => 'Tongkonan adalah rumah tradisional suku Toraja yang berbentuk seperti perahu dengan atap melengkung dan memiliki makna spiritual yang mendalam.',
                'difficulty' => 'mudah',
                'category' => 'Arsitektur',
                'hint' => 'Rumah yang berbentuk seperti perahu dari Toraja',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'sul002',
                'island' => 'sulawesi',
                'question' => 'Kapal tradisional suku Bugis yang terkenal di seluruh Nusantara adalah?',
                'options' => ['Pinisi', 'Paduakang', 'Sandeq', 'Lepa'],
                'correct_answer' => 0,
                'explanation' => 'Pinisi adalah kapal tradisional suku Bugis-Makassar yang terkenal dengan kemampuan navigasinya dan kini menjadi simbol kebanggaan maritim Indonesia.',
                'difficulty' => 'mudah',
                'category' => 'Budaya Maritim',
                'hint' => 'Kapal tradisional yang menjadi simbol maritim Indonesia',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'sul003',
                'island' => 'sulawesi',
                'question' => 'Upacara pemakaman suku Toraja yang sangat terkenal adalah?',
                'options' => ['Rambu Solo', 'Rambu Tuka', 'Ma\'bua', 'Aluk Todolo'],
                'correct_answer' => 0,
                'explanation' => 'Rambu Solo adalah upacara pemakaman adat Toraja yang berlangsung berhari-hari dengan ritual yang kompleks dan penyembelihan kerbau.',
                'difficulty' => 'menengah',
                'category' => 'Budaya',
                'hint' => 'Upacara pemakaman yang berlangsung berhari-hari',
                'points' => 15,
                'time_limit' => 45
            ],
            [
                'question_id' => 'sul004',
                'island' => 'sulawesi',
                'question' => 'Makanan khas Makassar yang terbuat dari ikan dengan kuah asam adalah?',
                'options' => ['Coto Makassar', 'Pallubasa', 'Ikan Bakar Juwana', 'Es Pisang Ijo'],
                'correct_answer' => 1,
                'explanation' => 'Pallubasa adalah makanan khas Makassar berupa sup dengan kuah bening yang berisi jeroan sapi dan memiliki rasa yang gurih.',
                'difficulty' => 'menengah',
                'category' => 'Kuliner',
                'hint' => 'Sup khas Makassar dengan kuah bening',
                'points' => 15,
                'time_limit' => 45
            ],
            [
                'question_id' => 'sul005',
                'island' => 'sulawesi',
                'question' => 'Suku yang mendiami wilayah Sulawesi Utara dan terkenal dengan budaya "Torang Samua Basudara" adalah?',
                'options' => ['Suku Minahasa', 'Suku Sangir', 'Suku Talaud', 'Suku Bolaang Mongondow'],
                'correct_answer' => 0,
                'explanation' => 'Suku Minahasa adalah suku terbesar di Sulawesi Utara yang terkenal dengan semboyan "Torang Samua Basudara" (Kita Semua Bersaudara).',
                'difficulty' => 'mudah',
                'category' => 'Budaya',
                'hint' => 'Suku dengan semboyan "Kita Semua Bersaudara"',
                'points' => 10,
                'time_limit' => 30
            ]
        ];
    }

    private function getPapuaQuestions(): array
    {
        return [
            [
                'question_id' => 'pp001',
                'island' => 'papua',
                'question' => 'Burung yang menjadi simbol Papua dan dikenal dengan keindahan bulunya adalah?',
                'options' => ['Burung Cendrawasih', 'Burung Garuda', 'Burung Kakatua', 'Burung Elang'],
                'correct_answer' => 0,
                'explanation' => 'Burung Cendrawasih atau Bird of Paradise adalah burung endemik Papua yang terkenal dengan bulu ekornya yang indah dan menjadi simbol kebanggaan Papua.',
                'difficulty' => 'mudah',
                'category' => 'Flora Fauna',
                'hint' => 'Burung ini disebut juga Bird of Paradise dan memiliki bulu ekor yang spektakuler',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'pp002',
                'island' => 'papua',
                'question' => 'Rumah tradisional Papua yang berbentuk bulat dan terbuat dari jerami adalah?',
                'options' => ['Rumah Gadang', 'Honai', 'Tongkonan', 'Balai Adat'],
                'correct_answer' => 1,
                'explanation' => 'Honai adalah rumah tradisional suku Dani di Papua yang berbentuk bulat, terbuat dari kayu dan jerami, dirancang untuk melindungi dari cuaca dingin pegunungan.',
                'difficulty' => 'mudah',
                'category' => 'Arsitektur',
                'hint' => 'Rumah ini khusus dibuat untuk daerah pegunungan yang dingin di Papua',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'pp003',
                'island' => 'papua',
                'question' => 'Pakaian tradisional pria Papua yang terbuat dari labu kering adalah?',
                'options' => ['Sarong', 'Cawat', 'Koteka', 'Selendang'],
                'correct_answer' => 2,
                'explanation' => 'Koteka adalah pakaian tradisional pria Papua yang terbuat dari labu kering, digunakan oleh suku-suku di daerah pegunungan Papua sebagai penutup tubuh.',
                'difficulty' => 'menengah',
                'category' => 'Pakaian Tradisional',
                'hint' => 'Pakaian ini terbuat dari tanaman labu yang dikeringkan',
                'points' => 15,
                'time_limit' => 45
            ],
            [
                'question_id' => 'pp004',
                'island' => 'papua',
                'question' => 'Makanan pokok suku-suku di Papua yang berasal dari pohon sagu adalah?',
                'options' => ['Beras', 'Jagung', 'Sagu', 'Ubi'],
                'correct_answer' => 2,
                'explanation' => 'Sagu adalah makanan pokok utama di Papua yang diolah dari empulur pohon sagu. Sagu dapat diolah menjadi berbagai makanan seperti papeda.',
                'difficulty' => 'mudah',
                'category' => 'Kuliner',
                'hint' => 'Makanan ini diolah dari pohon yang tumbuh di daerah rawa-rawa',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'pp005',
                'island' => 'papua',
                'question' => 'Danau terbesar di Papua yang juga merupakan danau terbesar di Indonesia adalah?',
                'options' => ['Danau Toba', 'Danau Sentani', 'Danau Paniai', 'Danau Habema'],
                'correct_answer' => 2,
                'explanation' => 'Danau Paniai adalah danau terbesar di Papua dan Indonesia, terletak di dataran tinggi Papua dengan pemandangan yang sangat indah.',
                'difficulty' => 'menengah',
                'category' => 'Geografi',
                'hint' => 'Danau ini terletak di dataran tinggi dan merupakan yang terbesar di Indonesia',
                'points' => 15,
                'time_limit' => 45
            ]
        ];
    }

    private function getSumateraQuestions(): array
    {
        return [
            [
                'question_id' => 'sum001',
                'island' => 'sumatera',
                'question' => 'Provinsi paling utara di Pulau Sumatera adalah?',
                'options' => ['Sumatera Utara', 'Aceh', 'Riau', 'Sumatera Barat'],
                'correct_answer' => 1,
                'explanation' => 'Aceh adalah provinsi paling utara di Pulau Sumatera dan dikenal dengan sebutan Serambi Makkah.',
                'difficulty' => 'mudah',
                'category' => 'Geografi',
                'hint' => 'Provinsi ini dikenal sebagai Serambi Makkah',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'sum002',
                'island' => 'sumatera',
                'question' => 'Rumah tradisional khas Sumatera Barat yang berbentuk seperti tanduk kerbau adalah?',
                'options' => ['Rumah Gadang', 'Rumah Limas', 'Rumah Bolon', 'Rumah Panggung'],
                'correct_answer' => 0,
                'explanation' => 'Rumah Gadang adalah rumah tradisional Minangkabau dengan atap yang melengkung menyerupai tanduk kerbau.',
                'difficulty' => 'mudah',
                'category' => 'Arsitektur',
                'hint' => 'Rumah ini memiliki atap yang menyerupai tanduk kerbau',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'sum003',
                'island' => 'sumatera',
                'question' => 'Danau terbesar di Pulau Sumatera yang terletak di Sumatera Utara adalah?',
                'options' => ['Danau Maninjau', 'Danau Toba', 'Danau Singkarak', 'Danau Ranau'],
                'correct_answer' => 1,
                'explanation' => 'Danau Toba adalah danau vulkanik terbesar di dunia yang terletak di Sumatera Utara dan menjadi rumah suku Batak.',
                'difficulty' => 'mudah',
                'category' => 'Alam',
                'hint' => 'Danau vulkanik terbesar di dunia',
                'points' => 10,
                'time_limit' => 30
            ],
            [
                'question_id' => 'sum004',
                'island' => 'sumatera',
                'question' => 'Tarian tradisional dari Aceh yang menggambarkan kegembiraan adalah?',
                'options' => ['Tari Saman', 'Tari Seudati', 'Tari Ranup Lampuan', 'Tari Ratoh Jaroe'],
                'correct_answer' => 1,
                'explanation' => 'Tari Seudati adalah tarian tradisional Aceh yang menggambarkan kegembiraan dan biasanya dibawakan oleh laki-laki.',
                'difficulty' => 'menengah',
                'category' => 'Seni Tari',
                'hint' => 'Tarian ini dibawakan oleh laki-laki dan menggambarkan kegembiraan',
                'points' => 15,
                'time_limit' => 45
            ],
            [
                'question_id' => 'sum005',
                'island' => 'sumatera',
                'question' => 'Makanan khas Sumatera Barat yang terbuat dari daging dan santan dengan bumbu rempah adalah?',
                'options' => ['Rendang', 'Gulai', 'Dendeng', 'Kalio'],
                'correct_answer' => 0,
                'explanation' => 'Rendang adalah masakan khas Minangkabau yang telah diakui UNESCO sebagai makanan terlezat di dunia.',
                'difficulty' => 'mudah',
                'category' => 'Kuliner',
                'hint' => 'Makanan ini diakui UNESCO sebagai makanan terlezat di dunia',
                'points' => 10,
                'time_limit' => 30
            ]
        ];
    }
}
