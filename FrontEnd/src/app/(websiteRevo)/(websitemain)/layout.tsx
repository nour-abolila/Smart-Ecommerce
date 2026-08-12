import Providers from "@/components/providers/Providers";
import TopBar from "@/components/shared/websiteshared/navTop";
import FiltrationBar from "@/components/shared/websiteshared/filtratIonBar";
export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopBar />
      <div className="max-w-[1280px] m-auto ">
        <Providers>
          <FiltrationBar />
          {children}
        </Providers>
      </div>
    </div>
  );
}
