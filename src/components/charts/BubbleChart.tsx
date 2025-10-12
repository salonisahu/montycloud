import { BaseChart } from "./BaseChart";

interface BubbleChartProps {
  data: {
    datasets: {
      label: string;
      data: { x: number; y: number; r: number }[];
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
    }[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
  className?: string;
  width?: number;
  height?: number;
}

export const BubbleChart = ({ data, options, className, width, height }: BubbleChartProps) => {
  return <BaseChart type="bubble" data={data} options={options} className={className} width={width} height={height} />;
};
