import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  return (
    <div className="space-y-6 bg-background min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Cloud Services</h1>
        <p className="text-muted-foreground">Manage your cloud infrastructure services</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 rounded-lg">
        <Card>
          <CardHeader>
            <CardTitle>Web Applications</CardTitle>
            <CardDescription>Frontend and backend services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Active Services</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-green-600">Running</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Services</CardTitle>
            <CardDescription>Data storage and management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Active Services</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-green-600">Running</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Services</CardTitle>
            <CardDescription>Microservices and APIs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Active Services</span>
                <span className="font-medium">7</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-green-600">Running</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Management</CardTitle>
          <CardDescription>Deploy and manage your cloud services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button>Deploy New Service</Button>
            <Button>View All Services</Button>
            <Button>Service Logs</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Services;
