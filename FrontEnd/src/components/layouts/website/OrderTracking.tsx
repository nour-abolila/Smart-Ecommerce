"use client";

import { ArrowLeft, MapPin, CreditCard, RotateCcw, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const statusStyles = {
  processing: "bg-orange-50 text-orange-500",
  shipped: "bg-blue-50 text-blue-500",
  delivered: "bg-green-50 text-green-600",
  cancelled: "bg-red-50 text-red-500",
};

const statusDot = {
  processing: "bg-orange-500",
  shipped: "bg-blue-500",
  delivered: "bg-green-600",
  cancelled: "bg-red-500",
};

const steps = ["Ordered", "Processing", "Shipped", "Delivered"];

// Swap for real data once the order-detail endpoint exists
const order = {
  id: "MKT-2026-8721",
  status: "processing",
  currentStep: 1, // index into `steps`
  items: [
    {
      name: "iPad Air M4 Chip 256GB Wi-Fi+Cellular Space Gray",
      qty: 1,
      placedOn: "Jul 25, 2026",
      price: "SAR 5,598",
    },
  ],
  deliveryAddress: "King Fahd Rd, Al Olaya District, Riyadh 12211",
  paymentMethod: "Apple Pay",
  priceBreakdown: {
    subtotal: "SAR 5,598",
    shipping: "Free",
    total: "SAR 5,598",
  },
};

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Track Order</h1>
            <p className="text-sm text-gray-400 mt-1">{order.id}</p>
          </div>
          <Badge
            variant="outline"
            className={`gap-1.5 rounded-full border-0 px-3 py-1 font-medium ${statusStyles[order.status]}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[order.status]}`} />
            {steps[order.currentStep]}
          </Badge>
        </div>

        {/* Order status stepper */}
        <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-5 mb-6">
          <p className="text-sm font-semibold text-gray-800 mb-4">Order Status</p>
          <div className="flex items-center">
            {steps.map((step, i) => {
              const done = i <= order.currentStep;
              const isLast = i === steps.length - 1;
              return (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        done ? "bg-orange-500" : "bg-gray-200"
                      }`}
                    >
                      {done && i < order.currentStep && (
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium whitespace-nowrap ${
                        done ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      className={`h-0.5 flex-1 mx-2 rounded-full transition-colors ${
                        i < order.currentStep ? "bg-orange-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Items */}
        <p className="text-sm font-semibold text-gray-800 mb-3">
          Items ({order.items.length})
        </p>
        <div className="space-y-3 mb-6">
          {order.items.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-4 rounded-xl border border-gray-100 p-4"
            >
              <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Qty: {item.qty}
                  <span className="mx-1.5">·</span>
                  Placed on {item.placedOn}
                </p>
              </div>
              <p className="text-sm font-semibold text-orange-500 shrink-0">
                {item.price}
              </p>
            </div>
          ))}
        </div>

        {/* Delivery + Payment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl bg-gray-50/70 p-4">
            <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Delivery Address
            </p>
            <p className="text-sm text-gray-800">{order.deliveryAddress}</p>
          </div>
          <div className="rounded-xl bg-gray-50/70 p-4">
            <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
              <CreditCard className="w-3.5 h-3.5" />
              Payment Method
            </p>
            <p className="text-sm text-gray-800">{order.paymentMethod}</p>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="rounded-xl border border-gray-100 p-4 mb-6">
          <p className="text-sm font-semibold text-gray-800 mb-3">Price Breakdown</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-800">{order.priceBreakdown.subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="text-gray-800">{order.priceBreakdown.shipping}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold pt-2 border-t border-gray-100">
              <span className="text-gray-800">Total</span>
              <span className="text-orange-500">{order.priceBreakdown.total}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg transition-all duration-200 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-1.5 bg-orange-500 text-white text-sm font-medium py-2.5 rounded-lg transition-all duration-200 hover:bg-orange-600 hover:shadow-md hover:shadow-orange-200 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Buy Again
          </button>
        </div>
      </div>
    </div>
  );
}