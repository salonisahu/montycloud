import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Resource, ResourceQuery, Status } from "@/types/services";

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
