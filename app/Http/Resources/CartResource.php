<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
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
            'cart_id' => $this->id,
            'cart_total_price' => $this->total_price,
            'products' => CartItemResource::collection($this->whenLoaded('items')), // connect with  Cart::with(['items.product'])
        ];
    }
}
