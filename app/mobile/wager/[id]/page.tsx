"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Banknote,
} from "lucide-react";
import {
  getWagerById,
  currentUser,
  statusColors,
  statusLabels,
} from "@/lib/mock-data";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

export default function WagerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const wager = getWagerById(id);
  const [actionDone, setActionDone] = useState<string | null>(null);
  const [showEvidence, setShowEvidence] = useState(false);

  if (!wager) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6">
        <p className="mb-4 text-slate-400">Wager not found</p>
        <Link href="/mobile/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const isChallenger = wager.challengerId === currentUser.id;
  const myParticipation = wager.participants.find(
    (p) => p.userId === currentUser.id
  );
  const needsAccept =
    wager.status === "pending" &&
    myParticipation &&
    !myParticipation.confirmed &&
    !isChallenger;

  if (actionDone) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/20">
          <CheckCircle2 className="h-8 w-8 text-brand-green" />
        </div>
        <h2 className="mb-2 text-xl font-bold">{actionDone}</h2>
        <p className="mb-6 text-sm text-slate-400">Demo action completed</p>
        <Link href="/mobile/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-5 pb-6 pt-4">
      <Link
        href="/mobile/dashboard"
        className="mb-4 flex items-center gap-1 text-sm text-slate-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="mb-4 flex items-start justify-between gap-2">
        <h1 className="text-lg font-bold leading-snug">{wager.statement}</h1>
        <StatusBadge
          label={statusLabels[wager.status]}
          className={statusColors[wager.status]}
        />
      </div>

      {/* Pot */}
      <div className="mb-5 rounded-2xl border border-brand-green/30 bg-brand-green/10 p-4 text-center">
        <p className="text-xs text-brand-green mb-1">Total Pot</p>
        <p className="text-3xl font-extrabold text-brand-green">
          {formatCurrency(wager.potTotal)}
        </p>
        <p className="mt-1 text-[10px] text-slate-400">
          Winner gets 90% ({formatCurrency(wager.potTotal * 0.9)}) · Fee 10% (
          {formatCurrency(wager.potTotal * 0.1)})
        </p>
      </div>

      {/* Meta */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-brand-dark-card p-3">
          <p className="text-[10px] text-slate-500">Type</p>
          <p className="text-sm font-semibold capitalize">
            {wager.type === "p2p" ? "Mano a Mano" : "Group"}
          </p>
        </div>
        <div className="rounded-xl bg-brand-dark-card p-3">
          <p className="text-[10px] text-slate-500">Category</p>
          <p className="text-sm font-semibold capitalize">
            {wager.category.replace("_", " ")}
          </p>
        </div>
        <div className="rounded-xl bg-brand-dark-card p-3">
          <p className="text-[10px] text-slate-500">Created</p>
          <p className="text-sm font-semibold">
            {formatDateTime(wager.createdAt)}
          </p>
        </div>
        <div className="rounded-xl bg-brand-dark-card p-3">
          <p className="text-[10px] text-slate-500">Your stake</p>
          <p className="text-sm font-semibold text-brand-green">
            {formatCurrency(myParticipation?.amount ?? wager.amount)}
          </p>
        </div>
      </div>

      {/* Participants */}
      <div className="mb-5">
        <h2 className="mb-2 text-sm font-bold">Participants</h2>
        <div className="space-y-2">
          {wager.participants.map((p) => (
            <div
              key={p.userId}
              className="flex items-center justify-between rounded-xl bg-brand-dark-card px-3.5 py-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-dark-muted text-[10px] font-bold">
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {p.name}
                    {p.userId === currentUser.id && (
                      <span className="ml-1 text-[10px] text-brand-green">
                        (You)
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] capitalize text-slate-500">
                    {p.side}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  {formatCurrency(p.amount)}
                </p>
                <p
                  className={`text-[10px] ${
                    p.confirmed ? "text-brand-green" : "text-yellow-400"
                  }`}
                >
                  {p.confirmed ? "Confirmed" : "Pending"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {wager.winnerName && (
        <div className="mb-5 rounded-xl border border-brand-blue/30 bg-brand-blue/10 p-3.5">
          <p className="text-xs text-brand-blue">
            Claimed winner: <strong>{wager.winnerName}</strong>
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2.5">
        {needsAccept && (
          <>
            <Button
              className="w-full"
              size="lg"
              onClick={() =>
                setActionDone("Wager Accepted! Funds locked into the pot.")
              }
            >
              <CheckCircle2 className="h-5 w-5" />
              Accept & Match Bet
            </Button>
            <Button
              variant="danger"
              className="w-full"
              onClick={() => setActionDone("Wager Rejected")}
            >
              <XCircle className="h-5 w-5" />
              Reject
            </Button>
          </>
        )}

        {wager.status === "awaiting_verification" && (
          <>
            <Button
              className="w-full"
              size="lg"
              onClick={() =>
                setActionDone(
                  "Pay-Up Confirmed! 90% sent to winner's wallet."
                )
              }
            >
              <Banknote className="h-5 w-5" />
              Pay-Up — Confirm Winner
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowEvidence(!showEvidence)}
            >
              <Upload className="h-4 w-4" />
              {showEvidence ? "Hide Evidence" : "View / Upload Evidence"}
            </Button>
            {showEvidence && (
              <div className="rounded-xl border border-dashed border-white/20 bg-brand-dark-card p-6 text-center">
                <Upload className="mx-auto mb-2 h-8 w-8 text-slate-500" />
                <p className="text-xs text-slate-400">
                  Tap to upload photo or video evidence
                </p>
                <p className="mt-1 text-[10px] text-slate-600">
                  (Demo — upload is simulated)
                </p>
                {wager.hasEvidence && (
                  <p className="mt-3 text-xs text-brand-green">
                    ✓ Evidence already attached
                  </p>
                )}
              </div>
            )}
            <Button
              variant="danger"
              className="w-full"
              onClick={() =>
                setActionDone("Dispute opened. Admin will review.")
              }
            >
              <AlertTriangle className="h-4 w-4" />
              Dispute Outcome
            </Button>
          </>
        )}

        {wager.status === "active" && isChallenger && (
          <Button
            variant="accent"
            className="w-full"
            onClick={() =>
              setActionDone("Winner claim submitted. Awaiting Pay-Up.")
            }
          >
            Submit Winner Claim
          </Button>
        )}

        {wager.status === "disputed" && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center">
            <AlertTriangle className="mx-auto mb-2 h-6 w-6 text-red-400" />
            <p className="text-sm font-semibold text-red-400">Under Dispute</p>
            <p className="mt-1 text-xs text-slate-400">
              An admin is reviewing evidence from both parties.
            </p>
          </div>
        )}

        {wager.status === "settled" && (
          <div className="rounded-xl border border-brand-green/30 bg-brand-green/10 p-4 text-center">
            <CheckCircle2 className="mx-auto mb-2 h-6 w-6 text-brand-green" />
            <p className="text-sm font-semibold text-brand-green">Settled</p>
            <p className="mt-1 text-xs text-slate-400">
              Winner: {wager.winnerName} · Paid{" "}
              {formatCurrency(wager.potTotal * 0.9)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
