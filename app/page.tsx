import Link from "next/link";
import Image from "next/image";
import {
  Smartphone,
  Shield,
  Zap,
  Trophy,
  Users,
  Wallet,
  ArrowRight,
  CheckCircle2,
  Dice5,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Challenges",
    description:
      "Send an iBet-Cha! to any friend in seconds — sports, trivia, or anything.",
  },
  {
    icon: Wallet,
    title: "Secure Wallet",
    description:
      "Deposit $5–$500, lock into the pot, and cash out winnings anytime.",
  },
  {
    icon: Trophy,
    title: "Badges & Rewards",
    description:
      "Earn achievements like Golden I Know It All — 10 wins in a row gets you $10!",
  },
  {
    icon: Users,
    title: "P2P & Group Wagers",
    description:
      "Go Mano a Mano one-on-one, or invite a group and split the pot among winners.",
  },
  {
    icon: Shield,
    title: "Fair Verification",
    description:
      "Winner submits, loser confirms Pay-Up. Evidence upload & dispute support built in.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Native iOS & Android apps with push notifications for every challenge.",
  },
];

const steps = [
  {
    step: "01",
    title: "Sign Up & Deposit",
    description: "Create your account (18+), deposit from $5 to $500.",
  },
  {
    step: "02",
    title: "Challenge a Friend",
    description: 'Send "iBet-Cha! You wrong…" with your wager amount.',
  },
  {
    step: "03",
    title: "Win & Cash Out",
    description: "Verify the winner, get 90% of the pot. Platform keeps 10%.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-brand-dark/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-green">
              <Dice5 className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              iBet-Cha<span className="text-brand-green">!</span>
            </span>
          </div>
          <div className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
            <a href="#how" className="hover:text-white transition">
              How It Works
            </a>
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <Link href="/admin/dashboard" className="hover:text-white transition">
              Admin Portal
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/mobile/login"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 transition"
            >
              Sign In
            </Link>
            <Link
              href="/mobile/login"
              className="rounded-xl bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-green/20 hover:bg-brand-green-dark transition"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Betting banner image — full bleed with transparency */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/hero-betting.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-100"
            sizes="100vw"
          />
          {/* Soft brand tint + fade so text stays readable */}
          <div className="absolute inset-0 bg-brand-dark/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/50 to-brand-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-green/20 via-transparent to-transparent" />
        </div>

        <div className="relative px-6 pb-24 pt-20">
          <div className="mx-auto max-w-6xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-4 py-1.5 text-sm text-brand-green backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
              BOL-LO GROUP SA — WHERE WINNERS PLAY
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight drop-shadow-lg sm:text-6xl lg:text-7xl">
              Let&apos;s Go{" "}
              <span className="bg-gradient-to-r from-brand-green to-brand-blue bg-clip-text text-transparent">
                Mano A Mano
              </span>
              <br />
              iBet-Cha<span className="text-brand-green">!</span>
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-lg text-slate-300 sm:text-xl">
              Where Every Bet Brings You Closer! Challenge your friends on
              anything — sports, pop culture, or that &quot;I know it all&quot;
              moment. No odds. Just win or lose.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-sm text-slate-400">
              Peer-to-peer friendly wagers · 90% payout to winners · Badges &
              referrals
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/mobile/login"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-8 py-4 text-base font-bold text-white shadow-xl shadow-brand-green/25 transition hover:bg-brand-green-dark"
              >
                <Smartphone className="h-5 w-5" />
                Open Mobile Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                View Admin Portal
              </Link>
            </div>

            {/* Phone preview hint */}
            <div className="mt-16 flex justify-center">
              <div className="relative rounded-[2.5rem] border-4 border-slate-700/80 bg-brand-dark-card/90 p-3 shadow-phone backdrop-blur-sm">
                <div className="absolute left-1/2 top-2 h-1.5 w-20 -translate-x-1/2 rounded-full bg-slate-600" />
                <div className="w-[280px] overflow-hidden rounded-[2rem] bg-gradient-to-b from-brand-dark to-brand-dark-card px-5 pb-8 pt-10">
                  <div className="mb-4 text-center">
                    <Dice5 className="mx-auto mb-2 h-10 w-10 text-brand-green" />
                    <p className="text-sm font-bold">iBet-Cha!</p>
                    <p className="text-xs text-slate-500">
                      Challenge. Win. Cash Out.
                    </p>
                  </div>
                  <div className="mb-3 rounded-2xl border border-brand-green/30 bg-brand-green/20 p-4">
                    <p className="mb-1 text-xs text-brand-green">
                      Wallet Balance
                    </p>
                    <p className="text-2xl font-bold">$247.50</p>
                  </div>
                  <div className="space-y-2">
                    {[
                      "Raptors vs Celtics · $50",
                      "Taylor Swift album · $20",
                    ].map((w) => (
                      <div
                        key={w}
                        className="rounded-xl bg-white/5 px-3 py-2.5 text-left text-xs text-slate-300"
                      >
                        {w}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-white/5 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">How It Works</h2>
            <p className="text-slate-400">Three steps to settle the score</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-white/5 bg-brand-dark-card p-8"
              >
                <span className="mb-4 block text-4xl font-black text-brand-green/30">
                  {s.step}
                </span>
                <h3 className="mb-2 text-xl font-bold">{s.title}</h3>
                <p className="text-slate-400">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-white/5 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
              Everything You Need to Bet Fair
            </h2>
            <p className="text-slate-400">
              Built for friendly rivalry — not casino odds
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/5 bg-brand-dark-card p-6 transition hover:border-brand-green/30"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/15">
                  <f.icon className="h-5 w-5 text-brand-green" />
                </div>
                <h3 className="mb-2 font-bold">{f.title}</h3>
                <p className="text-sm text-slate-400">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 px-6 py-24">
        <div className="mx-auto max-w-3xl rounded-3xl border border-brand-green/20 bg-gradient-to-br from-brand-green/10 to-brand-blue/10 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Challenge Someone?</h2>
          <p className="mb-8 text-slate-400">
            Explore the interactive mockup — mobile app simulator & admin dashboard.
            No real money. Demo data only.
          </p>
          <ul className="mb-8 flex flex-wrap justify-center gap-4 text-sm text-slate-300">
            {[
              "18+ age gate",
              "90/10 payout split",
              "Winner verification",
              "Admin analytics",
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/mobile/login"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-8 py-4 text-base font-bold text-white shadow-xl shadow-brand-green/25 hover:bg-brand-green-dark transition"
          >
            Launch Demo App
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <Dice5 className="h-4 w-4 text-brand-green" />
            <span>
              iBet-Cha! · BOL-LO GROUP SA · Mockup Demo
            </span>
          </div>
          <p>Client demo for JR Procurement Consulting Inc.</p>
        </div>
      </footer>
    </div>
  );
}
