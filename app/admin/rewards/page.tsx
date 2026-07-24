"use client";

import { useState } from "react";
import { Plus, Gift } from "lucide-react";
import { badges, users } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export default function AdminRewardsPage() {
  const [msg, setMsg] = useState<string | null>(null);
  const [showPromo, setShowPromo] = useState(false);
  const [promoName, setPromoName] = useState("");
  const [promoAmount, setPromoAmount] = useState(10);
  const [assignBadge, setAssignBadge] = useState(badges[0].id);
  const [assignUser, setAssignUser] = useState(users[0].id);

  const notify = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(null), 2500);
  };

  return (
    <div className="min-w-0">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-xl font-bold sm:text-2xl">
            Rewards Administration
          </h1>
          <p className="text-sm text-slate-400">
            Manage badges, assign achievements, create promotions
          </p>
        </div>
        <Button
          onClick={() => setShowPromo(!showPromo)}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Create Promotion
        </Button>
      </div>

      {msg && (
        <div className="mb-4 rounded-xl border border-brand-green/30 bg-brand-green/10 px-4 py-3 text-sm text-brand-green">
          {msg}
        </div>
      )}

      {showPromo && (
        <div className="mb-6 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold">
            <Gift className="h-4 w-4 text-brand-blue" />
            New Promotional Reward
          </h2>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-slate-400">
                Promotion name
              </label>
              <input
                value={promoName}
                onChange={(e) => setPromoName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-brand-dark-card px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
                placeholder="e.g. Summer Challenge Bonus"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-400">
                Bonus amount ($)
              </label>
              <input
                type="number"
                value={promoAmount}
                onChange={(e) => setPromoAmount(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-brand-dark-card px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                notify(
                  `Promotion "${promoName || "Untitled"}" created (+$${promoAmount})`
                );
                setShowPromo(false);
                setPromoName("");
              }}
            >
              Save Promotion
            </Button>
            <Button variant="ghost" onClick={() => setShowPromo(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Badge catalog */}
      <h2 className="mb-4 text-sm font-bold">Badge Catalog</h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {badges.map((badge) => {
          const holders = users.filter((u) =>
            u.badgeIds.includes(badge.id)
          ).length;
          return (
            <div
              key={badge.id}
              className="rounded-2xl border border-white/5 bg-brand-dark-card p-5"
            >
              <span className="mb-2 block text-3xl">{badge.icon}</span>
              <p className="font-bold" style={{ color: badge.color }}>
                {badge.name}
              </p>
              <p className="mt-1 text-xs text-slate-400">{badge.description}</p>
              <p className="mt-2 text-[10px] text-slate-500">
                Requirement: {badge.requirement}
              </p>
              <p className="mt-3 text-xs text-slate-400">
                <span className="font-semibold text-white">{holders}</span> users
                hold this badge
              </p>
            </div>
          );
        })}
      </div>

      {/* Assign / revoke */}
      <div className="rounded-2xl border border-white/5 bg-brand-dark-card p-5">
        <h2 className="mb-4 text-sm font-bold">Assign / Revoke Badge</h2>
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-slate-400">User</label>
            <select
              value={assignUser}
              onChange={(e) => setAssignUser(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-brand-dark px-4 py-2.5 text-sm outline-none focus:border-brand-green"
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">Badge</label>
            <select
              value={assignBadge}
              onChange={(e) => setAssignBadge(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-brand-dark px-4 py-2.5 text-sm outline-none focus:border-brand-green"
            >
              {badges.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.icon} {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={() => {
              const user = users.find((u) => u.id === assignUser);
              const badge = badges.find((b) => b.id === assignBadge);
              notify(`Assigned "${badge?.name}" to ${user?.name}`);
            }}
            className="w-full sm:w-auto"
          >
            Assign Badge
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              const user = users.find((u) => u.id === assignUser);
              const badge = badges.find((b) => b.id === assignBadge);
              notify(`Revoked "${badge?.name}" from ${user?.name}`);
            }}
            className="w-full sm:w-auto"
          >
            Revoke Badge
          </Button>
        </div>
      </div>

      {/* Referral summary */}
      <div className="mt-6 rounded-2xl border border-white/5 bg-brand-dark-card p-5">
        <h2 className="mb-3 text-sm font-bold">Referral Program Summary</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-2xl font-bold text-brand-blue">
              {users.reduce((s, u) => s + u.referralsCount, 0)}
            </p>
            <p className="text-xs text-slate-400">Total referrals</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-2xl font-bold text-brand-green">$10</p>
            <p className="text-xs text-slate-400">Bonus per successful referral</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-2xl font-bold text-yellow-400">
              {users.filter((u) => u.badgeIds.includes("b4")).length}
            </p>
            <p className="text-xs text-slate-400">
              Golden I Know It All holders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
