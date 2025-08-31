<?php


namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //  default admin user
        User::create([
            'name' => 'Admin Faraday',
            'email' => 'admin@budayaind.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_ADMIN,
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        //  sample seller
        User::create([
            'name' => 'Seller Baco',
            'email' => 'seller@budayaind.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_SELLER,
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        //  sample customer
        User::create([
            'name' => 'Customer Andi',
            'email' => 'customer@budayaind.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_CUSTOMER,
            'email_verified_at' => now(),
            'is_active' => true,
        ]);
    }
}