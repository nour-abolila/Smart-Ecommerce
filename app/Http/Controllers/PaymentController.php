<?php

namespace App\Http\Controllers;

use App\Enums\PaymentStatus;
use App\Http\Requests\PaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Order;
use App\Models\Payment;

// Development-only fake gateway. Replace before production use.
class PaymentController extends Controller
{
    public function pay(PaymentRequest $request, Order $order)
    {
        $payment = new Payment;
        $payment->order()->associate($order);
        $payment->amount = $request->validated('amount');
        $payment->method = $request->validated('method');
        $payment->status = PaymentStatus::Succeeded;
        $payment->transaction_id = 'FAKE-'.strtoupper(uniqid());
        $payment->currency = 'usd';
        $payment->save();

        return success('Payment successful', new PaymentResource($payment), 201);
    }
}
