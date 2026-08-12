<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            CategoryResource::collection(Category::all())
        );
    }

    public function store(CategoryRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('categories', 'public');
        }

        $category = Category::create($data);

        return response()->json(new CategoryResource($category), 201);
    }

    public function show(Category $category): JsonResponse
    {
        return response()->json(new CategoryResource($category));
    }

    public function update(CategoryRequest $request, Category $category): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }

            $data['image'] = $request->file('image')->store('categories', 'public');
        }

        $category->update($data);

        return response()->json(new CategoryResource($category));
    }

    public function destroy(Category $category): JsonResponse
    {
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return response()->json(null, 204);
    }
}
