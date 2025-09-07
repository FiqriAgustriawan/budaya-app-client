<?php

namespace Database\Seeders;

use App\Models\CulturalSite;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CulturalSiteSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $culturalSites = [
      [
        'name' => 'Candi Borobudur',
        'province' => 'Jawa Tengah',
        'category' => 'Candi',
        'latitude' => -7.608311,
        'longitude' => 110.203751,
        'description' => 'Candi Buddha terbesar di dunia yang dibangun pada abad ke-8 dan ke-9 Masehi. Merupakan salah satu Situs Warisan Dunia UNESCO dan destinasi wisata spiritual terpopuler di Indonesia.',
        'content' => '<p>Borobudur adalah candi Buddha terbesar di dunia, terletak di Magelang, Jawa Tengah. Candi ini dibangun pada masa Dinasti Syailendra sekitar abad ke-8 hingga ke-9 Masehi.</p><p>Struktur candi ini terdiri dari 9 teras dengan lebih dari 2.600 panel relief dan 504 arca Buddha. Borobudur menjadi simbol kosmologi Buddha dan merupakan tempat ziarah yang penting bagi umat Buddha di seluruh dunia.</p><p>Pada tahun 1991, Borobudur ditetapkan sebagai Situs Warisan Dunia UNESCO dan menjadi salah satu destinasi wisata budaya terpopuler di Indonesia.</p>',
        'image' => '/images/gambar-dummy.jpg',
        'photos' => json_encode(['/images/gambar-dummy.jpg', '/images/gambar-dummy.jpg']),
        'youtube_video' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'articles_count' => 15,
        'photos_count' => 45,
        'videos_count' => 8,
        'is_active' => true,
      ],
      [
        'name' => 'Taman Sari Yogyakarta',
        'province' => 'Daerah Istimewa Yogyakarta',
        'category' => 'Istana',
        'latitude' => -7.810169,
        'longitude' => 110.359634,
        'description' => 'Bekas taman istana Kesultanan Yogyakarta yang memiliki nilai sejarah tinggi dengan arsitektur perpaduan Jawa, Islam, dan Eropa yang unik.',
        'content' => '<p>Taman Sari adalah kompleks bangunan bekas taman istana Kesultanan Ngayogyakarta Hadiningrat yang dibangun pada masa Sultan Hamengku Buwono I sekitar tahun 1758-1765.</p><p>Kompleks ini memiliki berbagai bangunan unik seperti kolam pemandian, sumur gumuling, dan lorong-lorong bawah tanah yang menghubungkan berbagai bagian istana.</p><p>Arsitektur Taman Sari memadukan gaya Jawa tradisional, Islam, dan Eropa yang mencerminkan keterbukaan budaya Yogyakarta terhadap pengaruh luar.</p>',
        'image' => '/images/gambar-dummy.jpg',
        'photos' => json_encode(['/images/gambar-dummy.jpg']),
        'youtube_video' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'articles_count' => 8,
        'photos_count' => 25,
        'videos_count' => 3,
        'is_active' => true,
      ],
      [
        'name' => 'Rumah Gadang Minangkabau',
        'province' => 'Sumatera Barat',
        'category' => 'Rumah Tradisional',
        'latitude' => -0.789275,
        'longitude' => 100.650000,
        'description' => 'Rumah tradisional suku Minangkabau dengan atap berbentuk tanduk kerbau yang menjadi ikon arsitektur Sumatera Barat.',
        'content' => '<p>Rumah Gadang adalah rumah tradisional Minangkabau yang memiliki arsitektur unik dengan atap berbentuk gonjong yang menyerupai tanduk kerbau.</p><p>Filosofi bentuk atap ini berkaitan dengan legenda Tambo Minangkabau tentang pertarungan kerbau yang menjadi asal nama "Minangkabau" yang berarti "menang kerbau".</p><p>Rumah ini biasanya dihuni oleh keluarga besar dalam sistem matrilineal dan menjadi pusat kegiatan sosial masyarakat Minang.</p>',
        'image' => '/images/gambar-dummy.jpg',
        'photos' => json_encode(['/images/gambar-dummy.jpg', '/images/gambar-dummy.jpg', '/images/gambar-dummy.jpg']),
        'youtube_video' => null,
        'articles_count' => 6,
        'photos_count' => 18,
        'videos_count' => 2,
        'is_active' => true,
      ],
      [
        'name' => 'Pura Tanah Lot',
        'province' => 'Bali',
        'category' => 'Pura',
        'latitude' => -8.621180,
        'longitude' => 115.086760,
        'description' => 'Pura Hindu yang terletak di atas batu karang di tepi laut, menjadi salah satu ikon spiritual dan wisata Bali yang paling terkenal.',
        'content' => '<p>Pura Tanah Lot adalah salah satu pura laut (pura segara) yang paling sakral di Bali. Pura ini dibangun di atas formasi batu karang yang dikelilingi air laut.</p><p>Menurut legenda, pura ini dibangun oleh Dang Hyang Nirartha, seorang pedanda dari Jawa yang menyebarkan agama Hindu di Bali pada abad ke-16.</p><p>Tanah Lot menjadi tempat pemujaan Dewa Baruna (dewa laut) dan merupakan bagian dari rangkaian pura yang melindungi Bali dari roh-roh jahat.</p>',
        'image' => '/images/gambar-dummy.jpg',
        'photos' => json_encode(['/images/gambar-dummy.jpg']),
        'youtube_video' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'articles_count' => 12,
        'photos_count' => 35,
        'videos_count' => 5,
        'is_active' => true,
      ],
      [
        'name' => 'Benteng Fort de Kock',
        'province' => 'Sumatera Barat',
        'category' => 'Benteng',
        'latitude' => -0.305777,
        'longitude' => 100.369721,
        'description' => 'Benteng peninggalan Belanda yang dibangun pada tahun 1825 dan menjadi saksi sejarah perjuangan rakyat Minangkabau.',
        'content' => '<p>Benteng Fort de Kock dibangun oleh pemerintah kolonial Belanda pada tahun 1825 di atas Bukit Jirek, Bukittinggi. Benteng ini dinamai sesuai nama Kapten Bauer de Kock.</p><p>Benteng ini dibangun sebagai bagian dari strategi Belanda untuk menguasai daerah Minangkabau selama Perang Padri (1821-1837).</p><p>Kini benteng ini menjadi objek wisata sejarah dan menawarkan pemandangan indah kota Bukittinggi serta Ngarai Sianok.</p>',
        'image' => '/images/gambar-dummy.jpg',
        'photos' => json_encode(['/images/gambar-dummy.jpg', '/images/gambar-dummy.jpg']),
        'youtube_video' => null,
        'articles_count' => 4,
        'photos_count' => 12,
        'videos_count' => 1,
        'is_active' => true,
      ],
      [
        'name' => 'Rumah Adat Tongkonan',
        'province' => 'Sulawesi Selatan',
        'category' => 'Rumah Tradisional',
        'latitude' => -2.981070,
        'longitude' => 119.840050,
        'description' => 'Rumah adat suku Toraja dengan arsitektur unik berbentuk perahu terbalik yang sarat dengan nilai spiritual dan budaya.',
        'content' => '<p>Tongkonan adalah rumah adat suku Toraja di Sulawesi Selatan yang memiliki bentuk atap melengkung menyerupai perahu terbalik atau tanduk kerbau.</p><p>Rumah ini bukan hanya tempat tinggal, tetapi juga simbol status sosial dan pusat kegiatan ritual adat Toraja, terutama upacara Rambu Solo (upacara kematian).</p><p>Setiap ukiran dan ornamen pada Tongkonan memiliki makna filosofis yang mendalam tentang hubungan manusia dengan alam dan leluhur.</p>',
        'image' => '/images/gambar-dummy.jpg',
        'photos' => json_encode(['/images/gambar-dummy.jpg', '/images/gambar-dummy.jpg', '/images/gambar-dummy.jpg']),
        'youtube_video' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'articles_count' => 7,
        'photos_count' => 22,
        'videos_count' => 3,
        'is_active' => true,
      ],
      [
        'name' => 'Masjid Agung Demak',
        'province' => 'Jawa Tengah',
        'category' => 'Masjid',
        'latitude' => -6.890410,
        'longitude' => 110.635970,
        'description' => 'Masjid tertua di Jawa yang dibangun oleh Wali Songo dengan arsitektur perpaduan Hindu-Jawa dan Islam yang harmonis.',
        'content' => '<p>Masjid Agung Demak adalah masjid tertua di Jawa yang dibangun pada tahun 1479 oleh Raden Patah, sultan pertama Kesultanan Demak, dengan bantuan Wali Songo.</p><p>Arsitektur masjid ini memadukan unsur Hindu-Jawa dengan Islam, terlihat dari struktur atap bertingkat (tajug) yang khas Jawa dan mihrab yang menghadap ke Mekah.</p><p>Masjid ini menjadi pusat penyebaran Islam di Jawa dan tempat bersejarah bagi perkembangan agama Islam di Nusantara.</p>',
        'image' => '/images/gambar-dummy.jpg',
        'photos' => json_encode(['/images/gambar-dummy.jpg']),
        'youtube_video' => null,
        'articles_count' => 10,
        'photos_count' => 28,
        'videos_count' => 4,
        'is_active' => false,
      ],
    ];

    foreach ($culturalSites as $site) {
      $site['slug'] = Str::slug($site['name']);
      CulturalSite::create($site);
    }
  }
}
