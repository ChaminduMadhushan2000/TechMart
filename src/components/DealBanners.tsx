import { ArrowRight } from "lucide-react";

interface DealBannersProps {
  deal1Title?: string;
  deal1Link?: string;
  deal2Title?: string;
  deal2Link?: string;
}

const DealBanners = ({
  deal1Title = "Up to 30% Off Premium Laptops",
  deal1Link = "/products?category=laptops",
  deal2Title = "Explore Our Latest Collection",
  deal2Link = "/products?sort=newest",
}: DealBannersProps) => {
  return (
    <section className="grid gap-6 md:grid-cols-2" aria-label="Deal Banners">
      <a
        href={deal1Link}
        className="group relative flex min-h-[200px] overflow-hidden rounded-2xl bg-slate-900 p-8 text-white transition-all hover:shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent opacity-50" />
        <div className="relative z-10 flex h-full flex-col justify-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brandYellow">Hot Deal</p>
          <h3 className="mb-4 text-3xl font-black leading-tight">{deal1Title}</h3>
          <div className="flex items-center gap-2 text-sm font-bold">
            Shop Now <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
      </a>

      <a
        href={deal2Link}
        className="group relative flex min-h-[200px] overflow-hidden rounded-2xl bg-brandYellow p-8 text-black transition-all hover:shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent opacity-50" />
        <div className="relative z-10 flex h-full flex-col justify-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-800">New Arrival</p>
          <h3 className="mb-4 text-3xl font-black leading-tight">{deal2Title}</h3>
          <div className="flex items-center gap-2 text-sm font-bold">
            Discover More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
      </a>
    </section>
  );
};

export default DealBanners;
