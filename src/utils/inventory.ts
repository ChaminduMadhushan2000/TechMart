import type { CartSummary } from "../types/storefront";

export type InventoryValidationResult = {
  valid: boolean;
  message?: string;
};

export function validateCartInventory(
  cart: CartSummary,
): InventoryValidationResult {

  for (const item of cart.items) {
    const stock = item.product?.stockQuantity || 0;

    if (stock <= 0) {
      return {
        valid: false,
        message: `${item.product?.name} is out of stock`,
      };
    }

    if (item.quantity > stock) {
      return {
        valid: false,
        message: `Only ${stock} items available for ${item.product?.name}`,
      };
    }
  }

  return {
    valid: true,
  };
}

export function validatePurchaseQuantity(
  quantity: number,
  stock: number,
): InventoryValidationResult {
    
  if (stock <= 0) {
    return {
      valid: false,
      message: "Product is out of stock",
    };
  }

  if (quantity > stock) {
    return {
      valid: false,
      message: `Only ${stock} items available`,
    };
  }

  return {
    valid: true,
  };
}
