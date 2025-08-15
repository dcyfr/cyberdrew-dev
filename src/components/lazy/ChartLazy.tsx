import React, { Suspense, lazy } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const ChartModule = () => import('../ui/chart');

const ChartContainer = lazy(async () => ({ default: (await ChartModule()).ChartContainer }));
const ChartTooltip = lazy(async () => ({ default: (await ChartModule()).ChartTooltip }));
const ChartTooltipContent = lazy(async () => ({ default: (await ChartModule()).ChartTooltipContent }));
const ChartLegend = lazy(async () => ({ default: (await ChartModule()).ChartLegend }));
const ChartLegendContent = lazy(async () => ({ default: (await ChartModule()).ChartLegendContent }));
const ChartStyle = lazy(async () => ({ default: (await ChartModule()).ChartStyle }));

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};

export function ChartBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
  );
}
