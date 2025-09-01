import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ChiSiamo from "./pages/ChiSiamo";
import Servizi from "./pages/Servizi";
import Percorsi from "./pages/Percorsi";
import Risorse from "./pages/Risorse";
import Contatti from "./pages/Contatti";
import AdminDashboard from "./pages/AdminDashboard";
import NosciteAdminDashboard from "./pages/NosciteAdminDashboard";
import Auth from "./pages/Auth";
import NosciteAdminAuth from "./pages/NosciteAdminAuth";
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
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/percorsi" element={<Percorsi />} />
          <Route path="/risorse" element={<Risorse />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/nosciteadmin" element={<NosciteAdminDashboard />} />
          <Route path="/nosciteadmin/auth" element={<NosciteAdminAuth />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
