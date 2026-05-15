import { ChevronRight } from "lucide-react";

interface HeroBannerProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImageURL?: string;
  overlayColor?: string;
}

const HeroBanner = ({
  heading = "Experience the Future of Tech",
  subheading = "Upgrade your lifestyle with our exclusive collection of high-performance electronics.",
  buttonText = "Shop Now",
  buttonLink = "/products",
  backgroundImageURL = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  overlayColor = "#0f172a",
}: HeroBannerProps) => {
  return (
    <section className="relative overflow-hidden bg-slate-900" aria-label="Hero Banner">
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImageURL}
          alt={heading}
          className="h-full w-full object-cover opacity-60 transition-transform duration-[10s] hover:scale-110"
          loading="eager"
        />
      </div>

      <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: overlayColor, opacity: 0.7 }}
      />

      <div className="relative z-20 flex min-h-[400px] items-center px-8 md:min-h-[520px] md:px-20">
        <div className="max-w-2xl text-white">
          {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brandYellow/10 px-4 py-1 text-sm font-bold tracking-widest text-brandYellow ring-1 ring-brandYellow/30">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brandYellow opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brandYellow"></span>
            </span>
            LIMITED TIME OFFERS
          </div> */}

          <h1 className="mb-6 text-4xl font-black leading-tight md:text-7xl">
            {heading}
          </h1>

          <p className="mb-10 max-w-lg text-lg text-slate-300 md:text-xl">{subheading}</p>

          <div className="flex flex-wrap gap-4">
            <a
              href={buttonLink}
              className="group flex h-14 items-center justify-center gap-2 rounded-xl bg-brandYellow px-8 font-bold text-slate-900 text-lg transition-all hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20"
            >
              {buttonText}
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brandYellow via-transparent to-transparent opacity-50" />
    </section>
  );
};

export default HeroBanner;
