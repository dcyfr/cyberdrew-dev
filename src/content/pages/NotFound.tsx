import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";
import { PageLayout } from "@/components/PageLayout";
import { FadeSlideIn } from "@/components/anim/FadeSlideIn";
// Use CSS-based animations instead of framer-motion to reduce initial bundle cost

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
      />
      <PageLayout maxWidth="2xl">
        <PageTransition animated={false}>
          <div className="mx-auto max-w-4xl px-4 py-12 sm:py-24">
            <FadeSlideIn className="text-center mb-12" intensity={2} durationMs={360}>
              {/* Main Heading and Description */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold font-sans tracking-tight mb-4">Page Not Found</h1>
                <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
                  Oops! The page you're looking for doesn't exist or has been moved.
                </p>
              </div>
              {/* Navigation Buttons */}
              <div className="flex gap-4 justify-center">
                <Button
                  variant="default"
                  onClick={() => navigate("/")}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  Go Back
                </Button>
              </div>
            </FadeSlideIn>
          </div>
        </PageTransition>
      </PageLayout>
    </>
  );
};

export default NotFound;
