import { BaseChart } from "./BaseChart";

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
  className?: string;
  width?: number;
  height?: number;
}

export function BarChart({
  data,
  options,
  className,
  width,
  height,
}: BarChartProps) {
  return (
    <BaseChart
      type="bar"
      data={data}
      options={options}
      className={className}
      width={width}
      height={height}
    />
  );
}
