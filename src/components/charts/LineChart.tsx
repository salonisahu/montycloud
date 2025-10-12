import { BaseChart } from "./BaseChart";

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
      tension?: number;
      fill?: boolean;
    }[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
  className?: string;
  width?: number;
  height?: number;
}

export function LineChart({
  data,
  options,
  className,
  width,
  height,
}: LineChartProps) {
  return (
    <BaseChart
      type="line"
      data={data}
      options={options}
      className={className}
      width={width}
      height={height}
    />
  );
}
