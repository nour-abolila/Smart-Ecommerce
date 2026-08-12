<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        if (! $user) {
            $user = User::factory()->create([
                'first_name' => 'Test',
                'last_name' => 'User',
                'email' => 'testuser@example.com',
                'password' => bcrypt('password'),
            ]);
        }

        $products = Product::inRandomOrder()->take(3)->get();

        if ($products->isEmpty()) {
            $this->command->warn('No products found — seed products first.');

            return;
        }

        $paymentMethods = ['Credit/Debit Card', 'Cash on Delivery', 'Apple Pay'];
        $addresses = [
            'Street address, Riyadh',
            '123 Main St, Al Mansurah',
            '45 King Fahd Rd, Jeddah',
        ];

        foreach (range(1, 3) as $i) {
            $orderProducts = $products->random(min(2, $products->count()));
            $totalAmount = 0;
            $itemsData = [];

            foreach ($orderProducts as $product) {
                $quantity = rand(1, 3);
                $price = $product->discount_price ?? $product->price;
                $totalAmount += $price * $quantity;

                $itemsData[] = [
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $price,
                ];
            }

            $order = Order::create([
                'user_id' => $user->id,
                'status' => 'completed',
                'delivery_address' => $addresses[array_rand($addresses)],
                'payment_method' => $paymentMethods[array_rand($paymentMethods)],
                'total_amount' => $totalAmount,
            ]);

            $order->items()->createMany($itemsData);
        }

        $this->command->info('Seeded 3 sample orders for user: '.$user->email);
    }
}
