import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SecurityProvider } from "@/components/SecurityProvider";
import { SkipLink } from "@/components/SkipLink";
import { LazyPage, Home, Blog, BlogPost, Resume, About, NotFound } from "@/components/LazyRoutes";
import { DeferredAnalytics } from "@/components/DeferredAnalytics";
import FaviconThemeSwitcher from "@/components/FaviconThemeSwitcher";

const queryClient = new QueryClient();

function ViewTransitionRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    // Progressive enhancement: only use View Transitions if supported
    const start = (document as any).startViewTransition as
      | ((this: Document, cb: () => void) => { finished: Promise<void> })
      | undefined;
    if (typeof start !== "function") {
      setDisplayLocation(location);
      return;
    }
    // Ensure correct this binding to avoid "Illegal invocation"
    start.call(document, () => setDisplayLocation(location));
  }, [location]);

  return (
    <div className="vt-container">
      <Routes location={displayLocation}>
        <Route path="/" element={<LazyPage component={Home} />} />
        <Route path="/blog" element={<LazyPage component={Blog} />} />
        <Route path="/blog/:slug" element={<LazyPage component={BlogPost} />} />
        <Route path="/resume" element={<LazyPage component={Resume} />} />
        <Route path="/about" element={<LazyPage component={About} />} />
        <Route path="/notfound" element={<LazyPage component={NotFound} />} />
        <Route path="*" element={<LazyPage component={NotFound} />} />
      </Routes>
    </div>
  );
}

const App = () => (
  <SecurityProvider>
    <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SkipLink />
          <BrowserRouter>
            <ViewTransitionRoutes />
          </BrowserRouter>
          <FaviconThemeSwitcher />
        </TooltipProvider>
  <DeferredAnalytics />
      </ThemeProvider>
    </QueryClientProvider>
    </ErrorBoundary>
  </SecurityProvider>
);

export default App;
