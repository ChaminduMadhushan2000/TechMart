import { LogIn, ShoppingCart, TruckIcon, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useStorefront } from "../storefront/storefront-context";
import { getStoredCustomer } from "../storefront/customer";

const Header = () => {
    const { config } = useStorefront();
    const customer = getStoredCustomer();

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
                    <Link to="/cart" className="flex items-center gap-1 text-white font-semibold hover:text-brandYellow transition-colors">
                        <ShoppingCart size={20} />
                        Cart
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;