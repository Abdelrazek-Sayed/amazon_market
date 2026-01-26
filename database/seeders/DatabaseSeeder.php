<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin User
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);

        // Create Categories
        $categories = [
            ['name' => 'إلكترونيات', 'image' => 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500'],
            ['name' => 'أزياء', 'image' => 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500'],
            ['name' => 'أدوات منزلية', 'image' => 'https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500'],
            ['name' => 'ألعاب', 'image' => 'https://images.unsplash.com/photo-1539511596797-45d9904b7144?w=500'],
        ];

        foreach ($categories as $cat) {
            $category = Category::create([
                'name' => $cat['name'],
                'slug' => Str::slug($cat['name']),
                'image' => $cat['image'],
                'is_active' => true,
            ]);

            // Add products for each category
            for ($i = 1; $i <= 5; $i++) {
                Product::create([
                    'category_id' => $category->id,
                    'name' => "منتج {$cat['name']} الرائع رقم $i",
                    'slug' => Str::slug("product-{$cat['name']}-$i-" . rand(100, 999)),
                    'description' => "هذا وصف تفصيلي لمنتج {$cat['name']} الرائع رقم $i. يتميز بجودة عالية وتصميم عصري يناسب احتياجاتك.",
                    'price' => rand(100, 1000),
                    'sale_price' => rand(0, 1) ? rand(50, 400) : null,
                    'quantity' => rand(1, 50),
                    'images' => [$cat['image']],
                    'is_featured' => rand(0, 1),
                    'is_active' => true,
                ]);
            }
        }
    }
}
