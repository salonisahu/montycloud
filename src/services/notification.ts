import { toast } from "sonner";
import type { NotificationItem } from "@/types/notifications";

export function showNotificationToast(notification: NotificationItem): void {
    const baseOptions = {
        description: notification.message,
        position: "top-center" as const,
    };

    const levelStyles = {
        info: {
            backgroundColor: "#2563eb",
            color: "white",
        },
        warning: {
            backgroundColor: "#f59e0b",
            color: "black",
        },
        error: {
            backgroundColor: "#dc2626",
            color: "white",
        },
        default: {
            backgroundColor: "#6b7280",
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
