import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const createGroupSchema = z.object({
  name: z.string().min(3, 'Group name must be at least 3 characters'),
});

export const addMemberSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const addExpenseSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  amount: z.number().positive('Amount must be positive'),
  paidByUserId: z.string().min(1, 'Payer is required'),
  shares: z.array(
    z.object({
      userId: z.string(),
      amount: z.number().positive(),
    })
  ).min(1, 'At least one share is required'),
}).refine(
  (data) => {
    const total = data.shares.reduce((sum, share) => sum + share.amount, 0);
    return Math.abs(total - data.amount) < 0.01;
  },
  {
    message: 'Shares must sum to total amount',
    path: ['shares'],
  }
);

export const addSettlementSchema = z.object({
  fromUserId: z.string().min(1, 'From user is required'),
  toUserId: z.string().min(1, 'To user is required'),
  amount: z.number().positive('Amount must be positive'),
}).refine(
  (data) => data.fromUserId !== data.toUserId,
  {
    message: 'From and To users must be different',
    path: ['toUserId'],
  }
);
