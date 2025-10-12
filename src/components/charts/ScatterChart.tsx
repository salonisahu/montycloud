import { BaseChart } from "./BaseChart";

interface ScatterChartProps {
  data: {
    datasets: {
      label: string;
      data: { x: number; y: number }[];
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
    }[];
  };
  options?: any;
  className?: string;
  width?: number;
  height?: number;
}

export const ScatterChart = ({ data, options, className, width, height }: ScatterChartProps) => {
  return <BaseChart type="scatter" data={data} options={options} className={className} width={width} height={height} />;
};
