export interface BrandItem {
  id: string;
  name: string;
}

export interface TopBrandsProps {
  sectionTitle: string;
  autoScroll: boolean;
  scrollSpeedMs: number;
  brands: BrandItem[];
}

function TopBrands(props: TopBrandsProps): JSX.Element {
  const animationClassName: string =
    props.autoScroll && props.scrollSpeedMs > 0 ? "animate-pulse" : "";

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm" aria-label="Top Brands">
      <h2 className="mb-4 text-xl font-bold">{props.sectionTitle}</h2>
      <div className={`grid grid-cols-2 gap-3 md:grid-cols-5 ${animationClassName}`}>
        {props.brands.map((brand) => (
          <div key={brand.id} className="flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-3 py-4 font-semibold">
            {brand.name}
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopBrands;
