import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { itemVariants } from "@/lib/animations";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
          <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Index;
