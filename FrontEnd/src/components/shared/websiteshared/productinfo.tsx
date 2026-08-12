"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Star,
  Minus,
  Plus,
  Truck,
  Heart,
  Mail,
  Bell,
  CircleCheck,
  CircleX,
  ShoppingCart,
  Zap,
  ShieldCheck,
  RefreshCw,
  DiamondMinus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Product, products } from "@/components/layouts/website/data/products";
import ProductCard from "./productcard";
import { toast } from "sonner";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FrequentlyBoughtTogether from "@/components/layouts/website/FBoughtTogheter";

type ProductInfoProps = {
  product: Product;
};

const notifySchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});
type NotifyFormValues = z.infer<typeof notifySchema>;

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [qty, setQty] = useState(1);
  const [notifyOpen, setNotifyOpen] = useState(false);

  const inStock = product.stock > 0;
  const savePercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NotifyFormValues>({
    resolver: zodResolver(notifySchema),
  });

  function handleFavorite() {
    setIsFavorite((prev) => !prev);
    toast(isFavorite ? "Removed from wishlist" : "Added to wishlist ❤️");
  }

  async function onNotifySubmit(values: NotifyFormValues) {
    // TODO: wire to your API route
    await new Promise((r) => setTimeout(r, 600));
    toast.success("We'll email you when it's back in stock");
    reset();
    setNotifyOpen(false);
  }

  ///gallery
  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : [{ id: 1, url: product.image }];

  const [selectedImage, setSelectedImage] = useState(gallery[0].url);

  // Reset selected image whenever the product changes (e.g. navigating
  // between product pages without unmounting this component), and also
  // guard against the current selection no longer existing in the gallery.
  useEffect(() => {
    setSelectedImage(gallery[0].url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  return (
    <div>
      {" "}
      <div className="flex gap-9">
        <div>
          <Image
            alt={product.title}
            src={selectedImage}
            width={300}
            height={60}
            className="h-[400px] w-[300px] object-contain"
          />
          <div className="flex mt-3 gap-3">
            {gallery.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image.url)}
                aria-label={`View ${product.title} image ${image.id}`}
                aria-pressed={selectedImage === image.url}
                className={`overflow-hidden rounded-lg border-2 ${
                  selectedImage === image.url
                    ? "border-[#F97316]"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image.url}
                  alt={`${product.title} thumbnail ${image.id}`}
                  width={70}
                  height={70}
                  className="h-[70px] w-[70px] object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="px-3 text-sm text-gray-400">{product.brand}</span>
            {product.isNew && (
              <span className="rounded-full bg-[#F97316] px-3 py-1.5 text-xs font-medium text-white">
                New
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#1A1A1A]">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="mt-2 flex items-center gap-0.5 text-[#F97316]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4"
                  fill={i < Math.round(product.rating) ? "#F97316" : "none"}
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-semibold text-[#F97316]">
              SAR {product.price}
            </span>
            {product.oldPrice && (
              <span className="text-lg text-muted-foreground line-through">
                SAR {product.oldPrice}
              </span>
            )}
            {savePercent && (
              <span className="mx-2 rounded-2xl bg-black px-3 py-1.5 text-xs font-medium text-white">
                Save {savePercent}%
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <div className="pt-5 text-sm text-gray-400">{product.title}</div>
            <span
              className={`flex  items-center gap-1.5 py-2 ${inStock ? "text-[#16A34A]" : "text-red-500"}`}
            >
              {inStock ? (
                <CircleCheck className="h-4 w-4" />
              ) : (
                <CircleX className="h-4 w-4 " />
              )}
              {inStock ? `In Stock (${product.stock})` : "Out of Stock"}
              <span className="flex items-center gap-1.5 text-[#F97316] mx-2">
                <Truck className="h-4 w-4" />
                Free shipping
              </span>
            </span>
          </div>

          {product.colors && (
            <div className="flex gap-0.5 py-4">
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={color.name}
                    className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                      selectedColor === color.name
                        ? "border-[#F97316]"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {product.badges && product.badges.length > 0 && (
            <div className="flex flex-wrap gap-3 py-2">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-lg bg-[#F2F2F2]/50 px-4 py-1  text-[#1A1A1A]/50"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          <div>
            <div className="flex w-fit items-center gap-4 px-3 py-1.5">
              <p className="mb-2 font-medium">Quantity</p>
              <div className="flex w-fit items-center gap-4 rounded-lg border px-3 py-1.5">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-4 text-center ">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  disabled={qty >= product.stock}
                  aria-label="Increase quantity"
                  className="disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {inStock ? (
            <div className="flex items-center gap-3 pt-2">
              <Button
                size="lg"
                variant="outline"
                className="flex-1 text-white bg-black py-6 "
              >
                <ShoppingCart size={32} />
                Add to Cart
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-[#F97316] py-6  hover:bg-[#F97316]/90 "
              >
                <Zap />
                Buy Now
              </Button>
              <button
                onClick={handleFavorite}
                aria-label="Toggle wishlist"
                className="border border-[#F97316]/60 p-2 rounded-xl bg-gray-100"
              >
                <Heart
                  size={30}
                  className={`transition ${isFavorite ? "fill-[#F97316] text-[#F97316]/60" : "text-[#F97316]/60"}`}
                />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 pt-2">
              <Button
                size="lg"
                className="flex-1 py-6 bg-[#16A34A] hover:bg-[#16A34A]/90"
                onClick={() => setNotifyOpen(true)}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notify
              </Button>
              <button
                onClick={handleFavorite}
                aria-label="Toggle wishlist"
                className="border border-[#F97316]/60 p-2 rounded-xl bg-gray-100"
              >
                <Heart
                  size={30}
                  className={`transition ${isFavorite ? "fill-[#F97316] text-[#F97316]/60" : "text-[#F97316]/60"}`}
                />
              </button>
            </div>
          )}
          {/* Perks row */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            <div className="flex flex-col items-center gap-2 rounded-xl bg-[#F5F5F5] py-4 text-center">
              <Truck className="h-5 w-5 text-[#F97316]" />
              <span className="text-xs text-muted-foreground">
                Fast Delivery
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl bg-[#F5F5F5] py-4 text-center">
              <ShieldCheck className="h-5 w-5 text-[#F97316]" />
              <span className="text-xs text-muted-foreground">
                Secure Payment
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl bg-[#F5F5F5] py-4 text-center">
              <RefreshCw className="h-5 w-5 text-[#F97316]" />
              <span className="text-xs text-muted-foreground">
                30-Day Returns
              </span>
            </div>
          </div>
        </div>

          <Dialog open={notifyOpen} onOpenChange={setNotifyOpen}>
          <DialogContent className="rounded-2xl p-8 sm:max-w-lg">
            <DialogHeader className="items-center text-center">
              <DialogTitle className="text-xl font-bold">
                Stock Notifications
              </DialogTitle>
              <DialogDescription className="text-center text-sm leading-relaxed text-muted-foreground">
                We will notify you as soon as this product is available again.
                Please enter your email here.
              </DialogDescription>
            </DialogHeader>
 
            <form
              onSubmit={handleSubmit(onNotifySubmit)}
              className="w-full space-y-4"
            >
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-semibold  ">
                  Email Address <span className="text-[#F97316]">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-11 rounded-lg border-none bg-[#F5F5F5] pl-9 my-2"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
 
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#16A34A] py-6 hover:bg-[#16A34A]/90"
              >
                <Bell className="mr-2 h-4 w-4" />
                {isSubmitting ? "Notifying..." : "Notify"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>{" "}
      
      <Tabs defaultValue="description" className="mt-10 w-full">
        <TabsList
          variant="line"
          className="h-auto justify-start gap-6 rounded-none border-b bg-transparent p-0"
        >
          <TabsTrigger
            value="description"
            className="rounded-none px-0 pb-3 text-lg font-medium text-muted-foreground shadow-none after:h-0.5 after:bg-[#f97316] data-active:text-[#f97316]"
          >
            Description
          </TabsTrigger>

          <TabsTrigger
            value="specifications"
            className="rounded-none px-0 pb-3 text-lg font-medium text-muted-foreground shadow-none after:h-0.5 after:bg-[#f97316] data-active:text-[#f97316]"
          >
            Specifications
          </TabsTrigger>

          <TabsTrigger
            value="reviews"
            className="rounded-none px-0 pb-3 text-lg font-medium text-muted-foreground shadow-none after:h-0.5 after:bg-[#f97316] data-active:text-[#f97316]"
          >
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <p className="leading-7 text-muted-foreground">
            {product.description}
          </p>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <div className="space-y-3">
            {product.specifications?.map((spec) => (
              <div
                key={spec.label}
                className="flex justify-between border-b pb-2"
              >
                <span className="font-medium">{spec.label}</span>

                <span className="text-muted-foreground">{spec.value}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-5">
            {product.reviews?.map((review) => (
              <div key={review.id} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{review.user}</h4>

                  <span className="text-sm text-muted-foreground">
                    {review.date}
                  </span>
                </div>

                <div className="mt-2 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={
                        i < review.rating
                          ? "fill-[#F97316] text-[#F97316]"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      {/* bought togheter */}
      <div>
        {product.frequentlyBoughtTogether && (
          <FrequentlyBoughtTogether items={product.frequentlyBoughtTogether} />
        )}
      </div>
      {/* similar products  */}
      <div>
        <h1 className="border-l-[#F97316] border-l-5 px-3 my-3 text-2xl">
          similar products{" "}
        </h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
