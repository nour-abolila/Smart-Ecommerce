"use client";

import ProductCard from "@/components/shared/websiteshared/productcard";
import Producttoolbar from "@/components/shared/websiteshared/producttoolbar";
import { Button } from "@/components/ui/button";
import useProductToolBar from "@/hooks/useProductToolBar";
import { Chiccos } from "./data/chiccopicks";

const TrendingGlasses = () => {
  const { view } = useProductToolBar();

  return (
    <div className="w-full">
      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Trending Glasses</h2>

        <Producttoolbar />
      </div>

      <div
        className={
          view === "grid"
            ? "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            : "mt-6 flex flex-col gap-4"
        }
      >
        {Chiccos.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="pill" size="pill">
          View ALL
        </Button>
      </div>
    </div>
  );
};

export default TrendingGlasses;