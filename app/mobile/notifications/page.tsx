"use client";

import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  XCircle,
  Banknote,
  Trophy,
  UserPlus,
  AlertCircle,
  Handshake,
} from "lucide-react";
import { notifications, type NotificationType } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

const typeIcons: Record<NotificationType, React.ReactNode> = {
  bet_invite: <Handshake className="h-4 w-4 text-brand-green" />,
  wager_accepted: <CheckCircle2 className="h-4 w-4 text-brand-green" />,
  wager_rejected: <XCircle className="h-4 w-4 text-red-400" />,
  pay_up: <Banknote className="h-4 w-4 text-brand-blue" />,
  win_payout: <Trophy className="h-4 w-4 text-yellow-400" />,
  badge_earned: <Trophy className="h-4 w-4 text-yellow-400" />,
  referral_joined: <UserPlus className="h-4 w-4 text-purple-400" />,
  low_balance: <AlertCircle className="h-4 w-4 text-orange-400" />,
};

export default function NotificationsPage() {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="px-5 pb-6 pt-4">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Notifications</h1>
          <p className="text-xs text-slate-500">
            {unread > 0 ? `${unread} unread` : "All caught up"}
          </p>
        </div>
        <Bell className="h-5 w-5 text-slate-400" />
      </div>

      <div className="space-y-2">
        {notifications.map((n) => {
          const content = (
            <div
              className={cn(
                "flex gap-3 rounded-xl border p-3.5 transition",
                n.read
                  ? "border-white/5 bg-brand-dark-card"
                  : "border-brand-green/20 bg-brand-green/5"
              )}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5">
                {typeIcons[n.type]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center gap-2">
                  <p className="text-xs font-bold text-slate-200">{n.title}</p>
                  {!n.read && (
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  )}
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  {n.message}
                </p>
                <p className="mt-1.5 text-[10px] text-slate-600">
                  {formatDateTime(n.createdAt)}
                </p>
              </div>
            </div>
          );

          return n.link ? (
            <Link key={n.id} href={n.link}>
              {content}
            </Link>
          ) : (
            <div key={n.id}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
