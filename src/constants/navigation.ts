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
    name: "Profile",
    href: "/profile",
    icon: "Users",
    enabled: true,
  },
];
