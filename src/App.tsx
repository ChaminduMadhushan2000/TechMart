import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import {
  Home,
  ProductsPage,
  ProductDetailPage,
  CartPage,
  CheckoutPage,
  LoginPage,
  RegisterPage,
  AccountPage,
} from "./pages";
import { Toaster } from "react-hot-toast";
import { useCartStore } from "./store/cart-store";
import { useEffect } from "react";

export default function App() {
  const loadCart = useCartStore(
    (state) => state.loadCart
  );

  useEffect(() => {
    void loadCart();
  }, [loadCart]);
  return (
    <BrowserRouter>
    <>
    <Toaster position="top-right" />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Routes>
    </>
    </BrowserRouter>
  );
}