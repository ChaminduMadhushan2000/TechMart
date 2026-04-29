import { ShoppingCart, Star } from "lucide-react";

const products = [
  { id: "p1", name: "AstraBook Pro 14", price: "Rs. 219,999", image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=800&q=80", rating: 4.8 },
  { id: "p2", name: "NeoPhone X12", price: "Rs. 159,999", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", rating: 4.9 },
  { id: "p3", name: "Pulse Buds 3", price: "Rs. 21,999", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80", rating: 4.5 },
  { id: "p4", name: "Quantum 55\" 4K TV", price: "Rs. 189,999", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80", rating: 4.7 },
  { id: "p5", name: "FocusCam Mirrorless", price: "Rs. 129,999", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80", rating: 4.6 },
  { id: "p6", name: "SpeedCore Gaming Mouse", price: "Rs. 8,499", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80", rating: 4.4 },
  { id: "p7", name: "Volt Power Bank 20,000mAh", price: "Rs. 9,299", image: "https://images.unsplash.com/photo-1609592806955-36dc7f2f1f18?auto=format&fit=crop&w=800&q=80", rating: 4.3 },
  { id: "p8", name: "SkyFit Watch", price: "Rs. 34,999", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", rating: 4.8 },
];

const FeaturedProducts = () => {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm" aria-label="Featured Products">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
        <a href="/products" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
          View all products
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
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
              <div className="mb-2 flex items-center gap-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-slate-500">{product.rating}</span>
              </div>

              <h3 className="mb-2 line-clamp-2 text-sm font-bold text-slate-800 group-hover:text-brandPrimary">
                <a href={`/products/${product.id}`}>{product.name}</a>
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
