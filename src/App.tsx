import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LayoutWrapper } from "@/components/layout/MainLayout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Dashboard from "@/pages/Dashboard";
import Services from "@/pages/Services";
import Monitoring from "@/pages/Monitoring";
import Profile from "@/pages/Profile";

function App() {
  return (
    <TooltipProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/services" element={<Services />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </LayoutWrapper>
      </Router>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
