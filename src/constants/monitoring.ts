// Monitoring page data and chart configurations

// CPU Usage over time (Line Chart)
export const cpuUsageData = {
  labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  datasets: [
    {
      label: "CPU Usage %",
      data: [25, 35, 45, 55, 40, 30],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      tension: 0.4,
      fill: false,
    },
    {
      label: "Memory Usage %",
      data: [40, 50, 60, 70, 55, 45],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
      fill: false,
    },
  ],
};

// Memory Usage by Service (Bar Chart)
export const memoryUsageData = {
  labels: ["Web Server", "Database", "Cache", "API Gateway", "Worker"],
  datasets: [
    {
      label: "Memory Usage (GB)",
      data: [2.4, 1.8, 0.6, 1.2, 0.9],
      backgroundColor: [
        "rgba(59, 130, 246, 0.8)",
        "rgba(16, 185, 129, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(239, 68, 68, 0.8)",
        "rgba(139, 92, 246, 0.8)",
      ],
      borderColor: [
        "rgb(59, 130, 246)",
        "rgb(16, 185, 129)",
        "rgb(245, 158, 11)",
        "rgb(239, 68, 68)",
        "rgb(139, 92, 246)",
      ],
      borderWidth: 1,
    },
  ],
};

// Disk Usage by Partition (Doughnut Chart)
export const diskUsageData = {
  labels: ["System", "Data", "Logs", "Backup", "Free"],
  datasets: [
    {
      data: [25, 40, 15, 10, 10],
      backgroundColor: [
        "rgba(239, 68, 68, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(59, 130, 246, 0.8)",
        "rgba(16, 185, 129, 0.8)",
        "rgba(156, 163, 175, 0.8)",
      ],
      borderColor: [
        "rgb(239, 68, 68)",
        "rgb(245, 158, 11)",
        "rgb(59, 130, 246)",
        "rgb(16, 185, 129)",
        "rgb(156, 163, 175)",
      ],
      borderWidth: 2,
    },
  ],
};

// Network Traffic by Protocol (Pie Chart)
export const networkTrafficData = {
  labels: ["HTTP", "HTTPS", "SSH", "Database", "Other"],
  datasets: [
    {
      data: [45, 35, 8, 7, 5],
      backgroundColor: [
        "rgba(59, 130, 246, 0.8)",
        "rgba(16, 185, 129, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(239, 68, 68, 0.8)",
        "rgba(156, 163, 175, 0.8)",
      ],
      borderColor: [
        "rgb(59, 130, 246)",
        "rgb(16, 185, 129)",
        "rgb(245, 158, 11)",
        "rgb(239, 68, 68)",
        "rgb(156, 163, 175)",
      ],
      borderWidth: 2,
    },
  ],
};

// Server Performance Metrics (Radar Chart)
export const performanceData = {
  labels: ["CPU", "Memory", "Disk I/O", "Network", "Response Time", "Uptime"],
  datasets: [
    {
      label: "Current Performance",
      data: [75, 85, 60, 90, 80, 95],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      borderWidth: 2,
    },
    {
      label: "Target Performance",
      data: [80, 80, 80, 80, 80, 80],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      borderWidth: 2,
    },
  ],
};

// Error Rate vs Response Time (Scatter Chart)
export const errorResponseData = {
  datasets: [
    {
      label: "Error Rate vs Response Time",
      data: [
        { x: 100, y: 0.5 },
        { x: 150, y: 1.2 },
        { x: 200, y: 2.1 },
        { x: 300, y: 3.5 },
        { x: 500, y: 5.2 },
        { x: 800, y: 8.1 },
        { x: 1200, y: 12.3 },
      ],
      backgroundColor: "rgba(239, 68, 68, 0.6)",
      borderColor: "rgb(239, 68, 68)",
      borderWidth: 1,
    },
  ],
};

// Resource Utilization (Bubble Chart)
export const resourceUtilizationData = {
  datasets: [
    {
      label: "Resource Utilization",
      data: [
        { x: 1, y: 2, r: 10 }, // CPU: 1, Memory: 2, Load: 10
        { x: 2, y: 3, r: 15 },
        { x: 3, y: 1, r: 8 },
        { x: 4, y: 4, r: 20 },
        { x: 5, y: 2, r: 12 },
        { x: 6, y: 5, r: 25 },
        { x: 7, y: 3, r: 18 },
      ],
      backgroundColor: "rgba(59, 130, 246, 0.6)",
      borderColor: "rgb(59, 130, 246)",
      borderWidth: 1,
    },
  ],
};

// System Load Distribution (Polar Area Chart)
export const systemLoadData = {
  labels: ["Web", "API", "Database", "Cache", "Queue", "Storage"],
  datasets: [
    {
      data: [30, 25, 20, 15, 10, 5],
      backgroundColor: [
        "rgba(59, 130, 246, 0.8)",
        "rgba(16, 185, 129, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(239, 68, 68, 0.8)",
        "rgba(139, 92, 246, 0.8)",
        "rgba(156, 163, 175, 0.8)",
      ],
      borderColor: [
        "rgb(59, 130, 246)",
        "rgb(16, 185, 129)",
        "rgb(245, 158, 11)",
        "rgb(239, 68, 68)",
        "rgb(139, 92, 246)",
        "rgb(156, 163, 175)",
      ],
      borderWidth: 2,
    },
  ],
};
