"use client";

import Link from "next/link";
import {
  PlusCircle,
  Wallet,
  Trophy,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import {
  currentUser,
  getUserWagers,
  statusColors,
  statusLabels,
} from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const userWagers = getUserWagers(currentUser.id);
  const activeWagers = userWagers.filter(
    (w) =>
      w.status === "active" ||
      w.status === "pending" ||
      w.status === "awaiting_verification"
  );
  const recentWins = userWagers.filter(
    (w) => w.status === "settled" && w.winnerId === currentUser.id
  );

  return (
    <div className="px-5 pb-6 pt-4">
      {/* Greeting */}
      <div className="mb-5">
        <p className="text-xs text-slate-400">Welcome back,</p>
        <h1 className="text-xl font-bold">{currentUser.name.split(" ")[0]} 👋</h1>
      </div>

      {/* Wallet card */}
      <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-green to-brand-green-dark p-5 shadow-lg shadow-brand-green/20">
        <p className="mb-1 text-xs font-medium text-white/80">Wallet Balance</p>
        <p className="mb-4 text-3xl font-extrabold text-white">
          {formatCurrency(currentUser.balance)}
        </p>
        <div className="flex gap-2">
          <Link href="/mobile/wallet" className="flex-1">
            <button className="w-full rounded-xl bg-white/20 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-white/30 transition">
              Deposit
            </button>
          </Link>
          <Link href="/mobile/wallet" className="flex-1">
            <button className="w-full rounded-xl bg-white/20 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-white/30 transition">
              Withdraw
            </button>
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <Link
          href="/mobile/wager/create"
          className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-brand-dark-card p-3 hover:border-brand-green/30 transition"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/15">
            <PlusCircle className="h-5 w-5 text-brand-green" />
          </div>
          <span className="text-[10px] font-medium text-slate-300">Place a Bet</span>
        </Link>
        <Link
          href="/mobile/wallet"
          className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-brand-dark-card p-3 hover:border-brand-blue/30 transition"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/15">
            <Wallet className="h-5 w-5 text-brand-blue" />
          </div>
          <span className="text-[10px] font-medium text-slate-300">Wallet</span>
        </Link>
        <Link
          href="/mobile/profile"
          className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-brand-dark-card p-3 hover:border-yellow-500/30 transition"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/15">
            <Trophy className="h-5 w-5 text-yellow-400" />
          </div>
          <span className="text-[10px] font-medium text-slate-300">Badges</span>
        </Link>
      </div>

      {/* Stats row */}
      <div className="mb-6 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-brand-dark-card p-3 text-center">
          <p className="text-lg font-bold text-brand-green">{currentUser.wins}</p>
          <p className="text-[10px] text-slate-500">Wins</p>
        </div>
        <div className="rounded-xl bg-brand-dark-card p-3 text-center">
          <p className="text-lg font-bold text-red-400">{currentUser.losses}</p>
          <p className="text-[10px] text-slate-500">Losses</p>
        </div>
        <div className="rounded-xl bg-brand-dark-card p-3 text-center">
          <p className="text-lg font-bold text-brand-blue">
            {currentUser.winStreak}
          </p>
          <p className="text-[10px] text-slate-500">Streak</p>
        </div>
      </div>

      {/* Active wagers */}
      <div className="mb-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold">Active Wagers</h2>
          <span className="text-xs text-slate-500">{activeWagers.length} open</span>
        </div>
        <div className="space-y-2.5">
          {activeWagers.map((w) => (
            <Link
              key={w.id}
              href={`/mobile/wager/${w.id}`}
              className="block rounded-xl border border-white/5 bg-brand-dark-card p-3.5 hover:border-white/10 transition"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <p className="text-xs font-medium leading-snug text-slate-200 line-clamp-2">
                  {w.statement}
                </p>
                <StatusBadge
                  label={statusLabels[w.status]}
                  className={statusColors[w.status]}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>
                  Pot:{" "}
                  <span className="font-semibold text-brand-green">
                    {formatCurrency(w.potTotal)}
                  </span>
                </span>
                <span className="flex items-center gap-0.5">
                  View <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
          {activeWagers.length === 0 && (
            <p className="py-6 text-center text-xs text-slate-500">
              No active wagers. Place your first bet!
            </p>
          )}
        </div>
      </div>

      {/* Recent wins */}
      {recentWins.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-brand-green" />
            <h2 className="text-sm font-bold">Recent Wins</h2>
          </div>
          <div className="space-y-2">
            {recentWins.slice(0, 2).map((w) => (
              <div
                key={w.id}
                className="flex items-center justify-between rounded-xl bg-brand-green/10 border border-brand-green/20 px-3.5 py-3"
              >
                <p className="text-xs text-slate-300 line-clamp-1 flex-1 mr-2">
                  {w.statement}
                </p>
                <span className="text-xs font-bold text-brand-green">
                  +{formatCurrency(w.potTotal * 0.9)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <Link href="/mobile/wager/create">
          <Button className="w-full" size="lg">
            <PlusCircle className="h-5 w-5" />
            Place a New Bet
          </Button>
        </Link>
      </div>
    </div>
  );
}
