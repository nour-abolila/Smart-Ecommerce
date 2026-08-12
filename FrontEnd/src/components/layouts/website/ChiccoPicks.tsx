"use client";

import Image from "next/image";
import { Grid2X2, List, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/shared/websiteshared/productcard";
import {Chiccos  } from "./data/chiccopicks";
import { Button } from "@/components/ui/button";
import useProductToolBar from "@/hooks/useProductToolBar";
import Producttoolbar from "@/components/shared/websiteshared/producttoolbar";

const ChiccoPicks = () => {
   const { view } = useProductToolBar(); 
  return (
       <div className="w-full">
      <div className="relative w-full overflow-hidden mt-8">
        <Image src="/chiccopicks.png" alt="Chicco brand banner" width={1280} height={400} className="w-full h-auto object-cover" />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-2xl font-bold">CHICCO Picks</h2>
        <Producttoolbar />
      </div>

      <div className={view === "grid" ? "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" : "mt-6 flex flex-col gap-4"}>
        {Chiccos.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="pill" size="pill">View ALL</Button>
      </div>
    </div>
  );
};

export default ChiccoPicks;