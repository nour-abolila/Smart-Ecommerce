"use client";
import Image from "next/image";
import ProductCard from "@/components/shared/websiteshared/productcard";
import { products } from "./data/products";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import PromoBannerRow from "./slugpromopannel";
import React from "react";

const items = [
  "Smartphones",
  "Laptops",
  "Tablets",
  "Smartwatches",
  "Cameras",
  "Audio",
];
const Activecategory = () => {
  const [subcat, setSubcat] = useQueryState("subcat", { defaultValue: "all" });
  return (
    <div className="mt-3 flex flex-col gap-5 justify-center items-center">
      <Image alt="slugbanner" src="/electpage.png" width={1240} height={550} />
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Button variant="pill" size="pill">
        View ALL
      </Button>
      <Image alt="slugbanner" src="/electpage2.png" width={1240} height={494} />

      {/* filter bar: full width + self-start so it hugs the left edge
          instead of being centered by the parent's items-center */}
      <div className="w-full self-start flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
        <Button
          size="lg"
          variant={subcat === "all" ? "default" : "outline"}
          onClick={() => setSubcat("all")}
          className={`rounded-full px-6  transition-all ${
            subcat === "all"
              ? "bg-[#F97316] hover:bg-[#F97316]/90 shadow-md shadow-[#F97316]/25 border-transparent"
              : "border-border text-muted-foreground hover:border-[#F97316]/40 hover:text-[#F97316]"
          }`}
        >
          All
        </Button>

        {items.map((label) => (
          <Button
            key={label}
            size="lg"
            variant={subcat === label ? "default" : "outline"}
            onClick={() => setSubcat(label)}
            className={`rounded-full px-6  transition-all ${
              subcat === label
                ? "bg-[#F97316] hover:bg-[#F97316]/90 shadow-md shadow-[#F97316]/25 border-transparent"
                : "border-border text-muted-foreground hover:border-[#F97316]/40 hover:text-[#F97316]"
            }`}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Button variant="pill" size="pill">
        View ALL
      </Button>
      <PromoBannerRow
        banners={[
          {
            title: "Smartwatch bands",
            image: "/elecitem.png",
            href: "/categories/electronics?subcat=Smartwatches",
          },
          {
            title: "Screen protectors",
            image: "/elecitem2.png",
            href: "/categories/electronics?subcat=Accessories",
          },
          {
            title: "Fitness tracker bands",
            image: "/elecitem3.png",
            href: "/categories/electronics?subcat=Wearables",
          },
        ]}
      />
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Button variant="pill" size="pill">
        View ALL
      </Button>
    </div>
  );
};

export default Activecategory;
