import React, { Suspense, lazy } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import type { CalendarProps } from '../ui/calendar';

const CalendarImpl = lazy(() => import('../ui/calendar').then(m => ({ default: m.Calendar })));

export function CalendarLazy(props: CalendarProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CalendarImpl {...props} />
    </Suspense>
  );
}
