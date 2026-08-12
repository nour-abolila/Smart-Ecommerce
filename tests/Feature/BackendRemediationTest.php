<?php

namespace Tests\Feature;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Services\OrderService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class BackendRemediationTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_catalog_is_open_and_admin_catalog_is_protected_by_role(): void
    {
        $this->getJson('/api/products')->assertOk()->assertJsonStructure(['status', 'message', 'data', 'meta']);
        $this->getJson('/api/categories')->assertOk()->assertJsonStructure(['success', 'message', 'data']);
        $this->postJson('/api/admin/products', [])->assertUnauthorized();

        $admin = User::factory()->create();
        $admin->forceFill(['role' => 'admin'])->save();
        $category = Category::factory()->create();
        $this->withToken(JWTAuth::fromUser($admin))->postJson('/api/admin/products', [
            'category_id' => $category->id,
            'name' => 'Admin product',
            'price' => 50,
            'stock' => 5,
        ])->assertCreated()->assertJsonPath('success', true);
    }

    public function test_authenticated_non_admin_cannot_write_catalog(): void
    {
        $user = User::factory()->create();

        $this->withToken(JWTAuth::fromUser($user))
            ->postJson('/api/admin/products', [])
            ->assertForbidden();
    }

    public function test_payment_requires_authentication_and_order_ownership_remains_forbidden(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $order = $this->orderFor($owner);

        $this->postJson("/api/orders/{$order->id}/pay", [])->assertUnauthorized();
        $this->withToken(JWTAuth::fromUser($other))->getJson("/api/orders/{$order->id}")->assertForbidden();
    }

    public function test_cart_supports_multiple_products_and_shared_products_across_users(): void
    {
        $category = Category::factory()->create();
        $products = Product::factory()->count(2)->for($category)->create();
        $carts = Cart::factory()->count(2)->create();

        CartItem::create(['cart_id' => $carts[0]->id, 'product_id' => $products[0]->id, 'quantity' => 1]);
        CartItem::create(['cart_id' => $carts[0]->id, 'product_id' => $products[1]->id, 'quantity' => 1]);
        CartItem::create(['cart_id' => $carts[1]->id, 'product_id' => $products[0]->id, 'quantity' => 1]);

        $this->assertDatabaseCount('cart_items', 3);
    }

    public function test_validation_and_not_found_errors_use_the_unified_envelope(): void
    {
        $this->postJson('/api/auth/login', [])->assertUnprocessable()
            ->assertJsonStructure(['status', 'message', 'errors'])
            ->assertJsonPath('status', false);

        $this->getJson('/api/products/999999')->assertNotFound()
            ->assertJson(['status' => false, 'errors' => null]);
    }

    public function test_login_rate_limiter_returns_429(): void
    {
        for ($attempt = 0; $attempt < 5; $attempt++) {
            $this->postJson('/api/auth/login', ['email' => 'missing@example.com', 'password' => 'password']);
        }

        $this->postJson('/api/auth/login', ['email' => 'missing@example.com', 'password' => 'password'])
            ->assertTooManyRequests()
            ->assertJsonStructure(['status', 'message', 'errors']);
    }

    public function test_order_service_persists_required_order_fields_before_insert(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create(['price' => 25, 'stock' => 3]);
        $cart = Cart::factory()->for($user)->create();
        CartItem::create([
            'cart_id' => $cart->id,
            'product_id' => $product->id,
            'quantity' => 2,
        ]);

        $order = app(OrderService::class)->placeOrder($user, [
            'delivery_address' => 'Cairo, Egypt',
            'payment_method' => 'card',
        ]);

        $this->assertSame($user->id, $order->user_id);
        $this->assertSame('50.00', $order->total_amount);
        $this->assertDatabaseHas('orders', ['id' => $order->id, 'user_id' => $user->id]);
        $this->assertDatabaseCount('cart_items', 0);
    }

    public function test_product_details_load_without_reviews_feature(): void
    {
        $product = Product::factory()->create();

        $this->getJson("/api/products/{$product->id}")
            ->assertOk()
            ->assertJsonPath('status', true)
            ->assertJsonPath('data.id', $product->id)
            ->assertJsonStructure(['data' => ['category', 'images']])
            ->assertJsonMissingPath('data.reviews')
            ->assertJsonMissingPath('data.rating');
    }

    private function orderFor(User $user): Order
    {
        $order = new Order(['delivery_address' => 'Test address', 'payment_method' => 'card']);
        $order->user()->associate($user);
        $order->status = 'completed';
        $order->total_amount = 10;
        $order->save();

        return $order;
    }
}
