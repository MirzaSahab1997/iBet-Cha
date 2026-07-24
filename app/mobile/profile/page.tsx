"use client";

import { useState } from "react";
import { Copy, Share2, Check, LogOut } from "lucide-react";
import Link from "next/link";
import { currentUser, getUserBadges, badges } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const userBadges = getUserBadges(currentUser);
  const [copied, setCopied] = useState(false);
  const winRate = Math.round(
    (currentUser.wins / (currentUser.wins + currentUser.losses)) * 100
  );

  const copyCode = () => {
    navigator.clipboard?.writeText(currentUser.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-5 pb-6 pt-4">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-blue text-2xl font-bold text-white shadow-lg">
          {currentUser.avatar}
        </div>
        <h1 className="text-xl font-bold">{currentUser.name}</h1>
        <p className="text-xs text-slate-400">{currentUser.email}</p>
        <p className="mt-1 text-[10px] text-slate-500">
          Member since {formatDate(currentUser.joinedAt)}
          {currentUser.verified && (
            <span className="ml-2 text-brand-green">✓ Verified</span>
          )}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-2">
        {[
          { label: "Wins", value: currentUser.wins, color: "text-brand-green" },
          { label: "Losses", value: currentUser.losses, color: "text-red-400" },
          {
            label: "Streak",
            value: currentUser.winStreak,
            color: "text-brand-blue",
          },
          { label: "Win %", value: `${winRate}%`, color: "text-yellow-400" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-brand-dark-card p-3 text-center"
          >
            <p className={cn("text-lg font-bold", s.color)}>{s.value}</p>
            <p className="text-[10px] text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 flex items-center justify-between rounded-xl border border-brand-green/20 bg-brand-green/10 px-4 py-3">
        <span className="text-xs text-slate-300">Wallet</span>
        <span className="font-bold text-brand-green">
          {formatCurrency(currentUser.balance)}
        </span>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-sm font-bold">Achievement Badges</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {badges.map((badge) => {
            const earned = userBadges.some((b) => b.id === badge.id);
            return (
              <div
                key={badge.id}
                className={cn(
                  "rounded-xl border p-3.5 transition",
                  earned
                    ? "border-white/10 bg-brand-dark-card"
                    : "border-white/5 bg-brand-dark opacity-40"
                )}
              >
                <span className="mb-1 block text-2xl">{badge.icon}</span>
                <p className="text-xs font-bold" style={{ color: badge.color }}>
                  {badge.name}
                </p>
                <p className="mt-0.5 text-[10px] text-slate-500">
                  {badge.description}
                </p>
                {!earned && (
                  <p className="mt-1 text-[9px] text-slate-600">
                    Locked · {badge.requirement}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        {currentUser.winStreak < 10 && (
          <p className="mt-3 text-center text-[10px] text-slate-500">
            {10 - currentUser.winStreak} more wins in a row for Golden I Know It
            All + $10 bonus!
          </p>
        )}
      </div>

      <div className="mb-6 rounded-2xl border border-brand-blue/30 bg-gradient-to-br from-brand-blue/10 to-purple-500/10 p-4">
        <h2 className="mb-1 text-sm font-bold">Invite Friends</h2>
        <p className="mb-3 text-[10px] text-slate-400">
          Share your code — you both get bonus credits when they deposit.
        </p>
        <div className="mb-3 flex items-center gap-2">
          <div className="flex-1 rounded-xl border border-white/10 bg-brand-dark px-4 py-2.5 text-center font-mono text-sm font-bold tracking-widest text-brand-blue">
            {currentUser.referralCode}
          </div>
          <button
            onClick={copyCode}
            className="rounded-xl border border-white/10 bg-brand-dark p-2.5 text-slate-300 hover:text-white transition"
          >
            {copied ? (
              <Check className="h-4 w-4 text-brand-green" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>{currentUser.referralsCount} friends joined</span>
          <button className="flex items-center gap-1 text-brand-blue">
            <Share2 className="h-3 w-3" />
            Share link
          </button>
        </div>
      </div>

      <Link href="/mobile/login">
        <Button variant="ghost" className="w-full text-slate-400">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </Link>
    </div>
  );
}
