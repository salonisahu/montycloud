import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { AppErrorBoundary } from "@/components/layout/AppErrorBoundary";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Dashboard from "@/pages/Dashboard";
import Services from "@/pages/Services";
import Profile from "@/pages/Profile";
import Notification from "@/pages/Notification";
import { ThemeProvider } from "@/contexts/theme";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <AppErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Router>
            <Toaster position="top-center" />
            <Routes>
              {/* Routes with DataProvider */}
              <Route element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="services" element={<Services />} />
                <Route path="profile" element={<Profile />} />
                <Route path="/notification" element={<Navigate to="/404" replace />} />
                <Route path="/notification/:id" element={<Notification />} />
              </Route>

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </AppErrorBoundary>
  );
}

export default App;
