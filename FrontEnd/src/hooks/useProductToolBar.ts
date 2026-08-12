///////////That's it. Two URL params:
// sort and view. useQueryState is the simplest nuqs hook
//  — one value, one setter, synced to the URL automatically.
"use client";
import { useQueryState } from "nuqs";

const useProductToolBar = () => {
  const [sort, setSort] = useQueryState("sort", { defaultValue: "relevance" });
  const [view, setView] = useQueryState("view", { defaultValue: "grid" });
  return { sort, setSort, setView, view };
};

export default useProductToolBar;
