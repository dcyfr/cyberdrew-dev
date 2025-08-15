import { PageTransition } from "@/components/PageTransition";
import { FadeSlideIn } from "@/components/anim/FadeSlideIn";
// Replace framer-motion with CSS-based animations for faster first load

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <FadeSlideIn className="text-center" intensity={2}>
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
          <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
        </FadeSlideIn>
      </div>
    </PageTransition>
  );
};

export default Index;
