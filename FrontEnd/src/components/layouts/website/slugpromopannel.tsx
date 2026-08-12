import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Banner = {
  title: string;
  image: string;
  href: string;
};

type PromoBannerRowProps = {
  banners: Banner[];
};

// local, not exported — only used inside this file by PromoBannerRow
const PromoBannerCard = ({ title, image, href }: Banner) => {
  return (
    <Link
      href={href}
      className="group relative block aspect-square w-full overflow-hidden rounded-3xl"
    >
      <Image
        src={image}
        alt={title}
        width={400}
        height={400}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* button is layered on top of the image, not baked into it */}
      <div className="absolute inset-x-0 bottom-6 flex flex-col  justify-center items-center gap-3 font-pixelify">
        <p className="flex items-center gap-2 rounded-full b  px-9 py-2 text-sm border text-white ">
          {title}
        </p>

        <ArrowRight size={30} className=" transition-transform duration-300 group-hover:translate-x-4 text-white" />
      </div>
    </Link>
  );
};

const PromoBannerRow = ({ banners }: PromoBannerRowProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {banners.map((banner) => (
        <PromoBannerCard key={banner.title} {...banner} />
      ))}
    </div>
  );
};

export default PromoBannerRow;
