import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import Index from "./pages/Index";
import LoadingScreen from "./components/LoadingScreen";

const Services = lazy(() => import("./pages/Services"));
const Gallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Booking = lazy(() => import("./pages/Booking"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
import ScrollToTop from "./components/ScrollToTop";
import { useSeedAdmin } from "./hooks/useSeedAdmin";
import heroImage from "@/assets/hero-background.jpg";

const queryClient = new QueryClient();

const AppContent = () => {
  useSeedAdmin();
  return null;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Start preloading the hero image immediately
    const img = new Image();
    img.src = heroImage;

    img.onload = () => {
      setImageLoaded(true);
      // Add delay for smooth transition after image is loaded
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    };

    img.onerror = () => {
      // If image fails to load, show content anyway after timeout
      console.error("Failed to load hero image");
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    // Force minimum loading time to ensure image loads
    const minLoadTime = setTimeout(() => {
      if (imageLoaded) {
        setIsLoading(false);
      }
    }, 3000);

    return () => clearTimeout(minLoadTime);
  }, [imageLoaded]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
          <ScrollToTop />
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/leistungen" element={<Services />} />
              <Route path="/galerie" element={<Gallery />} />
              <Route path="/ueber-uns" element={<About />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/termin" element={<Booking />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Privacy />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
