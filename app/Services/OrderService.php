<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Notifications\OrderStatusNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderService
{
    public function placeOrder(User $user, array $data): Order
    {
        return DB::transaction(function () use ($user, $data) {
            $cart = $user->cart()->with('items')->first();

            if (! $cart || $cart->items->isEmpty()) {
                throw ValidationException::withMessages([
                    'cart' => 'Your cart is empty.',
                ]);
            }

            $totalAmount = 0;
            $itemsData = [];

            $products = Product::query()
                ->whereIn('id', $cart->items->pluck('product_id')->sort()->values())
                ->orderBy('id')
                ->lockForUpdate()
                ->get()
                ->keyBy('id');

            foreach ($cart->items as $cartItem) {
                $product = $products->get($cartItem->product_id);

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

            $order = new Order([
                'delivery_address' => $data['delivery_address'],
                'payment_method' => $data['payment_method'],
            ]);
            $order->user()->associate($user);
            $order->status = 'completed';
            $order->total_amount = $totalAmount;
            $order->save();

            $order->items()->createMany($itemsData);

            $cart->items()->delete();
            $user->notify(new OrderStatusNotification($order, $order->status));

            return $order->load('items.product');
        });
    }
}
