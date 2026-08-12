<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Electronics',
                'image' => null,
            ],
            [
                'name' => 'Home & Living',
                'image' => null,
            ],
            [
                'name' => 'Beauty',
                'image' => null,
            ],
            [
                'name' => 'Sports',
                'image' => null,
            ],
            [
                'name' => 'Books',
                'image' => null,
            ],
            [
                'name' => 'Sunglasses',
                'image' => null,
            ],
            [
                'name' => 'Baby Care',
                'image' => null,
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['name' => $category['name']],
                $category
            );
        }
    }
}
