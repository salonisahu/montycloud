import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { DataProvider } from "@/contexts/data";

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebarCollapse = useCallback(() => setSidebarCollapsed((prev) => !prev), []);

  return (
    <DataProvider>
      <div className="min-h-screen bg-background">
        <Header onMenuClick={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebarCollapse} />

        <main
          className={`
            pt-16 transition-all duration-300 ease-in-out
            min-h-[calc(100vh-4rem)] w-full overflow-x-hidden
            ${sidebarCollapsed ? "md:pl-16" : "md:pl-64"}
          `}
        >
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </DataProvider>
  );
};
