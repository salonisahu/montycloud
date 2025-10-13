import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Dashboard from "@/pages/Dashboard";
import Services from "@/pages/Services";
import Profile from "@/pages/Profile";
import { ThemeProvider } from "./contexts/theme";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Router>
          <Toaster position="top-center" />
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="services" element={<Services />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
