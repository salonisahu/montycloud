import { BaseChart } from "./BaseChart";

interface PieChartProps {
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

export const PieChart = ({ data, options, className, width, height }: PieChartProps) => {
  return <BaseChart type="pie" data={data} options={options} className={className} width={width} height={height} />;
};
