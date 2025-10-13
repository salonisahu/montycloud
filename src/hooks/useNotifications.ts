import { useEffect, useCallback, useRef } from "react";
import { makeNotification, isDuplicateNotification } from "@/lib/utils";
import { showNotificationToast } from "@/services/notification";
import { NOTIFICATION_SETTINGS } from "@/constants/notifications";
import type { NotificationItem } from "@/types/notifications";

interface UseNotificationsOptions {
    enabled?: boolean;
    onNotification?: (notification: NotificationItem) => void;
    navigate?: (path: string) => void;
}

export const useNotifications = (options: UseNotificationsOptions = {}) => {
    const { enabled = true, onNotification, navigate } = options;
    const intervalRef = useRef<number | null>(null);

    const generateNotification = useCallback(() => {
        if (!enabled) return;

        const notification = makeNotification();

        if (!isDuplicateNotification(notification)) {
            showNotificationToast(notification, navigate);
            onNotification?.(notification);
        }
    }, [enabled, onNotification]);

    const startNotifications = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            generateNotification();
        }, NOTIFICATION_SETTINGS.GENERATION_INTERVAL);
    }, [generateNotification]);

    const stopNotifications = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (enabled) {
            startNotifications();
        } else {
            stopNotifications();
        }

        return stopNotifications;
    }, [enabled, startNotifications, stopNotifications]);

    return {
        startNotifications,
        stopNotifications,
        generateNotification,
        isRunning: intervalRef.current !== null,
    };
};