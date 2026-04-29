const PromoBanners = () => {
  return (
    <section aria-label="Promo Banner" className="group">
      <a href="/sale" className="relative block h-[200px] overflow-hidden rounded-2xl md:h-[260px]">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80"
          alt="Weekend Sale — 20% Off"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
          <span className="mb-2 inline-block w-fit rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
            Limited Time Offer
          </span>
          <h2 className="max-w-md text-3xl font-black text-white md:text-5xl">
            Weekend Sale <br /> <span className="text-brandYellow">20% Off</span>
          </h2>
          <button className="mt-6 w-fit rounded-full bg-white px-8 py-3 text-sm font-bold text-slate-900 transition-all hover:bg-brandYellow">
            Shop the Sale
          </button>
        </div>
      </a>
    </section>
  );
};

export default PromoBanners;
