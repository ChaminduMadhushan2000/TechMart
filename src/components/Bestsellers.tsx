import { Star } from "lucide-react";

const products = [
  { id: "p1", name: "AstraBook Pro 14", price: "Rs. 219,999", image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=800&q=80", rating: 4.8 },
  { id: "p2", name: "NeoPhone X12", price: "Rs. 159,999", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", rating: 4.9 },
  { id: "p3", name: "Pulse Buds 3", price: "Rs. 21,999", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80", rating: 4.5 },
  { id: "p4", name: "Quantum 55\" 4K TV", price: "Rs. 189,999", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80", rating: 4.7 },
  { id: "p5", name: "FocusCam Mirrorless", price: "Rs. 129,999", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80", rating: 4.6 },
  { id: "p6", name: "SpeedCore Gaming Mouse", price: "Rs. 8,499", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80", rating: 4.4 },
];

const Bestsellers = () => {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm" aria-label="Bestsellers">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Our Bestsellers</h2>
        <a href="/products?sort=popular" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
          See all
        </a>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
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
              <div className="flex items-center gap-1 mb-1">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] font-bold text-slate-400">{product.rating}</span>
              </div>
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
