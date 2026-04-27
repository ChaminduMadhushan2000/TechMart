export interface ProductCard {
  id: string;
  name: string;
  price: string;
  image: string;
}

export interface FeaturedProductsProps {
  sectionTitle: string;
  maxProducts: number;
  gridColumns: number;
  products: ProductCard[];
}

function FeaturedProducts(props: FeaturedProductsProps): JSX.Element {
  const visibleProducts: ProductCard[] = props.products.slice(0, props.maxProducts);
  const gridColsClass: string = props.gridColumns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm" aria-label="Featured Products">
      <h2 className="mb-4 text-xl font-bold">{props.sectionTitle}</h2>
      <div className={`grid grid-cols-2 gap-4 ${gridColsClass}`}>
        {visibleProducts.map((product) => (
          <article key={product.id} className="rounded-lg border border-slate-200 p-3">
            <img
              src={product.image}
              alt={product.name}
              width={240}
              height={180}
              loading="lazy"
              className="mb-2 h-32 w-full rounded object-cover"
            />
            <h3 className="line-clamp-2 text-sm font-medium">{product.name}</h3>
            <p className="mt-1 font-bold text-emerald-700">{product.price}</p>
            <a href="/products" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-blue-600">
              View product
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
