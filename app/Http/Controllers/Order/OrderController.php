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
            ->get();

        return response()->json(OrderResource::collection($orders));
    }

    public function store(PlaceOrderRequest $request): JsonResponse
    {
        $order = $this->orderService->placeOrder(
            auth()->id(),
            $request->validated()
        );

        return response()->json(new OrderResource($order), 201);
    }

    public function show(Order $order): JsonResponse
    {
        abort_if($order->user_id !== auth()->id(), 403);

        return response()->json(new OrderResource($order->load('items.product')));
    }
}
