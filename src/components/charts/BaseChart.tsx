import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler,
  LineController,
  BarController,
  PieController,
  DoughnutController,
  PolarAreaController,
  RadarController,
  ScatterController,
  BubbleController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

// Register all Chart.js components and controllers
ChartJS.register(
  // Controllers
  LineController,
  BarController,
  PieController,
  DoughnutController,
  PolarAreaController,
  RadarController,
  ScatterController,
  BubbleController,
  // Elements
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  // Scales
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  // Plugins
  Title,
  Tooltip,
  Legend
);

interface BaseChartProps {
  type: "bar" | "line" | "pie" | "doughnut" | "polarArea" | "radar" | "scatter" | "bubble";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
  className?: string;
  width?: number;
  height?: number;
}

export const BaseChart = ({ type, data, options, className = "", width, height }: BaseChartProps) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart",
      },
    },
    ...options,
  };

  return (
    <div className={`w-full h-full ${className}`} style={{ width, height }}>
      <Chart type={type} data={data} options={defaultOptions} />
    </div>
  );
};
