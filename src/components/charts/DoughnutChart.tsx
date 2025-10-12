"use client";

import { BaseChart } from "./BaseChart";

interface DoughnutChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
  className?: string;
  width?: number;
  height?: number;
}

export function DoughnutChart({
  data,
  options,
  className,
  width,
  height,
}: DoughnutChartProps) {
  return (
    <BaseChart
      type="doughnut"
      data={data}
      options={options}
      className={className}
      width={width}
      height={height}
    />
  );
}
