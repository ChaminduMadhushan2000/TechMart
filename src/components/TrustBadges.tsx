import { LockKeyhole, PackageCheck, ShieldCheck, Tag, TruckIcon } from "lucide-react";

interface TrustBadgesProps {
  badge1Text?: string;
  badge2Text?: string;
  badge3Text?: string;
  badge4Text?: string;
  badge5Text?: string;
}

const TrustBadges = ({
  badge1Text = "Free Delivery",
  badge2Text = "1 Year Warranty",
  badge3Text = "Easy Returns",
  badge4Text = "Secure Payment",
  badge5Text = "Best Brands",
}: TrustBadgesProps) => {

  return (
    <div className="grid gap-2 rounded-xl bg-white p-4 shadow-sm md:grid-cols-5" aria-label="Trust Badges">
      <div className="flex flex-row items-center justify-center rounded-md border border-slate-200 bg-slate-50 py-2 gap-2 text-base font-semibold">
        <div className="bg-brandYellow/5 p-3 rounded-full mb-1">
          <TruckIcon className="text-brandYellow" />
        </div>
        <p>{badge1Text}</p>
      </div>
      <div className="flex flex-row items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-base font-semibold">
        <div className="bg-brandYellow/5 p-3 rounded-full mb-1">
          <ShieldCheck className="text-brandYellow" />
        </div>
        <p>{badge2Text}</p>
      </div>
      <div className="flex flex-row items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-base font-semibold">
        <div className="bg-brandYellow/5 p-3 rounded-full mb-1">
          <PackageCheck className="text-brandYellow" />
        </div>
        <p>{badge3Text}</p>
      </div>
      <div className="flex flex-row items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-base font-semibold">
        <div className="bg-brandYellow/5 p-3 rounded-full mb-1">
          <LockKeyhole className="text-brandYellow" />
        </div>
        <p>{badge4Text}</p>
      </div>
      <div className="flex flex-row items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-base font-semibold">
        <div className="bg-brandYellow/5 p-3 rounded-full mb-1">
          <Tag className="text-brandYellow" />
        </div>
        <p>{badge5Text}</p>
      </div>
    </div>
  );
}

export default TrustBadges;
