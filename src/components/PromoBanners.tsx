export interface PromoBannersProps {
  banner1Text: string;
  banner1Link: string;
  banner1Image: string;
}

function PromoBanners(props: PromoBannersProps): JSX.Element {
  return (
    <section aria-label="Promo Banner">
      <a href={props.banner1Link} className="relative block overflow-hidden rounded-xl">
        <img
          src={props.banner1Image}
          alt={props.banner1Text}
          width={1400}
          height={240}
          loading="lazy"
          className="h-44 w-full object-cover md:h-52"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="absolute inset-0 flex items-center px-6">
          <p className="text-2xl font-bold text-white md:text-3xl">{props.banner1Text}</p>
        </div>
      </a>
    </section>
  );
}

export default PromoBanners;
