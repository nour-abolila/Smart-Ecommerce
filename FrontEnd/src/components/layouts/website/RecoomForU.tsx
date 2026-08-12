import React from "react";
import ProductCard from "@/components/shared/websiteshared/productcard";
import { products } from "@/components/layouts/website/data/products";

const RecoomForU = () => {
  return (
    <section className="pt-4 md:pt-6 max-w-[1280px] m-auto">
      <h2 className="mb-4 text-2xl font-bold">Recommendations For You</h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecoomForU;
