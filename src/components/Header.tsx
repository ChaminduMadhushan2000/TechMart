import { LogIn, ShoppingCart } from "lucide-react";

const Header = () => {
    return (
        <header className="bg-slate-900 px-4 py-3 text-sm text-white">
            <div className="flex items-center justify-between mx-10">
                <p className='text-2xl font-mono font-semibold italic hover:scale-105 hover:cursor-pointer'>
                    TechMart
                </p>

                <div className="flex items-center gap-6">
                    <a href="/login" className="flex items-center gap-2 text-white font-semibold hover:text-brandYellow transition-colors">
                        <LogIn size={20} />
                        Login
                    </a>
                    <a href="/products" className="flex items-center gap-2 text-white font-semibold hover:text-brandYellow transition-colors">
                        <ShoppingCart size={20} />
                        Cart
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;