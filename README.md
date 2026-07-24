# iBet-Cha! Mockup Demo

Interactive mockup for **"Let's Go Mano A Mano – iBet-Cha!"** by BOL-LO GROUP SA.

Client demo for JR Procurement Consulting Inc.

## What's included

- **Marketing landing page** — `/`
- **Mobile app simulator** (phone frame) — `/mobile/login`
  - Auth, dashboard, create wager, wager detail, wallet, profile, notifications
- **Admin web portal** — `/admin/dashboard`
  - Analytics, users, wagers, transactions, rewards

All data is mocked. No backend or real payments.

## Setup (run these yourself)

```bash
cd "E:\Traxccel\Client Projects\iBet-Cha"
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Demo credentials

Any credentials work on the login screen. The form is pre-filled with:

- Email: `alex.rivera@email.com`
- Password: `demo1234`

## Production stack (after approval)

See [PLAN.md](./PLAN.md) for the full architecture:

- Mobile: React Native (Expo)
- Admin: Next.js
- Backend: ASP.NET Core (.NET 8) + SignalR + EF Core
- Database: SQL Server
- Payments: Stripe
