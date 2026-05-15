import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import { useStorefront } from "../storefront/storefront-context";

const SiteLayout = () => {
  const { error } = useStorefront();

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <Header />
      <Navbar />
      {error ? (
        <div className="mx-auto w-full max-w-5xl px-6 py-4 text-sm text-red-600">
          {error}
        </div>
      ) : null}
      <Outlet />
    </div>
  );
};

export default SiteLayout;
