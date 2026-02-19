import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import ScannerPage from "./pages/ScannerPage";
import PharmaGuardAnalysis from "./pages/PharmaGuardAnalysis";
import AIMedicalSummary from "./pages/AIMedicalSummary";
import PatientProfile from "./pages/PatientProfile";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/pharmaguard" element={<PharmaGuardAnalysis />} />
          <Route path="/ai-summary" element={<AIMedicalSummary />} />
          <Route path="/profile/:patientId" element={<PatientProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
