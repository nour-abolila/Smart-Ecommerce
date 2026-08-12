<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\BrowseProductRequest;
use App\Http\Resources\ProductDetailResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(BrowseProductRequest $request)
    {
        $query = Product::query();

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->integer('category_id'));
        }

        return paginated($query->latest()->paginate(20), 'Products retrieved successfully.', ProductResource::class);
    }

    public function show(Product $product)
    {
        $product->load(['category', 'images']);

        return success('Product retrieved successfully.', new ProductDetailResource($product));
    }
}
