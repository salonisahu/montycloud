import { BaseChart } from "./BaseChart";

interface RadarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
      borderWidth?: number;
    }[];
  };
  options?: any;
  className?: string;
  width?: number;
  height?: number;
}

export function RadarChart({ data, options, className, width, height }: RadarChartProps) {
  return <BaseChart type="radar" data={data} options={options} className={className} width={width} height={height} />;
}
