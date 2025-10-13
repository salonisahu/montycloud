import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, AlertCircle, Info, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/hooks/useData";
import { formatNotificationTime } from "@/lib/utils";
import { toast } from "sonner";

const Notification = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useData();
  const { notifications } = state;

  const notification = notifications.find((n) => n.id === id);

  if (!notification) {
    return null;
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "error":
        return "destructive" as const;
      case "warning":
        return "secondary" as const;
      case "info":
        return "default" as const;
      default:
        return "outline" as const;
    }
  };

  return (
    <div className="space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{notification.title}</h1>
            <p className="text-muted-foreground">{formatNotificationTime(notification.ts)}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Notification Details</CardTitle>
              <Badge variant={getLevelBadgeVariant(notification.level)}>{notification.level.toUpperCase()}</Badge>
            </div>
            <CardDescription>Detailed information about this notification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">Message</h3>
              <p className="text-foreground">{notification.message}</p>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">Level</h3>
              <div className="flex items-center gap-2">
                {getLevelIcon(notification.level)}
                <span className="capitalize">{notification.level}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">Timestamp</h3>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{formatNotificationTime(notification.ts)}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">Notification ID</h3>
              <code className="text-sm bg-muted px-2 py-1 rounded">{notification.id}</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Actions</CardTitle>
            <CardDescription>Available actions for this notification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  toast.success("Resolved!");
                  navigate("/");
                }}
              >
                Mark as Resolved
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  toast.success("Closed!");
                  navigate("/");
                }}
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notification;
