<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get seller users or create them if they don't exist
        $sellers = User::where('role', 'seller')->get();
        if ($sellers->count() === 0) {
            $this->command->info('No sellers found. Creating seller users first...');
            // Create some seller users
            $sellers = collect();
            for ($i = 1; $i <= 5; $i++) {
                $seller = User::create([
                    'name' => "Tour Guide $i",
                    'email' => "seller$i@budayaind.com",
                    'email_verified_at' => now(),
                    'password' => bcrypt('password'),
                    'role' => 'seller',
                    'is_active' => true,
                ]);
                $sellers->push($seller);
            }
        }

        $tickets = [
            [
                'title' => 'Tiket Masuk Candi Borobudur - Paket Sunrise',
                'description' => 'Nikmati keindahan sunrise di Candi Borobudur dengan paket khusus yang termasuk guided tour dan breakfast. Pengalaman spiritual yang tak terlupakan di candi Buddha terbesar di dunia.',
                'destination' => 'Candi Borobudur, Magelang, Jawa Tengah',
                'price' => 450000,
                'available_quantity' => 100,
                'sold_quantity' => 45,
                'start_date' => now()->addDays(1)->format('Y-m-d'),
                'end_date' => now()->addMonths(6)->format('Y-m-d'),
                'start_time' => '04:30:00',
                'end_time' => '09:30:00',
                'duration_hours' => 5,
                'access_features' => json_encode(['Akses sunrise area', 'Guide profesional', 'Breakfast box', 'Transportasi']),
                'category' => 'premium', // ENUM: basic, premium, vip
                'image' => '/images/gambar-dummy.jpg',
                'status' => 'active', // ENUM: active, inactive, sold_out
                'is_active' => true,
            ],
            [
                'title' => 'Paket Wisata Taman Sari & Keraton Yogyakarta',
                'description' => 'Jelajahi sejarah Kesultanan Yogyakarta dengan mengunjungi Taman Sari dan Keraton. Pelajari arsitektur unik dan sejarah yang menarik dari pemandu berpengalaman.',
                'destination' => 'Taman Sari & Keraton, Yogyakarta',
                'price' => 175000,
                'available_quantity' => 50,
                'sold_quantity' => 28,
                'start_date' => now()->addDays(1)->format('Y-m-d'),
                'end_date' => now()->addMonths(3)->format('Y-m-d'),
                'start_time' => '09:00:00',
                'end_time' => '13:00:00',
                'duration_hours' => 4,
                'access_features' => json_encode(['Tiket masuk Keraton', 'Tiket masuk Taman Sari', 'Guide lokal', 'Air mineral']),
                'category' => 'basic',
                'image' => '/images/gambar-dummy.jpg',
                'status' => 'active',
                'is_active' => true,
            ],
            [
                'title' => 'Workshop Batik Traditional di Yogyakarta',
                'description' => 'Belajar membuat batik tradisional langsung dari pengrajin batik berpengalaman. Bawa pulang karya batik buatan sendiri sebagai kenang-kenangan.',
                'destination' => 'Sanggar Batik Winotosastro, Yogyakarta',
                'price' => 350000,
                'available_quantity' => 30,
                'sold_quantity' => 15,
                'start_date' => now()->addDays(3)->format('Y-m-d'),
                'end_date' => now()->addMonths(4)->format('Y-m-d'),
                'start_time' => '08:00:00',
                'end_time' => '14:00:00',
                'duration_hours' => 6,
                'access_features' => json_encode(['Bahan batik', 'Peralatan lengkap', 'Makan siang', 'Sertifikat', 'Hasil karya batik']),
                'category' => 'premium',
                'image' => '/images/gambar-dummy.jpg',
                'status' => 'active',
                'is_active' => true,
            ],
            [
                'title' => 'Paket Sunset di Pura Tanah Lot Bali',
                'description' => 'Saksikan sunset terindah di Bali dari Pura Tanah Lot. Paket lengkap dengan transportasi dan dinner seafood di tepi pantai.',
                'destination' => 'Pura Tanah Lot, Tabanan, Bali',
                'price' => 275000,
                'available_quantity' => 80,
                'sold_quantity' => 62,
                'start_date' => now()->addDays(1)->format('Y-m-d'),
                'end_date' => now()->addMonths(12)->format('Y-m-d'),
                'start_time' => '15:00:00',
                'end_time' => '21:00:00',
                'duration_hours' => 6,
                'access_features' => json_encode(['Transportasi AC', 'Tiket masuk', 'Dinner seafood', 'Air mineral', 'Guide']),
                'category' => 'basic',
                'image' => '/images/gambar-dummy.jpg',
                'status' => 'active',
                'is_active' => true,
            ],
            [
                'title' => 'Trekking Ke Rumah Gadang Minangkabau',
                'description' => 'Petualangan trekking ke desa adat Minangkabau dan menginap di Rumah Gadang traditional. Rasakan kehidupan masyarakat Minang yang autentik.',
                'destination' => 'Desa Adat Minangkabau, Sumatera Barat',
                'price' => 650000,
                'available_quantity' => 20,
                'sold_quantity' => 8,
                'start_date' => now()->addDays(7)->format('Y-m-d'),
                'end_date' => now()->addMonths(6)->format('Y-m-d'),
                'start_time' => '06:00:00',
                'end_time' => '18:00:00',
                'duration_hours' => 36,
                'access_features' => json_encode(['Transportasi lokal', 'Menginap di Rumah Gadang', 'Semua makanan', 'Guide lokal', 'Workshop tenun']),
                'category' => 'premium',
                'image' => '/images/gambar-dummy.jpg',
                'status' => 'active',
                'is_active' => true,
            ],
            [
                'title' => 'Paket Wisata Benteng Fort de Kock',
                'description' => 'Jelajahi sejarah perjuangan Minangkabau di Benteng Fort de Kock Bukittinggi. Nikmati pemandangan Ngarai Sianok yang menakjubkan.',
                'destination' => 'Benteng Fort de Kock, Bukittinggi, Sumatera Barat',
                'price' => 195000,
                'available_quantity' => 60,
                'sold_quantity' => 23,
                'start_date' => now()->addDays(2)->format('Y-m-d'),
                'end_date' => now()->addMonths(3)->format('Y-m-d'),
                'start_time' => '08:00:00',
                'end_time' => '16:00:00',
                'duration_hours' => 8,
                'access_features' => json_encode(['Transportasi AC', 'Tiket masuk', 'Lunch', 'Guide', 'Air mineral']),
                'category' => 'basic',
                'image' => '/images/gambar-dummy.jpg',
                'status' => 'active',
                'is_active' => true,
            ],
            [
                'title' => 'Upacara Adat Tongkonan Toraja',
                'description' => 'Saksikan upacara adat Toraja di Tongkonan traditional. Pengalaman budaya yang mendalam dengan masyarakat Toraja asli.',
                'destination' => 'Desa Toraja, Tana Toraja, Sulawesi Selatan',
                'price' => 1250000,
                'available_quantity' => 15,
                'sold_quantity' => 3,
                'start_date' => now()->addDays(14)->format('Y-m-d'),
                'end_date' => now()->addMonths(8)->format('Y-m-d'),
                'start_time' => '07:00:00',
                'end_time' => '17:00:00',
                'duration_hours' => 72,
                'access_features' => json_encode(['Akomodasi Tongkonan', 'Semua makanan', 'Transportasi lokal', 'Guide budaya', 'Partisipasi upacara']),
                'category' => 'vip', // Package paling eksklusif
                'image' => '/images/gambar-dummy.jpg',
                'status' => 'active',
                'is_active' => true,
            ],
            [
                'title' => 'Night Tour Masjid Agung Demak',
                'description' => 'Tour malam hari ke Masjid Agung Demak dengan cerita sejarah Wali Songo. Pengalaman spiritual dan sejarah yang unik.',
                'destination' => 'Masjid Agung Demak, Jawa Tengah',
                'price' => 125000,
                'available_quantity' => 40,
                'sold_quantity' => 12,
                'start_date' => now()->addDays(1)->format('Y-m-d'),
                'end_date' => now()->addMonths(2)->format('Y-m-d'),
                'start_time' => '19:00:00',
                'end_time' => '22:00:00',
                'duration_hours' => 3,
                'access_features' => json_encode(['Guide sejarah', 'Buku panduan', 'Air mineral', 'Snack']),
                'category' => 'basic',
                'image' => '/images/gambar-dummy.jpg',
                'status' => 'inactive', // Tidak aktif sementara
                'is_active' => false,
            ],
            [
                'title' => 'Photography Tour Candi Indonesia',
                'description' => 'Tour fotografi khusus ke berbagai candi di Jawa dengan professional photographer. Dapatkan tips dan teknik fotografi arsitektur kuno.',
                'destination' => 'Candi Borobudur & Prambanan, Jawa Tengah',
                'price' => 575000,
                'available_quantity' => 25,
                'sold_quantity' => 18,
                'start_date' => now()->addDays(5)->format('Y-m-d'),
                'end_date' => now()->addMonths(5)->format('Y-m-d'),
                'start_time' => '05:00:00',
                'end_time' => '18:00:00',
                'duration_hours' => 37,
                'access_features' => json_encode(['Hotel', 'Transportasi', 'Tiket masuk', 'Professional guide', 'Workshop fotografi']),
                'category' => 'premium',
                'image' => '/images/gambar-dummy.jpg',
                'status' => 'active',
                'is_active' => true,
            ],
            [
                'title' => 'Paket Lengkap Budaya Nusantara 7 Hari',
                'description' => 'Paket tour lengkap 7 hari mengunjungi berbagai situs budaya Indonesia dari Jawa hingga Bali. Pengalaman budaya yang komprehensif.',
                'destination' => 'Multi Destinasi: Yogyakarta, Solo, Bali, Jakarta',
                'price' => 3500000,
                'available_quantity' => 10,
                'sold_quantity' => 2,
                'start_date' => now()->addDays(21)->format('Y-m-d'),
                'end_date' => now()->addMonths(12)->format('Y-m-d'),
                'start_time' => '06:00:00',
                'end_time' => '20:00:00',
                'duration_hours' => 168,
                'access_features' => json_encode(['Hotel bintang 4', 'Semua transportasi', 'Tiket masuk', 'Professional guide', 'Semua makanan']),
                'category' => 'vip', // Package paling premium
                'image' => '/images/gambar-dummy.jpg',
                'status' => 'active',
                'is_active' => true,
            ],
        ];

        foreach ($tickets as $index => $ticketData) {
            $seller = $sellers->random();
            $ticketData['seller_id'] = $seller->id;
            $ticketData['user_id'] = $seller->id;
            $ticketData['created_at'] = now()->subDays(rand(1, 30));
            $ticketData['updated_at'] = now()->subDays(rand(0, 10));
            
            Ticket::create($ticketData);
        }

        $this->command->info('TicketSeeder completed: 10 tickets created successfully');
    }
}