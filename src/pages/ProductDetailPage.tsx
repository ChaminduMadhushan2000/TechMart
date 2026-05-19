import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../types/storefront";
import { useStorefront } from "../storefront/storefront-context";
import { fetchProductBySlug } from "../api";
import { useCartStore } from "../store/cart-store";

function formatMoney(amount: number, currencySymbol = "LKR.") {
  const safeAmount = Number(amount || 0);
  return `${currencySymbol} ${safeAmount.toLocaleString("en-US")}`;
}

function getProductPrice(product: Product): number {
  return Number(product.salePrice ?? product.basePrice ?? 0);
}

export default function ProductDetailPage() {
  const { config } = useStorefront();
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(undefined);
  const [adding, setAdding] = useState(false);

  const addItem = useCartStore(
    (state) => state.addItem
  );
  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchProductBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        setProduct(data);
        const firstVariant = data.variants?.find((variant) => variant.isActive !== false);
        setSelectedVariant(firstVariant?.id);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load product");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const primaryImage = useMemo(() => {
    return product?.images?.find((image) => image.isPrimary)?.url || product?.images?.[0]?.url;
  }, [product]);

  const variantOptions = useMemo(() => {
    return product?.variants?.filter((variant) => variant.isActive !== false) || [];
  }, [product]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setAdding(true);

      await addItem(
        product.id,
        quantity,
        selectedVariant
      );
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="rounded-xl bg-white p-8 text-sm text-slate-500">Loading product...</div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="rounded-xl bg-white p-8 text-sm text-red-600">{error || "Product not found"}</div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="mb-6 text-sm text-slate-500">
        <Link to="/" className="hover:text-brandPrimary">Home</Link> /{" "}
        <Link to="/products" className="hover:text-brandPrimary">Products</Link> /{" "}
        <span className="text-slate-700">{product.name}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl bg-slate-100">
            <img
              src={primaryImage || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"}
              alt={product.name}
              className="h-96 w-full object-cover"
            />
          </div>
          {product.images?.length ? (
            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt={image.altText || product.name}
                  className={`h-20 w-20 rounded-lg object-cover ${image.url === primaryImage ? "ring-2 ring-brandYellow" : "opacity-70"}`}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900">{product.name}</h1>
            <p className="mt-2 text-lg font-bold text-brandPrimary">
              {formatMoney(getProductPrice(product), config?.currencySymbol || undefined)}
            </p>
          </div>

          {product.description ? (
            <p className="text-slate-600">{product.description}</p>
          ) : null}

          {variantOptions.length ? (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Choose variant</label>
              <select
                value={selectedVariant}
                onChange={(event) => setSelectedVariant(event.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm"
              >
                {variantOptions.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name} - {formatMoney(variant.price, config?.currencySymbol || undefined)}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-slate-700">Qty</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
              className="h-12 w-24 rounded-xl border border-slate-200 px-3 text-sm"
            />
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={adding}
            className="h-12 w-full rounded-xl bg-brandYellow text-sm font-black text-slate-900 transition-all hover:bg-yellow-400 disabled:opacity-60"
          >
            {adding ? "Adding..." : "Add to cart"}
          </button>
        </div>
      </div>
    </section>
  );
}
