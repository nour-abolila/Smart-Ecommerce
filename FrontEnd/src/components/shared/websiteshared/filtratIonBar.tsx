"use client";

import { usePathname, useRouter  } from "next/navigation";

import { Sparkles } from "lucide-react";
import { CatData ,CategoryData } from "@/components/layouts/website/data/CatData,";

const FiltrationBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = pathname.startsWith("/home/categories/")
    ? pathname.split("/home/categories/")[1]
    : "all";

  const goTo = (cat: string) => {
    router.push(cat === "all" ? "/home/categories" : `/home/categories/${cat}`);
  };

  return (
    <div className="  mb-5">
      <div className="flex items-center  gap-6 overflow-x-auto no-scrollbar  ">
        <button
          type="button"
          onClick={() => goTo("all")}
          className={`relative flex items-center gap-1.5 cursor-pointer whitespace-nowrap py-4 text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "text-[#F97316]"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {activeCategory === "all" && <Sparkles className="w-4 h-4" fill="#F97316" />}
          All
          {activeCategory === "all" && (
            <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#F97316] rounded-full" />
          )}
        </button>

        {CatData.map((cat :CategoryData ) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => goTo(cat.slug)}
            className={`relative flex items-center gap-1.5 whitespace-nowrap py-4 text-sm font-medium cursor-pointer transition-colors ${
              activeCategory === cat.slug
                ? "text-[#F97316]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeCategory === cat.slug && <Sparkles className="w-4 h-4" fill="#F97316" />}
            {cat.title}
            {activeCategory === cat.slug && (
              <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#F97316] rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FiltrationBar;