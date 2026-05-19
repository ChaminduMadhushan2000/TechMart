import CompareTable from "../components/compare/CompareTable";
import { useCompareStore } from "../store/compare-store";


export default function ComparePage() {
  const products = useCompareStore((state) => state.products);

  

  console.log("ComparePage render, products in compare:", products);

  if (products.length < 2) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-xl bg-white p-8 text-sm text-slate-500">
          Select at least 2 products to compare.
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-black text-slate-900">Product Comparison</h1>

      <div className="mt-8 overflow-x-auto">
        <CompareTable products={products} />
      </div>
    </section>
  );
}
