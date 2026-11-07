// Finance Types
export interface Asset {
  id: string;
  name: string;
  type: 'cash' | 'savings' | 'stocks' | 'crypto' | 'real_estate' | 'retirement';
  value: number;
  currency: string;
}

export interface Debt {
  id: string;
  name: string;
  type: 'mortgage' | 'credit_card' | 'student_loan' | 'personal_loan';
  balance: number;
  interestRate: number;
  minimumPayment: number;
  currency: string;
}

export interface FinanceData {
  assets: Asset[];
  debts: Debt[];
  monthlySpending: MonthlySpending[];
  budget: BudgetItem[];
}

export interface MonthlySpending {
  month: string;
  amount: number;
  category: string;
}

export interface BudgetItem {
  category: string;
  allocated: number;
  spent: number;
  currency: string;
}

// Fitness Types
export interface FitnessData {
  weight: WeightEntry[];
  runs: RunEntry[];
  lifting: LiftingEntry[];
  steps: StepsEntry[];
  macros: MacrosEntry[];
}

export interface WeightEntry {
  date: string;
  weight: number;
  unit: 'kg' | 'lbs';
}

export interface RunEntry {
  id: string;
  date: string;
  distance: number;
  duration: number;
  pace: number;
  unit: 'km' | 'miles';
}

export interface LiftingEntry {
  id: string;
  date: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  unit: 'kg' | 'lbs';
}

export interface StepsEntry {
  date: string;
  steps: number;
  distance: number;
  calories: number;
}

export interface MacrosEntry {
  date: string;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

// Goals Types
export interface Goal {
  id: string;
  title: string;
  category: 'financial' | 'fitness' | 'personal';
  targetValue: number;
  currentValue: number;
  unit: string;
  targetDate: string;
  priority: 'low' | 'medium' | 'high';
  description: string;
}

export interface GoalData {
  goals: Goal[];
}

// Overview Types
export interface OverviewData {
  netWorth: number;
  monthlySavingsRate: number;
  fitnessSnapshot: {
    currentWeight: number;
    weightUnit: string;
    lastRun?: RunEntry;
    todaySteps: number;
    weeklyAvgSteps: number;
  };
  upcomingGoals: Goal[];
}
