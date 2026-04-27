export interface HeroBannerProps {
  heading: string;
  subheading: string;
  buttonText: string;
  buttonLink: string;
  backgroundImageURL: string;
  overlayColor: string;
}

function HeroBanner(props: HeroBannerProps): JSX.Element {
  const { heading, subheading, buttonText, buttonLink, backgroundImageURL, overlayColor } =
    props;
  const overlayClassName: string =
    overlayColor === "#000000" ? "bg-black/45" : "bg-slate-900/45";

  return (
    <section className="relative overflow-hidden rounded-xl" aria-label="Hero Banner">
      <img
        src={backgroundImageURL}
        alt="Featured electronics deals"
        width={1400}
        height={520}
        loading="eager"
        fetchPriority="high"
        className="h-[360px] w-full object-cover md:h-[460px]"
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="absolute inset-0 flex items-center px-6 md:px-12">
        <div className="max-w-lg text-white">
          <p className="mb-3 text-sm uppercase tracking-widest text-brandYellow">Top Offers</p>
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">{heading}</h1>
          <p className="mb-6 text-base text-white/90 md:text-lg">{subheading}</p>
          <a
            href={buttonLink}
            className="inline-flex min-h-11 items-center rounded-md bg-brandYellow px-6 py-2 font-semibold text-black transition hover:bg-yellow-300"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
