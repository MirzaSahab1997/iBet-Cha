"use client";

import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Star,
  Percent,
  Lock,
  Gift,
  X,
  CreditCard,
} from "lucide-react";
import {
  currentUser,
  getUserTransactions,
  type TransactionType,
} from "@/lib/mock-data";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const typeIcons: Record<TransactionType, React.ReactNode> = {
  deposit: <ArrowDownLeft className="h-4 w-4 text-brand-green" />,
  withdrawal: <ArrowUpRight className="h-4 w-4 text-red-400" />,
  winnings: <Star className="h-4 w-4 text-yellow-400" />,
  fee: <Percent className="h-4 w-4 text-slate-400" />,
  pot_lock: <Lock className="h-4 w-4 text-brand-blue" />,
  referral_bonus: <Gift className="h-4 w-4 text-purple-400" />,
};

type ModalType = "deposit" | "withdraw" | null;

export default function WalletPage() {
  const txs = getUserTransactions(currentUser.id);
  const [modal, setModal] = useState<ModalType>(null);
  const [amount, setAmount] = useState(50);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = () => {
    setSuccess(
      modal === "deposit"
        ? `Deposit of ${formatCurrency(amount)} simulated successfully!`
        : `Withdrawal of ${formatCurrency(amount)} requested!`
    );
    setModal(null);
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="relative px-5 pb-6 pt-4">
      {success && (
        <div className="mb-4 rounded-xl border border-brand-green/30 bg-brand-green/15 px-4 py-3 text-center text-xs text-brand-green">
          {success}
        </div>
      )}

      {/* Balance */}
      <div className="mb-5 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-dark p-5 shadow-lg shadow-brand-blue/20">
        <p className="mb-1 text-xs text-white/80">Available Balance</p>
        <p className="mb-1 text-3xl font-extrabold text-white">
          {formatCurrency(currentUser.balance)}
        </p>
        <p className="text-[10px] text-white/60">
          Virtual holding account · CAD
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <Button className="w-full" onClick={() => setModal("deposit")}>
          <ArrowDownLeft className="h-4 w-4" />
          Deposit
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setModal("withdraw")}
        >
          <ArrowUpRight className="h-4 w-4" />
          Withdraw
        </Button>
      </div>

      {/* Limits note */}
      <div className="mb-5 rounded-xl border border-white/5 bg-brand-dark-card px-3.5 py-3 text-[10px] text-slate-400">
        Deposit limits: <strong className="text-slate-300">$5 – $500</strong> ·
        Platform fee applies on payout only (10%)
      </div>

      {/* History */}
      <h2 className="mb-3 text-sm font-bold">Transaction History</h2>
      <div className="space-y-2">
        {txs.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center gap-3 rounded-xl bg-brand-dark-card px-3.5 py-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5">
              {typeIcons[tx.type]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-slate-200">
                {tx.description}
              </p>
              <p className="text-[10px] text-slate-500">
                {formatDateTime(tx.createdAt)} · {tx.status}
              </p>
            </div>
            <p
              className={cn(
                "text-sm font-bold",
                tx.amount >= 0 ? "text-brand-green" : "text-slate-300"
              )}
            >
              {tx.amount >= 0 ? "+" : ""}
              {formatCurrency(tx.amount)}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="absolute inset-0 z-30 flex items-end bg-black/60 p-4">
          <div className="w-full rounded-2xl border border-white/10 bg-brand-dark-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">
                {modal === "deposit" ? "Deposit Funds" : "Withdraw Funds"}
              </h3>
              <button onClick={() => setModal(null)}>
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            <div className="mb-4 text-center">
              <p className="text-3xl font-extrabold text-brand-green">
                {formatCurrency(amount)}
              </p>
            </div>
            <input
              type="range"
              min={5}
              max={500}
              step={5}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mb-4 w-full accent-brand-green"
            />

            <div className="mb-4 rounded-xl border border-white/10 bg-brand-dark p-3">
              <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
                <CreditCard className="h-4 w-4" />
                {modal === "deposit"
                  ? "Payment method (mock Stripe)"
                  : "Payout method"}
              </div>
              <p className="text-sm font-medium">Visa ****4242</p>
            </div>

            <Button className="w-full" size="lg" onClick={handleSubmit}>
              {modal === "deposit"
                ? `Deposit ${formatCurrency(amount)}`
                : `Withdraw ${formatCurrency(amount)}`}
            </Button>
            <p className="mt-2 text-center text-[10px] text-slate-600">
              Demo only — no real payment processed
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
