import { ShoppingCart } from "lucide-react";

const Header = () => {

    return (
        <header className="bg-slate-900 px-4 py-3 text-sm text-white">
            <div className="flex items-center justify-between mx-10 ">
                <p className='text-2xl font-mono font-semibold italic hover:scale-105 hover:cursor-pointer'>TechMart</p>
                {/* <a href="/products" className="rounded bg-brandYellow px-3 py-1 font-semibold test-xs text-black">
                    Buy now
                </a> */}
                <a href="/products" className="flex flex-row text-white font-semibold test-xs">
                    <ShoppingCart size={20} className="mr-2" />
                    Cart
                </a>
            </div>
        </header>
    );
};

export default Header;