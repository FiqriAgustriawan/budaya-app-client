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
        'slug' => 'candi-borobudur',
        'province' => 'Jawa Tengah',
        'category' => 'Candi',
        'latitude' => -7.608311,
        'longitude' => 110.203751,
        'description' => 'Candi Buddha terbesar di dunia yang dibangun pada abad ke-8 dan ke-9 Masehi. Merupakan salah satu Situs Warisan Dunia UNESCO dan destinasi wisata spiritual terpopuler di Indonesia.',
        'content' => '<p>Borobudur adalah candi Buddha terbesar di dunia, terletak di Magelang, Jawa Tengah. Candi ini dibangun pada masa Dinasti Syailendra sekitar abad ke-8 hingga ke-9 Masehi.</p><p>Struktur candi ini terdiri dari 9 teras dengan lebih dari 2.600 panel relief dan 504 arca Buddha. Borobudur menjadi simbol kosmologi Buddha dan merupakan tempat ziarah yang penting bagi umat Buddha di seluruh dunia.</p>',
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
        'slug' => 'taman-sari-yogyakarta',
        'province' => 'Daerah Istimewa Yogyakarta',
        'category' => 'Istana',
        'latitude' => -7.810169,
        'longitude' => 110.359634,
        'description' => 'Bekas taman istana Kesultanan Yogyakarta yang memiliki nilai sejarah tinggi dengan arsitektur perpaduan Jawa, Islam, dan Eropa yang unik.',
        'content' => '<p>Taman Sari adalah kompleks bangunan bekas taman istana Kesultanan Ngayogyakarta Hadiningrat yang dibangun pada masa Sultan Hamengku Buwono I sekitar tahun 1758-1765.</p>',
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
        'slug' => 'rumah-gadang-minangkabau',
        'province' => 'Sumatera Barat',
        'category' => 'Rumah Tradisional',
        'latitude' => -0.789275,
        'longitude' => 100.650000,
        'description' => 'Rumah tradisional suku Minangkabau dengan atap berbentuk tanduk kerbau yang menjadi ikon arsitektur Sumatera Barat.',
        'content' => '<p>Rumah Gadang adalah rumah tradisional Minangkabau yang memiliki arsitektur unik dengan atap berbentuk gonjong yang menyerupai tanduk kerbau.</p>',
        'image' => '/images/gambar-dummy.jpg',
        'photos' => json_encode(['/images/gambar-dummy.jpg', '/images/gambar-dummy.jpg']),
        'youtube_video' => null,
        'articles_count' => 6,
        'photos_count' => 18,
        'videos_count' => 2,
        'is_active' => true,
      ],
      [
        'name' => 'Pura Tanah Lot',
        'slug' => 'pura-tanah-lot',
        'province' => 'Bali',
        'category' => 'Pura',
        'latitude' => -8.621180,
        'longitude' => 115.086760,
        'description' => 'Pura Hindu yang terletak di atas batu karang di tepi laut, menjadi salah satu ikon spiritual dan wisata Bali yang paling terkenal.',
        'content' => '<p>Pura Tanah Lot adalah salah satu pura laut (pura segara) yang paling sakral di Bali. Pura ini dibangun di atas formasi batu karang yang dikelilingi air laut.</p>',
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
        'slug' => 'benteng-fort-de-kock',
        'province' => 'Sumatera Barat',
        'category' => 'Benteng',
        'latitude' => -0.305777,
        'longitude' => 100.369721,
        'description' => 'Benteng peninggalan Belanda yang dibangun pada tahun 1825 dan menjadi saksi sejarah perjuangan rakyat Minangkabau.',
        'content' => '<p>Benteng Fort de Kock dibangun oleh pemerintah kolonial Belanda pada tahun 1825 di atas Bukit Jirek, Bukittinggi.</p>',
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
        'slug' => 'rumah-adat-tongkonan',
        'province' => 'Sulawesi Selatan',
        'category' => 'Rumah Tradisional',
        'latitude' => -2.981070,
        'longitude' => 119.840050,
        'description' => 'Rumah adat suku Toraja dengan arsitektur unik berbentuk perahu terbalik yang sarat dengan nilai spiritual dan budaya.',
        'content' => '<p>Tongkonan adalah rumah adat suku Toraja di Sulawesi Selatan yang memiliki bentuk atap melengkung menyerupai perahu terbalik atau tanduk kerbau.</p>',
        'image' => '/images/gambar-dummy.jpg',
        'photos' => json_encode(['/images/gambar-dummy.jpg', '/images/gambar-dummy.jpg']),
        'youtube_video' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'articles_count' => 7,
        'photos_count' => 22,
        'videos_count' => 3,
        'is_active' => true,
      ],
      [
        'name' => 'Masjid Agung Demak',
        'slug' => 'masjid-agung-demak',
        'province' => 'Jawa Tengah',
        'category' => 'Masjid',
        'latitude' => -6.890410,
        'longitude' => 110.635970,
        'description' => 'Masjid tertua di Jawa yang dibangun oleh Wali Songo dengan arsitektur perpaduan Hindu-Jawa dan Islam yang harmonis.',
        'content' => '<p>Masjid Agung Demak adalah masjid tertua di Jawa yang dibangun pada tahun 1479 oleh Raden Patah, sultan pertama Kesultanan Demak, dengan bantuan Wali Songo.</p>',
        'image' => '/images/gambar-dummy.jpg',
        'photos' => json_encode(['/images/gambar-dummy.jpg']),
        'youtube_video' => null,
        'articles_count' => 10,
        'photos_count' => 28,
        'videos_count' => 4,
        'is_active' => true, // Diubah menjadi true
      ],
    ];

    foreach ($culturalSites as $site) {
      CulturalSite::create($site);
    }

    $this->command->info('CulturalSiteSeeder completed: 7 cultural sites created successfully');
  }
}
