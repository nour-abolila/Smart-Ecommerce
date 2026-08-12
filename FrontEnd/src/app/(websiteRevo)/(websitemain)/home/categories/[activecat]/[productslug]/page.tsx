import ProductInfo from "@/components/shared/websiteshared/productinfo";

const product = {
  id: 1,
  brand: "Apple",
  title: "Apple iPhone 15 Pro Max 256GB Natural Titanium",

  image: "/phone1.png",

  images: [
    { id: 1, url: "/phone1.png" },
    { id: 2, url: "/phone1-2.png" },
    { id: 3, url: "/phone1-3.png" },
    { id: 4, url: "/phone1-4.png" },
  ],

  price: 4299,
  oldPrice: 4999,

  rating: 5,
  reviewCount: 1124,

  isFavorite: true,
  stock: 10,
  IsFreeShipping: true,
  isNew: true,

  badges: ["Apple Intelligence", "256GB", "11 inch"],

  colors: [
    { name: "Natural Titanium", hex: "#B9B3AA" },
    { name: "Blue Titanium", hex: "#61778D" },
    { name: "White Titanium", hex: "#F5F5F5" },
    { name: "Black Titanium", hex: "#2C2C2C" },
  ],

  description:
    "The iPhone 15 Pro Max is built from aerospace-grade titanium and powered by the A17 Pro chip, delivering exceptional performance, an advanced camera system, and all-day battery life.",

  specifications: [
    { label: "Display", value: "6.7-inch Super Retina XDR" },
    { label: "Processor", value: "Apple A17 Pro" },
    { label: "Storage", value: "256 GB" },
    { label: "Camera", value: "48 MP Main + 12 MP Ultra Wide" },
    { label: "Battery", value: "Up to 29 hours video playback" },
    { label: "Operating System", value: "iOS 18" },
  ],

  reviews: [
    {
      id: 1,
      user: "Ahmed",
      rating: 5,
      comment: "Amazing phone. Camera quality is outstanding.",
      date: "2026-07-20",
    },
    {
      id: 2,
      user: "Sara",
      rating: 4,
      comment: "Very fast, but quite expensive.",
      date: "2026-07-22",
    },
  ],

  frequentlyBoughtTogether: [
    {
      id: "iphone-15-pro-max",
      title: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
      image: "/phone1.png",
      price: 4299,
      href: "/products/1",
      defaultSelected: true,
      freeShip: true,
    },
    {
      id: "iphone-15-pro-max-screen-protector",
      title: "Tempered Glass Screen Protector for iPhone 15 Pro Max",
      image: "/screen-protector.png",
      price: 39,
      href: "/products/iphone-15-pro-max-screen-protector",
      defaultSelected: true,
      freeShip: true,
    },
    {
      id: "apple-magsafe-charger",
      brand: "Apple",
      title: "MagSafe Charger (USB-C)",
      image: "/magsafe-charger.png",
      price: 249,
      href: "/products/apple-magsafe-charger",
      defaultSelected: true,
    },
  ],
};

export default function Page() {
  return (
    <div>
      <ProductInfo product={product} />
    </div>
  );
}