"use client";

import { useState } from "react";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import {
  wagers,
  statusColors,
  statusLabels,
  type WagerStatus,
} from "@/lib/mock-data";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

const filters: (WagerStatus | "all")[] = [
  "all",
  "pending",
  "active",
  "awaiting_verification",
  "settled",
  "disputed",
  "rejected",
];

export default function AdminWagersPage() {
  const [filter, setFilter] = useState<WagerStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    filter === "all" ? wagers : wagers.filter((w) => w.status === filter);

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Wager Monitoring</h1>
      <p className="mb-6 text-sm text-slate-400">
        Track all wagers, pots, outcomes, and disputes
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
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
            {f === "awaiting_verification" ? "Awaiting Verif." : f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((w) => {
          const isOpen = expanded === w.id;
          return (
            <div
              key={w.id}
              className="overflow-hidden rounded-2xl border border-white/5 bg-brand-dark-card"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : w.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02]"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <StatusBadge
                      label={statusLabels[w.status]}
                      className={statusColors[w.status]}
                    />
                    {w.disputed && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-red-400">
                        <AlertTriangle className="h-3 w-3" />
                        Dispute
                      </span>
                    )}
                    <span className="text-[10px] capitalize text-slate-500">
                      {w.type} · {w.category.replace("_", " ")}
                    </span>
                  </div>
                  <p className="truncate text-sm font-medium text-slate-200">
                    {w.statement}
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="font-bold text-brand-green">
                    {formatCurrency(w.potTotal)}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {formatDateTime(w.createdAt)}
                  </p>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-slate-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                )}
              </button>

              {isOpen && (
                <div className="border-t border-white/5 bg-brand-dark/50 px-5 py-4">
                  <div className="mb-4 grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-[10px] text-slate-500">Challenger</p>
                      <p className="text-sm">{w.challengerName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Stake each</p>
                      <p className="text-sm">{formatCurrency(w.amount)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Winner</p>
                      <p className="text-sm">
                        {w.winnerName ?? "—"}
                      </p>
                    </div>
                  </div>
                  <p className="mb-2 text-xs font-semibold text-slate-400">
                    Participants
                  </p>
                  <div className="space-y-1.5">
                    {w.participants.map((p) => (
                      <div
                        key={p.userId}
                        className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs"
                      >
                        <span>
                          {p.name}{" "}
                          <span className="capitalize text-slate-500">
                            ({p.side})
                          </span>
                        </span>
                        <span>
                          {formatCurrency(p.amount)} ·{" "}
                          {p.confirmed ? (
                            <span className="text-brand-green">Confirmed</span>
                          ) : (
                            <span className="text-yellow-400">Pending</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                  {w.status === "settled" && (
                    <p className="mt-3 text-xs text-slate-500">
                      Payout: {formatCurrency(w.potTotal * 0.9)} to winner ·
                      Fee: {formatCurrency(w.potTotal * 0.1)}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-slate-600">
        Showing {filtered.length} of {wagers.length} wagers
      </p>
    </div>
  );
}
