export type UserStatus = "active" | "suspended" | "pending";
export type WagerStatus =
  | "pending"
  | "active"
  | "awaiting_verification"
  | "settled"
  | "disputed"
  | "rejected";
export type WagerType = "p2p" | "group";
export type TransactionType =
  | "deposit"
  | "withdrawal"
  | "winnings"
  | "fee"
  | "pot_lock"
  | "referral_bonus";
export type NotificationType =
  | "bet_invite"
  | "wager_accepted"
  | "wager_rejected"
  | "pay_up"
  | "win_payout"
  | "badge_earned"
  | "referral_joined"
  | "low_balance";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: UserStatus;
  balance: number;
  wins: number;
  losses: number;
  winStreak: number;
  badgeIds: string[];
  referralCode: string;
  referralsCount: number;
  joinedAt: string;
  verified: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
}

export interface WagerParticipant {
  userId: string;
  name: string;
  amount: number;
  side: "challenger" | "opponent" | "group";
  confirmed: boolean;
}

export interface Wager {
  id: string;
  statement: string;
  amount: number;
  potTotal: number;
  type: WagerType;
  status: WagerStatus;
  category: "sports" | "general" | "pop_culture" | "current_events";
  challengerId: string;
  challengerName: string;
  participants: WagerParticipant[];
  winnerId?: string;
  winnerName?: string;
  createdAt: string;
  settledAt?: string;
  hasEvidence?: boolean;
  disputed?: boolean;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: TransactionType;
  amount: number;
  description: string;
  status: "completed" | "pending" | "failed";
  createdAt: string;
  wagerId?: string;
}

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export const badges: Badge[] = [
  {
    id: "b1",
    name: "Rookie Bettor",
    description: "Placed your first wager",
    icon: "🌱",
    color: "#22c55e",
    requirement: "1 wager placed",
  },
  {
    id: "b2",
    name: "The Underdog",
    description: "Won a wager as the challenger",
    icon: "🐕",
    color: "#3b82f6",
    requirement: "Win as challenger",
  },
  {
    id: "b3",
    name: "Betting Champion",
    description: "Won 5 wagers total",
    icon: "🏆",
    color: "#f59e0b",
    requirement: "5 total wins",
  },
  {
    id: "b4",
    name: "Golden I Know It All",
    description: "Won 10 bets in a row — $10 bonus deposit!",
    icon: "👑",
    color: "#eab308",
    requirement: "10 win streak",
  },
];

export const currentUser: User = {
  id: "u1",
  name: "Alex Rivera",
  email: "alex.rivera@email.com",
  phone: "+1 (416) 555-0142",
  avatar: "AR",
  status: "active",
  balance: 247.5,
  wins: 12,
  losses: 4,
  winStreak: 3,
  badgeIds: ["b1", "b2", "b3"],
  referralCode: "ALEX2026",
  referralsCount: 5,
  joinedAt: "2026-03-15",
  verified: true,
};

export const users: User[] = [
  currentUser,
  {
    id: "u2",
    name: "Jordan Lee",
    email: "jordan.lee@email.com",
    phone: "+1 (647) 555-0198",
    avatar: "JL",
    status: "active",
    balance: 180.0,
    wins: 8,
    losses: 6,
    winStreak: 1,
    badgeIds: ["b1", "b2"],
    referralCode: "JORDAN26",
    referralsCount: 2,
    joinedAt: "2026-04-02",
    verified: true,
  },
  {
    id: "u3",
    name: "Sam Patel",
    email: "sam.patel@email.com",
    phone: "+1 (905) 555-0177",
    avatar: "SP",
    status: "active",
    balance: 95.25,
    wins: 15,
    losses: 3,
    winStreak: 10,
    badgeIds: ["b1", "b2", "b3", "b4"],
    referralCode: "SAMPATEL",
    referralsCount: 8,
    joinedAt: "2026-02-20",
    verified: true,
  },
  {
    id: "u4",
    name: "Taylor Brooks",
    email: "taylor.b@email.com",
    phone: "+1 (416) 555-0133",
    avatar: "TB",
    status: "pending",
    balance: 25.0,
    wins: 1,
    losses: 0,
    winStreak: 1,
    badgeIds: ["b1"],
    referralCode: "TAYLOR26",
    referralsCount: 0,
    joinedAt: "2026-06-18",
    verified: false,
  },
  {
    id: "u5",
    name: "Casey Morgan",
    email: "casey.m@email.com",
    phone: "+1 (289) 555-0166",
    avatar: "CM",
    status: "suspended",
    balance: 0,
    wins: 3,
    losses: 7,
    winStreak: 0,
    badgeIds: ["b1"],
    referralCode: "CASEY26",
    referralsCount: 1,
    joinedAt: "2026-05-01",
    verified: true,
  },
  {
    id: "u6",
    name: "Riley Chen",
    email: "riley.chen@email.com",
    phone: "+1 (416) 555-0188",
    avatar: "RC",
    status: "active",
    balance: 320.75,
    wins: 20,
    losses: 8,
    winStreak: 2,
    badgeIds: ["b1", "b2", "b3"],
    referralCode: "RILEY26",
    referralsCount: 12,
    joinedAt: "2026-01-10",
    verified: true,
  },
];

export const contacts = [
  { id: "u2", name: "Jordan Lee", avatar: "JL" },
  { id: "u3", name: "Sam Patel", avatar: "SP" },
  { id: "u4", name: "Taylor Brooks", avatar: "TB" },
  { id: "u6", name: "Riley Chen", avatar: "RC" },
];

export const wagers: Wager[] = [
  {
    id: "w1",
    statement: "iBet-Cha! The Raptors beat the Celtics tonight",
    amount: 25,
    potTotal: 50,
    type: "p2p",
    status: "active",
    category: "sports",
    challengerId: "u1",
    challengerName: "Alex Rivera",
    participants: [
      { userId: "u1", name: "Alex Rivera", amount: 25, side: "challenger", confirmed: true },
      { userId: "u2", name: "Jordan Lee", amount: 25, side: "opponent", confirmed: true },
    ],
    createdAt: "2026-06-20T18:30:00",
  },
  {
    id: "w2",
    statement: "iBet-Cha! You wrong — Taylor Swift drops a new album before July",
    amount: 10,
    potTotal: 20,
    type: "p2p",
    status: "awaiting_verification",
    category: "pop_culture",
    challengerId: "u1",
    challengerName: "Alex Rivera",
    participants: [
      { userId: "u1", name: "Alex Rivera", amount: 10, side: "challenger", confirmed: true },
      { userId: "u3", name: "Sam Patel", amount: 10, side: "opponent", confirmed: true },
    ],
    winnerId: "u1",
    winnerName: "Alex Rivera",
    createdAt: "2026-06-18T14:00:00",
    hasEvidence: true,
  },
  {
    id: "w3",
    statement: "iBet-Cha! It rains in Toronto this Saturday",
    amount: 15,
    potTotal: 45,
    type: "group",
    status: "pending",
    category: "general",
    challengerId: "u2",
    challengerName: "Jordan Lee",
    participants: [
      { userId: "u2", name: "Jordan Lee", amount: 15, side: "challenger", confirmed: true },
      { userId: "u1", name: "Alex Rivera", amount: 15, side: "opponent", confirmed: false },
      { userId: "u6", name: "Riley Chen", amount: 15, side: "group", confirmed: true },
    ],
    createdAt: "2026-06-22T10:15:00",
  },
  {
    id: "w4",
    statement: "iBet-Cha! Leafs make the playoffs this season",
    amount: 50,
    potTotal: 100,
    type: "p2p",
    status: "settled",
    category: "sports",
    challengerId: "u1",
    challengerName: "Alex Rivera",
    participants: [
      { userId: "u1", name: "Alex Rivera", amount: 50, side: "challenger", confirmed: true },
      { userId: "u6", name: "Riley Chen", amount: 50, side: "opponent", confirmed: true },
    ],
    winnerId: "u1",
    winnerName: "Alex Rivera",
    createdAt: "2026-05-10T20:00:00",
    settledAt: "2026-05-12T09:00:00",
  },
  {
    id: "w5",
    statement: "iBet-Cha! The new Marvel movie breaks $1B opening weekend",
    amount: 20,
    potTotal: 40,
    type: "p2p",
    status: "disputed",
    category: "pop_culture",
    challengerId: "u3",
    challengerName: "Sam Patel",
    participants: [
      { userId: "u3", name: "Sam Patel", amount: 20, side: "challenger", confirmed: true },
      { userId: "u1", name: "Alex Rivera", amount: 20, side: "opponent", confirmed: true },
    ],
    winnerId: "u3",
    winnerName: "Sam Patel",
    createdAt: "2026-06-15T16:45:00",
    disputed: true,
    hasEvidence: true,
  },
  {
    id: "w6",
    statement: "iBet-Cha! Bitcoin hits $150K before September",
    amount: 30,
    potTotal: 90,
    type: "group",
    status: "active",
    category: "current_events",
    challengerId: "u6",
    challengerName: "Riley Chen",
    participants: [
      { userId: "u6", name: "Riley Chen", amount: 30, side: "challenger", confirmed: true },
      { userId: "u2", name: "Jordan Lee", amount: 30, side: "opponent", confirmed: true },
      { userId: "u3", name: "Sam Patel", amount: 30, side: "group", confirmed: true },
    ],
    createdAt: "2026-06-19T11:00:00",
  },
  {
    id: "w7",
    statement: "iBet-Cha! You can't finish that hot wing challenge",
    amount: 5,
    potTotal: 10,
    type: "p2p",
    status: "rejected",
    category: "general",
    challengerId: "u1",
    challengerName: "Alex Rivera",
    participants: [
      { userId: "u1", name: "Alex Rivera", amount: 5, side: "challenger", confirmed: true },
      { userId: "u4", name: "Taylor Brooks", amount: 5, side: "opponent", confirmed: false },
    ],
    createdAt: "2026-06-21T09:30:00",
  },
];

export const transactions: Transaction[] = [
  {
    id: "t1",
    userId: "u1",
    userName: "Alex Rivera",
    type: "deposit",
    amount: 100,
    description: "Deposit via Visa ****4242",
    status: "completed",
    createdAt: "2026-06-01T12:00:00",
  },
  {
    id: "t2",
    userId: "u1",
    userName: "Alex Rivera",
    type: "pot_lock",
    amount: -25,
    description: "Locked into pot — Wager #w1",
    status: "completed",
    createdAt: "2026-06-20T18:30:00",
    wagerId: "w1",
  },
  {
    id: "t3",
    userId: "u1",
    userName: "Alex Rivera",
    type: "winnings",
    amount: 90,
    description: "Winnings (90%) — Leafs playoffs wager",
    status: "completed",
    createdAt: "2026-05-12T09:00:00",
    wagerId: "w4",
  },
  {
    id: "t4",
    userId: "u1",
    userName: "Alex Rivera",
    type: "fee",
    amount: -10,
    description: "Platform fee (10%) — Wager #w4",
    status: "completed",
    createdAt: "2026-05-12T09:00:00",
    wagerId: "w4",
  },
  {
    id: "t5",
    userId: "u1",
    userName: "Alex Rivera",
    type: "withdrawal",
    amount: -50,
    description: "Withdrawal to Visa ****4242",
    status: "completed",
    createdAt: "2026-05-15T14:20:00",
  },
  {
    id: "t6",
    userId: "u1",
    userName: "Alex Rivera",
    type: "referral_bonus",
    amount: 10,
    description: "Referral bonus — Taylor Brooks joined",
    status: "completed",
    createdAt: "2026-06-18T08:00:00",
  },
  {
    id: "t7",
    userId: "u1",
    userName: "Alex Rivera",
    type: "pot_lock",
    amount: -10,
    description: "Locked into pot — Wager #w2",
    status: "completed",
    createdAt: "2026-06-18T14:00:00",
    wagerId: "w2",
  },
  {
    id: "t8",
    userId: "u2",
    userName: "Jordan Lee",
    type: "deposit",
    amount: 75,
    description: "Deposit via Mastercard ****8888",
    status: "completed",
    createdAt: "2026-06-10T10:00:00",
  },
  {
    id: "t9",
    userId: "u3",
    userName: "Sam Patel",
    type: "winnings",
    amount: 45,
    description: "Winnings (90%) — Group weather wager",
    status: "completed",
    createdAt: "2026-06-05T16:00:00",
  },
  {
    id: "t10",
    userId: "u6",
    userName: "Riley Chen",
    type: "withdrawal",
    amount: -100,
    description: "Withdrawal to Debit ****1122",
    status: "pending",
    createdAt: "2026-06-22T11:30:00",
  },
];

export const notifications: AppNotification[] = [
  {
    id: "n1",
    type: "bet_invite",
    title: "New Bet Invite!",
    message: "Jordan Lee challenged you: \"It rains in Toronto this Saturday\" — $15",
    read: false,
    createdAt: "2026-06-22T10:15:00",
    link: "/mobile/wager/w3",
  },
  {
    id: "n2",
    type: "pay_up",
    title: "Pay-Up Request",
    message: "Confirm the winner for your Taylor Swift album wager",
    read: false,
    createdAt: "2026-06-21T09:00:00",
    link: "/mobile/wager/w2",
  },
  {
    id: "n3",
    type: "wager_accepted",
    title: "Wager Accepted!",
    message: "Jordan Lee accepted your Raptors vs Celtics wager. Pot locked at $50!",
    read: true,
    createdAt: "2026-06-20T19:00:00",
    link: "/mobile/wager/w1",
  },
  {
    id: "n4",
    type: "win_payout",
    title: "You Won! 🎉",
    message: "$90 deposited to your wallet (Leafs playoffs wager). Platform fee: $10.",
    read: true,
    createdAt: "2026-05-12T09:05:00",
    link: "/mobile/wallet",
  },
  {
    id: "n5",
    type: "badge_earned",
    title: "Badge Unlocked!",
    message: "You earned the \"Betting Champion\" badge for 5+ wins!",
    read: true,
    createdAt: "2026-05-12T09:10:00",
    link: "/mobile/profile",
  },
  {
    id: "n6",
    type: "referral_joined",
    title: "Referral Joined!",
    message: "Taylor Brooks signed up with your code. +$10 bonus credited!",
    read: true,
    createdAt: "2026-06-18T08:00:00",
    link: "/mobile/profile",
  },
  {
    id: "n7",
    type: "wager_rejected",
    title: "Wager Declined",
    message: "Taylor Brooks declined your hot wing challenge wager.",
    read: true,
    createdAt: "2026-06-21T10:00:00",
    link: "/mobile/wager/w7",
  },
];

export const volumeChartData = [
  { month: "Jan", volume: 4200, revenue: 420 },
  { month: "Feb", volume: 5800, revenue: 580 },
  { month: "Mar", volume: 7100, revenue: 710 },
  { month: "Apr", volume: 6400, revenue: 640 },
  { month: "May", volume: 8900, revenue: 890 },
  { month: "Jun", volume: 10200, revenue: 1020 },
];

export const categoryChartData = [
  { name: "Sports", value: 45, color: "#22c55e" },
  { name: "General", value: 25, color: "#3b82f6" },
  { name: "Pop Culture", value: 20, color: "#f59e0b" },
  { name: "Current Events", value: 10, color: "#a855f7" },
];

export const adminStats = {
  totalUsers: users.length,
  activeUsers: users.filter((u) => u.status === "active").length,
  activeWagers: wagers.filter((w) => w.status === "active" || w.status === "pending").length,
  totalVolume: 42600,
  platformRevenue: 4260,
  disputedWagers: wagers.filter((w) => w.disputed).length,
  pendingWithdrawals: transactions.filter(
    (t) => t.type === "withdrawal" && t.status === "pending"
  ).length,
};

export function getWagerById(id: string) {
  return wagers.find((w) => w.id === id);
}

export function getUserById(id: string) {
  return users.find((u) => u.id === id);
}

export function getUserBadges(user: User) {
  return badges.filter((b) => user.badgeIds.includes(b.id));
}

export function getUserTransactions(userId: string) {
  return transactions.filter((t) => t.userId === userId);
}

export function getUserWagers(userId: string) {
  return wagers.filter(
    (w) =>
      w.challengerId === userId ||
      w.participants.some((p) => p.userId === userId)
  );
}

export const statusLabels: Record<WagerStatus, string> = {
  pending: "Pending",
  active: "Active",
  awaiting_verification: "Awaiting Verification",
  settled: "Settled",
  disputed: "Disputed",
  rejected: "Rejected",
};

export const statusColors: Record<WagerStatus, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  active: "bg-brand-green/20 text-brand-green border-brand-green/30",
  awaiting_verification: "bg-brand-blue/20 text-brand-blue border-brand-blue/30",
  settled: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  disputed: "bg-red-500/20 text-red-400 border-red-500/30",
  rejected: "bg-slate-600/20 text-slate-400 border-slate-600/30",
};
