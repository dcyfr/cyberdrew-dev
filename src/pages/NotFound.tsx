import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";
import { AppHeader } from "@/components/AppHeader";

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
        title="Page Not Found - Cyber Drew's Lab"
        description="The page you're looking for doesn't exist or has moved."
      />
      <PageTransition>
        {/* <AppHeader showBackButton={false} showThemeToggle={false} /> */}
        <div className="min-h-screen pt-20">
          <div className="container mx-auto px-6 py-16 max-w-4xl">
            <div className="text-center py-16">
              <div className="mb-8">
                <h1 className="vercel-heading-1 mb-4">Page Not Found</h1>
                <p className="vercel-text-muted mb-8 max-w-md mx-auto">
                  Oops! This isn't the page you're looking for. It might have been moved or doesn't exist.
                </p>
              </div>
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
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default NotFound;
