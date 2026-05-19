import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchNavigation } from "../api";
import type { NavigationItem } from "../types/storefront";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const navigate = useNavigate();
    const [navItems, setNavItems] = useState<NavigationItem[]>([
        { label: "Home", href: "/" },
        { label: "TV & Audio", href: "/products?category=tv-audio" },
        { label: "Smart Phones", href: "/products?category=smartphones" },
        { label: "Laptops", href: "/products?category=laptops" },
        { label: "Gaming", href: "/products?category=gaming" },
        { label: "Cameras", href: "/products?category=cameras" },
        { label: "Compare Products", href: "/compare" },
    ]);

    useEffect(() => {
        fetchNavigation("header")
            .then((menu) => {
                if (menu?.items?.length) setNavItems(menu.items);
            })
            .catch((err) => console.error("Failed to load navigation", err));
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // handle search logic here
        const query = searchQuery.trim();
        if (query) {
            navigate(`/products?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="bg-brandYellow sticky top-0 z-50">
            <div className="flex items-center justify-between px-12 py-2">
                {/* Nav Links - Left */}
                <div className="flex items-center gap-8 ml-2 text-sm font-bold uppercase tracking-wider">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            end={item.href === "/"}
                            className={({ isActive }) =>
                                `transition-colors whitespace-nowrap ${isActive
                                    ? "text-brandPrimary underline underline-offset-4"
                                    : "hover:text-brandPrimary"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                {/* Search Bar - Right */}
                <form onSubmit={handleSearch} className="flex items-center">
                    <div
                        className={`flex items-center gap-2 bg-white rounded-full px-4 py-1.5 transition-all duration-200 ${isSearchFocused ? 'ring-2 ring-brandPrimary' : ''
                            }`}
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            placeholder="Search Products..."
                            className="text-sm outline-none bg-transparent w-72 placeholder-gray-400"
                        />
                        <button
                            type="submit"
                            className="text-gray-500 hover:text-brandPrimary transition-colors"
                            aria-label="Search"
                        >
                            <SearchIcon size={20} />

                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Navbar;