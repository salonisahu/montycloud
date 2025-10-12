"use client";

import { BaseChart } from "./BaseChart";

interface PolarAreaChartProps {
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

export function PolarAreaChart({
  data,
  options,
  className,
  width,
  height,
}: PolarAreaChartProps) {
  return (
    <BaseChart
      type="polarArea"
      data={data}
      options={options}
      className={className}
      width={width}
      height={height}
    />
  );
}
