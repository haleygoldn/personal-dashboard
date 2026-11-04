// Bank/budgeting data integration placeholder
// Supports CSV exports, Plaid API (future), and local JSON

export interface Transaction {
  date: string;
  merchant: string;
  category: string;
  amount: number;
  type: 'debit' | 'credit';
  accountId?: string;
}

export interface BudgetCategory {
  name: string;
  monthlyBudget: number;
  spent: number;
  remainingBudget: number;
  percentageUsed: number;
}

export async function getBankData(exportPath: string): Promise<Transaction[]> {
  // TODO: Implement reading from data/private/bank.json or CSV exports
  // Support common formats: CSV, OFX, Plaid API (future)
  return [];
}

export async function getBudgetData(): Promise<BudgetCategory[]> {
  // TODO: Calculate budget from transactions and budget targets
  return [];
}
