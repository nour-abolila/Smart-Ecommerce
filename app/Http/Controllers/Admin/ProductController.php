<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        return paginated(Product::paginate(20), 'Products retrieved successfully.', ProductResource::class);
    }

    public function store(ProductRequest $request): JsonResponse
    {
        $product = Product::create($request->validated());

        return success('Product created successfully.', new ProductResource($product), 201);
    }

    public function show(Product $product): JsonResponse
    {
        return success('Product retrieved successfully.', new ProductResource($product));
    }

    public function update(ProductRequest $request, Product $product): JsonResponse
    {
        $product->update($request->validated());

        return success('Product updated successfully.', new ProductResource($product));
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();

        return success('Product deleted successfully.');
    }
}
