import { createContext, useContext, useEffect, useMemo, useCallback, useState } from "react";
import type { NotificationItem, DataState } from "@/types/notifications";
import { makeNotification, isDuplicateNotification } from "@/lib/utils";
import { showNotificationToast } from "@/services/notification";
import { NOTIFICATION_SETTINGS } from "@/constants/notifications";

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

  const addNotification = useCallback((notification: NotificationItem) => {
    if (!isDuplicateNotification(notification)) {
      showNotificationToast(notification);
    }
    setState((prev) => ({
      ...prev,
      notifications: [notification, ...prev.notifications].slice(0, NOTIFICATION_SETTINGS.MAX_NOTIFICATIONS),
    }));
  }, []);

  const markAllAsRead = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: [],
    }));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: [],
    }));
  }, []);

  // Simulate periodic notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < NOTIFICATION_SETTINGS.GENERATION_PROBABILITY) {
        const notification = makeNotification();
        if (!isDuplicateNotification(notification)) {
          showNotificationToast(notification);
        }
        setState((prev) => ({
          ...prev,
          notifications: [notification, ...prev.notifications].slice(0, NOTIFICATION_SETTINGS.MAX_NOTIFICATIONS),
        }));
      }
    }, NOTIFICATION_SETTINGS.GENERATION_INTERVAL);

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
