import React from "react";
import { CatData } from "./data/CatData,";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const BrowseByCat = () => {
  return (
    <>
      <div className="pt-4 md:pt-6 max-w-[1280px] m-auto">
        {/* catogory hed dev */}
        <div className="flex flex-row justify-between ">
          {" "}
          <h3 className="font-bold text-2xl ">Browse by Category</h3>
          <Link href="/home/categories">
            <div className="flex flex-row gap-2">
              <p className="text-[#F97316] text-[20px] font-light">
                All categories
              </p>
              <MoveRight className="text-[#F97316]" />
            </div>
          </Link>
        </div>
        {/* catogory card dev */}
        <div className="flex flex-row justify-between gap-6 mt-6">
          {CatData.slice(0, 5).map((category) => (
            <Link
              key={category.slug}
              href={`/home/categories/${category.slug}`}
              className="group flex w-[140px] shrink-0 snap-start flex-col items-center gap-3 sm:w-[168px]"
            >
              <span
                className="
                  relative flex aspect-square w-full items-center justify-center
                  overflow-hidden rounded-full bg-[#F2F2F2] p-6
                  transition-all duration-300 ease-out
                  group-hover:-translate-y-1
                  group-hover:bg-[#F97316]/10
                  group-hover:shadow-lg group-hover:shadow-[#F97316]/20
                  ring-1 ring-transparent group-hover:ring-[#F97316]/30
                "
              >
                {/* soft glow that fades in behind the icon */}
                <span
                  className="
                    absolute inset-0 rounded-full
                    bg-[#F97316]/0 blur-xl
                    transition-colors duration-300
                    group-hover:bg-[#F97316]/10
                  "
                  aria-hidden
                />
                <Image
                  src={category.image}
                  alt={category.title}
                  width={56}
                  height={56}
                  className="
                   h-20 w-20 relative object-contain
                    transition-transform duration-300 ease-out
                    group-hover:scale-110 group-hover:rotate-[-4deg]
                  "
                />
              </span>

              <span
                className="
                  text-center text-base font-semibold leading-tight text-[#1A1A1A]
                  transition-colors duration-200
                  group-hover:text-[#F97316]
                "
              >
                {category.title}
              </span>

              <span
                className="
                  text-sm text-[#8C8C8C]
                  transition-colors duration-200
                  group-hover:text-[#F97316]/70
                "
              >
                {category.itemCount}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrowseByCat;