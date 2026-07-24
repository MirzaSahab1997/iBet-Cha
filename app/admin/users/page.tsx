"use client";

import { useState } from "react";
import { Search, MoreHorizontal } from "lucide-react";
import { users, type UserStatus } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

const statusStyle: Record<UserStatus, string> = {
  active: "bg-brand-green/20 text-brand-green border-brand-green/30",
  suspended: "bg-red-500/20 text-red-400 border-red-500/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<UserStatus | "all">("all");
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [menuId, setMenuId] = useState<string | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || u.status === filter;
    return matchSearch && matchFilter;
  });

  const doAction = (msg: string) => {
    setActionMsg(msg);
    setMenuId(null);
    setTimeout(() => setActionMsg(null), 2500);
  };

  return (
    <div className="min-w-0">
      <h1 className="mb-1 text-xl font-bold sm:text-2xl">User Management</h1>
      <p className="mb-6 text-sm text-slate-400">
        View, suspend, verify, and manage platform users
      </p>

      {actionMsg && (
        <div className="mb-4 rounded-xl border border-brand-green/30 bg-brand-green/10 px-4 py-3 text-sm text-brand-green">
          {actionMsg}
        </div>
      )}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full rounded-xl border border-white/10 bg-brand-dark-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-green"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "active", "pending", "suspended"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition",
                filter === f
                  ? "bg-brand-green/20 text-brand-green"
                  : "bg-brand-dark-card text-slate-400 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-brand-dark-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs text-slate-500">
                <th className="px-4 py-3 font-medium sm:px-5">User</th>
                <th className="px-4 py-3 font-medium sm:px-5">Status</th>
                <th className="px-4 py-3 font-medium sm:px-5">Balance</th>
                <th className="px-4 py-3 font-medium sm:px-5">W/L</th>
                <th className="px-4 py-3 font-medium sm:px-5">Joined</th>
                <th className="px-4 py-3 font-medium sm:px-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark-muted text-xs font-bold">
                        {u.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge
                      label={u.status}
                      className={cn("capitalize", statusStyle[u.status])}
                    />
                  </td>
                  <td className="px-5 py-3.5 font-medium text-brand-green">
                    {formatCurrency(u.balance)}
                  </td>
                  <td className="px-5 py-3.5 text-slate-300">
                    {u.wins}/{u.losses}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">
                    {formatDate(u.joinedAt)}
                  </td>
                  <td className="relative px-5 py-3.5">
                    <button
                      onClick={() =>
                        setMenuId(menuId === u.id ? null : u.id)
                      }
                      className="rounded-lg p-1.5 hover:bg-white/5"
                    >
                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
                    </button>
                    {menuId === u.id && (
                      <div className="absolute right-5 top-12 z-10 w-40 rounded-xl border border-white/10 bg-brand-dark-card py-1 shadow-xl">
                        <button
                          className="block w-full px-4 py-2 text-left text-xs hover:bg-white/5"
                          onClick={() =>
                            doAction(`Viewed profile: ${u.name}`)
                          }
                        >
                          View
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-xs hover:bg-white/5"
                          onClick={() =>
                            doAction(
                              u.verified
                                ? `${u.name} already verified`
                                : `Verified ${u.name}`
                            )
                          }
                        >
                          Verify
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-xs text-yellow-400 hover:bg-white/5"
                          onClick={() =>
                            doAction(
                              u.status === "suspended"
                                ? `Reactivated ${u.name}`
                                : `Suspended ${u.name}`
                            )
                          }
                        >
                          {u.status === "suspended" ? "Reactivate" : "Suspend"}
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-xs text-red-400 hover:bg-white/5"
                          onClick={() =>
                            doAction(`Password reset sent to ${u.email}`)
                          }
                        >
                          Reset Password
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-600">
        Showing {filtered.length} of {users.length} users
      </p>
    </div>
  );
}
