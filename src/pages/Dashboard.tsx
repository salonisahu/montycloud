import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { BarChart, LineChart, PieChart, DoughnutChart, PolarAreaChart, RadarChart, ScatterChart, BubbleChart } from "@/components/charts";
import { useData } from "@/hooks/useData";

const Dashboard = () => {
  const { state } = useData();
  const { monitoring } = state;
  return (
    <div className="space-y-6 bg-background min-h-screen">
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">System Monitoring</h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Real-time system monitoring with interactive charts showing CPU, memory, disk usage, and network performance metrics.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <p className="text-muted-foreground">Real-time monitoring and analytics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 rounded-lg">
        <Card>
          <CardHeader>
            <CardTitle>CPU Usage</CardTitle>
            <CardDescription>Current CPU utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">45%</div>
            <p className="text-xs text-muted-foreground">Normal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Memory Usage</CardTitle>
            <CardDescription>RAM utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">78%</div>
            <p className="text-xs text-muted-foreground">High</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network I/O</CardTitle>
            <CardDescription>Network traffic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2.4 GB/s</div>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disk Usage</CardTitle>
            <CardDescription>Storage utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">62%</div>
            <p className="text-xs text-muted-foreground">Moderate</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 rounded-lg">
        {/* CPU and Memory Usage Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>CPU & Memory Usage Over Time</CardTitle>
            <CardDescription>24-hour CPU and memory utilization trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <LineChart
                data={monitoring.cpuUsage}
                options={{
                  plugins: {
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      ticks: {
                        callback: function (value: unknown) {
                          return value + "%";
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Memory Usage Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Memory Usage by Service</CardTitle>
            <CardDescription>Current memory allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <BarChart
                data={monitoring.memoryUsage}
                options={{
                  plugins: {
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function (value: unknown) {
                          return value + " GB";
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Disk Usage Doughnut Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Disk Usage by Partition</CardTitle>
            <CardDescription>Storage distribution across partitions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <DoughnutChart
                data={monitoring.diskUsage}
                options={{
                  plugins: {
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Network Traffic Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Network Traffic by Protocol</CardTitle>
            <CardDescription>Traffic distribution by protocol type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <PieChart
                data={monitoring.networkTraffic}
                options={{
                  plugins: {
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Performance Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>System Performance Metrics</CardTitle>
            <CardDescription>Multi-dimensional performance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <RadarChart
                data={monitoring.performance}
                options={{
                  plugins: {
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Load Polar Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>System Load Distribution</CardTitle>
            <CardDescription>Load distribution across system components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <PolarAreaChart
                data={monitoring.systemLoad}
                options={{
                  plugins: {
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Error Rate vs Response Time Scatter Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Error Rate vs Response Time</CardTitle>
            <CardDescription>Correlation between response time and error rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ScatterChart
                data={monitoring.errorResponse}
                options={{
                  plugins: {
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Response Time (ms)",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Error Rate (%)",
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Resource Utilization Bubble Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization</CardTitle>
            <CardDescription>CPU, Memory, and Load correlation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <BubbleChart
                data={monitoring.resourceUtilization}
                options={{
                  plugins: {
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "CPU Usage",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Memory Usage",
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
