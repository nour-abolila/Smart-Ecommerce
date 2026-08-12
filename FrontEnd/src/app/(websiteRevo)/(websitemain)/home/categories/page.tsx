import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CatData } from "@/components/layouts/website/data/CatData,"; // fixed trailing comma in path

export default function AllCategories() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          All Categories
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Explore everything RIVO has to offer
        </p>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>All Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Category grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
        {CatData.map((category) => (
          <Link
            key={category.id}
            href={`/home/categories/${category.slug}`}
            className="group flex flex-col items-center text-center"
          >
            <div
              className="
                relative mb-3 flex h-[140px] w-[140px] items-center justify-center
                rounded-full bg-muted
                transition-all duration-300 ease-out
                group-hover:-translate-y-1
                group-hover:bg-primary/10
                group-hover:shadow-lg group-hover:shadow-primary/20
                ring-1 ring-transparent group-hover:ring-primary/30
              "
            >
              {/* soft glow that fades in behind the icon */}
              <span
                className="
                  absolute inset-0 rounded-full
                  bg-primary/0 blur-xl
                  transition-colors duration-300
                  group-hover:bg-primary/10
                "
                aria-hidden
              />
              <Image
                src={category.image}
                alt={category.title}
                width={56}
                height={56}
                className="
                  relative h-20 w-20 object-contain
                  transition-transform duration-300 ease-out
                  group-hover:scale-110 group-hover:rotate-[-4deg]
                "
              />
            </div>
            <span
              className="
                text-sm font-medium text-foreground
                transition-colors duration-200
                group-hover:text-primary
              "
            >
              {category.title}
            </span>
            <span
              className="
                text-xs text-muted-foreground
                transition-colors duration-200
                group-hover:text-primary/70
              "
            >
              {category.itemCount}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}