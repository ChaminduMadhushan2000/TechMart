const brands = [
  { id: "b1", name: "Samsung" },
  { id: "b2", name: "Apple" },
  { id: "b3", name: "Sony" },
  { id: "b4", name: "Dell" },
  { id: "b5", name: "Canon" },
  { id: "b6", name: "LG" },
  { id: "b7", name: "HP" },
  { id: "b8", name: "Asus" },
  { id: "b9", name: "Nikon" },
  { id: "b10", name: "Microsoft" },
];

const TopBrands = () => {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm" aria-label="Top Brands">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 text-center">Trusted by Global Brands</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex min-h-[80px] items-center justify-center rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-6 text-lg text-black font-semibold transition-all hover:border-brandYellow hover:bg-white hover:font-bold hover:grayscale-0 hover:shadow-md"
          >
            {brand.name}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopBrands;
