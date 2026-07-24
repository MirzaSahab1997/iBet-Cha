"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  User,
  Share2,
  Check,
} from "lucide-react";
import Link from "next/link";
import { contacts } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CreateWagerPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [statement, setStatement] = useState("");
  const [amount, setAmount] = useState(25);
  const [type, setType] = useState<"p2p" | "group">("p2p");
  const [selected, setSelected] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const toggleContact = (id: string) => {
    if (type === "p2p") {
      setSelected([id]);
    } else {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    }
  };

  const canNext =
    (step === 1 && statement.trim().length > 10) ||
    (step === 2 && amount >= 5 && amount <= 500) ||
    step === 3 ||
    (step === 4 && selected.length > 0) ||
    step === 5;

  const handleConfirm = () => {
    setDone(true);
    setTimeout(() => router.push("/mobile/dashboard"), 2000);
  };

  if (done) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/20">
          <Check className="h-8 w-8 text-brand-green" />
        </div>
        <h2 className="mb-2 text-xl font-bold">Wager Sent!</h2>
        <p className="text-sm text-slate-400">
          Your iBet-Cha! challenge is on its way. Funds locked in the pot.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col px-5 pb-4 pt-4">
      <div className="mb-4 flex items-center justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1 text-sm text-slate-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <Link
            href="/mobile/dashboard"
            className="flex items-center gap-1 text-sm text-slate-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </Link>
        )}
        <span className="text-xs text-slate-500">Step {step} of 5</span>
      </div>

      {/* Progress */}
      <div className="mb-6 flex gap-1.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={cn(
              "h-1 flex-1 rounded-full transition",
              s <= step ? "bg-brand-green" : "bg-white/10"
            )}
          />
        ))}
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll">
        {step === 1 && (
          <div>
            <h1 className="mb-2 text-lg font-bold">What&apos;s your wager?</h1>
            <p className="mb-4 text-xs text-slate-400">
              Start with &quot;iBet-Cha!&quot; — tell them why they&apos;re wrong.
            </p>
            <textarea
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-xl border border-white/10 bg-brand-dark-card p-4 text-sm outline-none focus:border-brand-green"
              placeholder="iBet-Cha! You wrong about…"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "iBet-Cha! The Raptors win tonight",
                "iBet-Cha! You can't finish that challenge",
                "iBet-Cha! It rains this weekend",
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatement(s)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-slate-400 hover:border-brand-green/30 hover:text-brand-green transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="mb-2 text-lg font-bold">Set the amount</h1>
            <p className="mb-6 text-xs text-slate-400">
              Min $5 · Max $500 · Funds lock into the pot
            </p>
            <div className="mb-6 text-center">
              <p className="text-4xl font-extrabold text-brand-green">
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
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>$5</span>
              <span>$500</span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[10, 25, 50, 100].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAmount(v)}
                  className={cn(
                    "rounded-xl border py-2 text-xs font-semibold transition",
                    amount === v
                      ? "border-brand-green bg-brand-green/20 text-brand-green"
                      : "border-white/10 text-slate-400 hover:bg-white/5"
                  )}
                >
                  ${v}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="mb-2 text-lg font-bold">Wager type</h1>
            <p className="mb-6 text-xs text-slate-400">
              Mano a Mano (1v1) or invite a group
            </p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setType("p2p");
                  setSelected([]);
                }}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition",
                  type === "p2p"
                    ? "border-brand-green bg-brand-green/10"
                    : "border-white/10 bg-brand-dark-card"
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/15">
                  <User className="h-6 w-6 text-brand-green" />
                </div>
                <div>
                  <p className="font-semibold">Mano a Mano (P2P)</p>
                  <p className="text-xs text-slate-400">
                    Challenge one friend head-to-head
                  </p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setType("group");
                  setSelected([]);
                }}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition",
                  type === "group"
                    ? "border-brand-blue bg-brand-blue/10"
                    : "border-white/10 bg-brand-dark-card"
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/15">
                  <Users className="h-6 w-6 text-brand-blue" />
                </div>
                <div>
                  <p className="font-semibold">Group Wager</p>
                  <p className="text-xs text-slate-400">
                    Multiple people · winners split the pot
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h1 className="mb-2 text-lg font-bold">
              {type === "p2p" ? "Pick your opponent" : "Invite friends"}
            </h1>
            <p className="mb-4 text-xs text-slate-400">
              {type === "p2p"
                ? "Select one contact to challenge"
                : "Select one or more contacts"}
            </p>
            <div className="mb-4 space-y-2">
              {contacts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleContact(c.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-3 transition",
                    selected.includes(c.id)
                      ? "border-brand-green bg-brand-green/10"
                      : "border-white/10 bg-brand-dark-card"
                  )}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark-muted text-xs font-bold">
                    {c.avatar}
                  </div>
                  <span className="flex-1 text-left text-sm font-medium">
                    {c.name}
                  </span>
                  {selected.includes(c.id) && (
                    <Check className="h-4 w-4 text-brand-green" />
                  )}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-xs text-slate-400 hover:border-brand-blue/40 hover:text-brand-blue transition"
            >
              <Share2 className="h-4 w-4" />
              Share invite link instead
            </button>
          </div>
        )}

        {step === 5 && (
          <div>
            <h1 className="mb-2 text-lg font-bold">Confirm & lock pot</h1>
            <p className="mb-6 text-xs text-slate-400">
              Review before sending your iBet-Cha!
            </p>
            <div className="space-y-3 rounded-xl border border-white/10 bg-brand-dark-card p-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">
                  Statement
                </p>
                <p className="text-sm font-medium">{statement}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Your stake</p>
                  <p className="text-lg font-bold text-brand-green">
                    {formatCurrency(amount)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Type</p>
                  <p className="text-sm font-semibold capitalize">
                    {type === "p2p" ? "Mano a Mano" : "Group"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase">Opponents</p>
                <p className="text-sm">
                  {contacts
                    .filter((c) => selected.includes(c.id))
                    .map((c) => c.name)
                    .join(", ")}
                </p>
              </div>
              <div className="rounded-lg bg-brand-green/10 border border-brand-green/20 p-3">
                <p className="text-xs text-brand-green">
                  {formatCurrency(amount)} will be locked from your wallet into
                  the holding pot. Winner gets 90% · Platform fee 10%.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        {step < 5 ? (
          <Button
            className="w-full"
            size="lg"
            disabled={!canNext}
            onClick={() => setStep(step + 1)}
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="w-full" size="lg" onClick={handleConfirm}>
            Send iBet-Cha! & Lock Pot
          </Button>
        )}
      </div>
    </div>
  );
}
