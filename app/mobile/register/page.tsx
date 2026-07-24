"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dice5, Mail, Lock, User, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ageConfirmed) return;
    router.push("/mobile/dashboard");
  };

  return (
    <div className="flex min-h-full flex-col px-6 pb-8 pt-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green">
          <Dice5 className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold">Create Account</h1>
        <p className="mt-1 text-xs text-slate-400">
          Join iBet-Cha! — must be 18 or over
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="mb-1 block text-xs text-slate-400">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-brand-dark-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-green"
              placeholder="Alex Rivera"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-400">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-brand-dark-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-green"
              placeholder="you@email.com"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-400">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-brand-dark-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-green"
              placeholder="+1 (416) 555-0000"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-400">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-brand-dark-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-green"
              placeholder="Min. 8 characters"
            />
          </div>
        </div>

        {/* Age gate */}
        <button
          type="button"
          onClick={() => setAgeConfirmed(!ageConfirmed)}
          className="flex w-full items-start gap-3 rounded-xl border border-white/10 bg-brand-dark-card p-3 text-left"
        >
          <div
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
              ageConfirmed
                ? "border-brand-green bg-brand-green"
                : "border-slate-500"
            }`}
          >
            {ageConfirmed && <Check className="h-3 w-3 text-white" />}
          </div>
          <span className="text-xs text-slate-300">
            I confirm that I am <strong className="text-white">18 years of age or older</strong> and
            agree to the Terms of Service and Privacy Policy.
          </span>
        </button>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={!ageConfirmed}
        >
          Create Account
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-slate-500">or sign up with</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {["Google", "Facebook", "Apple"].map((provider) => (
          <button
            key={provider}
            type="button"
            onClick={() => {
              if (ageConfirmed) router.push("/mobile/dashboard");
            }}
            className="rounded-xl border border-white/10 bg-brand-dark-card py-2.5 text-xs font-medium text-slate-300 hover:bg-white/5 transition"
          >
            {provider}
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link href="/mobile/login" className="font-semibold text-brand-green">
          Sign In
        </Link>
      </p>
    </div>
  );
}
