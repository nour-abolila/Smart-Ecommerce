"use client";
import { Grid2X2, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useProductToolBar from "@/hooks/useProductToolBar";
const SORT_OPTIONS = [
  { label: "Relevance (default)", value: "relevance" },
  { label: "Price low to high", value: "price-low" },
  { label: "Price high to low", value: "price-high" },
  { label: "Most popular", value: "popular" },
  { label: "Highest rated", value: "rating" },
  { label: "Newest arrivals", value: "newest" },
];


const Producttoolbar = ({ onFilterClick }: { onFilterClick?: () => void }) => {
    const { sort, setSort, view, setView}= useProductToolBar();
  return (
    <div className="flex items-center gap-3 ">
      <Button variant="outline" onClick={onFilterClick} className="py-5">
        <SlidersHorizontal size={30} className="mr-1.5  " />
        Filter
      </Button>
       <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-md border px-3 py-2 text-sm text-muted-foreground"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
       <div className="flex items-center rounded-md border overflow-hidden">
         <button
          onClick={() => setView("grid")}
          className={`p-1.5 ${view === "grid" ? "bg-gray-100" : ""}`}
        >
          <Grid2X2 size={25} />
        </button>
          <button
          onClick={() => setView("list")}
          className={`p-1.5 ${view === "list" ? "bg-gray-100" : ""}`}
        >
          <List size={25} />
        </button>
       </div>
    </div>
  );
}

export default Producttoolbar;
