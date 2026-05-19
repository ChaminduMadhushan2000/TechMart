import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchCategories, fetchProducts } from "../api";
import type { Category, Product } from "../types/storefront";
import { useStorefront } from "../storefront/storefront-context";
import StockBadge from "../components/products/StockBadge";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const sortMap: Record<string, { sortBy: string; sortOrder: "ASC" | "DESC" }> = {
  newest: { sortBy: "createdAt", sortOrder: "DESC" },
  price_asc: { sortBy: "basePrice", sortOrder: "ASC" },
  price_desc: { sortBy: "basePrice", sortOrder: "DESC" },
};

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

function formatMoney(amount: number, currencySymbol = "LKR.") {
  const safeAmount = Number(amount || 0);
  return `${currencySymbol} ${safeAmount.toLocaleString("en-US")}`;
}

function getProductImage(product: Product): string {
  return product.images?.[0]?.url || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
}

function getProductPrice(product: Product): number {
  return Number(product.salePrice ?? product.basePrice ?? 0);
}

export default function ProductsPage() {
  const { config } = useStorefront();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryId = searchParams.get("categoryId") || "";
  const categorySlug = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page") || "1");
  const brand = searchParams.get("brand") || "";

  const categoryOptions = useMemo(() => {
    return flattenCategories(categories).filter((cat) => cat.isActive !== false);
  }, [categories]);

  const brandOptions = useMemo(() => {
    const brands = products
      .map((product) => product.brand)
      .filter((brand): brand is string => Boolean(brand));

    return [...new Set(brands)];
  }, [products]);

  const slugToId = useMemo(() => {
    const mapping: Record<string, string> = {};
    categoryOptions.forEach((cat) => {
      if (cat.slug) mapping[cat.slug] = cat.id;
    });
    return mapping;
  }, [categoryOptions]);

  const resolvedCategoryId = categoryId || (categorySlug ? slugToId[categorySlug] : "");

  const filters = useMemo(() => {
    const sortConfig = sortMap[sort] || sortMap.newest;
    return {
      categoryId: resolvedCategoryId || undefined,
      search: search || undefined,
      brand: brand || undefined,
      page,
      limit: 12,
      ...sortConfig,
    };
  }, [resolvedCategoryId, search, brand, sort, page]);

  useEffect(() => {
    let cancelled = false;
    fetchCategories()
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch((err) => console.error("Failed to load categories", err));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchProducts(filters)
      .then((response) => {
        if (cancelled) return;
        setProducts(response.data);
        setTotalPages(response.meta.totalPages || 1);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load products");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [filters]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    if (key === "categoryId") {
      next.delete("category");
    }
    next.set("page", "1");
    setSearchParams(next, { replace: true });
  };

  const setPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next, { replace: true });
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">All Products</h1>
          <p className="text-sm text-slate-500">Browse the latest inventory from TechMart.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            value={search}
            onChange={(event) => setParam("search", event.target.value)}
            placeholder="Search products"
            className="h-10 w-56 rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-brandYellow"
          />
          <select
            value={categoryId}
            onChange={(event) => setParam("categoryId", event.target.value)}
            className="h-10 rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-brandYellow"
          >
            <option value="">All categories</option>
            {categoryOptions.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            value={brand}
            onChange={(event) => setParam("brand", event.target.value)}
            className="h-10 rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-brandYellow"
          >
            <option value="">All brands</option>

            {brandOptions.map((brandName) => (
              <option key={brandName} value={brandName}>
                {brandName}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setParam("sort", event.target.value)}
            className="h-10 rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-brandYellow"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl bg-white p-8 text-sm text-slate-500">Loading products...</div>
      ) : error ? (
        <div className="rounded-xl bg-white p-8 text-sm text-red-600">{error}</div>
      ) : products.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-sm text-slate-500">No products found.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="group rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <Link to={`/products/${product.slug}`} className="block overflow-hidden rounded-lg bg-slate-50">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <div className="mt-4 flex flex-col gap-2">
                <Link to={`/products/${product.slug}`} className="line-clamp-2 text-sm font-semibold text-slate-800 hover:text-brandPrimary">
                  {product.name}
                </Link>

                <div className="flex items-center justify-between">
                  <StockBadge stock={product.stockQuantity || 0} />

                  {(product.stockQuantity || 0) > 0 && (
                    <span className="text-xs text-slate-500">
                      {product.stockQuantity} left
                    </span>
                  )}
                </div>
                <div className="text-lg font-black text-slate-900">
                  {formatMoney(getProductPrice(product), config?.currencySymbol || undefined)}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {totalPages > 1 && !loading ? (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-40"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page <= 1}
          >
            Previous
          </button>
          <span className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-40"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      ) : null}
    </section>
  );
}
