import { create } from "zustand";
import toast from "react-hot-toast";
import type { CartSummary } from "../types/storefront";
import { persist } from "zustand/middleware";

import {
  addToCart as apiAddToCart,
  fetchCart,
  removeCartItem,
  updateCartItem,
} from "../api";

interface CartStore {
  cart: CartSummary | null;
  loading: boolean;

  loadCart: () => Promise<void>;

  addItem: (
    productId: string,
    quantity?: number,
    variantId?: string
  ) => Promise<void>;

  updateItem: (
    itemId: string,
    quantity: number
  ) => Promise<void>;

  removeItem: (itemId: string) => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: null,
      loading: false,

      loadCart: async () => {
        try {
          set({ loading: true });

          const cart = await fetchCart();

          set({ cart });
        } catch (error) {
          toast.error("Failed to load cart");
        } finally {
          set({ loading: false });
        }
      },

      addItem: async (
        productId,
        quantity = 1,
        variantId
      ) => {
        try {
          const updatedCart = await apiAddToCart({
            productId,
            quantity,
            variantId,
          });

          set({ cart: updatedCart });

          toast.success("Added to cart");
        } catch (error) {
          toast.error("Failed to add item");
        }
      },

      updateItem: async (
        itemId,
        quantity
      ) => {
        try {
          const updatedCart =
            await updateCartItem(
              itemId,
              quantity
            );

          set({ cart: updatedCart });

          toast.success("Cart updated");
        } catch (error) {
          throw error;
        }
      },

      removeItem: async (itemId) => {
        try {
          const updatedCart =
            await removeCartItem(itemId);

          set({ cart: updatedCart });

          toast.success("Item removed");
        } catch (error) {
          toast.error("Failed to remove item");
        }
      },
    }),
    {
      name: "cart-storage",
    }
  )
);