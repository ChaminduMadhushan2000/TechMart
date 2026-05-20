import type { Product } from "../../types/storefront";

interface CompareProductCardProps {
  product: Product;
  selected: boolean;
  onToggle: () => void;
}

function formatMoney(amount: number) {
  return `LKR ${Number(amount || 0).toLocaleString("en-US")}`;
}

function getProductPrice(product: Product) {
  return Number(product.salePrice ?? product.basePrice ?? 0);
}

export default function CompareProductCard({
  product,
  selected,
  onToggle,
}: CompareProductCardProps) {
  return (
    <article
      className={`rounded-2xl border bg-white p-4 transition-all ${
        selected
          ? "border-brandYellow ring-2 ring-brandYellow/30"
          : "border-slate-200"
      }`}
    >
      <img
        src={
          product.images?.[0]?.url ||
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
        }
        alt={product.name}
        className="h-52 w-full rounded-xl object-cover"
      />

      <div className="mt-4">
        <h3 className="line-clamp-2 text-sm font-bold text-slate-900">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {product.brand || "Unknown Brand"}
        </p>

        <p className="mt-3 text-lg font-black text-slate-900">
          {formatMoney(getProductPrice(product))}
        </p>

        <button
          type="button"
          onClick={onToggle}
          className={`mt-4 h-11 w-full rounded-xl text-sm font-bold transition-all ${
            selected
              ? "bg-brandYellow text-slate-900"
              : "border border-slate-200 bg-white text-slate-700 hover:border-brandYellow"
          }`}
        >
          {selected ? "Selected" : "Compare"}
        </button>
      </div>
    </article>
  );
}