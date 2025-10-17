import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Impressum from "./pages/Impressum";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";
import heroImage from "@/assets/hero-background.jpg";

const queryClient = new QueryClient();

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
      }, 1300);
    };

    img.onerror = () => {
      // If image fails to load, show content anyway after timeout
      console.error('Failed to load hero image');
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
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/leistungen" element={<Services />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/ueber-uns" element={<About />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Privacy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
