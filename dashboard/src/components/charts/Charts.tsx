'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LineChartComponentProps {
  data: any[];
  dataKey: string;
  stroke?: string;
  xAxisKey?: string;
}

export function LineChartComponent({
  data,
  dataKey,
  stroke = '#3b82f6',
  xAxisKey = 'name',
}: LineChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke={stroke} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface BarChartComponentProps {
  data: any[];
  dataKey: string;
  fill?: string;
  xAxisKey?: string;
}

export function BarChartComponent({
  data,
  dataKey,
  fill = '#3b82f6',
  xAxisKey = 'name',
}: BarChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey} fill={fill} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface PieChartComponentProps {
  data: any[];
  dataKey: string;
  nameKey?: string;
  colors?: string[];
}

export function PieChartComponent({
  data,
  dataKey,
  nameKey = 'name',
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
}: PieChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: $${value}`}
          outerRadius={100}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${value}`} />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface StackedBarChartProps {
  data: any[];
  dataKeys: string[];
  colors?: string[];
  xAxisKey?: string;
}

export function StackedBarChart({
  data,
  dataKeys,
  colors = ['#3b82f6', '#10b981'],
  xAxisKey = 'name',
}: StackedBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {dataKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colors[index % colors.length]}
            stackId="a"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
