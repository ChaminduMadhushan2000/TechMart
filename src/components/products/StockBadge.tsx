import { getStockStatus } from "../../utils/stock";

interface Props {
  stock: number;
}

export default function StockBadge({ stock }: Props) {
  const status = getStockStatus(stock);

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${status.className}`}
    >
      {status.label}
    </span>
  );
}