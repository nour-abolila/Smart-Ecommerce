import {
  Package,
  Heart,
  ShoppingCart,
  User,
  Bell,
  MapPin,
  CreditCard,
  HelpCircle,
  Shield,
  Phone,
  LogOut,
  ChevronRight,
  Pencil,
} from "lucide-react";
import Link from "next/link";

// --- Mock data (swap these for real props / API data later) ---
const user = {
  name: "Mohamed Hany",
  email: "you@example.com",
  initials: "MH",
};

const stats = [
  { label: "Orders", value: 5, icon: Package },
  { label: "Saved", value: 3, icon: MapPin },
  { label: "Wishlist", value: 2, icon: Heart },
];

const shoppingLinks = [
  { label: "My Orders", icon: Package, href: "/home/profile/orderpage" },
  { label: "Wishlist", icon: Heart, href: "/wishlist" },
  { label: "Cart", icon: ShoppingCart, href: "/cart" },
];

const accountLinks = [
  { label: "Edit Profile", icon: Pencil, href: "/home/profile/editprofile" },
  { label: "Notifications", icon: Bell, href: "/home/profile/notifcations" },
  { label: "Saved Addresses", icon: MapPin, href: "/home/profile/addresses" },
  { label: "Payment Methods", icon: CreditCard, href: "/home/profile/payment-methods" },
];

const supportLinks = [
  { label: "Help Center", icon: HelpCircle, href: "/help" },
  { label: "Terms & Privacy", icon: Shield, href: "/terms" },
  { label: "Contact Us", icon: Phone, href: "/contact" },
];

const statusStyles = {
  Shipped: "text-blue-500",
  Processing: "text-orange-500",
  Delivered: "text-green-600",
} as const;

type OrderStatus = keyof typeof statusStyles;

const recentOrders: { name: string; status: OrderStatus; date: string }[] = [
  { name: "Airpods Pro 2", status: "Shipped", date: "July 20, 2026" },
  { name: "iPad Air M4 Chip 256GB Wi...", status: "Processing", date: "July 22, 2026" },
  { name: "Anker PowerPort III 20W...", status: "Delivered", date: "June 30, 2026" },
];

function ListRow({ icon: Icon, label, href }: { icon: React.ComponentType<{ className?: string }>; label: string; href: string }) {
  return (
    <a
      href={href}
      className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <span className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-orange-500" />
        <span className="text-sm font-medium text-gray-800">{label}</span>
      </span>
      <ChevronRight className="w-4 h-4 text-gray-300" />
    </a>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      {title && (
        <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {title}
        </p>
      )}
      <div className="divide-y divide-gray-50">{children}</div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your personal information and account settings.
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Home <span className="mx-1">›</span>
            <span className="text-gray-700 font-medium">Profile</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile card */}
            <div className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
                  {user.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <Link href="/home/profile/editprofile">
              <button className="flex items-center gap-1.5 bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button></Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl border border-orange-200 p-4 flex flex-col items-center text-center"
                >
                  <Icon className="w-4 h-4 text-orange-500 mb-2" />
                  <p className="text-xl font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>

            {/* My Shopping */}
            <SectionCard title="My Shopping">
              {shoppingLinks.map((link) => (
                <ListRow key={link.label} {...link} />
              ))}
            </SectionCard>

            {/* Account Settings */}
            <SectionCard title="Account Settings">
              {accountLinks.map((link) => (
                <ListRow key={link.label} {...link} />
              ))}
            </SectionCard>

            {/* Support */}
            <SectionCard title="Support">
              {supportLinks.map((link) => (
                <ListRow key={link.label} {...link} />
              ))}
            </SectionCard>

            {/* Sign out */}
            <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Profile completed */}
            <div className="rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-800">
                  Profile Completed
                </p>
                <span className="text-sm font-semibold text-orange-500">80%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: "80%" }} />
              </div>
              <p className="text-xs text-orange-500 mt-2">
                Almost there! Complete your profile.
              </p>
            </div>

            {/* Recent orders */}
            <div className="rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-800">Recent Orders</p>
                <a href="/home/profile/orderpage" className="text-xs font-medium text-orange-500 hover:underline">
                  View all
                </a>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.name} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {order.name}
                      </p>
                      <p className={`text-xs font-medium ${statusStyles[order.status]}`}>
                        {order.status}
                      </p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Need help */}
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-sm font-semibold text-gray-800 mb-1">Need Help?</p>
              <p className="text-xs text-gray-500 mb-3">
                Our support team is here to help you.
              </p>
              <button className="w-full border border-orange-500 text-orange-500 text-sm font-medium py-2 rounded-lg hover:bg-orange-50 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}