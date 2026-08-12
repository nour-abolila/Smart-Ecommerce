"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";
import type useProductFilters from "@/hooks/Useproductfilters";

// TODO(backend): replace all static option arrays below with data
// fetched per-category (e.g. GET /filters?category=electronics)
const CATEGORY_OPTIONS = [
  { label: "Electronics", value: "electronics" },
  { label: "Fashion", value: "fashion" },
  { label: "Home & Living", value: "home-living" },
  { label: "Beauty", value: "beauty" },
];
const BRAND_OPTIONS = ["Apple", "Samsung", "Sony", "Xiaomi"];
const RATING_OPTIONS = [5, 4, 3, 2, 1];
const AVAILABILITY_OPTIONS = ["In Stock", "Out of Stock"];
const DISCOUNT_OPTIONS = ["10% or more", "25% or more", "50% or more"];
const CAPACITY_OPTIONS = ["64GB", "128GB", "256GB", "512GB", "1TB"];
const COLOUR_OPTIONS = [
  { name: "Black", hex: "#111111" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Gold", hex: "#D4AF37" },
  { name: "Blue", hex: "#3B82F6" },
];

// This type is just the bits of the hook's return value this component needs.
type FiltersState = ReturnType<typeof useProductFilters>;

type FilterSidebarProps = Pick<
  FiltersState,
  "filters" | "toggleFilter" | "setRating" | "setPriceRange"
>;

const FilterSidebar = ({
  filters,
  toggleFilter,
  setRating,
  setPriceRange,
}: FilterSidebarProps) => {
  return (
    <aside className="w-[260px] shrink-0">
      <h2 className="mb-4 text-lg font-semibold">Filters</h2>

      <Accordion defaultValue={["category"]} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="text-sm font-medium">Category</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2.5">
              {CATEGORY_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Checkbox
                    checked={filters.category.includes(opt.value)}
                    onCheckedChange={() => toggleFilter("category", opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">Price</AccordionTrigger>
          <AccordionContent className="px-1 pt-2">
            <Slider
              value={filters.priceRange}
              max={10000}
              step={100}
              onValueChange={(v) => setPriceRange(v as [number, number])}
            />
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>SAR {filters.priceRange[0]}</span>
              <span>SAR {filters.priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-sm font-medium">Brand</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2.5">
              {BRAND_OPTIONS.map((brand) => (
                <label
                  key={brand}
                  className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Checkbox
                    checked={filters.brand.includes(brand)}
                    onCheckedChange={() => toggleFilter("brand", brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger className="text-sm font-medium">Product Rating</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2.5">
              {RATING_OPTIONS.map((stars) => (
                <label key={stars} className="flex cursor-pointer items-center gap-2 text-sm">
                  <Checkbox
                    checked={filters.rating === stars}
                    onCheckedChange={() => setRating(stars)}
                  />
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < stars ? "fill-orange-500 text-orange-500" : "text-gray-300"
                        }
                      />
                    ))}
                  </span>
                  <span className="text-xs text-muted-foreground">& up</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger className="text-sm font-medium">Availability</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2.5">
              {AVAILABILITY_OPTIONS.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Checkbox
                    checked={filters.availability.includes(option)}
                    onCheckedChange={() => toggleFilter("availability", option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="discounts">
          <AccordionTrigger className="text-sm font-medium">Discounts</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2.5">
              {DISCOUNT_OPTIONS.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {/* TODO(backend): discount filtering needs a discount % on
                      Product first — wired to the hook, but has no effect
                      on applyFilters() yet */}
                  <Checkbox
                    checked={filters.discounts.includes(option)}
                    onCheckedChange={() => toggleFilter("discounts", option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="capacity">
          <AccordionTrigger className="text-sm font-medium">Capacity</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2.5">
              {CAPACITY_OPTIONS.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Checkbox
                    checked={filters.capacity.includes(option)}
                    onCheckedChange={() => toggleFilter("capacity", option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colour" className="border-b-0">
          <AccordionTrigger className="text-sm font-medium">Colour</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {COLOUR_OPTIONS.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  onClick={() => toggleFilter("colour", c.name)}
                  className={`h-6 w-6 rounded-full border-2 ${
                    filters.colour.includes(c.name) ? "border-black" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default FilterSidebar;