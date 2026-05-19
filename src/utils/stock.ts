export type StockStatus = {
  label: string;
  className: string;
  canPurchase: boolean;
};

export function getStockStatus(stock: number): StockStatus {
  if (stock === 0) {
    return {
      label: "Out of Stock",
      className: "bg-red-100 text-red-700",
      canPurchase: false,
    };
  }

  if (stock <= 10) {
    return {
      label: `Only ${stock} left`,
      className: "bg-yellow-100 text-yellow-700",
      canPurchase: true,
    };
  }

  return {
    label: "In Stock",
    className: "bg-green-100 text-green-700",
    canPurchase: true,
  };
}