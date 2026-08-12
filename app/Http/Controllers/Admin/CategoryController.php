<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return paginated(Category::paginate(20), 'Categories retrieved successfully.', CategoryResource::class);
    }

    public function store(CategoryRequest $request): JsonResponse
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('categories', 'public');
        }

        return success('Category created successfully.', new CategoryResource(Category::create($data)), 201);
    }

    public function show(Category $category): JsonResponse
    {
        return success('Category retrieved successfully.', new CategoryResource($category));
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

        return success('Category updated successfully.', new CategoryResource($category));
    }

    public function destroy(Category $category): JsonResponse
    {
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }
        $category->delete();

        return success('Category deleted successfully.');
    }
}
