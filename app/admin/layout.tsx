"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Swords,
  ArrowLeftRight,
  Award,
  Dice5,
  Smartphone,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/wagers", icon: Swords, label: "Wagers" },
  { href: "/admin/transactions", icon: ArrowLeftRight, label: "Transactions" },
  { href: "/admin/rewards", icon: Award, label: "Rewards" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-brand-dark">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/5 bg-brand-dark-card">
        <div className="flex items-center gap-2.5 border-b border-white/5 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-green">
            <Dice5 className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">
              iBet-Cha<span className="text-brand-green">!</span>
            </p>
            <p className="text-[10px] text-slate-500">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-brand-green/15 text-brand-green"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/5 p-3 space-y-1">
          <Link
            href="/mobile/login"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition"
          >
            <Smartphone className="h-4 w-4" />
            Mobile Demo
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition"
          >
            <Home className="h-4 w-4" />
            Landing Page
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-brand-dark/80 px-8 py-4 backdrop-blur-xl">
          <div>
            <p className="text-xs text-slate-500">BOL-LO GROUP SA</p>
            <p className="text-sm font-semibold">Admin Dashboard · Demo</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-brand-green/15 px-3 py-1 text-[10px] font-medium text-brand-green">
              Mock Data
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-dark-muted text-xs font-bold">
              AD
            </div>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
