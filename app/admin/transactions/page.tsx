"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import {
  transactions,
  type TransactionType,
} from "@/lib/mock-data";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const typeFilters: (TransactionType | "all")[] = [
  "all",
  "deposit",
  "withdrawal",
  "winnings",
  "fee",
  "pot_lock",
  "referral_bonus",
];

const typeColors: Record<TransactionType, string> = {
  deposit: "text-brand-green",
  withdrawal: "text-red-400",
  winnings: "text-yellow-400",
  fee: "text-slate-400",
  pot_lock: "text-brand-blue",
  referral_bonus: "text-purple-400",
};

export default function AdminTransactionsPage() {
  const [filter, setFilter] = useState<TransactionType | "all">("all");
  const [exported, setExported] = useState(false);

  const filtered =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold">Transaction Monitoring</h1>
          <p className="text-sm text-slate-400">
            Financial ledger — deposits, withdrawals, payouts & fees
          </p>
        </div>
        <Button variant="secondary" onClick={handleExport}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {exported && (
        <div className="mb-4 rounded-xl border border-brand-green/30 bg-brand-green/10 px-4 py-3 text-sm text-brand-green">
          CSV export simulated — file would download in production.
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {typeFilters.map((f) => (
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
            {f === "pot_lock"
              ? "Pot Lock"
              : f === "referral_bonus"
                ? "Referral"
                : f}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-brand-dark-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs text-slate-500">
                <th className="px-5 py-3 font-medium">ID</th>
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Description</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-500">
                    {t.id}
                  </td>
                  <td className="px-5 py-3.5">{t.userName}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "text-xs font-semibold capitalize",
                        typeColors[t.type]
                      )}
                    >
                      {t.type.replace("_", " ")}
                    </span>
                  </td>
                  <td className="max-w-xs truncate px-5 py-3.5 text-slate-400">
                    {t.description}
                  </td>
                  <td
                    className={cn(
                      "px-5 py-3.5 font-bold",
                      t.amount >= 0 ? "text-brand-green" : "text-slate-300"
                    )}
                  >
                    {t.amount >= 0 ? "+" : ""}
                    {formatCurrency(t.amount)}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge
                      label={t.status}
                      className={cn(
                        "capitalize",
                        t.status === "completed" &&
                          "bg-brand-green/20 text-brand-green border-brand-green/30",
                        t.status === "pending" &&
                          "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                        t.status === "failed" &&
                          "bg-red-500/20 text-red-400 border-red-500/30"
                      )}
                    />
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">
                    {formatDateTime(t.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-600">
        Showing {filtered.length} of {transactions.length} transactions
      </p>
    </div>
  );
}
