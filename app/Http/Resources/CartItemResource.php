<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
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
            'cart_item_id' => $this->id,
            'product_info' => [
                'id' => $this->whenLoaded('product', fn () => $this->product->id),
                'name' => $this->whenLoaded('product', fn () => $this->product->name),
                'price' => $this->whenLoaded('product', fn () => $this->product->price),
                'image' => $this->whenLoaded('product', fn () => $this->product->relationLoaded('images') ? $this->product->images->first()?->image_path : null),
            ],
            'quantity' => $this->quantity,
            'subtotal' => $this->whenLoaded('product', fn () => $this->product->price * $this->quantity),
        ];
    }
}
