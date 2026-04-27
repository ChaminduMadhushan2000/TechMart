export interface DealBannersProps {
  deal1Title: string;
  deal1Link: string;
  deal2Title: string;
  deal2Link: string;
}

function DealBanners(props: DealBannersProps): JSX.Element {
  return (
    <section className="grid gap-4 md:grid-cols-2" aria-label="Deal Banners">
      <a
        href={props.deal1Link}
        className="flex min-h-44 items-end rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 p-5 text-white"
      >
        <div>
          <p className="text-xs uppercase tracking-wider text-brandYellow">Hot Deal</p>
          <h3 className="text-2xl font-bold">{props.deal1Title}</h3>
        </div>
      </a>
      <a
        href={props.deal2Link}
        className="flex min-h-44 items-end rounded-xl bg-gradient-to-r from-yellow-400 to-amber-300 p-5 text-black"
      >
        <div>
          <p className="text-xs uppercase tracking-wider">Latest Collection</p>
          <h3 className="text-2xl font-bold">{props.deal2Title}</h3>
        </div>
      </a>
    </section>
  );
}

export default DealBanners;
