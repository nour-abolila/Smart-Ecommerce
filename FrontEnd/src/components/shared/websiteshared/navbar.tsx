"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductSearch from "./searchbar";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  TextAlignJustify,
} from "lucide-react";

const categories = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports & Outdoors",
  "Books",
];

const Navbar = () => {
  return (
    <header className="w-full  bg-background">
      <div className=" max-w-[1280px] mx-auto flex items-center gap-4 px-6 lg:px-0 py-3">
        {/* Logo */}
        <Link
          href="/home"
          className="text-xl font-extrabold tracking-tight shrink-0 mr-3"
        >
          <Image src="/logo.png" width={123} height={17} alt="logo"></Image>
        </Link>

        {/* Category dropdown - hidden on small screens */}
        <div className="hidden md:block shrink-0">
          <Select defaultValue={categories[0]}>
            <SelectTrigger className="w-[200px] p-4.5  border shadow-none text-sm ">
              <TextAlignJustify className="w-4 h-5 mr-2  " />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search bar */}
        <div className="flex-1 flex items-center max-w-xl relative ">
          {/* <Search className="w-4 h-4 mr-1 absolute left-3 top-1/2 -translate-y-1/2 " />
          <Input
            type="text"
            placeholder="Search for products, brands, categories..."
            className="rounded-r-none py-4.5 bg-[#F3F3F3]  pl-10 border-r-0 focus-visible:ring-0"
          />
          <Button className="rounded-l-none rounded-r-xl p-5 bg-black text-white hover:bg-neutral-700 ">
            Search
          </Button> */}
          <ProductSearch />
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4  ml-auto">
          <Link href="/wishlist">
         
            <button className="hidden sm:flex  cursor-pointer">
              <Heart size={32} />
            </button>
          </Link>
            <Link href="/cart">
          <button className="hidden sm:flex cursor-pointer">
            <ShoppingCart size={32} />
          </button>
          </Link>
          <Link href="/home/profile">
          <button className="hidden sm:flex cursor-pointer">
            <User size={32} />
          </button>
          </Link>
         
          {/* Language/currency - static UI only */}
          <Select defaultValue="ENG">
            <SelectTrigger className="w-[80px] py-4.5 border-none text-lg shadow-none ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-usd">EN $</SelectItem>
              <SelectItem value="en-eur">EN €</SelectItem>
              <SelectItem value="ar-egp">AR £</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
