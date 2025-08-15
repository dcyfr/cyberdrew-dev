import React, { Suspense, lazy } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const CarouselModule = () => import('../ui/carousel');

const Carousel = lazy(async () => ({ default: (await CarouselModule()).Carousel }));
const CarouselContent = lazy(async () => ({ default: (await CarouselModule()).CarouselContent }));
const CarouselItem = lazy(async () => ({ default: (await CarouselModule()).CarouselItem }));
const CarouselPrevious = lazy(async () => ({ default: (await CarouselModule()).CarouselPrevious }));
const CarouselNext = lazy(async () => ({ default: (await CarouselModule()).CarouselNext }));

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};

export function CarouselBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
  );
}
