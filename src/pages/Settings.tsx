import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Settings() {
  return (
    <div className="space-y-6 bg-background min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Configure your MontyCloud preferences
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 rounded-lg">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Email Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex justify-between items-center">
                <span>Two-Factor Authentication</span>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex justify-between items-center">
                <span>Auto Backup</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Preferences</CardTitle>
            <CardDescription>Configure system behavior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Dark Mode</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex justify-between items-center">
                <span>Auto Updates</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex justify-between items-center">
                <span>Performance Mode</span>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>Configure advanced system options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Save Changes
            </button>
            <button className="px-4 py-2 border border-border rounded-md hover:bg-accent">
              Reset to Defaults
            </button>
            <button className="px-4 py-2 border border-border rounded-md hover:bg-accent">
              Export Settings
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
