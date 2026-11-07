'use client';

import { Suspense, useMemo } from 'react';
import { generateMockFinanceData, generateMockFitnessData, generateMockGoals } from '@/data/mock/generators';
import {
  calculateNetWorth,
  calculateTotalAssets,
  calculateTotalDebts,
  calculateSavingsRate,
  formatCurrency,
  formatNumber,
} from '@/lib/utils';
import { MetricCard, Card, ProgressBar } from '@/components/ui/Card';
import { LineChartComponent } from '@/components/charts/Charts';
import { TrendingUp, DollarSign, Heart, Target } from 'lucide-react';

function OverviewContent() {
  const financeData = useMemo(() => generateMockFinanceData(), []);
  const fitnessData = useMemo(() => generateMockFitnessData(), []);
  const goals = useMemo(() => generateMockGoals(), []);

  const netWorth = calculateNetWorth(financeData.assets, financeData.debts);
  const totalAssets = calculateTotalAssets(financeData.assets);
  const totalDebts = calculateTotalDebts(financeData.debts);

  const currentMonth = financeData.monthlySpending[financeData.monthlySpending.length - 1];
  const previousMonth = financeData.monthlySpending[financeData.monthlySpending.length - 2];
  const spendingTrend =
    previousMonth && currentMonth
      ? ((currentMonth.amount - previousMonth.amount) / previousMonth.amount) * 100
      : 0;

  const currentWeight = fitnessData.weight[fitnessData.weight.length - 1];
  const previousWeight = fitnessData.weight[Math.max(0, fitnessData.weight.length - 8)];
  const weightChange = previousWeight ? currentWeight.weight - previousWeight.weight : 0;

  const todaySteps = fitnessData.steps[fitnessData.steps.length - 1]?.steps || 0;
  const weeklyAvgSteps =
    fitnessData.steps.slice(-7).reduce((sum, entry) => sum + entry.steps, 0) / 7;

  const highPriorityGoals = goals.filter((g) => g.priority === 'high').slice(0, 3);

  const chartData = financeData.monthlySpending.map((item) => ({
    name: item.month,
    Spending: item.amount,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Net Worth"
          value={formatCurrency(netWorth)}
          subtext={`Assets: ${formatCurrency(totalAssets)} | Debts: ${formatCurrency(totalDebts)}`}
          icon={<DollarSign className="w-8 h-8" />}
        />
        <MetricCard
          label="Monthly Spending"
          value={formatCurrency(currentMonth?.amount || 0)}
          subtext="Last month"
          trend={
            spendingTrend !== 0
              ? { value: Math.abs(spendingTrend), direction: spendingTrend > 0 ? 'up' : 'down' }
              : undefined
          }
          icon={<TrendingUp className="w-8 h-8" />}
        />
        <MetricCard
          label="Current Weight"
          value={`${formatNumber(currentWeight.weight, 1)} ${currentWeight.unit}`}
          subtext={weightChange !== 0 ? `${weightChange > 0 ? '+' : ''}${formatNumber(weightChange, 1)} ${currentWeight.unit}` : 'Stable'}
          icon={<Heart className="w-8 h-8" />}
        />
        <MetricCard
          label="Today Steps"
          value={todaySteps.toLocaleString()}
          subtext={`Weekly avg: ${Math.round(weeklyAvgSteps).toLocaleString()}`}
          icon={<Target className="w-8 h-8" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Monthly Spending Trend">
            <LineChartComponent
              data={chartData}
              dataKey="Spending"
              xAxisKey="name"
              stroke="#3b82f6"
            />
          </Card>
        </div>

        <div>
          <Card title="Budget Overview">
            <div className="space-y-4">
              {financeData.budget.slice(0, 4).map((budget) => (
                <div key={budget.category}>
                  <ProgressBar
                    value={budget.spent}
                    max={budget.allocated}
                    label={budget.category}
                    showPercentage
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Top Financial Goals">
          <div className="space-y-4">
            {highPriorityGoals
              .filter((g) => g.category === 'financial')
              .map((goal) => (
                <div key={goal.id}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-900">{goal.title}</span>
                    <span className="text-sm text-gray-500">
                      {formatCurrency(goal.currentValue)} / {formatCurrency(goal.targetValue)}
                    </span>
                  </div>
                  <ProgressBar
                    value={goal.currentValue}
                    max={goal.targetValue}
                    showPercentage={false}
                  />
                </div>
              ))}
          </div>
        </Card>

        <Card title="Fitness Goals">
          <div className="space-y-4">
            {highPriorityGoals
              .filter((g) => g.category === 'fitness')
              .map((goal) => (
                <div key={goal.id}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-900">{goal.title}</span>
                    <span className="text-sm text-gray-500">
                      {formatNumber(goal.currentValue, 1)} / {formatNumber(goal.targetValue, 1)} {goal.unit}
                    </span>
                  </div>
                  <ProgressBar
                    value={goal.currentValue}
                    max={goal.targetValue}
                    showPercentage={false}
                  />
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function OverviewPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading overview...</div>}>
      <OverviewContent />
    </Suspense>
  );
}
