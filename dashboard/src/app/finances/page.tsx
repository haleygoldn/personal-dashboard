'use client';

import { Suspense, useMemo } from 'react';
import { generateMockFinanceData } from '@/data/mock/generators';
import { calculateNetWorth, calculateTotalAssets, calculateTotalDebts, formatCurrency } from '@/lib/utils';
import { Card, MetricCard, ListItem, ProgressBar } from '@/components/ui/Card';
import { PieChartComponent, StackedBarChart } from '@/components/charts/Charts';
import { TrendingUp, AlertCircle, CreditCard, Home } from 'lucide-react';

function FinancesContent() {
  const financeData = useMemo(() => generateMockFinanceData(), []);

  const netWorth = calculateNetWorth(financeData.assets, financeData.debts);
  const totalAssets = calculateTotalAssets(financeData.assets);
  const totalDebts = calculateTotalDebts(financeData.debts);

  const assetsByType = financeData.assets.reduce(
    (acc, asset) => {
      const existing = acc.find((item) => item.name === asset.type);
      if (existing) {
        existing.value += asset.value;
      } else {
        acc.push({ name: asset.type.replace('_', ' '), value: asset.value });
      }
      return acc;
    },
    [] as { name: string; value: number }[]
  );

  const debtTotal = financeData.debts.reduce((sum, debt) => sum + debt.balance, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Assets"
          value={formatCurrency(totalAssets)}
          icon={<TrendingUp className="w-8 h-8 text-green-500" />}
        />
        <MetricCard
          label="Total Debts"
          value={formatCurrency(totalDebts)}
          icon={<AlertCircle className="w-8 h-8 text-red-500" />}
        />
        <MetricCard
          label="Net Worth"
          value={formatCurrency(netWorth)}
          trend={{ value: 2.5, direction: 'up' }}
          icon={<Home className="w-8 h-8 text-blue-500" />}
        />
        <MetricCard
          label="Debt to Asset Ratio"
          value={`${((totalDebts / totalAssets) * 100).toFixed(1)}%`}
          icon={<CreditCard className="w-8 h-8 text-orange-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Asset Allocation">
          <PieChartComponent
            data={assetsByType}
            dataKey="value"
            nameKey="name"
            colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']}
          />
        </Card>

        <Card title="Assets by Type">
          <div className="space-y-3">
            {financeData.assets.map((asset) => (
              <ListItem
                key={asset.id}
                label={asset.name}
                value={formatCurrency(asset.value)}
                subtext={asset.type.replace('_', ' ')}
              />
            ))}
          </div>
        </Card>
      </div>

      <Card title="Debts">
        <div className="space-y-4">
          {financeData.debts.map((debt) => (
            <div key={debt.id} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">{debt.name}</p>
                  <p className="text-xs text-gray-500">{debt.type.replace('_', ' ')}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(debt.balance)}</p>
                  <p className="text-xs text-gray-500">{debt.interestRate.toFixed(1)}% APR</p>
                </div>
              </div>
              <ProgressBar
                value={debt.balance}
                max={Math.max(debt.balance, 100000)}
                showPercentage={false}
              />
              <p className="text-xs text-gray-500 mt-2">
                Min Payment: {formatCurrency(debt.minimumPayment)}/month
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Spending by Category">
        <StackedBarChart
          data={financeData.budget.map((item) => ({
            name: item.category,
            Allocated: item.allocated,
            Spent: item.spent,
          }))}
          dataKeys={['Allocated', 'Spent']}
          colors={['#e5e7eb', '#ef4444']}
          xAxisKey="name"
        />
      </Card>

      <Card title="Budget Status">
        <div className="space-y-6">
          {financeData.budget.map((budget) => {
            const percentage = (budget.spent / budget.allocated) * 100;
            const remaining = budget.allocated - budget.spent;
            return (
              <div key={budget.category}>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="font-medium text-gray-900">{budget.category}</p>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(budget.spent)} of {formatCurrency(budget.allocated)}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      remaining >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {remaining >= 0 ? '+' : ''} {formatCurrency(remaining)} left
                  </span>
                </div>
                <ProgressBar
                  value={budget.spent}
                  max={budget.allocated}
                  showPercentage={false}
                />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default function FinancesPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading finances...</div>}>
      <FinancesContent />
    </Suspense>
  );
}
