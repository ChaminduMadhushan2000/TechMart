import type { Product } from "../../types/storefront";

interface CompareTableProps {
  products: Product[];
}

function getAttributeValue(product: Product, key: string) {
  return product.attributes?.find((attr) => attr.key === key)?.value || "-";
}


export default function CompareTable({ products }: CompareTableProps) {
  const attributeKeys = [
    ...new Set(
      products.flatMap(
        (product) => product.attributes?.map((attr) => attr.key) || [],
      ),
    ),
  ];

  return (
    <table className="min-w-full border-collapse overflow-hidden rounded-xl bg-white shadow-sm">
      <thead>
        <tr className="bg-slate-100">
          <th className="border p-4 text-left text-sm font-bold text-slate-700">
            Feature
          </th>

          {products.map((product) => (
            <th key={product.id} className="border p-4 text-left">
              <div className="flex flex-col gap-3">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                  alt={product.name}
                  className="h-40 w-full rounded-lg object-cover"
                />

                <div>
                  <p className="text-lg font-bold text-slate-900">
                    {product.name}
                  </p>

                  <p className="text-sm text-slate-500">{product.brand}</p>
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className="border p-4 font-semibold">Description</td>

          {products.map((product) => (
            <td key={product.id} className="border p-4 text-sm text-slate-600">
              {product.description || "-"}
            </td>
          ))}
        </tr>

        {attributeKeys.map((key) => (
          <tr key={key}>
            <td className="border p-4 font-semibold">{key}</td>

            {products.map((product) => (
              <td
                key={product.id}
                className="border p-4 text-sm text-slate-600"
              >
                {getAttributeValue(product, key)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
