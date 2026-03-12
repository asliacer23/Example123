import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { ThemeProvider } from "@/features/shared/context/ThemeContext";
import LandingPage from "@/features/landing/pages/LandingPage";
import PricingPage from "@/features/landing/pages/PricingPage";
import ChangelogPage from "@/features/landing/pages/ChangelogPage";
import AboutPage from "@/features/landing/pages/AboutPage";
import StatusPage from "@/features/landing/pages/StatusPage";
import TermsPage from "@/features/landing/pages/TermsPage";
import PrivacyPage from "@/features/landing/pages/PrivacyPage";
import ContactPage from "@/features/landing/pages/ContactPage";
import DocumentationPage from "@/features/landing/pages/DocumentationPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import PlanSelectPage from "@/features/auth/pages/PlanSelectPage";
import StudentDashboard from "@/features/student/pages/StudentDashboard";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import SystemPreviewPage from "@/features/student/pages/SystemPreviewPage";
import TutorialPage from "@/features/tutorial/pages/TutorialPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/changelog" element={<ChangelogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/status" element={<StatusPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/docs" element={<DocumentationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/pricing-select" element={<PlanSelectPage />} />
              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/preview/:id" element={<SystemPreviewPage />} />
              <Route path="/tutorial" element={<TutorialPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
