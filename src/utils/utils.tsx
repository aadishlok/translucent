import React from 'react';
import type { PieLabelRenderProps } from 'recharts';
import TranslucentBarChart from '../components/TranslucentBarChart.tsx';
import TranslucentPieChart from '../components/TranslucentPieChart.tsx';

type DenialsData = {
    id: string,
    department: string,
    amount: number,
    reason: string,
    date: string,
    payer: string,
}

type ChartData = {
    data: DenialsData[],
    field: keyof DenialsData,
}

enum CHART_TYPE {
  'BAR',
  'PIE'
}

const MAP_CHART_TYPE_TO_COMPONENT = {
  [CHART_TYPE.BAR]: TranslucentBarChart,
  [CHART_TYPE.PIE]: TranslucentPieChart,
}

const RADIAN = Math.PI / 180;

const getTotalsByField = ({data, field}: ChartData) => {
   const counts = data.reduce<Record<string, number>>((acc, item) => {
    acc[item[field]] = (acc[item[field]] ?? 0) + 1
    return acc
  }, {})

  return Object.entries(counts).map(([acc, count]) => ({
    type: acc,
    value: count,
  }));
}

const renderCustomizedLabel = (props: PieLabelRenderProps, selectedDepartment: string) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  
  const radius = Number(outerRadius) + 20;
  const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
  const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={selectedDepartment === name ? "#d3d3f2" : "#333"}
      textAnchor={Number(x) > Number(cx) ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: 12, fontWeight: 500 }}
    >
      {`${name} (${((percent ?? 0) * 100).toFixed(1)}%)`}
    </text>
  );
};

export {
  MAP_CHART_TYPE_TO_COMPONENT,
  CHART_TYPE,
  DenialsData,
  ChartData,
  getTotalsByField,
  renderCustomizedLabel
}