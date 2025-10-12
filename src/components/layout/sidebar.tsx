import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Server, BarChart3, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/constants/navigation";
import { memo } from "react";

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-3 w-3" />,
  Server: <Server className="h-3 w-3" />,
  BarChart3: <BarChart3 className="h-3 w-3" />,
  Users: <Users className="h-3 w-3" />,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const NavigationItem = memo(
  ({ item, isActive, isCollapsed, onClose }: { item: (typeof navigationItems)[0]; isActive: boolean; isCollapsed: boolean; onClose: () => void }) => (
    <Link
      to={item.href}
      onClick={() => {
        // Close sidebar on mobile after navigation
        if (window.innerWidth < 768) {
          onClose();
        }
      }}
    >
      <Button
        variant="ghost"
        className={cn(
          "w-full rounded-xl justify-start text-left transition-all duration-300 h-10",
          isActive ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent hover:text-accent-foreground",
          isCollapsed ? "justify-center px-2" : "px-3"
        )}
      >
        <div className="flex items-center justify-center min-w-[16px]">{iconMap[item.icon]}</div>
        {!isCollapsed && <span className="ml-3">{item.name}</span>}
      </Button>
    </Link>
  )
);

NavigationItem.displayName = "NavigationItem";

export const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] transform border-r border-t bg-background transition-all duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Navigation */}
          <nav className="flex-1 p-4 flex flex-col gap-1">
            {navigationItems
              .filter((item) => item.enabled)
              .map((item) => {
                const isActive = location.pathname === item.href;
                return <NavigationItem key={item.name} item={item} isActive={isActive} isCollapsed={isCollapsed} onClose={onClose} />;
              })}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-4">
            {!isCollapsed && (
              <div className="text-xs text-muted-foreground mb-3">
                <p>MontyCloud v1.0</p>
                <p className="text-muted-foreground/70">Cloud Infrastructure</p>
              </div>
            )}

            {/* Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="w-full bg-background rounded-md p-2 border border-border cursor-pointer hover:scale-105 transition-all duration-200"
            >
              {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
