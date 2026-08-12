<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlaceOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'delivery_address' => ['required', 'string'],
            'payment_method' => ['required', 'in:card,cash_on_delivery'],
        ];
    }
}
