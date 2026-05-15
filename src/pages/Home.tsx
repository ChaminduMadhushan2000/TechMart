import { useEffect, useMemo, useState } from "react";
import SectionRenderer from "../components/SectionRenderer";
import { fetchCategories, fetchFeaturedProducts, fetchHomepageSections, fetchProducts } from "../api";
import type { HomepageSection, Category, Product } from "../types/storefront";
import { useStorefront } from "../storefront/storefront-context";

const FALLBACK_SECTIONS: HomepageSection[] = [
    { id: "f1", storeId: "techmart", type: "hero_banner", label: "Hero Banner", isActive: true, sortOrder: 1, config: {}, createdAt: "" },
    { id: "f2", storeId: "techmart", type: "trust_badges", label: "Trust Badges", isActive: true, sortOrder: 2, config: {}, createdAt: "" },
    { id: "f3", storeId: "techmart", type: "deal_banners", label: "Deal Banners", isActive: true, sortOrder: 3, config: {}, createdAt: "" },
    { id: "f4", storeId: "techmart", type: "category_strip", label: "Shop by Category", isActive: true, sortOrder: 4, config: {}, createdAt: "" },
    { id: "f5", storeId: "techmart", type: "featured_products", label: "Featured Products", isActive: true, sortOrder: 5, config: {}, createdAt: "" },
    { id: "f6", storeId: "techmart", type: "promo_banners", label: "Promo Banners", isActive: true, sortOrder: 6, config: {}, createdAt: "" },
    { id: "f7", storeId: "techmart", type: "bestsellers", label: "Bestsellers", isActive: true, sortOrder: 7, config: {}, createdAt: "" },
    { id: "f8", storeId: "techmart", type: "brand_carousel", label: "Top Brands", isActive: true, sortOrder: 8, config: {}, createdAt: "" },
    { id: "f9", storeId: "techmart", type: "newsletter", label: "Newsletter", isActive: true, sortOrder: 9, config: {}, createdAt: "" },
];

export default function Home() {
    const { config } = useStorefront();
    const [sections, setSections] = useState<HomepageSection[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [bestsellers, setBestsellers] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);

            const [sectionResult, categoryResult, featuredResult, bestsellerResult] = await Promise.allSettled([
                fetchHomepageSections(),
                fetchCategories(),
                fetchFeaturedProducts(10),
                fetchProducts({ limit: 10, sortBy: "sortOrder", sortOrder: "ASC" }),
            ]);

            if (cancelled) return;

            if (sectionResult.status === "fulfilled") {
                setSections(sectionResult.value);
            } else {
                console.error("Failed to load homepage sections", sectionResult.reason);
                setSections(FALLBACK_SECTIONS);
            }

            if (categoryResult.status === "fulfilled") {
                setCategories(categoryResult.value);
            }

            if (featuredResult.status === "fulfilled") {
                setFeaturedProducts(featuredResult.value);
            }

            if (bestsellerResult.status === "fulfilled") {
                setBestsellers(bestsellerResult.value.data);
            }

            setLoading(false);
        };

        void load();

        return () => {
            cancelled = true;
        };
    }, []);

    const visibleSections = useMemo(() => {
        return sections.filter((section) => section.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
    }, [sections]);

    if (loading) {
        return <div className="min-h-screen bg-[#f6f6f6]" aria-busy="true" />;
    }

    return (
        <div className="min-h-screen bg-[#f6f6f6]">
            {visibleSections.map((section) => {
                const isHero = section.type === "hero_banner";
                return (
                    <div key={section.id} className={isHero ? "" : "mx-auto w-full max-w-7xl px-6 py-6"}>
                        <SectionRenderer
                            section={section}
                            currencySymbol={config?.currencySymbol || undefined}
                            data={{
                                categories,
                                featuredProducts,
                                bestsellers,
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
}