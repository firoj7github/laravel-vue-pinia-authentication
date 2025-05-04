<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'email'           => "fkfiroj02@gmail.com",
                'name'            => "adminuser",
                'password'        => Hash::make("123456"),
                'created_at'      => now(),
            ],
            
        ];

        User::insert($data);
    }
}
