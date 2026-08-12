"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface SearchResultsHeaderProps {
  query: string;
  total: number;
}

export default function SearchResultsHeader({
  query,
  total,
}: SearchResultsHeaderProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">
          Results for "{query}"
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {total} products
        </p>
      </div>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Search</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}