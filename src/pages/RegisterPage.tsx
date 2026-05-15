import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerCustomer } from "../api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await registerCustomer(form);
      navigate("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-md px-6 py-12">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900">Create your account</h1>
        <p className="mt-2 text-sm text-slate-500">Track orders and save your details.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm"
          />
          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(event) => handleChange("password", event.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm"
          />
          {error ? <p className="text-xs text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-brandYellow text-sm font-black text-slate-900 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Already have an account? <Link to="/login" className="font-semibold text-brandPrimary">Sign in</Link>
        </p>
      </div>
    </section>
  );
}
