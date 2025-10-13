import { createContext, useContext, useEffect, useMemo, useCallback, useState } from "react";
import { toast } from "sonner";

type NotificationItem = {
  id: string;
  ts: number;
  level: "info" | "warning" | "error";
  title: string;
  message: string;
};

type DataState = {
  notifications: NotificationItem[];
};

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Define notification templates as array of objects
const NOTIFICATION_TEMPLATES = [
  {
    issue: "CPU spike detected",
    title: "CPU Spike Alert",
    type: "warning" as const,
  },
  {
    issue: "Memory pressure increased",
    title: "Memory Pressure Warning",
    type: "warning" as const,
  },
  {
    issue: "Instance restarted",
    title: "Instance Restart",
    type: "info" as const,
  },
  {
    issue: "Disk nearing capacity",
    title: "Disk Space Critical",
    type: "error" as const,
  },
  {
    issue: "Network latency elevated",
    title: "Network Latency Alert",
    type: "warning" as const,
  },
  {
    issue: "Service deployed",
    title: "Deployment Complete",
    type: "info" as const,
  },
  {
    issue: "Database connection lost",
    title: "Database Connection Error",
    type: "error" as const,
  },
  {
    issue: "High CPU usage detected",
    title: "High CPU Usage",
    type: "warning" as const,
  },
  {
    issue: "Memory leak detected",
    title: "Memory Leak Detected",
    type: "error" as const,
  },
  {
    issue: "Service unavailable",
    title: "Service Down",
    type: "error" as const,
  },
  {
    issue: "Backup completed",
    title: "Backup Success",
    type: "info" as const,
  },
  {
    issue: "Security alert",
    title: "Security Alert",
    type: "error" as const,
  },
] as const;

function makeNotification(): NotificationItem {
  const template = pick(NOTIFICATION_TEMPLATES);
  const target = `on ${pick(["srv", "worker", "db", "cache"]) + "-" + randInt(1000, 1024)}`;

  return {
    id: crypto.randomUUID(),
    ts: Date.now(),
    level: template.type,
    title: template.title,
    message: `${template.issue} ${target}`,
  };
}

function showNotificationToast(notification: NotificationItem): void {
  const baseOptions = {
    description: notification.message,
    position: "top-center",
  };

  // Define colors based on notification level
  const levelStyles = {
    info: {
      backgroundColor: "#2563eb", // blue
      color: "white",
    },
    warning: {
      backgroundColor: "#f59e0b", // amber
      color: "black",
    },
    error: {
      backgroundColor: "#dc2626", // red
      color: "white",
    },
    default: {
      backgroundColor: "#6b7280", // gray
      color: "white",
    },
  };

  const commonStyle = {
    borderRadius: "6px",
    padding: "6px 12px",
    fontWeight: "500",
  };

  const styles = {
    ...commonStyle,
    ...(levelStyles[notification.level] || levelStyles.default),
  };

  switch (notification.level) {
    case "info":
      toast.info(notification.title, {
        ...baseOptions,
        duration: 4000,
        action: {
          label: "View",
          onClick: () => console.log("View notification:", notification.id),
        },
        actionButtonStyle: styles,
      });
      break;
    case "warning":
      toast.warning(notification.title, {
        ...baseOptions,
        duration: 5000,
        action: {
          label: "Investigate",
          onClick: () => console.log("Investigate warning:", notification.id),
        },
        actionButtonStyle: styles,
      });
      break;
    case "error":
      toast.error(notification.title, {
        ...baseOptions,
        duration: 6000,
        action: {
          label: "Fix Now",
          onClick: () => console.log("Fix error:", notification.id),
        },
        actionButtonStyle: styles,
      });
      break;
    default:
      toast(notification.title, {
        ...baseOptions,
        duration: 4000,
      });
  }
}

const recentNotifications = new Map<string, number>();
const DUPLICATE_THRESHOLD = 5000;

function isDuplicateNotification(notification: NotificationItem): boolean {
  const key = `${notification.level}-${notification.title}`;
  const now = Date.now();
  const lastSeen = recentNotifications.get(key);

  if (lastSeen && now - lastSeen < DUPLICATE_THRESHOLD) {
    return true;
  }

  recentNotifications.set(key, now);

  for (const [k, timestamp] of recentNotifications.entries()) {
    if (now - timestamp > DUPLICATE_THRESHOLD) {
      recentNotifications.delete(k);
    }
  }

  return false;
}

const DataContext = createContext<{
  state: DataState;
  addNotification: (notification: NotificationItem) => void;
  markAllAsRead: () => void;
  clearAllNotifications: () => void;
} | null>(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<DataState>({
    notifications: [],
  });

  // Helper function to manually add notifications (useful for testing)
  const addNotification = useCallback((notification: NotificationItem) => {
    if (!isDuplicateNotification(notification)) {
      showNotificationToast(notification);
    }
    setState((prev) => ({
      ...prev,
      notifications: [notification, ...prev.notifications].slice(0, 50),
    }));
  }, []);

  // Mark all notifications as read (for now, just clear them since we don't have read status)
  const markAllAsRead = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: [],
    }));
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: [],
    }));
  }, []);

  // Simulate periodic notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.7) {
        const notification = makeNotification();
        if (!isDuplicateNotification(notification)) {
          showNotificationToast(notification);
        }
        setState((prev) => ({
          ...prev,
          notifications: [notification, ...prev.notifications].slice(0, 50),
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const value = useMemo(
    () => ({
      state,
      addNotification,
      markAllAsRead,
      clearAllNotifications,
    }),
    [state, addNotification, markAllAsRead, clearAllNotifications]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
