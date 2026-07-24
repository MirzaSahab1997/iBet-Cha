"use client";

import { useState, useEffect } from "react";
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
  Menu,
  X,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-5">
        <div className="flex items-center gap-2.5">
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
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {nav.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-brand-green/15 text-brand-green"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/5 p-3">
        <Link
          href="/mobile/login"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <Smartphone className="h-4 w-4 shrink-0" />
          Mobile Demo
        </Link>
        <Link
          href="/"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <Home className="h-4 w-4 shrink-0" />
          Landing Page
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — desktop always visible, mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(100%,16rem)] flex-col border-r border-white/5 bg-brand-dark-card transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Main */}
      <div className="lg:ml-64">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/5 bg-brand-dark/80 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8 lg:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="shrink-0 rounded-xl border border-white/10 bg-brand-dark-card p-2 text-slate-300 hover:bg-white/5 hover:text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-xs text-slate-500">BOL-LO GROUP SA</p>
              <p className="truncate text-sm font-semibold">
                Admin Dashboard · Demo
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden rounded-full bg-brand-green/15 px-3 py-1 text-[10px] font-medium text-brand-green sm:inline-flex">
              Mock Data
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-dark-muted text-xs font-bold">
              AD
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
