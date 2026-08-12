"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type BundleItem = {
  id: string;
  title: string;
  brand?: string;
  image: string;
  price: number;
  href: string;
  defaultSelected: boolean;
  freeShip?: boolean;
};

type FrequentlyBoughtTogetherProps = {
  items: BundleItem[];
};

const FrequentlyBoughtTogether = ({ items }: FrequentlyBoughtTogetherProps) => {
  const [selectedIds, setSelectedIds] = useState(
    items.filter((i) => i.defaultSelected).map((i) => i.id)
  );

  function toggle(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  if (items.length === 0) return null;

  const selectedItems = items.filter((item) => selectedIds.includes(item.id));
  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="my-10">
      <h2 className="mb-4  text-xl font-semibold uppercase tracking-wide text-[#1A1A1A]">
        Frequently Bought Together
      </h2>

      <div className="flex flex-wrap items-center gap-3">
        {items.map((item, index) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <div key={item.id} className="flex items-center gap-3">
              <div
                className={`relative w-[180px] rounded-xl border p-4 transition-colors ${
                  isSelected ? "border-gray-200" : "border-gray-200"
                }`}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggle(item.id)}
                  aria-label={`${isSelected ? "Remove" : "Add"} ${item.title} to bundle`}
                  className="absolute right-3 top-3 size-6 rounded-md border-gray-300 data-checked:border-[#F97316] data-checked:bg-[#F97316]"
                />

                <a href={item.href} className="block">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="mx-auto h-24 w-24 object-contain"
                  />
                </a>

                <p className="mt-4 text-sm font-bold text-[#1A1A1A]">
                  SAR {item.price.toLocaleString()}
                </p>

                {item.brand && (
                  <p className="mt-2 text-xs text-muted-foreground underline underline-offset-2">
                    {item.brand}
                  </p>
                )}

                <p className="text-xs leading-snug text-muted-foreground line-clamp-2">
                  {item.title}
                </p>

                {item.freeShip && (
                  <span className="mt-2 inline-block rounded-full bg-[#16A34A]/10 px-2 py-0.5 text-[10px] font-medium text-[#16A34A]">
                    Free ship
                  </span>
                )}
              </div>

              {index < items.length - 1 && (
                <Plus className="h-5 w-5 shrink-0 text-[#1A1A1A]" />
              )}
            </div>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="lg"
        disabled={selectedItems.length === 0}
        className="mt-4 w-full border-[#1A1A1A]/20 py-6 text-sm font-bold uppercase tracking-wide text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white disabled:opacity-50"
      >
        Buy {selectedItems.length} together for SAR {total.toLocaleString()}
      </Button>
    </div>
  );
};

export default FrequentlyBoughtTogether;