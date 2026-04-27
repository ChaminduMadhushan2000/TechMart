import Bestsellers from "./components/Bestsellers";
import DealBanners from "./components/DealBanners";
import FeaturedProducts from "./components/FeaturedProducts";
import HeroBanner from "./components/HeroBanner";
import Newsletter from "./components/Newsletter";
import PromoBanners from "./components/PromoBanners";
import ShopByCategory from "./components/ShopByCategory";
import TopBrands from "./components/TopBrands";
import TrustBadges from "./components/TrustBadges";

const categoryItems = [
  { id: "c1", name: "TV & Audio", href: "/products?category=tv-audio" },
  { id: "c2", name: "Smartphones", href: "/products?category=smartphones" },
  { id: "c3", name: "Laptops", href: "/products?category=laptops" },
  { id: "c4", name: "Gaming", href: "/products?category=gaming" },
  { id: "c5", name: "Cameras", href: "/products?category=cameras" },
  { id: "c6", name: "Accessories", href: "/products?category=accessories" },
  { id: "c7", name: "Wearables", href: "/products?category=wearables" },
  { id: "c8", name: "Home Tech", href: "/products?category=home-tech" },
];

const productItems = [
  { id: "p1", name: "AstraBook Pro 14", price: "Rs. 219,999", image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=800&q=80" },
  { id: "p2", name: "NeoPhone X12", price: "Rs. 159,999", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80" },
  { id: "p3", name: "Pulse Buds 3", price: "Rs. 21,999", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80" },
  { id: "p4", name: "Quantum 55\" 4K TV", price: "Rs. 189,999", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80" },
  { id: "p5", name: "FocusCam Mirrorless", price: "Rs. 129,999", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80" },
  { id: "p6", name: "SpeedCore Gaming Mouse", price: "Rs. 8,499", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80" },
  { id: "p7", name: "Volt Power Bank 20,000mAh", price: "Rs. 9,299", image: "https://images.unsplash.com/photo-1609592806955-36dc7f2f1f18?auto=format&fit=crop&w=800&q=80" },
  { id: "p8", name: "SkyFit Watch", price: "Rs. 34,999", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" },
];

const topBrands = [
  { id: "b1", name: "Samsung" },
  { id: "b2", name: "Apple" },
  { id: "b3", name: "Sony" },
  { id: "b4", name: "Dell" },
  { id: "b5", name: "Canon" },
];

function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <header className="bg-slate-900 px-4 py-2 text-sm text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p>Welcome to Worldwide Electronics Store</p>
          <a href="/products" className="min-h-11 rounded bg-brandYellow px-4 py-2 font-semibold text-black">
            Buy now
          </a>
        </div>
      </header>
      <nav className="border-b border-slate-200 bg-brandYellow">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-3 text-sm font-semibold">
          <a href="/" className="min-h-11">Home</a>
          <a href="/products?category=tv-audio" className="min-h-11">TV & Audio</a>
          <a href="/products?category=smartphones" className="min-h-11">Smart Phones</a>
          <a href="/products?category=laptops" className="min-h-11">Laptops & Desktops</a>
          <a href="/products?category=gadgets" className="min-h-11">Gadgets</a>
          <a href="/products?category=cameras" className="min-h-11">Cameras</a>
        </div>
      </nav>
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6">
        <HeroBanner
          heading="Best Tech Deals"
          subheading="e.g. Free delivery over Rs. 5,000"
          buttonText="Shop Now"
          buttonLink="/products"
          backgroundImageURL="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"
          overlayColor="#000000"
        />
        <TrustBadges
          badge1Text="Free Delivery"
          badge2Text="1 Year Warranty"
          badge3Text="Easy Returns"
          badge4Text="Secure Payment"
        />
        <DealBanners
          deal1Title="Up to 30% Off Laptops"
          deal1Link="/products?category=laptops"
          deal2Title="New Arrivals"
          deal2Link="/products?sort=newest"
        />
        <ShopByCategory
          sectionTitle="Shop by Category"
          showAllButton={true}
          maxCategoriesShown={8}
          categories={categoryItems}
        />
        <FeaturedProducts
          sectionTitle="Featured Products"
          maxProducts={8}
          gridColumns={4}
          products={productItems}
        />
        <PromoBanners
          banner1Text="Weekend Sale — 20% Off"
          banner1Link="/sale"
          banner1Image="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80"
        />
        <Bestsellers sectionTitle="Our Bestsellers" maxProducts={6} products={productItems} />
        <TopBrands
          sectionTitle="Top Brands"
          autoScroll={true}
          scrollSpeedMs={3000}
          brands={topBrands}
        />
        <Newsletter
          heading="Stay in the Loop"
          subtext="Get exclusive deals and new arrivals"
          incentive="Rs. 1,000 off your first order"
          buttonText="Subscribe"
        />
      </main>
    </div>
  );
}

export default App;
