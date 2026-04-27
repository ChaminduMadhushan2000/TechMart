import type { ProductCard } from "./FeaturedProducts";

export interface BestsellersProps {
  sectionTitle: string;
  maxProducts: number;
  products: ProductCard[];
}

function Bestsellers(props: BestsellersProps): JSX.Element {
  const visibleProducts: ProductCard[] = props.products.slice(0, props.maxProducts);

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm" aria-label="Bestsellers">
      <h2 className="mb-4 text-xl font-bold">{props.sectionTitle}</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {visibleProducts.map((product) => (
          <article key={product.id} className="flex items-center gap-3 rounded-md border border-slate-200 p-3">
            <img src={product.image} alt={product.name} width={96} height={72} loading="lazy" className="h-16 w-20 rounded object-cover" />
            <div>
              <p className="text-sm font-medium">{product.name}</p>
              <p className="font-bold text-emerald-700">{product.price}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Bestsellers;
