import { ShoppingCart, Star } from "lucide-react";

export interface ProductCard {
  id: string;
  name: string;
  price: string;
  image: string;
  rating?: number;
  slug?: string;
}

interface FeaturedProductsProps {
  sectionTitle?: string;
  maxProducts?: number;
  gridColumns?: number;
  products?: ProductCard[];
}

const FeaturedProducts = ({
  sectionTitle = "Featured Products",
  maxProducts = 8,
  gridColumns = 4,
  products = [],
}: FeaturedProductsProps) => {
  const visible = products.slice(0, maxProducts);
  const gridClass =
    gridColumns >= 4
      ? "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      : gridColumns === 3
        ? "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 gap-6 sm:grid-cols-2";

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm" aria-label="Featured Products">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">{sectionTitle}</h2>
        <a href="/products" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
          View all products
        </a>
      </div>

      <div className={`grid ${gridClass}`}>
        {visible.map((product) => (
          <article
            key={product.id}
            className="group relative flex flex-col rounded-xl border border-slate-100 bg-white p-4 transition-all hover:border-brandYellow hover:shadow-lg"
          >
            <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-slate-50">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <button className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-brandYellow">
                <ShoppingCart size={20} className="text-slate-700" />
              </button>
            </div>

            <div className="flex flex-1 flex-col">
              {product.rating ? (
                <div className="mb-2 flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-slate-500">{product.rating}</span>
                </div>
              ) : null}

              <h3 className="mb-2 line-clamp-2 text-sm font-bold text-slate-800 group-hover:text-brandPrimary">
                <a href={product.slug ? `/products/${product.slug}` : `/products/${product.id}`}>
                  {product.name}
                </a>
              </h3>

              <div className="mt-auto flex items-center justify-between">
                <p className="text-lg font-black text-slate-900">{product.price}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
