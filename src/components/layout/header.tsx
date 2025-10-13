import { useState } from "react";
import { Menu, Bell, LogOut, Sun, Moon, Check, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme";
interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between px-4 overflow-x-hidden">
        {/* Left side - Menu button and Logo */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/src/assets/full-color-favicon.svg" alt="MontyCloud Logo" className="h-8 w-8" />
            <div className="flex flex-col">
              <span className="text-xl font-extralight text-foreground">MontyCloud</span>
            </div>
          </div>
        </div>

        {/* Right side - Actions and Profile */}
        <div className="flex items-center gap-3">
          {/* Search and Notifications */}

          <Button variant="ghost" size="icon" className="relative" onClick={() => setNotificationsOpen(true)}>
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs font-medium flex items-center justify-center min-w-[20px] px-1">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </Button>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-foreground" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-foreground" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")} className={theme === "light" ? "bg-accent text-accent-foreground" : ""}>
                <Sun className="mr-2 h-4 w-4" />
                Light
                {theme === "light" && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className={theme === "dark" ? "bg-accent text-accent-foreground" : ""}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
                {theme === "dark" && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown - Positioned at the very end */}
          <DropdownMenu open={profileDropdownOpen} onOpenChange={setProfileDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <Link
                  to="/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex flex-col space-y-1 hover:bg-accent hover:text-accent-foreground rounded-sm px-2 py-1.5 -mx-2 -my-1.5 cursor-pointer transition-colors"
                >
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                <LogOut className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Notifications Sheet */}
      <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <SheetContent side="right" className="w-80 sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </SheetTitle>
            <SheetDescription>You have {notificationCount} unread notifications</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4 p-4">
              {/* Sample Notifications */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">System Update</p>
                    <p className="text-xs text-muted-foreground">Your system has been updated to version 2.1.0</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Check className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Backup Complete</p>
                    <p className="text-xs text-muted-foreground">Your data backup has been completed successfully</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Check className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Security Alert</p>
                    <p className="text-xs text-muted-foreground">Unusual login activity detected from a new device</p>
                    <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                  </div>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Check className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setNotificationCount(0)}>
                <Check className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
              <Button variant="destructive" size="sm" className="flex-1">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
