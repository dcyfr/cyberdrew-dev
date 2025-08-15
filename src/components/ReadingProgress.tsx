import { useEffect, useState } from "react";

export const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none" aria-hidden>
      <div
        className="h-1 bg-primary will-change-transform"
        style={{ transform: `scaleX(${Math.max(0, progress) / 100})`, transformOrigin: "0 0" }}
      />
    </div>
  );
};