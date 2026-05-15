import type { ComponentType } from "react";
import { Tv, Smartphone, Laptop, Gamepad2, Camera, Headphones, Watch, Home } from "lucide-react";

interface CategoryCard {
  id: string;
  name: string;
  href: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  slug?: string;
}

interface ShopByCategoryProps {
  sectionTitle?: string;
  showAllButton?: boolean;
  maxCategoriesShown?: number;
  categories?: CategoryCard[];
}

const fallbackCategories: CategoryCard[] = [
  { id: "c1", name: "TV & Audio", href: "/products?category=tv-audio", icon: Tv, slug: "tv-audio" },
  { id: "c2", name: "Smartphones", href: "/products?category=smartphones", icon: Smartphone, slug: "smartphones" },
  { id: "c3", name: "Laptops", href: "/products?category=laptops", icon: Laptop, slug: "laptops" },
  { id: "c4", name: "Gaming", href: "/products?category=gaming", icon: Gamepad2, slug: "gaming" },
  { id: "c5", name: "Cameras", href: "/products?category=cameras", icon: Camera, slug: "cameras" },
  { id: "c6", name: "Accessories", href: "/products?category=accessories", icon: Headphones, slug: "accessories" },
  { id: "c7", name: "Wearables", href: "/products?category=wearables", icon: Watch, slug: "wearables" },
  { id: "c8", name: "Home Tech", href: "/products?category=home-tech", icon: Home, slug: "home-tech" },
];

const iconMap: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  tv: Tv,
  television: Tv,
  audio: Tv,
  smartphone: Smartphone,
  phone: Smartphone,
  laptop: Laptop,
  computer: Laptop,
  gaming: Gamepad2,
  game: Gamepad2,
  camera: Camera,
  accessory: Headphones,
  headphone: Headphones,
  wearable: Watch,
  home: Home,
};

function resolveIcon(category: CategoryCard) {
  if (category.icon) return category.icon;
  const key = (category.slug || category.name).toLowerCase();
  const match = Object.keys(iconMap).find((token) => key.includes(token));
  return match ? iconMap[match] : Home;
}

const ShopByCategory = ({
  sectionTitle = "Shop by Category",
  showAllButton = true,
  maxCategoriesShown = 8,
  categories = fallbackCategories,
}: ShopByCategoryProps) => {
  const visible = categories.slice(0, maxCategoriesShown);

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm" aria-label="Shop By Category">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold ">{sectionTitle}</h2>
        {showAllButton ? (
          <a href="/products" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            Show all
          </a>
        ) : null}
      </div>
      <div className="grid grid-cols-4 gap-4 ">
        {visible.map((category) => {
          const Icon = resolveIcon(category);
          return (
            <a
              key={category.id}
              href={category.href}
              className="flex flex-col items-center justify-center min-h-32 rounded-md border border-slate-100 bg-slate-50 px-3 py-5 text-sm font-semibold transition-all hover:border-brandYellow hover:font-bold hover:shadow-md hover:-translate-y-1 group"
            >
              <div className="bg-brandYellow/5 p-3 rounded-full mb-3 transition-colors">
                <Icon size={24} className="text-brandYellow" />
              </div>
              <p className="text-center">{category.name}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default ShopByCategory;
