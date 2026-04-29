import {
  Tv,
  Smartphone,
  Laptop,
  Gamepad2,
  Camera,
  Headphones,
  Watch,
  Home
} from "lucide-react";

const categories = [
  { id: "c1", name: "TV & Audio", href: "/products?category=tv-audio", icon: Tv },
  { id: "c2", name: "Smartphones", href: "/products?category=smartphones", icon: Smartphone },
  { id: "c3", name: "Laptops", href: "/products?category=laptops", icon: Laptop },
  { id: "c4", name: "Gaming", href: "/products?category=gaming", icon: Gamepad2 },
  { id: "c5", name: "Cameras", href: "/products?category=cameras", icon: Camera },
  { id: "c6", name: "Accessories", href: "/products?category=accessories", icon: Headphones },
  { id: "c7", name: "Wearables", href: "/products?category=wearables", icon: Watch },
  { id: "c8", name: "Home Tech", href: "/products?category=home-tech", icon: Home },
];

const ShopByCategory = () => {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm" aria-label="Shop By Category">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold ">Shop by Category</h2>
        <a href="/products" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          Show all
        </a>
      </div>
      <div className="grid grid-cols-4 gap-4 ">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <a
              key={category.id}
              href={category.href}
              className="flex flex-col items-center justify-center min-h-32 rounded-md border border-slate-100 bg-slate-50 px-3 py-5 text-sm font-semibold transition-all hover:border-brandYellow hover:shadow-md group"
            >
              <div className="bg-gray-200 p-3 rounded-full mb-3 group-hover:bg-brandYellow transition-colors">
                <Icon size={24} className="text-slate-700" />
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
