import { LogIn, ShoppingCart, TruckIcon } from "lucide-react";

const Header = () => {
    return (
        <header className="bg-slate-900 px-4 py-2 text-sm text-white sticky top-0 z-50">
            <div className="flex items-center justify-between mx-10">
                <p className='text-2xl font-mono font-semibold italic hover:scale-105 hover:cursor-pointer'>
                    TechMart
                </p>

                <div className="flex items-center gap-6">
                    <a href="/login" className="flex items-center gap-1 text-white font-semibold hover:text-brandYellow transition-colors">
                        <LogIn size={20} />
                        Login
                    </a>
                    <a href="/login" className="flex items-center gap-1 text-white font-semibold hover:text-brandYellow transition-colors">
                        <TruckIcon size={20} />
                        Track Order
                    </a>
                    <a href="/products" className="flex items-center gap-1 text-white font-semibold hover:text-brandYellow transition-colors">
                        <ShoppingCart size={20} />
                        Cart
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;