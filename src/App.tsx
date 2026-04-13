import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
const CookieBanner = lazy(() => import("./components/CookieBanner"));
const GoogleAnalytics = lazy(() => import("./components/GoogleAnalytics").then(m => ({ default: m.GoogleAnalytics })));

const Index = lazy(() => import("./pages/Index"));
const Identitas = lazy(() => import("./pages/Identitas"));
const Methodus = lazy(() => import("./pages/Methodus"));
const Valor = lazy(() => import("./pages/Valor"));
const Fundamenta = lazy(() => import("./pages/Fundamenta"));
const Historiae = lazy(() => import("./pages/Historiae"));
const Atheneum = lazy(() => import("./pages/Atheneum"));
const Contactus = lazy(() => import("./pages/Contactus"));
const ProfilumSocietatis = lazy(() => import("./pages/ProfilumSocietatis"));
const ChiSiamo = lazy(() => import("./pages/ChiSiamo"));
const Servizi = lazy(() => import("./pages/Servizi"));
const Percorsi = lazy(() => import("./pages/Percorsi"));
const Risorse = lazy(() => import("./pages/Risorse"));
const Contatti = lazy(() => import("./pages/Contatti"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NosciteAdminDashboard = lazy(() => import("./pages/NosciteAdminDashboard"));
const Auth = lazy(() => import("./pages/Auth"));
const NosciteAdminAuth = lazy(() => import("./pages/NosciteAdminAuth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Commentarium = lazy(() => import("./pages/Commentarium"));
const CommentariumPost = lazy(() => import("./pages/CommentariumPost"));
const JooiceLanding = lazy(() => import("./pages/JooiceLanding"));
const BusinessCardScanner = lazy(() => import("./pages/BusinessCardScanner"));
const DigitalBusinessCard = lazy(() => import("./pages/DigitalBusinessCard"));
const DigitalBusinessCardVCard = lazy(() => import("./pages/DigitalBusinessCardVCard"));
const Chatbot = lazy(() => import("./components/Chatbot"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <GoogleAnalytics />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/identitas" element={<Identitas />} />
              <Route path="/methodus" element={<Methodus />} />
              <Route path="/valor" element={<Valor />} />
              <Route path="/fundamenta" element={<Fundamenta />} />
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
              <Route path="/commentarium" element={<Commentarium />} />
              <Route path="/commentarium/:slug" element={<CommentariumPost />} />
              <Route path="/jooice" element={<JooiceLanding />} />
              <Route path="/scanner" element={<BusinessCardScanner />} />
              <Route path="/card/:username" element={<DigitalBusinessCard />} />
              <Route path="/card/:username/vcard" element={<DigitalBusinessCardVCard />} />
              <Route path="/nosciteadmin" element={<NosciteAdminDashboard />} />
              <Route path="/nosciteadmin/auth" element={<NosciteAdminAuth />} />
              <Route path="/auth" element={<Auth />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Chatbot />
          </Suspense>
          <CookieBanner />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
