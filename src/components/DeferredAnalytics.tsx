import { useEffect, useState } from "react";

type AnalyticsComponent = (props?: Record<string, unknown>) => JSX.Element | null;

export function DeferredAnalytics() {
  const [Analytics, setAnalytics] = useState<AnalyticsComponent | null>(null);
  const [SpeedInsights, setSpeedInsights] = useState<AnalyticsComponent | null>(null);

  useEffect(() => {
    let mounted = true;
    // Only load in production and in the browser
    if (import.meta.env.PROD && typeof window !== "undefined") {
      const schedule = (cb: () => void) => {
        const ric = (window as any).requestIdleCallback as undefined | ((cb: () => void, opts?: { timeout?: number }) => number);
        if (typeof ric === 'function') ric(cb, { timeout: 2000 });
        else setTimeout(cb, 1500);
      };

      schedule(() => {
        import("@vercel/analytics/react").then((mod) => {
          if (mounted && mod && mod.Analytics) {
            setAnalytics(() => mod.Analytics as unknown as AnalyticsComponent);
          }
        }).catch(() => {/* noop */});
      });

      schedule(() => {
        import("@vercel/speed-insights/react").then((mod) => {
          if (mounted && mod && mod.SpeedInsights) {
            setSpeedInsights(() => mod.SpeedInsights as unknown as AnalyticsComponent);
          }
        }).catch(() => {/* noop */});
      });
    }
    return () => { mounted = false; };
  }, []);

  return (
    <>
      {Analytics ? <Analytics /> : null}
      {SpeedInsights ? <SpeedInsights /> : null}
    </>
  );
}
