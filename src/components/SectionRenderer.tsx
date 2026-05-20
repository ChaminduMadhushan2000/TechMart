import type { HomepageSection, Category, Product } from "../types/storefront";
import type { ProductCard } from "./FeaturedProducts";

import HeroBanner from "./HeroBanner";
import TrustBadges from "./TrustBadges";
import DealBanners from "./DealBanners";
import ShopByCategory from "./ShopByCategory";
import FeaturedProducts from "./FeaturedProducts";
import PromoBanners from "./PromoBanners";
import Bestsellers from "./Bestsellers";
import TopBrands from "./TopBrands";
import Newsletter from "./Newsletter";

// ─── Default data (fallbacks when config doesn't provide data) ───────────────

const defaultCategories = [
  { id: "c1", name: "TV & Audio", href: "/products?category=tv-audio", slug: "tv-audio" },
  { id: "c2", name: "Smartphones", href: "/products?category=smartphones", slug: "smartphones" },
  { id: "c3", name: "Laptops", href: "/products?category=laptops", slug: "laptops" },
  { id: "c4", name: "Gaming", href: "/products?category=gaming", slug: "gaming" },
  { id: "c5", name: "Cameras", href: "/products?category=cameras", slug: "cameras" },
  { id: "c6", name: "Accessories", href: "/products?category=accessories", slug: "accessories" },
  { id: "c7", name: "Wearables", href: "/products?category=wearables", slug: "wearables" },
  { id: "c8", name: "Home Tech", href: "/products?category=home-tech", slug: "home-tech" },
];

const defaultProducts: ProductCard[] = [
  { id: "p1", name: "AstraBook Pro 14", price: "Rs. 219,999",stock:5, image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=800&q=80" },
  { id: "p2", name: "NeoPhone X12", price: "Rs. 159,999",stock:5, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80" },
  { id: "p3", name: "Pulse Buds 3", price: "Rs. 21,999",stock:5, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80" },
  { id: "p4", name: 'Quantum 55" 4K TV', price: "Rs. 189,999",stock:5, image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80" },
  { id: "p5", name: "FocusCam Mirrorless", price: "Rs. 129,999",stock:5, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80" },
  { id: "p6", name: "SpeedCore Gaming Mouse", price: "Rs. 8,499",stock:5, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80" },
  { id: "p7", name: "Volt Power Bank 20,000mAh", price: "Rs. 9,299",stock:5, image: "https://images.unsplash.com/photo-1609592806955-36dc7f2f1f18?auto=format&fit=crop&w=800&q=80" },
  { id: "p8", name: "SkyFit Watch", price: "Rs. 34,999",stock:5, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" },
];

const defaultBrands = [
  { id: "b1", name: "Samsung" },
  { id: "b2", name: "Apple" },
  { id: "b3", name: "Sony" },
  { id: "b4", name: "Dell" },
  { id: "b5", name: "Canon" },
];

// ─── Section Renderer ────────────────────────────────────────────────────────

interface SectionRendererProps {
  section: HomepageSection;
  data?: {
    categories?: Category[];
    featuredProducts?: Product[];
    bestsellers?: Product[];
    brands?: string[];
  };
  currencySymbol?: string;
}

function formatMoney(amount: number, currencySymbol = "LKR.") {
  const safeAmount = Number(amount || 0);
  return `${currencySymbol} ${safeAmount.toLocaleString("en-US")}`;
}

function mapProducts(products: Product[], currencySymbol?: string): ProductCard[] {
  return products.map((product) => {
    const price = Number(product.salePrice ?? product.basePrice ?? 0);
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      stock: product.stock || 0,
      price: formatMoney(price, currencySymbol),
      image: product.images?.[0]?.url || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      rating: typeof product.metadata?.rating === "number" ? product.metadata.rating : undefined,
    };
  });
}

function mapCategories(categories: Category[]) {
  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    href: `/products?categoryId=${category.id}`,
  }));
}

function getConfigString(cfg: Record<string, unknown>, keys: string[], fallback: string): string {
  for (const key of keys) {
    const value = cfg[key];
    if (typeof value === "string" && value.trim() !== "") {
      return value;
    }
  }
  return fallback;
}

function getConfigNumber(cfg: Record<string, unknown>, keys: string[], fallback: number): number {
  for (const key of keys) {
    const value = cfg[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }
  return fallback;
}

function getConfigBoolean(cfg: Record<string, unknown>, keys: string[], fallback: boolean): boolean {
  for (const key of keys) {
    const value = cfg[key];
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "string") {
      if (value.toLowerCase() === "true") {
        return true;
      }
      if (value.toLowerCase() === "false") {
        return false;
      }
    }
  }
  return fallback;
}

/**
 * Maps a HomepageSection (from the API) to the corresponding React component.
 * Reads config keys from section.config and passes them as props.
 */
export default function SectionRenderer({ section, data, currencySymbol }: SectionRendererProps): JSX.Element | null {
  const cfg = section.config;

  switch (section.type) {
    case "hero_banner":
      return (
        <HeroBanner
          heading={getConfigString(cfg, ["title", "heading"], "Best Tech Deals")}
          subheading={getConfigString(cfg, ["subtitle", "subheading"], "Free delivery over LKR. 5,000")}
          buttonText={getConfigString(cfg, ["cta", "ctaText"], "Shop Now")}
          buttonLink={getConfigString(cfg, ["ctaLink"], "/products")}
          backgroundImageURL={getConfigString(
            cfg,
            ["imageUrl", "image", "backgroundImageUrl"],
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"
          )}
          overlayColor={getConfigString(cfg, ["overlayColor"], "#0f172a")}
        />
      );

    case "trust_badges":
      const badgeList = Array.isArray(cfg.badges) ? (cfg.badges as string[]) : null;
      const badge1Fallback = "Free Delivery";
      const badge2Fallback = "1 Year Warranty";
      const badge3Fallback = "Easy Returns";
      const badge4Fallback = "Secure Payment";
      const badge5Fallback = "Best Brands";

      return (
        <TrustBadges
          badge1Text={badgeList?.[0] || getConfigString(cfg, ["badge1"], badge1Fallback)}
          badge2Text={badgeList?.[1] || getConfigString(cfg, ["badge2"], badge2Fallback)}
          badge3Text={badgeList?.[2] || getConfigString(cfg, ["badge3"], badge3Fallback)}
          badge4Text={badgeList?.[3] || getConfigString(cfg, ["badge4"], badge4Fallback)}
          badge5Text={badgeList?.[4] || getConfigString(cfg, ["badge5"], badge5Fallback)}
        />
      );

    case "deal_banners":
      return (
        <DealBanners
          deal1Title={getConfigString(cfg, ["deal1Title", "dealOneTitle"], "Up to 30% Off Laptops")}
          deal1Link={getConfigString(cfg, ["deal1Link", "dealOneLink"], "/products?category=laptops")}
          deal2Title={getConfigString(cfg, ["deal2Title", "dealTwoTitle"], "New Arrivals")}
          deal2Link={getConfigString(cfg, ["deal2Link", "dealTwoLink"], "/products?sort=newest")}
        />
      );

    case "category_strip":
      const categoryData = data?.categories?.length ? mapCategories(data.categories) : defaultCategories;
      return (
        <ShopByCategory
          sectionTitle={getConfigString(cfg, ["title"], section.label || "Shop by Category")}
          showAllButton={getConfigBoolean(cfg, ["showAll", "showCount"], true)}
          maxCategoriesShown={getConfigNumber(cfg, ["maxVisible", "columns"], 8)}
          categories={categoryData}
        />
      );

    case "featured_products":
      const featured = data?.featuredProducts?.length
        ? mapProducts(data.featuredProducts, currencySymbol)
        : defaultProducts;
      return (
        <FeaturedProducts
          sectionTitle={getConfigString(cfg, ["title"], section.label || "Featured Products")}
          maxProducts={getConfigNumber(cfg, ["limit"], 8)}
          gridColumns={getConfigNumber(cfg, ["columns"], 4)}
          products={featured}
        />
      );

    case "promo_banners":
      return (
        <PromoBanners
          banner1Text={getConfigString(cfg, ["banner1Text", "bannerText"], "Weekend Sale — 20% Off")}
          banner1Link={getConfigString(cfg, ["banner1Link", "bannerLink"], "/sale")}
          banner1Image={getConfigString(
            cfg,
            ["banner1Image", "bannerImage"],
            "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80"
          )}
        />
      );

    case "bestsellers":
      const bestsellers = data?.bestsellers?.length
        ? mapProducts(data.bestsellers, currencySymbol)
        : defaultProducts;
      return (
        <Bestsellers
          sectionTitle={getConfigString(cfg, ["title"], section.label || "Our Bestsellers")}
          maxProducts={getConfigNumber(cfg, ["limit"], 6)}
          products={bestsellers}
        />
      );

    case "brand_carousel":
      const brandList = data?.brands?.length
        ? data.brands.map((name, index) => ({ id: `b-${index}`, name }))
        : defaultBrands;
      return (
        <TopBrands
          sectionTitle={getConfigString(cfg, ["title"], section.label || "Top Brands")}
          autoScroll={getConfigBoolean(cfg, ["autoScroll", "autoplay"], true)}
          scrollSpeedMs={getConfigNumber(cfg, ["speed", "scrollSpeedMs"], 3000)}
          brands={brandList}
        />
      );

    case "newsletter":
      return (
        <Newsletter
          heading={getConfigString(cfg, ["title", "heading"], "Stay in the Loop")}
          subtext={getConfigString(cfg, ["subtitle", "subtext"], "Get exclusive deals and new arrivals")}
          incentive={getConfigString(cfg, ["incentive"], "LKR. 1,000 off your first order")}
          buttonText={getConfigString(cfg, ["btnText", "buttonText"], "Subscribe")}
        />
      );

    default:
      console.warn(`[TechMart] Unknown section type: ${section.type}`);
      return null;
  }
}
