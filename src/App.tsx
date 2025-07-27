import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SecurityProvider } from "@/components/SecurityProvider";
import { SkipLink } from "@/components/SkipLink";
import { LazyPage, Home, Blog, BlogPost, Resume, NotFound } from "@/components/LazyRoutes";

const queryClient = new QueryClient();

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
            <Routes>
              <Route path="/" element={<LazyPage component={Home} />} />
              <Route path="/blog" element={<LazyPage component={Blog} />} />
              <Route path="/blog/:slug" element={<LazyPage component={BlogPost} />} />
              <Route path="/resume" element={<LazyPage component={Resume} />} />
              <Route path="/notfound" element={<LazyPage component={NotFound} />} />
              <Route path="*" element={<LazyPage component={NotFound} />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
    </ErrorBoundary>
  </SecurityProvider>
);

export default App;
