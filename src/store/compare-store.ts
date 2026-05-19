import { create } from "zustand";
import type { Product } from "../types/storefront";

interface CompareStore {
  products: Product[];

  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearProducts: () => void;
}

export const useCompareStore = create<CompareStore>((set) => ({
  products: [],

  addProduct: (product) =>
    set((state) => {
      //console.log("Adding product to compare:", product)
      const exists = state.products.some((p) => p.id === product.id);

      if (exists) {
        return state;
      }

      const MAX_COMPARE_PRODUCTS = 2;

      if (state.products.length >= MAX_COMPARE_PRODUCTS) {
        return {
          products: [...state.products.slice(1), product],
        };
      }

      return {
        products: [...state.products, product],
      };
    }),

  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),

  clearProducts: () =>
    set({
      products: [],
    }),
}));
