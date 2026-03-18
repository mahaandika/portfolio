<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin Portfolio',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'), // Ganti dengan password yang aman
            'email_verified_at' => now(),
        ]);
        
        // Anda juga bisa menambahkan user dummy tambahan jika perlu
        // User::factory(5)->create();
    }
}