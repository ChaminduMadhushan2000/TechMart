import { Send } from "lucide-react";

interface NewsletterProps {
  heading?: string;
  subtext?: string;
  incentive?: string;
  buttonText?: string;
}

const Newsletter = ({
  heading = "Stay in the Loop",
  subtext = "Get exclusive deals, new arrivals and tech tips delivered to your inbox.",
  incentive = "Get a 10% discount on your first order!",
  buttonText = "Send",
}: NewsletterProps) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 p-8 text-white md:p-12" aria-label="Newsletter">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brandYellow/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-black md:text-4xl">{heading}</h2>
        <p className="mt-4 text-lg text-slate-400">{subtext}</p>
        <p className="mt-2 font-bold text-brandYellow">{incentive}</p>

        <form className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email Address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Enter your email address"
            className="h-14 flex-1 rounded-xl border border-slate-700 bg-slate-800/50 px-6 text-white outline-none ring-brandYellow transition-all focus:ring-2"
          />
          <button
            type="submit"
            className="group flex h-14 items-center justify-center gap-2 rounded-xl bg-brandYellow px-8 font-black text-slate-900 transition-all hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20"
          >
            <Send size={16} />
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
