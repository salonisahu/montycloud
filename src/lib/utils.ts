import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Resource, ResourceQuery, Status } from "@/types/services";
import type { NotificationItem } from "@/types/notifications";
import { NOTIFICATION_TEMPLATES, SERVICE_TARGETS, NOTIFICATION_SETTINGS } from "@/constants/notifications";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const filterResources = (resources: Resource[], query: ResourceQuery): Resource[] => {
  return resources.filter((resource) => {

    const arrayFilters = [
      { values: query.status, resourceValue: resource.status },
      { values: query.type, resourceValue: resource.type },
      { values: query.account, resourceValue: resource.account },
      { values: query.region, resourceValue: resource.region },
    ];

    for (const { values, resourceValue } of arrayFilters) {
      if (values?.length && !values.includes(resourceValue)) {
        return false;
      }
    }

    if (query.cpuOver != null && resource.cpu < query.cpuOver) {
      return false;
    }

    if (query.text?.trim()) {
      const searchText = query.text.toLowerCase();
      const searchableFields = [
        resource.name,
        resource.platform,
        resource.ip ?? "",
        resource.account,
        resource.region,
        resource.type,
        ...Object.values(resource.tags || {}),
      ];

      if (!searchableFields.some(field => field.toLowerCase().includes(searchText))) {
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

  if (lastSeen && now - lastSeen < NOTIFICATION_SETTINGS.DUPLICATE_THRESHOLD) {
    return true;
  }

  recentNotifications.set(key, now);
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