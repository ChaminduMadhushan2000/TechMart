import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  calculateShipping,
  clearCart,
  createOrder,
  fetchCart,
  getPaymentMethods,
  validateCoupon,
} from "../api";
import type { CartSummary, CouponValidation, PaymentMethod } from "../types/storefront";
import { useStorefront } from "../storefront/storefront-context";
import { getActiveCustomerId } from "../storefront/customer";

function formatMoney(amount: number, currencySymbol = "LKR.") {
  const safeAmount = Number(amount || 0);
  return `${currencySymbol} ${safeAmount.toLocaleString("en-US")}`;
}

export default function CheckoutPage() {
  const { config } = useStorefront();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartSummary | null>(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState<CouponValidation | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    postalCode: "",
  });

  useEffect(() => {
    fetchCart().then(setCart).catch((err) => console.error(err));
    getPaymentMethods().then(setPaymentMethods).catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!cart) return;
    calculateShipping(cart.subtotal, form.region)
      .then((res) => setShippingCost(Number(res.amount || 0)))
      .catch(() => setShippingCost(0));
  }, [cart, form.region]);

  const subtotal = cart?.subtotal || 0;
  const discount = couponResult?.valid ? couponResult.discount : 0;
  const total = subtotal + shippingCost - discount;
  const hasItems = (cart?.items?.length || 0) > 0;

  const canPlaceOrder = useMemo(() => {
    return Boolean(hasItems && form.name && form.email && form.phone && form.addressLine1 && form.city);
  }, [form, hasItems]);

  const handleInput = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const applyCoupon = async () => {
    if (!couponCode || !cart) return;
    try {
      const result = await validateCoupon(couponCode, cart.subtotal);
      setCouponResult(result);
    } catch (err) {
      console.error(err);
      setCouponResult(null);
    }
  };

  const handlePlaceOrder = async () => {
    if (!cart) return;
    setPlacingOrder(true);
    try {
      const order = await createOrder({
        customerId: getActiveCustomerId(),
        items: cart.items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId || undefined,
          productName: item.product?.name || "Product",
          unitPrice: item.unitPrice,
          quantity: item.quantity,
        })),
        shippingAddress: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2,
          city: form.city,
          region: form.region,
          postalCode: form.postalCode,
        },
        couponCode: couponResult?.valid ? couponCode : undefined,
        shippingCost,
        notes: selectedPayment ? `Payment method: ${selectedPayment}` : undefined,
      });

      await clearCart();
      navigate(`/account?order=${order.orderNumber}`);
    } catch (err) {
      console.error("Failed to place order", err);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-black text-slate-900">Checkout</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Shipping Details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Full name"
              value={form.name}
              onChange={(event) => handleInput("name", event.target.value)}
              className="h-12 rounded-xl border border-slate-200 px-4 text-sm"
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(event) => handleInput("email", event.target.value)}
              className="h-12 rounded-xl border border-slate-200 px-4 text-sm"
            />
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(event) => handleInput("phone", event.target.value)}
              className="h-12 rounded-xl border border-slate-200 px-4 text-sm"
            />
            <input
              placeholder="City"
              value={form.city}
              onChange={(event) => handleInput("city", event.target.value)}
              className="h-12 rounded-xl border border-slate-200 px-4 text-sm"
            />
          </div>
          <input
            placeholder="Address line 1"
            value={form.addressLine1}
            onChange={(event) => handleInput("addressLine1", event.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm"
          />
          <input
            placeholder="Address line 2"
            value={form.addressLine2}
            onChange={(event) => handleInput("addressLine2", event.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Region"
              value={form.region}
              onChange={(event) => handleInput("region", event.target.value)}
              className="h-12 rounded-xl border border-slate-200 px-4 text-sm"
            />
            <input
              placeholder="Postal code"
              value={form.postalCode}
              onChange={(event) => handleInput("postalCode", event.target.value)}
              className="h-12 rounded-xl border border-slate-200 px-4 text-sm"
            />
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-700">Payment Method</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {paymentMethods.length ? (
                paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedPayment(method.provider)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                      selectedPayment === method.provider
                        ? "border-brandYellow bg-brandYellow/20 text-slate-900"
                        : "border-slate-200 text-slate-500"
                    }`}
                  >
                    {method.provider}
                  </button>
                ))
              ) : (
                <p className="text-xs text-slate-500">No payment methods configured.</p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-700">Promo code</p>
            <div className="mt-2 flex gap-2">
              <input
                placeholder="Enter code"
                value={couponCode}
                onChange={(event) => setCouponCode(event.target.value)}
                className="h-10 flex-1 rounded-lg border border-slate-200 px-3 text-sm"
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="rounded-lg bg-slate-900 px-4 text-xs font-semibold text-white"
              >
                Apply
              </button>
            </div>
            {couponResult?.valid ? (
              <p className="mt-2 text-xs text-green-600">Coupon applied. Discount {formatMoney(couponResult.discount, config?.currencySymbol || undefined)}.</p>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatMoney(subtotal, config?.currencySymbol || undefined)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>{formatMoney(shippingCost, config?.currencySymbol || undefined)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>-{formatMoney(discount, config?.currencySymbol || undefined)}</span>
            </div>
            <div className="flex items-center justify-between text-base font-bold text-slate-900">
              <span>Total</span>
              <span>{formatMoney(total, config?.currencySymbol || undefined)}</span>
            </div>
          </div>

          <button
            type="button"
            disabled={!canPlaceOrder || placingOrder}
            onClick={handlePlaceOrder}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-brandYellow text-sm font-black text-slate-900 disabled:opacity-60"
          >
            {placingOrder ? "Placing order..." : "Place order"}
          </button>
          {!hasItems ? (
            <p className="mt-3 text-xs text-slate-500">Add items to your cart before placing an order.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
