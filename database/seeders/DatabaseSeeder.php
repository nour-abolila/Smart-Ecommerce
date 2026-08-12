<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'first_name' => 'Test',
                'last_name' => 'User',
                'password' => Hash::make('password123'),
                'phone_number' => 1234567890,
                'email_verified_at' => now(),
            ]
        );
        $admin = User::firstOrNew(
            ['email' => 'admin@rivo.local'],
        );
        $admin->forceFill([
            'first_name' => 'Rivo',
            'last_name' => 'Admin',
            'password' => Hash::make('password123'),
            'phone_number' => '+10000000000',
            'email_verified_at' => now(),
            'role' => 'admin',
        ])->save();
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
            OrderSeeder::class,
        ]);
    }
}
