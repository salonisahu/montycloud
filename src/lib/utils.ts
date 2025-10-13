import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Resource, ResourceQuery, Status } from "@/types/services";
import type { NotificationItem } from "@/types/notifications";
import { NOTIFICATION_TEMPLATES, SERVICE_TARGETS } from "@/constants/notifications";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const toSet = (value?: string[] | string): Set<string> | null => {
  if (Array.isArray(value)) {
    return new Set(value);
  }
  if (value) {
    return new Set([value]);
  }
  return null;
};

export const filterResources = (resources: Resource[], query: ResourceQuery): Resource[] => {
  const statusSet = toSet(query.status);
  const typeSet = toSet(query.type);
  const accountIdSet = toSet(query.accountId);
  const regionSet = toSet(query.region);
  const searchText = query.text?.toLowerCase().trim();

  return resources.filter((resource) => {
    // Filter by status
    if (statusSet && !statusSet.has(resource.status)) {
      return false;
    }

    // Filter by type
    if (typeSet && !typeSet.has(resource.type)) {
      return false;
    }

    // Filter by account ID
    if (accountIdSet && !accountIdSet.has(resource.accountId)) {
      return false;
    }

    // Filter by region
    if (regionSet && !regionSet.has(resource.region)) {
      return false;
    }

    // Filter by CPU threshold
    if (query.cpuOver != null && (resource.metrics?.current?.cpu ?? 0) < query.cpuOver) {
      return false;
    }

    // Filter by search text
    if (searchText) {
      const searchableText = [
        resource.name,
        resource.platform,
        resource.ip ?? "",
        resource.accountName,
        resource.region,
        resource.type,
        ...Object.entries(resource.tags || {}).map(([key, value]) => `${key}:${value}`)
      ]
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(searchText)) {
        return false;
      }
    }

    return true;
  });
};

export const toggleArrayValue = (array: string[] | undefined, value: string): string[] => {
  const currentSet = new Set(array ?? []);

  if (currentSet.has(value)) {
    currentSet.delete(value);
  } else {
    currentSet.add(value);
  }

  return Array.from(currentSet);
};

export const getStatusChip = (status: Status): string => {
  const baseClasses = "px-2 py-0.5 rounded-full text-xs font-medium";

  const statusClasses: Record<Status, string> = {
    running: "bg-green-100 text-green-700",
    stopped: "bg-gray-200 text-gray-700",
    degraded: "bg-amber-100 text-amber-700",
    pending: "bg-blue-100 text-blue-700",
    maintenance: "bg-purple-100 text-purple-700",
    terminated: "bg-red-100 text-red-700",
  };

  return `${baseClasses} ${statusClasses[status]}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString();
};

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function makeNotification(): NotificationItem {
  const template = pick(NOTIFICATION_TEMPLATES);
  const target = `on ${pick(SERVICE_TARGETS)}-${randInt(1000, 1024)}`;

  return {
    id: crypto.randomUUID(),
    ts: Date.now(),
    level: template.type,
    title: template.title,
    message: `${template.issue} ${target}`,
  };
}

const recentNotifications = new Map<string, number>();

export function isDuplicateNotification(notification: NotificationItem): boolean {
  const key = `${notification.level}-${notification.title}`;
  const now = Date.now();
  const lastSeen = recentNotifications.get(key);

  if (lastSeen && now - lastSeen < 5000) { // 5 seconds threshold
    return true;
  }

  recentNotifications.set(key, now);

  // Clean up old entries
  for (const [k, timestamp] of recentNotifications.entries()) {
    if (now - timestamp > 5000) {
      recentNotifications.delete(k);
    }
  }

  return false;
}

export function formatNotificationTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function getNotificationLevelColor(level: string): string {
  switch (level) {
    case "info":
      return "bg-blue-500";
    case "warning":
      return "bg-yellow-500";
    case "error":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}