import { Link } from "react-router-dom";
import { useStorefront } from "../storefront/storefront-context";
import { useCartStore } from "../store/cart-store";

function formatMoney(amount: number, currencySymbol = "Rs.") {
  const safeAmount = Number(amount || 0);
  return `${currencySymbol} ${safeAmount.toLocaleString("en-US")}`;
}

export default function CartPage() {
  const { config } = useStorefront();
  const cart = useCartStore((state) => state.cart);

  const loading = useCartStore(
    (state) => state.loading
  );

  const updateItem = useCartStore(
    (state) => state.updateItem
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );
  



  if (loading || !cart) {
    return (
      <section className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="rounded-xl bg-white p-8 text-sm text-slate-500">Loading cart...</div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-black text-slate-900">Your Cart</h1>

      {cart.items.length === 0 ? (
        <div className="mt-6 rounded-xl bg-white p-8 text-sm text-slate-500">
          Your cart is empty. <Link to="/products" className="text-brandPrimary">Start shopping</Link>.
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product?.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"}
                    alt={item.product?.name || "Product"}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.product?.name || "Product"}</p>
                    {item.variant?.name ? (
                      <p className="text-xs text-slate-500">{item.variant.name}</p>
                    ) : null}
                    <p className="text-xs text-slate-500">{formatMoney(item.unitPrice, config?.currencySymbol || undefined)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) => updateItem(item.id,Math.max(1, Number(event.target.value)))}
                    className="h-10 w-20 rounded-lg border border-slate-200 px-3 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-xs font-semibold text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>{formatMoney(cart.subtotal, config?.currencySymbol || undefined)}</span>
            </div>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex h-12 items-center justify-center rounded-xl bg-brandYellow text-sm font-black text-slate-900 hover:bg-yellow-400"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
