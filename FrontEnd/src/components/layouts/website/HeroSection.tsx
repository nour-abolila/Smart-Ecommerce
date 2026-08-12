import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { MoveRight } from "lucide-react";
const HeroSection = () => {
  return (
    <div className="m-7 flex flex-col max-w-[1280px] m-auto">
      <Card className="bg-linear-to-r from-[#C8BCAE] via-[#D7CCBF] to-[#F3E9DF]">
        <CardContent className="relative w-full h-[481px] p-0 flex flex-col items-center justify-center px-12 md:px-20">
          {/* this is multible headphone section  */}
          <div className=" absolute top-0 ">
            <Image
              src="/multibleheadphone.png"
              alt="multibleheadphone"
              width={448}
              height={448}
            />
          </div>
          {/* the headphone part */}
          <div className="absolute z-10   ">
            <div>
              <Image src="/apple.png" alt="apple" width={70} height={70} />
              <p className="font-bold text-[40px]">Wireless</p>
            </div>
            <h1 className=" text-[160px] text-white font-bold pl-2">
              {" "}
              HEADPHONE
            </h1>
            <div>
              <button className=" flex items-center justify-center text-[20px] gap-2 p-2 bg-white rounded-[40px] w-[208px] h-[50px]">
                Discover
                <MoveRight />
              </button>
            </div>
          </div>
          {/* the other photo the up front  */}
          <div className="absolute z-20">
            <Image
              src="/singleheadphone.png"
              alt="singleheadphone"
              width={392}
              height={434}
            />
          </div>
        </CardContent>
      </Card>
      {/* three cards section */}
      <div className="max-w-[1280px] m-auto grid grid-cols-3 lg:grid-cols-[312px_312px_minmax(0,1fr)] gap-5 mt-5">
        <Image
          src="/shooose.png"
          alt="shoes"
          width={312}
          height={328}
          className="w-full h-[260px] sm:h-[320px] md:h-[379px] object-cover rounded-2xl"
        />

        <Image
          src="/sunblock.png"
          alt="sunblock"
          width={312}
          height={328}
          className="w-full h-[260px] md:h-[379px] sm:h-[320px] object-cover rounded-2xl"
        />

        <Image
          src="/laptop.png"
          alt="laptop"
          width={563}
          height={328}
          className="w-full max-w-[900px] h-[260px] md:h-[379px] sm:h-[320px] object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default HeroSection;
