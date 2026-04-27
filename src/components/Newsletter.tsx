export interface NewsletterProps {
  heading: string;
  subtext: string;
  incentive: string;
  buttonText: string;
}

function Newsletter(props: NewsletterProps): JSX.Element {
  return (
    <section className="rounded-xl bg-slate-900 p-6 text-white" aria-label="Newsletter">
      <h2 className="text-2xl font-bold">{props.heading}</h2>
      <p className="mt-2 text-white/90">{props.subtext}</p>
      <p className="mt-2 font-semibold text-brandYellow">{props.incentive}</p>
      <form className="mt-5 flex flex-col gap-3 md:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email Address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Enter your email"
          className="min-h-11 flex-1 rounded-md border border-slate-400 bg-white px-3 text-slate-900 outline-none focus:border-brandYellow"
        />
        <button
          type="submit"
          className="min-h-11 rounded-md bg-brandYellow px-5 font-semibold text-black transition hover:bg-yellow-300"
        >
          {props.buttonText}
        </button>
      </form>
    </section>
  );
}

export default Newsletter;
