import { useMemo, useCallback, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import type { DataState } from "@/types/data";
import type { NotificationItem } from "@/types/notifications";
import type { ResourceQuery } from "@/types/services";
import { filterResources } from "@/lib/utils";
import { MONITORING_DATA } from "@/constants/monitoring";
import { SAMPLE_CLOUD_DATA } from "@/constants/cloud";
import { NOTIFICATION_SETTINGS } from "@/constants/notifications";
import { useNotifications } from "@/hooks/useNotifications";
import type { DataContextType } from "@/types/data";

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<DataState>({
    notifications: [],
    monitoring: MONITORING_DATA,
    resources: SAMPLE_CLOUD_DATA,
    resourceQuery: {},
    filteredResources: SAMPLE_CLOUD_DATA,
  });

  const addNotification = useCallback((notification: NotificationItem) => {
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

  useNotifications({
    enabled: true,
    onNotification: addNotification,
    navigate: navigate,
  });

  const setResourceQuery = useCallback((query: ResourceQuery) => {
    setState((prev) => {
      const filteredResources = filterResources(prev.resources, query);
      return {
        ...prev,
        resourceQuery: query,
        filteredResources,
      };
    });
  }, []);

  const resetResourceQuery = useCallback(() => {
    setState((prev) => ({
      ...prev,
      resourceQuery: {},
      filteredResources: prev.resources,
    }));
  }, []);

  const value = useMemo(
    () => ({
      state,
      addNotification,
      markAllAsRead,
      clearAllNotifications,
      setResourceQuery,
      resetResourceQuery,
    }),
    [state, addNotification, markAllAsRead, clearAllNotifications, setResourceQuery, resetResourceQuery]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
