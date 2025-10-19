export interface User {
  id: string;
  name?: string;
  email: string;
}

export interface Group {
  id: string;
  name: string;
  members: User[];
  createdAt?: string;
}

export interface ExpenseShare {
  userId: string;
  amount: number;
}

export interface Expense {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  paidByUserId: string;
  shares: ExpenseShare[];
  createdAt?: string;
}

export interface BalanceTotal {
  userId: string;
  balance: number;
}

export interface BalanceSummary {
  groupId: string;
  totals: BalanceTotal[];
}

export interface Settlement {
  id: string;
  groupId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}
