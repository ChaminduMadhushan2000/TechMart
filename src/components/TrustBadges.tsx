import { LockKeyhole, PackageCheck, ShieldCheck, Tag, TruckIcon } from "lucide-react";

const TrustBadges = () => {

  return (
    <div className="grid gap-2 rounded-xl bg-white p-4 shadow-sm md:grid-cols-5" aria-label="Trust Badges">
      <div className="flex flex-row items-center justify-center rounded-md border border-slate-200 bg-slate-50 py-2 gap-2 text-base font-semibold">
        <div className="bg-brandYellow/5 p-3 rounded-full mb-1">
          <TruckIcon className="text-brandYellow" />
        </div>
        <p>Free Delivery</p>
      </div>
      <div className="flex flex-row items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-base font-semibold">
        <div className="bg-brandYellow/5 p-3 rounded-full mb-1">
          <ShieldCheck className="text-brandYellow" />
        </div>
        <p>1 Year Warranty</p>
      </div>
      <div className="flex flex-row items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-base font-semibold">
        <div className="bg-brandYellow/5 p-3 rounded-full mb-1">
          <PackageCheck className="text-brandYellow" />
        </div>
        <p>Easy Returns</p>
      </div>
      <div className="flex flex-row items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-base font-semibold">
        <div className="bg-brandYellow/5 p-3 rounded-full mb-1">
          <LockKeyhole className="text-brandYellow" />
        </div>
        <p>Secure Payment</p>
      </div>
      <div className="flex flex-row items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-base font-semibold">
        <div className="bg-brandYellow/5 p-3 rounded-full mb-1">
          <Tag className="text-brandYellow" />
        </div>
        <p>Best Brands</p>
      </div>
    </div>
  );
}

export default TrustBadges;
