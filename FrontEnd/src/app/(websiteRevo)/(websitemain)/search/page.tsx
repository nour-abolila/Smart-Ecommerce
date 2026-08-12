"use client";

import { useState } from "react";

import FilterSidebar from "@/components/shared/websiteshared/sidebar";
import Producttoolbar from "@/components/shared/websiteshared/producttoolbar";
import ProductCard from "@/components/shared/websiteshared/productcard";
import SearchResultsHeader from "@/components/shared/websiteshared/searchreasultheader";

import { products } from "@/components/layouts/website/data/products";
import EmptyState from "@/components/shared/websiteshared/nosearchresult";
import useProductToolBar from "@/hooks/useProductToolBar";
import useProductFilters from "@/hooks/Useproductfilters";

const SearchPage = () => {
  const { sort, setSort, view, setView } = useProductToolBar();

  const filterState = useProductFilters();
  const { query } = filterState;

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // TODO: Replace with backend response
  const results = filterState.applyFilters(products);
  const RELATED_SEARCHES = [
    "Apple Intelligence",
    "Air",
    "Pro",
    "11 inch",
    "13 inch",
    "128GB",
    "256GB",
  ];
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        {/* Title + Toolbar */}
        <div className="">
          <SearchResultsHeader
            query={query || "All Products"}
            total={results.length}
          />

          <div className="shrink-0 flex flex-col items-end gap-4">
            <Producttoolbar
              sort={sort}
              setSort={setSort}
              view={view}
              setView={setView}
              onFilterClick={() => setMobileFiltersOpen(true)}
            />
            <div className="mb-8 flex flex-wrap gap-2">
              {RELATED_SEARCHES.map((item) => (
                <button
                  key={item}
                  className="rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <FilterSidebar
            filters={filterState.filters}
            toggleFilter={filterState.toggleFilter}
            setRating={filterState.setRating}
            setPriceRange={filterState.setPriceRange}
          />
        </aside>

        {/* Products */}
        <main className="flex-1">
          {results.length === 0 ? (
            <div className="flex h-96 items-center justify-center">
           <EmptyState/>
            </div>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-4"
              }
            >
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
