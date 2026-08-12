<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'category' => $this->whenLoaded('category', fn () => $this->category->name),
            'images' => $this->whenLoaded('images', fn () => $this->images->pluck('image_path')),
            'price' => $this->price,
            'discount_price' => $this->discount_price,
            'stock_status' => $this->stock > 0 ? 'in_stock' : 'out_of_stock',
        ];
    }
}
