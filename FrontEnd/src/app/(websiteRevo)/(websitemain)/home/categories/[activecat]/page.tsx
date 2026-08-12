"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CatData } from "@/components/layouts/website/data/CatData,";
import Activecategory from "@/components/layouts/website/activecategory";

const CategoryHeader = () => {

  const params = useParams<{ activecat?: string }>();
  const slug = params?.activecat;

  const category = CatData.find((cat) => cat.slug === slug);
  const title = category?.title ?? "All Categories";

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Explore everything RIVO has to offer
      </p>

      <Breadcrumb className="mt-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/home/categories">
              All Categories
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* only show the third crumb once we're actually inside a category */}
          {slug && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <Activecategory/>
    </div>
  );
};

export default CategoryHeader;