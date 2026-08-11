<?php

namespace App\Services;

use App\Models\Order;
use App\Notifications\OrderStatusNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderService
{
    public function placeOrder(int $userId, array $data): Order
    {
        return DB::transaction(function () use ($userId, $data) {
            $cart = auth()->user()->cart()->with('items.product')->first();

            if (! $cart || $cart->items->isEmpty()) {
                throw ValidationException::withMessages([
                    'cart' => 'Your cart is empty.',
                ]);
            }

            $totalAmount = 0;
            $itemsData = [];

            foreach ($cart->items as $cartItem) {
                $product = $cartItem->product;

                if (! $product || $product->stock < $cartItem->quantity) {
                    throw ValidationException::withMessages([
                        'stock' => "Insufficient stock for {$product?->name}.",
                    ]);
                }

                $price = $product->discount_price ?? $product->price;
                $totalAmount += $price * $cartItem->quantity;

                $itemsData[] = [
                    'product_id' => $product->id,
                    'quantity' => $cartItem->quantity,
                    'price' => $price,
                ];

                $product->decrement('stock', $cartItem->quantity);
            }

            $order = Order::create([
                'user_id' => $userId,
                'status' => 'completed',
                'delivery_address' => $data['delivery_address'],
                'payment_method' => $data['payment_method'],
                'total_amount' => $totalAmount,
            ]);

            $order->items()->createMany($itemsData);

            $cart->items()->delete();
            $order->user->notify(new OrderStatusNotification($order, $order->status));

            return $order->load('items.product');
        });
    }
}
