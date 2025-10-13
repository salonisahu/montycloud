import { useState, useCallback } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen(!sidebarOpen), [sidebarOpen]);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebarCollapse = useCallback(() => setSidebarCollapsed(!sidebarCollapsed), [sidebarCollapsed]);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebarCollapse} />

      {/* Main content area */}
      <main
        className={`
        pt-16
        transition-all duration-300 ease-in-out
        min-h-[calc(100vh-4rem)]
        w-full
        overflow-x-hidden
        ${sidebarCollapsed ? "md:pl-16" : "md:pl-64"}
      `}
      >
        <div className="p-4"> {children}</div>
      </main>
    </div>
  );
};
