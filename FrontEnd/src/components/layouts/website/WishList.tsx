"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Producttoolbar from "@/components/shared/websiteshared/producttoolbar";
import ProductCard from "@/components/shared/websiteshared/productcard";
import { Product } from "@/components/layouts/website/data/products";
import useProductToolBar from "@/hooks/useProductToolBar";
import EmptyState from "@/components/shared/websiteshared/nowishlistitems";

const wishlistProducts: Product[] = [
  {
    id: 1,
    brand: "Apple",
    title: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
    image: "/phone1.png",
    price: 4299,
    oldPrice: 4999,
    rating: 5,
    reviewCount: 1124,
    isFavorite: true,
    stock: 15,
  },
  {
    id: 2,
    brand: "Chicco",
    title: "Chicco Baby Bottle Natural Feeling Pink 150ml 0m+",
    image: "/baby-bottle.png",
    price: 299,
    oldPrice: 349,
    rating: 5,
    reviewCount: 1349,
    isFavorite: true,
    stock: 30,
  },
];

function sortProducts(products: Product[], sort: string) {
  const sorted = [...products];
  switch (sort) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "popular":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case "newest":
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted;
  }
}

export default function WishlistPage() {
  const { sort, view } = useProductToolBar();
  const sortedProducts = sortProducts(wishlistProducts, sort);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">Wishlist</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {sortedProducts.length} product
        {sortedProducts.length === 1 ? "" : "s"}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-[#1A1A1A]">
                Wishlist
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Producttoolbar />
      </div>

      {sortedProducts.length > 0 ? (
        <div
          className={
            view === "list"
              ? "mt-6 flex flex-col gap-4"
              : "mt-6 flex flex-wrap gap-6"
          }
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
       <EmptyState/>
      )}
    </div>
  );
}