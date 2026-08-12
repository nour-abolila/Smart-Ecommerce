<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CartService
{
    public function addToCart(User $user, array $data)
    {
        return DB::transaction(function () use ($user, $data) {
            $cart = Cart::firstOrCreate(['user_id' => $user->id]);
            $item = CartItem::where('cart_id', $cart->id)
                ->where('product_id', $data['product_id'])
                ->lockForUpdate()
                ->first();

            if ($item) {
                $item->increment('quantity', $data['quantity']);
            } else {
                CartItem::create(['cart_id' => $cart->id, ...$data]);
            }

            $this->updateTotalPrice($cart);

            return $cart->fresh()->load('items.product.images');
        });
    }

    public function removeFromCart(User $user, int $productId)
    {
        $cart = $user->cart;

        if (! $cart) {
            return;
        }

        $cart->items()->where('product_id', $productId)->delete();

        $this->updateTotalPrice($cart);
    }

    private function updateTotalPrice(Cart $cart)
    {
        $total = $cart->items()
            ->join('products', 'cart_items.product_id', '=', 'products.id')
            ->selectRaw('COALESCE(SUM(products.price * cart_items.quantity), 0) AS total')
            ->value('total');

        $cart->update(['total_price' => $total]);
    }

    public function getCart(User $user)
    {
        return Cart::with(['items.product.images'])->where('user_id', $user->id)->first();
    }
}
