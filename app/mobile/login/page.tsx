"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dice5, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("alex.rivera@email.com");
  const [password, setPassword] = useState("demo1234");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/mobile/dashboard");
  };

  return (
    <div className="flex min-h-full flex-col px-6 pb-8 pt-12">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green shadow-lg shadow-brand-green/30">
          <Dice5 className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold">
          Welcome to iBet-Cha<span className="text-brand-green">!</span>
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Challenge friends. Settle scores. Win cash.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-400">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-brand-dark-card py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-green"
              placeholder="you@email.com"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-400">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-brand-dark-card py-3 pl-10 pr-10 text-sm outline-none focus:border-brand-green"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="text-right">
          <Link
            href="/mobile/forgot-password"
            className="text-xs text-brand-blue hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Sign In
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-slate-500">or continue with</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {["Google", "Facebook", "Apple"].map((provider) => (
          <button
            key={provider}
            type="button"
            onClick={() => router.push("/mobile/dashboard")}
            className="rounded-xl border border-white/10 bg-brand-dark-card py-3 text-xs font-medium text-slate-300 hover:bg-white/5 transition"
          >
            {provider}
          </button>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-slate-400">
        Don&apos;t have an account?{" "}
        <Link href="/mobile/register" className="font-semibold text-brand-green">
          Create Account
        </Link>
      </p>

      <p className="mt-4 text-center text-[10px] text-slate-600">
        Demo mode — any credentials work. Pre-filled for convenience.
      </p>
    </div>
  );
}
