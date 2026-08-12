"use client";

import { useMemo } from "react";
import {
  useQueryStates,
  parseAsString,
  parseAsArrayOf,
  parseAsInteger,
} from "nuqs";
import { Product } from "@/components/layouts/website/data/products";

const filterParsers = {
  q: parseAsString.withDefault(""),
  category: parseAsArrayOf(parseAsString).withDefault([]),
  brand: parseAsArrayOf(parseAsString).withDefault([]),
  rating: parseAsInteger, // null when absent — "4 & up" -> 4
  minPrice: parseAsInteger.withDefault(0),
  maxPrice: parseAsInteger.withDefault(10000),
  availability: parseAsArrayOf(parseAsString).withDefault([]),
  discounts: parseAsArrayOf(parseAsString).withDefault([]),
  capacity: parseAsArrayOf(parseAsString).withDefault([]),
  colour: parseAsArrayOf(parseAsString).withDefault([]),
};

// The filter keys that hold string[] — every one of these gets the same
// "toggle value in array" behavior, so they share one function instead
// of eight copy-pasted ones.
type ArrayFilterKey = "category" | "brand" | "availability" | "discounts" | "capacity" | "colour";
type FilterKey = keyof typeof filterParsers;

const DEFAULTS = {
  category: [] as string[],
  brand: [] as string[],
  rating: null,
  minPrice: 0,
  maxPrice: 10000,
  availability: [] as string[],
  discounts: [] as string[],
  capacity: [] as string[],
  colour: [] as string[],
};

const useProductFilters = () => {
  const [filters, setFilters] = useQueryStates(filterParsers, {
    clearOnDefault: true, // drop a param from the URL once it's back to default
    history: "replace", // don't spam browser back-button with every checkbox click
  });

  // One generic toggle for every array-type filter (category, brand,
  // availability, discounts, capacity, colour) instead of six near-identical
  // functions. Call it as toggleFilter("brand", "Apple").
  const toggleFilter = (key: ArrayFilterKey, value: string) =>
    setFilters((f) => {
      const current = f[key];
      return {
        [key]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });

  const setRating = (value: number | null) =>
    setFilters((f) => ({ rating: f.rating === value ? null : value }));

  const setPriceRange = (value: [number, number]) =>
    setFilters({ minPrice: value[0], maxPrice: value[1] });

  const clearFilters = () => setFilters(DEFAULTS);

  const removeFilter = (key: FilterKey, value?: string) => {
    if (key === "rating") return setFilters({ rating: null });
    if (key === "minPrice" || key === "maxPrice") {
      return setFilters({ minPrice: 0, maxPrice: 10000 });
    }
    if (key === "q") return setFilters({ q: "" });
    if (!value) return;
    setFilters((f) => ({ [key]: (f[key] as string[]).filter((v) => v !== value) }));
  };

  const priceRange: [number, number] = [filters.minPrice, filters.maxPrice];

  const activeChips = useMemo(() => {
    const arrayKeys: ArrayFilterKey[] = [
      "category",
      "brand",
      "availability",
      "discounts",
      "capacity",
      "colour",
    ];
    const chips: { key: FilterKey; value: string; label: string }[] = [];
    arrayKeys.forEach((key) =>
      filters[key].forEach((v) => chips.push({ key, value: v, label: v }))
    );
    if (filters.rating) {
      chips.push({ key: "rating", value: String(filters.rating), label: `${filters.rating}★ & up` });
    }
    return chips;
  }, [filters]);

  // Local filtering against mock data — swap for a real fetch later.
  // Since filters live in the URL, a future fetch can read `filters`
  // here and pass it straight through as query params.
  const applyFilters = (all: Product[]): Product[] => {
    return all.filter((p) => {
      if (filters.category.length && !filters.category.includes(p?.category)) return false;
      if (filters.brand.length && !filters.brand.includes(p?.brand)) return false;
      if (filters.rating && p?.rating < filters.rating) return false;
      if (p?.price < priceRange[0] || p?.price > priceRange[1]) return false;
      if (filters.availability.length) {
        const wantsInStock = filters.availability.includes("In Stock");
        const wantsOutOfStock = filters.availability.includes("Out of Stock");
        if (wantsInStock && !wantsOutOfStock && !p.stock) return false;
        if (wantsOutOfStock && !wantsInStock && p.stock) return false;
      }
      if (filters.capacity.length && !filters.capacity.includes(p.capacity ?? "")) return false;
      if (filters.colour.length && !filters.colour.includes(p.colour ?? "")) return false;
      return true;
    });
  };

  return {
    query: filters.q,
    setQuery: (q: string) => setFilters({ q }),
    filters: { ...filters, priceRange },
    toggleFilter,
    setRating,
    setPriceRange,
    clearFilters,
    removeFilter,
    activeChips,
    applyFilters,
  };
};

export default useProductFilters;