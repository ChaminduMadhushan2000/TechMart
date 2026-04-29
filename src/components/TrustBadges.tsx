import { LockKeyhole, PackageCheck, ShieldCheck, TruckIcon } from "lucide-react";

const TrustBadges = () => {

  return (
    <div className="grid gap-3 rounded-xl bg-white p-4 shadow-sm md:grid-cols-4" aria-label="Trust Badges">
      <div className="flex flex-col items-center justify-center min-h-32 rounded-md border border-slate-200 bg-slate-50 px-3 py-5 text-base font-semibold">
        <div className="bg-gray-300 p-3 rounded-full mb-1">
          <TruckIcon />
        </div>
        <p>Free Delivery</p>
      </div>
      <div className="flex flex-col items-center justify-center min-h-32 rounded-md border border-slate-200 bg-slate-50 px-3 py-5 text-base font-semibold">
        <div className="bg-gray-300 p-3 rounded-full mb-1">
          <ShieldCheck />
        </div>
        <p>1 Year Warranty</p>
      </div>
      <div className="flex flex-col items-center justify-center min-h-32 rounded-md border border-slate-200 bg-slate-50 px-3 py-5 text-base font-semibold">
        <div className="bg-gray-300 p-3 rounded-full mb-1">
          <PackageCheck />
        </div>
        <p>Easy Returns</p>
      </div>
      <div className="flex flex-col items-center justify-center min-h-32 rounded-md border border-slate-200 bg-slate-50 px-3 py-5 text-base font-semibold">
        <div className="bg-gray-300 p-3 rounded-full mb-1">
          <LockKeyhole />
        </div>
        <p>Secure Payment</p>
      </div>
    </div>
  );
}

export default TrustBadges;
