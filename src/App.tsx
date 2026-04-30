import { BrowserRouter } from 'react-router-dom';
import HeroBanner from "./components/HeroBanner";
import TrustBadges from "./components/TrustBadges";
import DealBanners from "./components/DealBanners";
import ShopByCategory from "./components/ShopByCategory";
import FeaturedProducts from "./components/FeaturedProducts";
import PromoBanners from "./components/PromoBanners";
import Bestsellers from "./components/Bestsellers";
import TopBrands from "./components/TopBrands";
import Newsletter from "./components/Newsletter";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f6f6f6]">

        <HeroBanner />

        <main className="flex flex-col gap-8 px-10 py-6">
          <TrustBadges />
          <DealBanners />
          <ShopByCategory />
          <FeaturedProducts />
          <PromoBanners />
          <Bestsellers />
          <TopBrands />
        </main>

        <Newsletter />

      </div>
    </BrowserRouter>
  );
}

export default App;
