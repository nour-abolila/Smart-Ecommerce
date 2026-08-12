<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'method' => ['required', 'in:card,cash_on_delivery'],
            'amount' => ['required', 'numeric', 'min:0.01'],

            'card_number' => ['required_if:method,card', 'digits:16'],
            'expiry' => ['required_if:method,card', 'date_format:m/y'],
            'cvv' => ['required_if:method,card', 'digits:3'],
        ];
    }

    public function messages(): array
    {
        return [
            'card_number.digits' => 'Card number must be exactly 16 digits.',
            'cvv.digits' => 'CVV must be exactly 3 digits.',
            'expiry.date_format' => 'Expiry must be in MM/YY format.',
        ];
    }
}
