import { Star } from "lucide-react";
import type { ProductCard } from "./FeaturedProducts";

interface BestsellersProps {
  sectionTitle?: string;
  maxProducts?: number;
  products?: ProductCard[];
}

const Bestsellers = ({
  sectionTitle = "Our Bestsellers",
  maxProducts = 6,
  products = [],
}: BestsellersProps) => {
  const visible = products.slice(0, maxProducts);

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm" aria-label="Bestsellers">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">{sectionTitle}</h2>
        <a href="/products?sort=popular" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
          See all
        </a>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <article 
            key={product.id} 
            className="group flex items-center gap-4 rounded-xl border border-slate-50 bg-slate-50/50 p-4 transition-all hover:border-brandYellow hover:bg-white hover:shadow-md"
          >
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-full w-full object-cover transition-transform group-hover:scale-110" 
                loading="lazy" 
              />
            </div>
            <div className="flex flex-col">
              {product.rating ? (
                <div className="flex items-center gap-1 mb-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-[10px] font-bold text-slate-400">{product.rating}</span>
                </div>
              ) : null}
              <h3 className="line-clamp-1 text-sm font-bold text-slate-800">{product.name}</h3>
              <p className="text-base font-black text-brandPrimary">{product.price}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Bestsellers;
