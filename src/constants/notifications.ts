import type { NotificationTemplate } from "@/types/notifications";

export const NOTIFICATION_TEMPLATES: readonly NotificationTemplate[] = [
    {
        issue: "CPU spike detected",
        title: "CPU Spike Alert",
        type: "warning",
    },
    {
        issue: "Memory pressure increased",
        title: "Memory Pressure Warning",
        type: "warning",
    },
    {
        issue: "Instance restarted",
        title: "Instance Restart",
        type: "info",
    },
    {
        issue: "Disk nearing capacity",
        title: "Disk Space Critical",
        type: "error",
    },
    {
        issue: "Network latency elevated",
        title: "Network Latency Alert",
        type: "warning",
    },
    {
        issue: "Service deployed",
        title: "Deployment Complete",
        type: "info",
    },
    {
        issue: "Database connection lost",
        title: "Database Connection Error",
        type: "error",
    },
    {
        issue: "High CPU usage detected",
        title: "High CPU Usage",
        type: "warning",
    },
    {
        issue: "Memory leak detected",
        title: "Memory Leak Detected",
        type: "error",
    },
    {
        issue: "Service unavailable",
        title: "Service Down",
        type: "error",
    },
    {
        issue: "Backup completed",
        title: "Backup Success",
        type: "info",
    },
    {
        issue: "Security alert",
        title: "Security Alert",
        type: "error",
    },
] as const;

export const NOTIFICATION_SETTINGS = {
    DUPLICATE_THRESHOLD: 5000,
    MAX_NOTIFICATIONS: 50,
    GENERATION_INTERVAL: 5000,
} as const;

export const SERVICE_TARGETS = ["srv", "worker", "db", "cache"] as const;
