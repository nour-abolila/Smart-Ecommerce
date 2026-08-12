"use client";

import { useState } from "react";
import { useQueryState } from "nuqs";
import {
  ArrowLeft,
  Check,
  Package,
  Truck,
  Percent,
  TrendingDown,
  ShieldAlert,
  UserCog,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const filters = [
  { label: "All", value: "all" },
  { label: "Orders", value: "orders" },
  { label: "Deals", value: "deals" },
  { label: "Account", value: "account" },
];

// Swap for real data once the notifications endpoint exists
const initialNotifications = [
  {
    id: 1,
    group: "Today",
    category: "orders",
    title: "Order delivered",
    description: "Your order MKT-2025-6842 has been delivered. Enjoy!",
    time: "1h ago",
    icon: Package,
    unread: true,
  },
  {
    id: 2,
    group: "Today",
    category: "orders",
    title: "Out for delivery",
    description: "Order MKT-2025-8790 is out for delivery today.",
    time: "5h ago",
    icon: Truck,
    unread: true,
  },
  {
    id: 3,
    group: "Yesterday",
    category: "deals",
    title: "Flash sale started",
    description: "Up to 40% off electronics. Ends tonight at midnight.",
    time: "8h ago",
    icon: Percent,
    unread: true,
  },
  {
    id: 4,
    group: "This Week",
    category: "deals",
    title: "Price drop alert",
    description: "The Sony WH-1000XM5 in your wishlist dropped by SAR 300.",
    time: "1d ago",
    icon: TrendingDown,
    unread: false,
  },
  {
    id: 5,
    group: "This Week",
    category: "account",
    title: "New login detected",
    description: "A new sign-in from Riyadh, SA on Chrome.",
    time: "1d ago",
    icon: ShieldAlert,
    unread: false,
  },
  {
    id: 6,
    group: "Earlier",
    category: "orders",
    title: "Order confirmed",
    description: "We've received order MKT-2025-8721 and it's being prepared.",
    time: "3d ago",
    icon: Package,
    unread: false,
  },
  {
    id: 7,
    group: "Earlier",
    category: "account",
    title: "Profile updated",
    description: "Your account details were updated successfully.",
    time: "4d ago",
    icon: UserCog,
    unread: false,
  },
];

const groupOrder = ["Today", "Yesterday", "This Week", "Earlier"];

export default function NotificationsPage() {
  const [category, setCategory] = useQueryState("category", { defaultValue: "all" });
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filtered =
    category === "all"
      ? notifications
      : notifications.filter((n) => n.category === category);

  const grouped = groupOrder
    .map((group) => ({
      group,
      items: filtered.filter((n) => n.group === group),
    }))
    .filter((g) => g.items.length > 0);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

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
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <Badge className="rounded-full bg-orange-500 hover:bg-orange-500 text-white px-2.5 py-0.5 font-medium">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <button
            type="button"
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            Mark all as read
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => {
            const active = category === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setCategory(f.value === "all" ? null : f.value)}
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

        {/* Grouped notifications */}
        <div className="space-y-6">
          {grouped.map(({ group, items }) => (
            <div key={group}>
              <p className="text-xs font-medium text-gray-400 mb-2">{group}</p>
              <div className="space-y-2">
                {items.map((n) => {
                  const Icon = n.icon;
                  return (
                    <button
                      key={n.id}
                      type="button"
                      className={`w-full flex items-start gap-3 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-sm active:scale-[0.99] ${
                        n.unread
                          ? "bg-orange-50/70 hover:bg-orange-50"
                          : "bg-white border border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          n.unread ? "bg-orange-100 text-orange-500" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" strokeWidth={1.75} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                          {n.title}
                          {n.unread && (
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                          )}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                          {n.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>

                      <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mt-1" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {grouped.length === 0 && (
            <p className="text-sm text-gray-400 py-10 text-center">
              No notifications in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}