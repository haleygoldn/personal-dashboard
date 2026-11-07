'use client';

import { Suspense, useMemo } from 'react';
import { generateMockGoals } from '@/data/mock/generators';
import { formatCurrency, formatNumber, formatDate, daysUntilTarget, getProgressPercentage } from '@/lib/utils';
import { Card, MetricCard, ProgressBar } from '@/components/ui/Card';
import { Target, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

function GoalsContent() {
  const goals = useMemo(() => generateMockGoals(), []);

  const financialGoals = goals.filter((g) => g.category === 'financial');
  const fitnessGoals = goals.filter((g) => g.category === 'fitness');
  const personalGoals = goals.filter((g) => g.category === 'personal');

  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.currentValue >= g.targetValue).length;
  const completionRate = (completedGoals / totalGoals) * 100;

  const highPriorityGoals = goals.filter((g) => g.priority === 'high');

  const GoalCard = ({ goal }: { goal: typeof goals[0] }) => {
    const progress = getProgressPercentage(goal.currentValue, goal.targetValue);
    const daysLeft = daysUntilTarget(goal.targetDate);
    const isCompleted = goal.currentValue >= goal.targetValue;

    const priorityColor = {
      high: 'border-red-200 bg-red-50',
      medium: 'border-yellow-200 bg-yellow-50',
      low: 'border-blue-200 bg-blue-50',
    }[goal.priority];

    const priorityBadge = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-blue-100 text-blue-700',
    }[goal.priority];

    return (
      <div className={`border-l-4 p-4 rounded ${priorityColor}`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{goal.title}</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded ${priorityBadge}`}>
                {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
              </span>
            </div>
            <p className="text-sm text-gray-600">{goal.description}</p>
          </div>
          {isCompleted && (
            <span className="text-2xl">✓</span>
          )}
        </div>

        <div className="space-y-3">
          <ProgressBar
            value={goal.currentValue}
            max={goal.targetValue}
            label={`${formatNumber(goal.currentValue, 0)} / ${formatNumber(goal.targetValue, 0)} ${goal.unit}`}
            showPercentage
          />

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-white/60 rounded p-2">
              <p className="text-gray-600">Progress</p>
              <p className="font-semibold text-gray-900">{Math.round(progress)}%</p>
            </div>
            <div className="bg-white/60 rounded p-2">
              <p className="text-gray-600">Target Date</p>
              <p className="font-semibold text-gray-900">{formatDate(goal.targetDate)}</p>
            </div>
            <div className={`rounded p-2 ${daysLeft < 0 ? 'bg-red-100' : 'bg-white/60'}`}>
              <p className="text-gray-600">Days Left</p>
              <p className={`font-semibold ${daysLeft < 0 ? 'text-red-700' : 'text-gray-900'}`}>
                {daysLeft < 0 ? 'Overdue' : daysLeft}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Goals"
          value={totalGoals}
          icon={<Target className="w-8 h-8" />}
        />
        <MetricCard
          label="Completed"
          value={completedGoals}
          subtext={`${completionRate.toFixed(0)}% complete`}
          icon={<TrendingUp className="w-8 h-8 text-green-500" />}
        />
        <MetricCard
          label="In Progress"
          value={totalGoals - completedGoals}
          icon={<Calendar className="w-8 h-8 text-blue-500" />}
        />
        <MetricCard
          label="High Priority"
          value={highPriorityGoals.length}
          icon={<AlertCircle className="w-8 h-8 text-red-500" />}
        />
      </div>

      {highPriorityGoals.length > 0 && (
        <Card title="High Priority Goals">
          <div className="space-y-4">
            {highPriorityGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </Card>
      )}

      {financialGoals.length > 0 && (
        <Card title="Financial Goals">
          <div className="space-y-4">
            {financialGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </Card>
      )}

      {fitnessGoals.length > 0 && (
        <Card title="Fitness Goals">
          <div className="space-y-4">
            {fitnessGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </Card>
      )}

      {personalGoals.length > 0 && (
        <Card title="Personal Goals">
          <div className="space-y-4">
            {personalGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </Card>
      )}

      <Card title="Goal Summary by Category">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Financial Goals</p>
            <p className="text-3xl font-bold text-blue-600">{financialGoals.length}</p>
            <p className="text-xs text-gray-500 mt-2">
              {financialGoals.filter((g) => g.currentValue >= g.targetValue).length} completed
            </p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Fitness Goals</p>
            <p className="text-3xl font-bold text-green-600">{fitnessGoals.length}</p>
            <p className="text-xs text-gray-500 mt-2">
              {fitnessGoals.filter((g) => g.currentValue >= g.targetValue).length} completed
            </p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Personal Goals</p>
            <p className="text-3xl font-bold text-orange-600">{personalGoals.length}</p>
            <p className="text-xs text-gray-500 mt-2">
              {personalGoals.filter((g) => g.currentValue >= g.targetValue).length} completed
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function GoalsPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading goals...</div>}>
      <GoalsContent />
    </Suspense>
  );
}
