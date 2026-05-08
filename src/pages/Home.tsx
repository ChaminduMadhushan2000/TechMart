import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import TrustBadges from "../components/TrustBadges";
import DealBanners from "../components/DealBanners";
import ShopByCategory from "../components/ShopByCategory";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoBanners from "../components/PromoBanners";
import Bestsellers from "../components/Bestsellers";
import TopBrands from "../components/TopBrands";
import Newsletter from "../components/Newsletter";
import type { HomepageSection } from "../types/homepage";

// ─── Section registry ────────────────────────────────────────────────────────
// Add / remove entries here as you add new section types.
const SECTION_MAP: Record<string, React.ComponentType> = {
    hero_banner: HeroBanner,
    trust_badges: TrustBadges,
    deal_banners: DealBanners,
    category_strip: ShopByCategory,
    featured_products: FeaturedProducts,
    promo_banners: PromoBanners,
    bestsellers: Bestsellers,
    brand_carousel: TopBrands,
    newsletter: Newsletter,
};

//  Static fallback 
const FALLBACK_SECTIONS: HomepageSection[] = [
    { id: "f1", storeId: "aa9e3bda", type: "hero_banner", label: "Hero Banner", isActive: true, sortOrder: 1, config: {}, createdAt: "" },
    { id: "f2", storeId: "aa9e3bda", type: "trust_badges", label: "Trust Badges", isActive: true, sortOrder: 2, config: {}, createdAt: "" },
    { id: "f3", storeId: "aa9e3bda", type: "deal_banners", label: "Deal Banners", isActive: true, sortOrder: 3, config: {}, createdAt: "" },
    { id: "f4", storeId: "aa9e3bda", type: "category_strip", label: "Shop by Category", isActive: true, sortOrder: 4, config: {}, createdAt: "" },
    { id: "f5", storeId: "aa9e3bda", type: "featured_products", label: "Featured Products", isActive: true, sortOrder: 5, config: {}, createdAt: "" },
    { id: "f6", storeId: "aa9e3bda", type: "promo_banners", label: "Promo Banners", isActive: true, sortOrder: 6, config: {}, createdAt: "" },
    { id: "f7", storeId: "aa9e3bda", type: "bestsellers", label: "Bestsellers", isActive: true, sortOrder: 7, config: {}, createdAt: "" },
    { id: "f8", storeId: "aa9e3bda", type: "brand_carousel", label: "Top Brands", isActive: true, sortOrder: 8, config: {}, createdAt: "" },
    { id: "f9", storeId: "aa9e3bda", type: "newsletter", label: "Newsletter", isActive: true, sortOrder: 9, config: {}, createdAt: "" },
];

//  Fetch helper 
async function fetchSections(): Promise<HomepageSection[]> {
    // enter API 
    // const res = await fetch("https://your-api.com/api/homepage-sections");
    // if (!res.ok) throw new Error(`API error: ${res.status}`);
    // return res.json() as Promise<HomepageSection[]>;

    // Simulation // comment this
    return Promise.resolve(FALLBACK_SECTIONS);
}

//  Component 
export default function Home() {
    const [sections, setSections] = useState<HomepageSection[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        fetchSections()
            .then((data) => {
                if (!cancelled) setSections(data);
            })
            .catch((err) => {
                console.error("Failed to load homepage sections, using fallback.", err);
                if (!cancelled) setSections(FALLBACK_SECTIONS);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        // Ignore the result if the component unmounts mid-fetch
        return () => { cancelled = true; };
    }, []);

    const visibleSections = sections
        .filter((s) => s.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder);

    if (loading) {
        return <div className="min-h-screen bg-[#f6f6f6]" aria-busy="true" />;
    }


    return (
        <div className="min-h-screen bg-[#f6f6f6]">
            {visibleSections.map((section) => {
                const Component = SECTION_MAP[section.type];
                if (!Component) return null;
                return <Component key={section.id} />;
            })}
        </div>
    );
}