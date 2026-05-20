import { useEffect, useState } from "react";
import { fetchCategories, fetchProducts } from "../api";
import type { Category, Product } from "../types/storefront";
import CompareTable from "../components/compare/CompareTable";
import CompareProductCard from "../components/compare/CompareProductCard";
import { toast } from "react-hot-toast";

function flattenCategories(categories: Category[]): Category[] {
  const output: Category[] = [];

  for (const category of categories) {
    output.push(category);

    if (category.children?.length) {
      output.push(...category.children);
    }
  }

  return output;
}

export default function ComparePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);

    fetchProducts({
      categoryId,
      limit: 50,
    })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categoryId]);

  const categoryOptions = flattenCategories(categories).filter(
    (cat) => cat.isActive !== false,
  );

  const toggleProduct = (product: Product) => {
    const exists = selectedProducts.some((p) => p.id === product.id);

    if (exists) {
      setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));

      return;
    }

    if (selectedProducts.length >= 4) {
      toast.error("Maximum 4 products allowed");

      return;
    }

    setSelectedProducts((prev) => [...prev, product]);

    toast.success(`${product.name} added to comparison`);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">Compare Products</h1>

        <p className="mt-2 text-sm text-slate-500">
          Select a category and compare products side by side.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Select Category
        </label>

        <select
          value={categoryId}
          onChange={(event) => {
            setCategoryId(event.target.value);
            setSelectedProducts([]);
          }}
          className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm"
        >
          <option value="">Choose category</option>

          {categoryOptions.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="mt-6 rounded-xl bg-white p-8 text-sm text-slate-500">
          Loading products...
        </div>
      ) : null}

      {!loading && products.length > 0 ? (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Select Products
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <CompareProductCard
                key={product.id}
                product={product}
                selected={selectedProducts.some((p) => p.id === product.id)}
                onToggle={() => toggleProduct(product)}
              />
            ))}
          </div>
        </div>
      ) : null}

      {selectedProducts.length >= 2 ? (
        <div className="sticky bottom-6 z-50 mt-8 flex items-center justify-between rounded-2xl bg-slate-900 px-6 py-4 shadow-2xl">
          <div>
            <p className="text-sm font-semibold text-white">
              {selectedProducts.length} products selected
            </p>

            <p className="text-xs text-slate-300">Ready to compare</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowComparison(true);

              setTimeout(() => {
                document.getElementById("comparison-table")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
            className="rounded-xl bg-brandYellow px-5 py-3 text-sm font-black text-slate-900"
          >
            Compare Now
          </button>
        </div>
      ) : null}

      {showComparison ? (
        <div id="comparison-table" className="mt-10">
          {selectedProducts.length === 1 && (
            <div className="rounded-xl bg-yellow-50 p-4 text-sm text-yellow-700">
              Select one more product to compare.
            </div>
          )}

          {selectedProducts.length >= 2 && (
            <CompareTable products={selectedProducts} />
          )}
        </div>
      ) : null}
    </section>
  );
}
