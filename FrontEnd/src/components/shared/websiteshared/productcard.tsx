"use client";

import Image from "next/image";
import { Heart,  Star } from "lucide-react";
import { Plus } from 'lucide-react';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/components/layouts/website/data/products";
import { toast } from "sonner";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [isAdded, setIsAdded] = useState(false);

  const roundedRating = Math.round(product.rating);

  function handleFavorite() {
    setIsFavorite((prev) => !prev);

    toast(isFavorite ? "Removed from wishlist" : "Added to wishlist ❤️");
  }

  function handleAddToCart() {
    setIsAdded(true);

    toast.success("Added to cart 🛒");
  }

  return (
    <div className="group flex w-[300px] flex-col rounded-xl border bg-white p-3 transition-shadow hover:shadow-lg">
      {/* Image */}
      <div className="relative mb-3 flex  h-60 items-center justify-center rounded-lg bg-gray-50">
        <Image
          src={product.image}
          alt={product.title}
          width={220}
          height={220}
          className="object-contain p-2 mt-30 transition group-hover:scale-105"
        />

        <button
          onClick={handleFavorite}
          className="absolute right-0 top-0 cursor-pointer   "
        >
          <Heart
            size={30}
            className={`transition ${
              isFavorite ? "fill-black text-black" : "black"
            }`}
          />
        </button>
      </div>

      {/* Brand */}
      <div className="flex flex-col mt-20" >
        {" "}
        <p className="text-[10px] text-gray-500">{product.brand}</p>
        {/* Title */}
        <h3 className="line-clamp-2 min-h-[38px] text-xs font-medium">
          {product.title}
        </h3>
        {/* Rating */}
        <div className="mt-1 flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={12}
                className={
                  index < roundedRating
                    ? "fill-orange-500 text-orange-500"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <span className="text-[10px] text-gray-500">
            ({product.reviewCount})
          </span>
        </div>
        {/* Price */}
        <div className="mt-2">
          <p className="text-lg font-bold">
            SAR {product.price.toLocaleString()}
          </p>

          {product.oldPrice && (
            <p className="text-xs text-gray-400 line-through">
              SAR {product.oldPrice.toLocaleString()}
            </p>
          )}
        </div>
        {/* Button */}
        <Button
          onClick={handleAddToCart}
          className="mt-3 h-8 rounded-md bg-black text-xs hover:bg-neutral-800"
          disabled={isAdded}
        >
          <Plus className="mr-2 h-4 w-4" />

          {isAdded ? "Added" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
