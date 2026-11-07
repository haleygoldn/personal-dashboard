'use client';

import { Suspense, useMemo } from 'react';
import { generateMockFitnessData } from '@/data/mock/generators';
import { formatNumber, formatDate } from '@/lib/utils';
import { Card, MetricCard, ListItem, ProgressBar } from '@/components/ui/Card';
import { LineChartComponent, BarChartComponent } from '@/components/charts/Charts';
import { Activity, Heart, Zap, TrendingUp } from 'lucide-react';

function FitnessContent() {
  const fitnessData = useMemo(() => generateMockFitnessData(), []);

  const currentWeight = fitnessData.weight[fitnessData.weight.length - 1];
  const startWeight = fitnessData.weight[0];
  const weightChange = currentWeight.weight - startWeight.weight;

  const lastRun = fitnessData.runs[fitnessData.runs.length - 1];
  
  const totalLifting = fitnessData.lifting.length;
  const avgLiftsPerWeek = (totalLifting / 4).toFixed(1);

  const totalSteps = fitnessData.steps.reduce((sum, entry) => sum + entry.steps, 0);
  const avgSteps = Math.round(totalSteps / fitnessData.steps.length);
  
  const lastMacros = fitnessData.macros[fitnessData.macros.length - 1];
  const avgCalories = Math.round(
    fitnessData.macros.reduce((sum, entry) => sum + entry.calories, 0) / fitnessData.macros.length
  );

  const weightChartData = fitnessData.weight.map((entry) => ({
    date: entry.date.split('-').slice(1).join('-'),
    Weight: entry.weight,
  }));

  const stepsChartData = fitnessData.steps.slice(-14).map((entry) => ({
    date: entry.date.split('-')[2],
    Steps: entry.steps,
  }));

  const macrosChartData = fitnessData.macros.slice(-7).map((entry) => ({
    date: entry.date.split('-')[2],
    Protein: entry.protein,
    Carbs: entry.carbs,
    Fat: entry.fat,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Current Weight"
          value={`${formatNumber(currentWeight.weight, 1)} ${currentWeight.unit}`}
          subtext={weightChange !== 0 ? `${weightChange > 0 ? '+' : ''}${formatNumber(weightChange, 1)} ${currentWeight.unit}` : 'Stable'}
          icon={<Heart className="w-8 h-8 text-red-500" />}
          trend={
            weightChange !== 0
              ? { value: Math.abs(weightChange), direction: weightChange > 0 ? 'up' : 'down' }
              : undefined
          }
        />
        <MetricCard
          label="Avg Daily Steps"
          value={avgSteps.toLocaleString()}
          subtext="Last 30 days"
          icon={<Activity className="w-8 h-8 text-blue-500" />}
        />
        <MetricCard
          label="Lifts This Month"
          value={totalLifting}
          subtext={`${avgLiftsPerWeek} per week`}
          icon={<Zap className="w-8 h-8 text-yellow-500" />}
        />
        <MetricCard
          label="Avg Calories"
          value={avgCalories}
          subtext="Daily average"
          icon={<TrendingUp className="w-8 h-8 text-orange-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Weight Trend">
          <LineChartComponent
            data={weightChartData}
            dataKey="Weight"
            xAxisKey="date"
            stroke="#ef4444"
          />
        </Card>

        <Card title="Last Run">
          {lastRun ? (
            <div className="space-y-4">
              <ListItem
                label="Date"
                value={formatDate(lastRun.date)}
              />
              <ListItem
                label="Distance"
                value={`${formatNumber(lastRun.distance, 2)} ${lastRun.unit}`}
              />
              <ListItem
                label="Duration"
                value={`${Math.round(lastRun.duration)} min`}
              />
              <ListItem
                label="Pace"
                value={`${formatNumber(lastRun.pace, 2)} min/${lastRun.unit}`}
              />
            </div>
          ) : (
            <p className="text-gray-500">No runs recorded</p>
          )}
        </Card>
      </div>

      <Card title="Daily Steps (Last 14 Days)">
        <BarChartComponent
          data={stepsChartData}
          dataKey="Steps"
          xAxisKey="date"
          fill="#3b82f6"
        />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Latest Macros">
          {lastMacros ? (
            <div className="space-y-4">
              <ListItem
                label="Date"
                value={formatDate(lastMacros.date)}
              />
              <ListItem
                label="Protein"
                value={`${formatNumber(lastMacros.protein, 1)}g`}
              />
              <ListItem
                label="Carbs"
                value={`${formatNumber(lastMacros.carbs, 1)}g`}
              />
              <ListItem
                label="Fat"
                value={`${formatNumber(lastMacros.fat, 1)}g`}
              />
              <div className="border-t pt-3 mt-3">
                <ListItem
                  label="Total Calories"
                  value={`${lastMacros.calories} kcal`}
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No macros recorded</p>
          )}
        </Card>

        <Card title="Macros Trend (7 Days)">
          <BarChartComponent
            data={macrosChartData}
            dataKey="Protein"
            xAxisKey="date"
            fill="#3b82f6"
          />
        </Card>
      </div>

      <Card title="Recent Lifting Sessions">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {fitnessData.lifting.slice().reverse().slice(0, 15).map((lift) => (
            <div key={lift.id} className="border-b pb-3 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{lift.exercise}</p>
                  <p className="text-xs text-gray-500">{formatDate(lift.date)}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {lift.sets} × {lift.reps} @ {formatNumber(lift.weight, 0)}{lift.unit}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default function FitnessPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading fitness data...</div>}>
      <FitnessContent />
    </Suspense>
  );
}
