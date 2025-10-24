import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Identitas from "./pages/Identitas";
import Methodus from "./pages/Methodus";
import Valor from "./pages/Valor";
import Historiae from "./pages/Historiae";
import Atheneum from "./pages/Atheneum";
import Contactus from "./pages/Contactus";
import ProfilumSocietatis from "./pages/ProfilumSocietatis";
import ChiSiamo from "./pages/ChiSiamo";
import Servizi from "./pages/Servizi";
import Percorsi from "./pages/Percorsi";
import Risorse from "./pages/Risorse";
import Contatti from "./pages/Contatti";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import AdminDashboard from "./pages/AdminDashboard";
import NosciteAdminDashboard from "./pages/NosciteAdminDashboard";
import Auth from "./pages/Auth";
import NosciteAdminAuth from "./pages/NosciteAdminAuth";
import NotFound from "./pages/NotFound";
import CookieBanner from "./components/CookieBanner";
import Chatbot from "./components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/identitas" element={<Identitas />} />
            <Route path="/methodus" element={<Methodus />} />
            <Route path="/valor" element={<Valor />} />
            <Route path="/historiae" element={<Historiae />} />
            <Route path="/atheneum" element={<Atheneum />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/profilum-societatis" element={<ProfilumSocietatis />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/servizi" element={<Servizi />} />
            <Route path="/percorsi" element={<Percorsi />} />
            <Route path="/risorse" element={<Risorse />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/nosciteadmin" element={<NosciteAdminDashboard />} />
            <Route path="/nosciteadmin/auth" element={<NosciteAdminAuth />} />
            <Route path="/auth" element={<Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
