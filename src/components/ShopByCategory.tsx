export interface CategoryItem {
  id: string;
  name: string;
  href: string;
}

export interface ShopByCategoryProps {
  sectionTitle: string;
  showAllButton: boolean;
  maxCategoriesShown: number;
  categories: CategoryItem[];
}

function ShopByCategory(props: ShopByCategoryProps): JSX.Element {
  const visibleCategories: CategoryItem[] = props.categories.slice(0, props.maxCategoriesShown);

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm" aria-label="Shop By Category">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">{props.sectionTitle}</h2>
        {props.showAllButton ? (
          <a href="/products" className="min-h-11 text-sm font-semibold text-blue-600 hover:text-blue-700">
            Show all
          </a>
        ) : null}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {visibleCategories.map((category) => (
          <a
            key={category.id}
            href={category.href}
            className="flex min-h-11 items-center justify-center rounded-md border border-slate-200 px-3 py-4 text-sm font-medium hover:border-brandYellow"
          >
            {category.name}
          </a>
        ))}
      </div>
    </section>
  );
}

export default ShopByCategory;
