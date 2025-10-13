export type NotificationLevel = "info" | "warning" | "error";

export interface NotificationItem {
    id: string;
    ts: number;
    level: NotificationLevel;
    title: string;
    message: string;
}

export interface NotificationTemplate {
    issue: string;
    title: string;
    type: NotificationLevel;
}

export interface DataState {
    notifications: NotificationItem[];
}
