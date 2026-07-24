# iBet-Cha! – Project Plan
### "Let's Go Mano A Mano – iBet-Cha!" by BOL-LO GROUP SA
**Client:** JR Procurement Consulting Inc.  
**Service Provider:** Full Stack Websites  
**Agreement Date:** June 24, 2026  

---

## Project Overview

"Let's Go Mano A Mano – iBet-Cha!" is a peer-to-peer friendly wagering platform. Users challenge friends to wagers on anything (sports, trivia, pop culture, current events), both parties deposit into a shared "pot," the winner is verified in-app, and the system automatically pays out 90% of the pot to the winner (10% platform service fee). No odds system — just win / lose / tie (binary outcomes). Age restricted to 18+.

**Tagline:** "Where Every Bet Brings You Closer!" / "BOL-LO GROUP SA – WHERE WINNERS PLAY"

---

## Phase 1 — Mockup Demo (Client Approval First)

Build a fully clickable mockup in **Next.js 14** to show the client before any native development begins. Covers both the mobile app experience (inside a phone frame simulator) and the admin web portal.

### Mockup Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Icons | Lucide React |
| Charts | Recharts |
| State | React useState / useContext (no backend) |
| Data | Hardcoded mock data (users, wagers, transactions, badges) |

### Brand & Visual Identity

- **Primary Color:** Vibrant Green `#22c55e`
- **Accent Color:** Electric Blue `#3b82f6`
- **Background:** Dark `#0f172a`
- **Tone:** Energetic, playful, community-driven
- **Logo concept:** Dice + money symbols + chat bubble

### Mockup App Structure

```
/app
  /                          → Marketing landing page
  /mobile                    → Phone frame simulator wrapper
    /login                   → Login / Register / Password Recovery
    /dashboard               → User dashboard (wallet, wagers, stats)
    /wager/create            → Create wager multi-step flow
    /wager/[id]              → Wager detail (accept / reject / verify / dispute)
    /wallet                  → Wallet (deposit, withdraw, transaction history)
    /profile                 → Profile (stats, badges, referral card)
    /notifications           → Notifications list
  /admin                     → Admin portal (full desktop layout)
    /dashboard               → KPI cards + analytics charts
    /users                   → User management table
    /wagers                  → Wager monitoring table
    /transactions            → Financial ledger
    /rewards                 → Badges & promotional rewards management
```

---

## Phase 2 — Production Architecture (after client approval)

### Frontend — Two Separate Apps

#### Mobile App (iOS + Android)
- **React Native with Expo**
- Single codebase for both iOS and Android
- React Navigation for screen routing
- Expo Push Notifications
- NativeWind (Tailwind for React Native) for styling
- Shared API client and utility logic with admin portal

#### Admin Web Portal
- **Next.js (React)**
- Full-width desktop dashboard
- Server-side rendering
- Same Tailwind design tokens as mobile

### Backend — ASP.NET Core (.NET 8)

| Layer | Technology |
|---|---|
| API | ASP.NET Core Web API |
| Authentication | ASP.NET Core Identity + JWT Bearer Tokens |
| Real-time | SignalR (wager invites, pay-up alerts, winner notifications) |
| ORM | Entity Framework Core (code-first migrations) |
| Database | SQL Server (or PostgreSQL) |

#### Key Database Tables

- `Users` — profile, age verification, status
- `Wallets` — balance per user
- `Transactions` — deposits, withdrawals, payouts, fees
- `Wagers` — wager statement, amount, type (P2P / Group), status
- `WagerParticipants` — all parties on a wager
- `WinnerClaims` — submission, evidence file, confirmed/disputed
- `Disputes` — dispute workflow state
- `Badges` — badge definitions and user assignments
- `Referrals` — referral tracking and reward payouts

### Third-Party Services

| Service | Purpose |
|---|---|
| Stripe | Deposits, withdrawals, 90/10 payout split |
| Firebase Cloud Messaging (FCM) | Push notifications to iOS/Android |
| Twilio | SMS verification (phone registration) |
| SendGrid | Transactional email (verification, receipts) |
| Azure Blob Storage | Evidence file uploads (photos/videos) |
| Azure App Service | Host the .NET API |
| Vercel | Host the Next.js admin portal |
| Apple App Store + Google Play | Mobile app distribution |

### Architecture Diagram

```
┌─────────────────────┐     ┌─────────────────────┐
│  React Native App   │     │  Next.js Admin Web  │
│  (iOS + Android)    │     │      Portal         │
└────────┬────────────┘     └──────────┬──────────┘
         │  REST + JWT                 │  REST + JWT
         │                             │
         ▼                             ▼
┌────────────────────────────────────────────────┐
│          ASP.NET Core Web API (.NET 8)         │
│                                                │
│  • Identity + JWT Auth                         │
│  • Wager Management Logic                      │
│  • Wallet & Transaction Processing             │
│  • Winner Verification Workflow                │
│  • Admin Controls                              │
│  • SignalR Hub (real-time)                     │
└──┬──────┬──────┬──────┬──────┬─────────────────┘
   │      │      │      │      │
   ▼      ▼      ▼      ▼      ▼
SQL    Stripe  FCM   Twilio  Azure
Server         Push   SMS    Blob
```

---

## Key User Flow

```
User Opens App
     ↓
Register / Login (18+ verification)
     ↓
Dashboard → Place a Bet
     ↓
Write wager statement + Set amount ($5–$500)
     ↓
Choose P2P or Group → Send "iBet-Cha!" to friend
     ↓
Friend receives invite → Accepts + Deposits to Pot
     ↓
Wager goes ACTIVE
     ↓
Event resolves → Winner submits claim + optional evidence
     ↓
Loser clicks "Pay-Up" logo to confirm
     ↓
System auto-transfers: 90% → Winner's wallet, 10% → Platform
     ↓
Winner withdraws to debit/credit card OR re-bets
```

---

## Feature List

### User Registration & Authentication
- [x] Email registration
- [x] Phone registration
- [x] Social login (Google, Facebook, Apple)
- [x] Password recovery
- [x] Account verification (email + SMS)
- [x] Age gate (18+ enforcement)

### User Dashboard
- [x] Wallet balance display
- [x] Active wagers list
- [x] Completed wagers history
- [x] User statistics (wins, losses, win rate)
- [x] Notification bell with unread count

### Wallet System
- [x] Deposit funds (min $5, max $500)
- [x] Withdraw winnings (debit/credit card)
- [x] Virtual holding account (pot)
- [x] Transaction history with filters

### Wager Management
- [x] Create wager (P2P or Group)
- [x] Accept wager
- [x] Reject wager
- [x] Up-bet (increase pot)
- [x] Multiple participants (group wager, prize split among winners)
- [x] Wager history

### Winner Verification
- [x] Winner submission
- [x] Opponent confirmation ("Pay-Up" button)
- [x] Evidence upload (photo/video)
- [x] Dispute resolution workflow
- [x] Automatic 90/10 payout on confirmation

### Rewards & Gamification
- [x] Achievement badges: "Rookie Bettor", "The Underdog", "Betting Champion"
- [x] "Golden I Know It All" badge (10 wins in a row) + $10 bonus deposit
- [x] Referral rewards (bonus credits for referrer + new user)
- [x] Redeemable points for milestones
- [x] Social feed: share bets and victories

### Admin Portal
- [x] User management (view, suspend, verify, reset)
- [x] Transaction monitoring
- [x] Wager monitoring (with dispute flags)
- [x] Analytics dashboard (volume, revenue, user growth)
- [x] Rewards administration (assign/revoke badges, create promotions)
- [x] Platform controls

### Notification System
- [x] Bet invite received
- [x] Wager accepted / rejected
- [x] Pay-up request
- [x] Win payout confirmed
- [x] Badge earned
- [x] Referral joined
- [x] Low balance warning

---

## Project Timeline

| Phase | Duration |
|---|---|
| Mockup Demo (Phase 1) | 1–2 days |
| Client Approval | TBD |
| Discovery & Planning | 1 week |
| UI/UX Design | 1–2 weeks |
| Development | 4–6 weeks |
| Testing & QA | 1 week |
| Deployment & Launch | 1 week |
| **Total Estimated** | **8–12 weeks** |

---

## Payment Milestones (per Agreement)

| Milestone | % | Deliverables |
|---|---|---|
| Project Initiation | 30% | Discovery, Planning, Architecture, UI/UX Design |
| Development Phase | 30% | Mobile Framework, Backend, Core Features |
| Completion & Deployment | 40% | Testing, Deployment, Training, Final Delivery |

---

## Regulatory Notes

The Client (JR Procurement Consulting Inc.) is solely responsible for:
- Legal review of platform operations
- Gaming/wagering licensing requirements
- Financial compliance
- Jurisdictional approvals (Province of Ontario, Canada)
- Regulatory registrations

The Service Provider's scope is limited to technical development and delivery.

---

## Mockup Checklist

### Setup
- [ ] Initialize Next.js 14 project with Tailwind CSS, shadcn/ui, Lucide, Recharts
- [ ] Configure custom brand colors in `tailwind.config.ts`
- [ ] Create `lib/mock-data.ts` (users, wagers, transactions, badges, notifications)

### Marketing Landing Page
- [ ] Hero section with logo + taglines
- [ ] How it works section (3 steps)
- [ ] Features grid
- [ ] App download CTA buttons (mock)

### Mobile App Simulator
- [ ] Phone frame wrapper layout with bottom navigation
- [ ] Login screen (email + social buttons)
- [ ] Register screen (name, phone, email, age gate)
- [ ] Password recovery screen
- [ ] Dashboard (wallet card, active wagers, quick actions)
- [ ] Create wager multi-step flow (5 steps)
- [ ] Wager detail screen (accept / reject / pay-up / dispute / evidence)
- [ ] Wallet screen (balance, deposit mock, withdraw mock, history)
- [ ] Profile screen (stats, badges, referral card)
- [ ] Notifications screen

### Admin Portal
- [ ] Sidebar layout with navigation
- [ ] Overview dashboard (KPI cards + charts)
- [ ] User management table (search, filter, actions)
- [ ] Wager monitoring table (status filters, dispute flags)
- [ ] Transaction ledger (type filters, mock export)
- [ ] Rewards administration (badge catalog, assign/revoke)
