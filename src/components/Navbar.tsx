import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'TV & Audio', path: '/products?category=tv-audio' },
        { name: 'Smart Phones', path: '/products?category=smartphones' },
        { name: 'Laptops & Desktops', path: '/products?category=laptops' },
        { name: 'Games', path: '/products?category=gadgets' },
        { name: 'Cameras', path: '/products?category=cameras' },
    ];

    return (
        <div className="bg-brandYellow">
            <div className="flex items-center justify-center gap-12 text-sm font-bold py-2 uppercase tracking-wider">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                            `transition-colors ${isActive ? 'text-brandPrimary underline underline-offset-4' : 'hover:text-brandPrimary'
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Navbar;