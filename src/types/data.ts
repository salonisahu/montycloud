import type { NotificationItem } from "@/types/notifications";
import type { ResourceQuery, Resource } from "@/types/services";

export interface DataState {
    notifications: NotificationItem[];
    monitoring: any;
    resources: Resource[];
    resourceQuery: ResourceQuery;
    filteredResources: Resource[];
}

export interface DataContextType {
    state: DataState;
    addNotification: (notification: NotificationItem) => void;
    markAllAsRead: () => void;
    clearAllNotifications: () => void;
    setResourceQuery: (query: ResourceQuery) => void;
    resetResourceQuery: () => void;
}
