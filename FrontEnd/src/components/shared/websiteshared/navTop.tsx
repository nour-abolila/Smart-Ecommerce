import { Truck, Tag,  RefreshCw } from "lucide-react";

const TopBar = () => {
  return (
    <div className="hidden bg-black text-white md:block">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-center gap-20 px-4">
        <div className="flex items-center gap-2 text-sm">
          <Truck className="h-4 w-4 text-orange-500" />
          <span>
            Free shipping on orders above <strong>SAR 200</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Tag className="h-4 w-4 text-orange-500" />
          <span>
            Use code <span className="font-semibold text-orange-500">SAVE10</span>{" "}
            for 10% off your first order
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          < RefreshCw className="h-4 w-4 text-orange-500" />
          <span>30-day hassle-free returns</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;