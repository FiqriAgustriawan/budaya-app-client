<?php

namespace Database\Seeders;

use App\Models\CulturalSite;
use Illuminate\Database\Seeder;

class CulturalSiteSeeder extends Seeder
{
  public function run(): void
  {
    $sites = [
      [
        'name' => 'Candi Borobudur',
        'province' => 'Jawa Tengah',
        'category' => 'Candi',
        'latitude' => -7.6079,
        'longitude' => 110.2038,
        'description' => 'Candi Buddha terbesar di dunia yang dibangun pada abad ke-8.',
        'content' => '<h2>Sejarah Candi Borobudur</h2><p>Candi Borobudur adalah candi Buddha terbesar di dunia yang dibangun pada abad ke-8 Masehi...</p>',
        'image' => '/images/cultural-sites/borobudur.jpg',
        'photos' => [
          '/images/cultural-sites/borobudur-1.jpg',
          '/images/cultural-sites/borobudur-2.jpg',
          '/images/cultural-sites/borobudur-3.jpg',
        ],
        'youtube_video' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'articles_count' => 15,
        'photos_count' => 120,
        'videos_count' => 8,
        'meta_data' => [
          'unesco_site' => true,
          'visitor_count' => 3000000,
          'entry_fee' => 50000,
        ]
      ],
      [
        'name' => 'Tari Kecak Bali',
        'province' => 'Bali',
        'category' => 'Tarian',
        'latitude' => -8.5069,
        'longitude' => 115.2625,
        'description' => 'Tarian tradisional Bali yang terkenal dengan gerakan dan musik yang unik.',
        'content' => '<h2>Tari Kecak</h2><p>Tari Kecak adalah tarian tradisional Bali yang mengisahkan cerita Ramayana...</p>',
        'image' => '/images/cultural-sites/kecak.jpg',
        'photos' => [
          '/images/cultural-sites/kecak-1.jpg',
          '/images/cultural-sites/kecak-2.jpg',
        ],
        'youtube_video' => 'https://www.youtube.com/watch?v=example2',
        'articles_count' => 8,
        'photos_count' => 85,
        'videos_count' => 12,
      ],
      [
        'name' => 'Rumah Gadang',
        'province' => 'Sumatera Barat',
        'category' => 'Arsitektur',
        'latitude' => -0.7893,
        'longitude' => 100.6500,
        'description' => 'Rumah adat Minangkabau dengan atap melengkung yang ikonik.',
        'content' => '<h2>Rumah Gadang Minangkabau</h2><p>Rumah Gadang adalah rumah adat suku Minangkabau...</p>',
        'image' => '/images/cultural-sites/rumah-gadang.jpg',
        'articles_count' => 12,
        'photos_count' => 95,
        'videos_count' => 6,
      ],
      // Tambah data lainnya...
    ];

    foreach ($sites as $site) {
      CulturalSite::create($site);
    }
  }
}
