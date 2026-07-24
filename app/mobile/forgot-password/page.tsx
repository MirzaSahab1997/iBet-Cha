"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex min-h-full flex-col px-6 pb-8 pt-12">
      <Link
        href="/mobile/login"
        className="mb-8 flex items-center gap-1 text-sm text-slate-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Sign In
      </Link>

      {sent ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/20">
            <CheckCircle2 className="h-8 w-8 text-brand-green" />
          </div>
          <h1 className="mb-2 text-xl font-bold">Check Your Email</h1>
          <p className="mb-6 text-sm text-slate-400">
            We sent a password reset link to{" "}
            <span className="text-white">{email}</span>
          </p>
          <p className="mb-8 text-xs text-slate-500">
            (Demo only — no email was actually sent)
          </p>
          <Link href="/mobile/login">
            <Button>Back to Sign In</Button>
          </Link>
        </div>
      ) : (
        <>
          <h1 className="mb-2 text-xl font-bold">Reset Password</h1>
          <p className="mb-8 text-sm text-slate-400">
            Enter your email and we&apos;ll send you a reset link.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-slate-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-brand-dark-card py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-green"
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Send Reset Link
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
