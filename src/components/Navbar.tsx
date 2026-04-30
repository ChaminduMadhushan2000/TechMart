import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'TV & Audio', path: '/products?category=tv-audio' },
        { name: 'Smart Phones', path: '/products?category=smartphones' },
        { name: 'Laptops & Desktops', path: '/products?category=laptops' },
        { name: 'Games', path: '/products?category=gadgets' },
        { name: 'Cameras', path: '/products?category=cameras' },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // handle search logic here
        console.log('Search:', searchQuery);
    };

    return (
        <div className="bg-brandYellow">
            <div className="flex items-center justify-between px-6 py-2">
                {/* Nav Links - Left */}
                <div className="flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            className={({ isActive }) =>
                                `transition-colors whitespace-nowrap ${isActive
                                    ? 'text-brandPrimary underline underline-offset-4'
                                    : 'hover:text-brandPrimary'
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                {/* Search Bar - Right */}
                <form onSubmit={handleSearch} className="flex items-center">
                    <div
                        className={`flex items-center gap-2 bg-white rounded-full px-3 py-1.5 transition-all duration-200 ${isSearchFocused ? 'ring-2 ring-brandPrimary' : ''
                            }`}
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            placeholder="Search products..."
                            className="text-sm outline-none bg-transparent w-48 placeholder-gray-400"
                        />
                        <button
                            type="submit"
                            className="text-gray-500 hover:text-brandPrimary transition-colors"
                            aria-label="Search"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Navbar;