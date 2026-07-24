"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Wallet,
  PlusCircle,
  User,
  Bell,
  ArrowLeft,
  Dice5,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { notifications } from "@/lib/mock-data";

const tabs = [
  { href: "/mobile/dashboard", icon: Home, label: "Home" },
  { href: "/mobile/wallet", icon: Wallet, label: "Wallet" },
  { href: "/mobile/wager/create", icon: PlusCircle, label: "Bet", highlight: true },
  { href: "/mobile/notifications", icon: Bell, label: "Alerts" },
  { href: "/mobile/profile", icon: User, label: "Profile" },
];

const hideNavPaths = ["/mobile/login", "/mobile/register", "/mobile/forgot-password"];

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNav = hideNavPaths.some((p) => pathname.startsWith(p));
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-8">
      {/* Top bar outside phone */}
      <div className="mb-4 flex w-full max-w-[400px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Landing
        </Link>
        <Link
          href="/admin/dashboard"
          className="text-sm text-slate-400 hover:text-brand-green transition"
        >
          Admin Portal →
        </Link>
      </div>

      {/* Phone frame */}
      <div className="relative w-full max-w-[390px] overflow-hidden rounded-[2.75rem] border-[6px] border-slate-700 bg-brand-dark shadow-phone">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-20 h-7 w-36 -translate-x-1/2 rounded-b-2xl bg-slate-700" />

        {/* Status bar */}
        <div className="relative z-10 flex items-center justify-between px-6 pb-1 pt-3 text-[10px] font-medium text-slate-400">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <span>5G</span>
            <span className="inline-block h-2.5 w-5 rounded-sm border border-slate-400">
              <span className="ml-0.5 mt-0.5 inline-block h-1.5 w-3 rounded-[1px] bg-brand-green" />
            </span>
          </div>
        </div>

        {/* App header */}
        {!hideNav && (
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-green">
                <Dice5 className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-bold">
                iBet-Cha<span className="text-brand-green">!</span>
              </span>
            </div>
            <Link href="/mobile/notifications" className="relative">
              <Bell className="h-5 w-5 text-slate-400" />
              {unread > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {unread}
                </span>
              )}
            </Link>
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            "phone-scroll overflow-y-auto",
            hideNav ? "h-[700px]" : "h-[620px]"
          )}
        >
          {children}
        </div>

        {/* Bottom nav */}
        {!hideNav && (
          <div className="border-t border-white/5 bg-brand-dark-card/90 backdrop-blur px-2 pb-5 pt-2">
            <div className="flex items-center justify-around">
              {tabs.map((tab) => {
                const active =
                  pathname === tab.href ||
                  (tab.href !== "/mobile/dashboard" &&
                    pathname.startsWith(tab.href));
                const Icon = tab.icon;
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={cn(
                      "flex flex-col items-center gap-0.5 px-2 py-1 transition",
                      tab.highlight && !active && "text-brand-green",
                      active ? "text-brand-green" : "text-slate-500"
                    )}
                  >
                    <div
                      className={cn(
                        tab.highlight &&
                          "rounded-full bg-brand-green p-2 text-white shadow-lg shadow-brand-green/30",
                        tab.highlight && active && "ring-2 ring-brand-green/50"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          tab.highlight && "h-6 w-6 text-white"
                        )}
                      />
                    </div>
                    {!tab.highlight && (
                      <span className="text-[10px] font-medium">{tab.label}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-slate-600">
        Mobile App Simulator · Demo Data Only
      </p>
    </div>
  );
}
