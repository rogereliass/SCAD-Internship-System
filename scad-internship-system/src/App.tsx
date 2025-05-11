
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
import ScadDashboard from "./components/dashboard/ScadDashboard";
import Internships from "./pages/Internships";
import InternshipCycles from "./pages/InternshipCycles";
import CompanyApplications from "./pages/CompanyApplications";
import Students from "./pages/Students";
import InternshipReports from "./pages/InternshipReports";
import FacultyDashboard from "./components/dashboard/FacultyDashboard";
import ViewAllInternships from "./pages/Internships";
import ViewInternshipApplicants from "./pages/InternshipApplicants";
import ViewAllCompanies from "./pages/Companies";
import Companies from "./pages/Companies";
import CompanyPeding from "./pages/CompanyPending";
import VideoAppointments from "./pages/VideoAppointments";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./hooks/ScrollToTop";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
         <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/internship-cycles" element={<InternshipCycles />} />
          <Route path="/company-applications" element={<CompanyApplications />} />
          <Route path="/students" element={<Students />} />
          <Route path="/internship-reports" element={<InternshipReports />} />
          <Route path="/scad-dashboard" element={<ScadDashboard />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/internship" element={<Internships />} />
          <Route path="/internships/:id" element={<Internships />} />
          <Route path="/companies/:id" element={<ViewAllCompanies />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/internships/:id/applicants" element={<ViewInternshipApplicants />} />
          <Route path="/company-pending" element={<CompanyPeding />} />
          <Route path="/appointments" element={<VideoAppointments />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
