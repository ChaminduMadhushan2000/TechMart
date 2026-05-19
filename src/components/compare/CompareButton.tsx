import type { Product } from "../../types/storefront";
import { useCompareStore } from "../../store/compare-store";
import toast from "react-hot-toast";

interface CompareButtonProps {
  product: Product;
}

export default function CompareButton({ product }: CompareButtonProps) {
  const addProduct = useCompareStore((state) => state.addProduct);

  return (
    <button
      type="button"
      onClick={() => {
        addProduct(product);
        toast.success(`${product.name} added to compare`);
      }}
      className="rounded-lg border border-slate-200 px-4 py-2 hover:border-brandYellow
    hover:bg-brandYellow/10"
    >
      Compare
    </button>
  );
}
