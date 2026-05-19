import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchCustomerOrders } from "../api";
import type { Order } from "../types/storefront";
import { clearCustomerAuth, getStoredCustomer } from "../storefront/customer";
import { useStorefront } from "../storefront/storefront-context";

function formatMoney(amount: number, currencySymbol = "LKR.") {
  const safeAmount = Number(amount || 0);
  return `${currencySymbol} ${safeAmount.toLocaleString("en-US")}`;
}

export default function AccountPage() {
  const { config } = useStorefront();
  const [searchParams] = useSearchParams();
  const orderHighlight = searchParams.get("order");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const customer = getStoredCustomer();

  useEffect(() => {
    if (!customer) return;
    fetchCustomerOrders(customer.id)
      .then((data) => setOrders(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [customer]);

  if (!customer) {
    return (
      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="rounded-xl bg-white p-8 text-sm text-slate-600">
          Please <Link to="/login" className="text-brandPrimary">sign in</Link> to view your account.
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Welcome, {customer.name}</h1>
          <p className="text-sm text-slate-500">{customer.email}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            clearCustomerAuth();
            window.location.reload();
          }}
          className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Order history</h2>
        {orderHighlight ? (
          <p className="mt-2 text-xs text-green-600">Order placed successfully: {orderHighlight}</p>
        ) : null}
        {loading ? (
          <p className="mt-4 text-sm text-slate-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No orders yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-lg border border-slate-100 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{order.orderNumber}</p>
                    <p className="text-xs text-slate-500">Status: {order.status}</p>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {formatMoney(order.total, config?.currencySymbol || undefined)}
                  </p>
                </div>
                <div className="mt-3 text-xs text-slate-500">
                  {order.items.map((item) => (
                    <p key={`${order.id}-${item.productId}`}>
                      {item.productName} x{item.quantity}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
