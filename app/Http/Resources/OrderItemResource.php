<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'product_name' => $this->whenLoaded('product', fn () => $this->product?->name),
            'product_image' => $this->whenLoaded('product', fn () => $this->product?->relationLoaded('images') ? $this->product->images->first()?->image_path : null),
            'quantity' => $this->quantity,
            'price' => $this->price,
            'subtotal' => $this->price * $this->quantity,
        ];
    }
}
