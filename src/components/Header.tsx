import { LogIn, ShoppingCart, TruckIcon, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useStorefront } from "../storefront/storefront-context";
import { getStoredCustomer } from "../storefront/customer";
import { useCartStore } from "../store/cart-store";


const Header = () => {
    const { config } = useStorefront();
    const customer = getStoredCustomer();
    const cart = useCartStore((state) => state.cart);
    const cartCount =
    cart?.items?.reduce(
        (total, item) => total + item.quantity,
        0
    ) || 0;

    return (
        <header className="bg-slate-900 px-4 py-2 text-sm text-white sticky top-0 z-50">
            <div className="flex items-center justify-between mx-10">
                <Link
                    to="/"
                    className="text-2xl font-mono font-semibold italic hover:scale-105"
                >
                    {config?.name || "TechMart"}
                </Link>

                <div className="flex items-center gap-6">
                    {customer ? (
                        <Link to="/account" className="flex items-center gap-1 text-white font-semibold hover:text-brandYellow transition-colors">
                            <User size={20} />
                            Account
                        </Link>
                    ) : (
                        <Link to="/login" className="flex items-center gap-1 text-white font-semibold hover:text-brandYellow transition-colors">
                            <LogIn size={20} />
                            Login
                        </Link>
                    )}
                    <Link to="/account" className="flex items-center gap-1 text-white font-semibold hover:text-brandYellow transition-colors">
                        <TruckIcon size={20} />
                        Track Order
                    </Link>
                    <Link
                        to="/cart"
                        className="relative flex items-center gap-1 text-white font-semibold hover:text-brandYellow transition-colors"
                    >
                        <div className="relative">
                            <ShoppingCart size={20} />

                            {cartCount > 0 && (
                                <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </div>

                        Cart
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;