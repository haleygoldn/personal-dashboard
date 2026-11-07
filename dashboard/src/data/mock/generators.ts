import {
  Asset,
  Debt,
  FinanceData,
  FitnessData,
  GoalData,
  Goal,
  WeightEntry,
  RunEntry,
  StepsEntry,
  MacrosEntry,
  LiftingEntry,
} from '@/types';

const CATEGORIES = ['Groceries', 'Dining', 'Entertainment', 'Transport', 'Utilities', 'Shopping'];
const EXERCISES = ['Bench Press', 'Squats', 'Deadlifts', 'Pull-ups', 'Rows', 'Dips'];

function getRandomDate(daysBack: number): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toISOString().split('T')[0];
}

function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function generateMockAssets(): Asset[] {
  return [
    {
      id: '1',
      name: 'Checking Account',
      type: 'cash',
      value: 5200,
      currency: 'USD',
    },
    {
      id: '2',
      name: 'Savings Account',
      type: 'savings',
      value: 25000,
      currency: 'USD',
    },
    {
      id: '3',
      name: 'Brokerage Account',
      type: 'stocks',
      value: 85500,
      currency: 'USD',
    },
    {
      id: '4',
      name: 'Crypto Portfolio',
      type: 'crypto',
      value: 8200,
      currency: 'USD',
    },
    {
      id: '5',
      name: '401(k)',
      type: 'retirement',
      value: 125000,
      currency: 'USD',
    },
    {
      id: '6',
      name: 'Home',
      type: 'real_estate',
      value: 450000,
      currency: 'USD',
    },
  ];
}

export function generateMockDebts(): Debt[] {
  return [
    {
      id: '1',
      name: 'Mortgage',
      type: 'mortgage',
      balance: 320000,
      interestRate: 4.2,
      minimumPayment: 1850,
      currency: 'USD',
    },
    {
      id: '2',
      name: 'Credit Card',
      type: 'credit_card',
      balance: 2100,
      interestRate: 18.5,
      minimumPayment: 60,
      currency: 'USD',
    },
  ];
}

export function generateMockMonthlySpending() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month) => ({
    month,
    amount: getRandomInRange(2500, 4000),
    category: 'Total Spending',
  }));
}

export function generateMockBudget() {
  return CATEGORIES.map((category) => ({
    category,
    allocated: getRandomInRange(200, 800),
    spent: getRandomInRange(150, 750),
    currency: 'USD',
  }));
}

export function generateMockFinanceData(): FinanceData {
  return {
    assets: generateMockAssets(),
    debts: generateMockDebts(),
    monthlySpending: generateMockMonthlySpending(),
    budget: generateMockBudget(),
  };
}

export function generateMockWeightData(): WeightEntry[] {
  const data: WeightEntry[] = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      weight: getRandomInRange(70, 75),
      unit: 'kg',
    });
  }
  return data;
}

export function generateMockRunData(): RunEntry[] {
  const data: RunEntry[] = [];
  const runDays = [0, 2, 3, 5, 7, 9, 12, 14, 16, 19, 21, 23, 26, 28];
  
  runDays.forEach((day) => {
    const date = new Date();
    date.setDate(date.getDate() - day);
    const distance = getRandomInRange(3, 12);
    const pace = getRandomInRange(4.5, 6.5);
    
    data.push({
      id: `run-${day}`,
      date: date.toISOString().split('T')[0],
      distance,
      duration: distance / pace * 60,
      pace,
      unit: 'km',
    });
  });
  
  return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function generateMockLiftingData(): LiftingEntry[] {
  const data: LiftingEntry[] = [];
  let id = 0;
  
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (i * 3));
    
    EXERCISES.forEach((exercise) => {
      data.push({
        id: `lift-${id++}`,
        date: date.toISOString().split('T')[0],
        exercise,
        sets: Math.floor(getRandomInRange(3, 5)),
        reps: Math.floor(getRandomInRange(6, 12)),
        weight: getRandomInRange(50, 120),
        unit: 'kg',
      });
    });
  }
  
  return data;
}

export function generateMockStepsData(): StepsEntry[] {
  const data: StepsEntry[] = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      steps: Math.floor(getRandomInRange(4000, 12000)),
      distance: getRandomInRange(2, 6),
      calories: Math.floor(getRandomInRange(200, 600)),
    });
  }
  return data;
}

export function generateMockMacrosData(): MacrosEntry[] {
  const data: MacrosEntry[] = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      protein: getRandomInRange(100, 150),
      carbs: getRandomInRange(200, 300),
      fat: getRandomInRange(50, 80),
      calories: getRandomInRange(1800, 2500),
    });
  }
  return data;
}

export function generateMockFitnessData(): FitnessData {
  return {
    weight: generateMockWeightData(),
    runs: generateMockRunData(),
    lifting: generateMockLiftingData(),
    steps: generateMockStepsData(),
    macros: generateMockMacrosData(),
  };
}

export function generateMockGoals(): Goal[] {
  return [
    {
      id: '1',
      title: 'Save $50,000',
      category: 'financial',
      targetValue: 50000,
      currentValue: 35200,
      unit: 'USD',
      targetDate: '2025-12-31',
      priority: 'high',
      description: 'Emergency fund and savings goal',
    },
    {
      id: '2',
      title: 'Reach $500k Net Worth',
      category: 'financial',
      targetValue: 500000,
      currentValue: 448900,
      unit: 'USD',
      targetDate: '2026-06-30',
      priority: 'high',
      description: 'Medium-term wealth milestone',
    },
    {
      id: '3',
      title: 'Run a 5K in under 25 minutes',
      category: 'fitness',
      targetValue: 25,
      currentValue: 28,
      unit: 'minutes',
      targetDate: '2025-06-30',
      priority: 'medium',
      description: 'Personal running performance goal',
    },
    {
      id: '4',
      title: 'Reach 70kg bodyweight',
      category: 'fitness',
      targetValue: 70,
      currentValue: 72.5,
      unit: 'kg',
      targetDate: '2025-08-31',
      priority: 'medium',
      description: 'Health and fitness goal',
    },
    {
      id: '5',
      title: 'Read 24 books',
      category: 'personal',
      targetValue: 24,
      currentValue: 8,
      unit: 'books',
      targetDate: '2025-12-31',
      priority: 'low',
      description: 'Annual reading goal',
    },
  ];
}

export function generateMockGoalData(): GoalData {
  return {
    goals: generateMockGoals(),
  };
}
