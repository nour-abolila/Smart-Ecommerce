"use client";

import { useQueryState } from "nuqs";
import { ArrowLeft, Tablet, PenLine, Gem, Headphones } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const filters = [
  { label: "All", value: "all" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

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

const statusLabels = {
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

// Swap for real data once the orders endpoint exists
const orders = [
  {
    id: "MKT-2025-6842",
    placedOn: "Jun 16, 2026",
    name: "iPad Air M4 Chip 256GB Wi-Fi+Cellular Space Gray",
    price: "SAR 6,599",
    qty: 1,
    status: "processing",
    action: "Track Order",
    icon: Tablet,
  },
  {
    id: "MKT-2026-6542",
    placedOn: "Jun 10, 2026",
    name: "Apple Pencil (USB-C) White",
    price: "SAR 2,499",
    qty: 1,
    status: "shipped",
    action: "Track Order",
    icon: PenLine,
  },
  {
    id: "MKT-2025-8903",
    placedOn: "Jun 30, 2026",
    name: "BTC 31.1g Silver Islamic Bangle - Al-Fatiha",
    price: "SAR 1,299",
    qty: 1,
    status: "delivered",
    action: "View Details",
    icon: Gem,
  },
  {
    id: "MKT-2026-6410",
    placedOn: "Jun 28, 2026",
    name: "Apple Airpods Pro 2 With Noise Cancellation",
    price: "SAR 5,599",
    qty: 1,
    status: "cancelled",
    action: "View Details",
    icon: Headphones,
  },
];

export default function MyOrdersPage() {
  const [status, setStatus] = useQueryState("status", { defaultValue: "all" });

  const filteredOrders =
    status === "all" ? orders : orders.filter((o) => o.status === status);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-sm text-gray-500 mt-1 mb-5">
          View all your orders history.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => {
            const active = status === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setStatus(f.value === "all" ? null : f.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  active
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Orders list */}
        <div className="divide-y divide-gray-100">
          {filteredOrders.map((order) => {
            const Icon = order.icon;
            return (
              <div
                key={order.id}
                className="group flex items-center gap-4 py-5 px-3 -mx-3 rounded-xl transition-colors hover:bg-gray-50/80"
              >
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 transition-all duration-200 group-hover:border-orange-200 group-hover:bg-orange-50/50 group-hover:scale-105">
                  <Icon
                    className="w-5 h-5 text-gray-400 transition-colors duration-200 group-hover:text-orange-500"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 truncate mb-1">
                    {order.id}
                    <span className="mx-1.5">·</span>
                    Placed on {order.placedOn}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {order.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-sm text-orange-500 font-semibold">
                      {order.price}
                    </p>
                    <span className="text-gray-300">·</span>
                    <p className="text-xs text-gray-400">Qty: {order.qty}</p>
                  </div>
                </div>

                {/* Status + Action */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Badge
                    variant="outline"
                    className={`gap-1.5 rounded-full border-0 px-2.5 py-0.5 font-medium ${statusStyles[order.status]}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot[order.status]}`} />
                    {statusLabels[order.status]}
                  </Badge>

                  <button
                    type="button"
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 active:scale-95 ${
                      order.action === "Track Order"
                        ? "bg-black text-white hover:bg-orange-500 hover:shadow-md hover:shadow-orange-200"
                        : "border border-gray-200 text-gray-700 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50"
                    }`}
                  >
                    {order.action}
                  </button>
                </div>
              </div>
            );
          })}

          {filteredOrders.length === 0 && (
            <p className="text-sm text-gray-400 py-10 text-center">
              No orders found for this filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}