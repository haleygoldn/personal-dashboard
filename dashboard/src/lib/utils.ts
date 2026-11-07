import { Asset, Debt } from '@/types';

export function formatCurrency(value: number, currency: string = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function calculateNetWorth(assets: Asset[], debts: Debt[]): number {
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalDebts = debts.reduce((sum, debt) => sum + debt.balance, 0);
  return totalAssets - totalDebts;
}

export function calculateTotalAssets(assets: Asset[]): number {
  return assets.reduce((sum, asset) => sum + asset.value, 0);
}

export function calculateTotalDebts(debts: Debt[]): number {
  return debts.reduce((sum, debt) => sum + debt.balance, 0);
}

export function calculateDebtToIncomeRatio(totalDebt: number, monthlyIncome: number): number {
  return (totalDebt / (monthlyIncome * 12)) * 100;
}

export function calculateSavingsRate(income: number, spending: number): number {
  return ((income - spending) / income) * 100;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getProgressPercentage(current: number, target: number): number {
  return Math.min((current / target) * 100, 100);
}

export function getProgressColor(percentage: number): string {
  if (percentage >= 75) return 'text-green-600';
  if (percentage >= 50) return 'text-blue-600';
  if (percentage >= 25) return 'text-yellow-600';
  return 'text-red-600';
}

export function daysUntilTarget(targetDate: string): number {
  const target = new Date(targetDate);
  const today = new Date();
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function isTargetMet(current: number, target: number): boolean {
  return current >= target;
}

export function abbreviateNumber(value: number): string {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
  return value.toString();
}
