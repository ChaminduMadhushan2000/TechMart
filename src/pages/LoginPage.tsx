import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginCustomer } from "../api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginCustomer({ email, password });
      navigate("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-md px-6 py-12">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">Sign in to manage your orders.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm"
          />
          {error ? <p className="text-xs text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-brandYellow text-sm font-black text-slate-900 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          New here? <Link to="/register" className="font-semibold text-brandPrimary">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
