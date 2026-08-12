<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Http\Requests\PlaceOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function __construct(protected OrderService $orderService) {}

    public function index(): JsonResponse
    {
        $orders = Order::with('items.product')
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(20);

        return paginated($orders, 'Orders retrieved successfully.', OrderResource::class);
    }

    public function store(PlaceOrderRequest $request): JsonResponse
    {
        $order = $this->orderService->placeOrder(
            auth()->user(),
            $request->validated()
        );

        return success('Order created successfully.', new OrderResource($order), 201);
    }

    public function show(Order $order): JsonResponse
    {
        abort_if($order->user_id !== auth()->id(), 403);

        return success('Order retrieved successfully.', new OrderResource($order->load('items.product')));
    }
}
