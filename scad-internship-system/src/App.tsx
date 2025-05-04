
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ViewAllInternships from "./pages/Internships";
import ViewInternshipApplicants from "./pages/InternshipApplicants";
import ViewAllCompanies from "./pages/Companies";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/internships" element={<ViewAllInternships />} />
          <Route path="/companies" element={<ViewAllCompanies />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/internships/:id/applicants" element={<ViewInternshipApplicants />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
