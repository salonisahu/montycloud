export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  enabled: boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: "LayoutDashboard",
    enabled: true,
  },
  {
    name: "Services",
    href: "/services",
    icon: "Server",
    enabled: true,
  },
  {
    name: "Monitoring",
    href: "/monitoring",
    icon: "BarChart3",
    enabled: true,
  },
  {
    name: "Databases",
    href: "/databases",
    icon: "Database",
    enabled: false,
  },
  {
    name: "Security",
    href: "/security",
    icon: "Shield",
    enabled: false,
  },
  {
    name: "Performance",
    href: "/performance",
    icon: "Zap",
    enabled: false,
  },
  {
    name: "CDN",
    href: "/cdn",
    icon: "Globe",
    enabled: false,
  },
  {
    name: "Users",
    href: "/users",
    icon: "Users",
    enabled: false,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "Settings",
    enabled: true,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "Users",
    enabled: true,
  },
];
