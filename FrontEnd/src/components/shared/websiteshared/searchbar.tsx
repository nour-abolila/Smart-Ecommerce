"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Package } from "lucide-react";

// -----------------------------------------------------------
// STEP 1: Dummy data.
// Later, this whole array gets replaced by data from your API.
// For now it just lives here as plain JavaScript.
// -----------------------------------------------------------
const PRODUCTS = [
  { id: "1", name: "iPhone 15 Pro", category: "Electronics", price: 4599 },
  { id: "2", name: "Nike Air Max", category: "Footwear", price: 549 },
  { id: "3", name: "MacBook Pro", category: "Electronics", price: 8999 },
  { id: "4", name: "Sony Headphones", category: "Electronics", price: 899 },
  { id: "5", name: "Samsung Galaxy", category: "Electronics", price: 3299 },
  { id: "6", name: "iPad Pro", category: "Electronics", price: 3799 },
  { id: "7", name: "Dyson Vacuum", category: "Home", price: 1899 },
  { id: "8", name: "Rolex Watch", category: "Accessories", price: 45999 },
];

const POPULAR_SEARCHES = PRODUCTS.map((product) => product.name);

const ProductSearch = () => {
  const router = useRouter();

  // STEP 2: Two pieces of state, that's it.
  // "query"  -> whatever the user has typed so far
  // "open"   -> whether the dropdown is showing or not
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  // STEP 3: Work out the results.
  // No API call, no useEffect, no timers — just a normal array filter,
  // recalculated every time the component re-renders (i.e. every time
  // "query" changes, since setQuery triggers a re-render).
  const results = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  // Once you have a real backend, this is the only part that changes:
  // instead of filtering PRODUCTS directly above, you'd fetch from
  // your API and store the response in a new "results" state variable.

  const goToSearchPage = (term: string) => {
    setOpen(false);
    router.push(`/search?q=${term}`);
  };

  const goToProductPage = (id: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/products/${id}`);
  };

  return (
    <div className="relative w-full max-w-xl">
      {/* Search bar */}
      <div className="flex h-9.5 items-center overflow-hidden rounded-lg border bg-white">
        <Search className="ml-4 h-4 w-4 text-muted-foreground" />

        <input
          type="text"
          value={query}
          placeholder="Search for products, brands, categories..."
          className="h-full flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
          // When the user types, update "query". That's it — the
          // "results" filter above automatically re-runs.
          onChange={(e) => setQuery(e.target.value)}
          // Open the dropdown when they click into the input.
          onFocus={() => setOpen(true)}
          // Close it a moment after they click away, so a click on a
          // result/pill still has time to register first.
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query) goToSearchPage(query);
          }}
        />

        <button
          type="button"
          onClick={() => query && goToSearchPage(query)}
          className="h-full bg-black px-6 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Search
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border bg-white p-4 shadow-lg">
          {/* Nothing typed yet -> show popular search pills */}
          {query === "" && (
            <>
              <p className="mb-3 text-sm font-medium text-muted-foreground">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => goToSearchPage(term)}
                    className="rounded-full border px-4 py-1.5 text-sm hover:bg-neutral-50"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Something typed -> show matching products */}
          {query !== "" &&
            (results.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No products found for &quot;{query}&quot;.
              </p>
            ) : (
              <div className="flex flex-col gap-1">
                {results.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => goToProductPage(product.id)}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 text-left text-sm hover:bg-neutral-50"
                  >
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1">{product.name}</span>
                    <span className="text-xs text-muted-foreground">
                      SAR {product.price}
                    </span>
                  </button>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;