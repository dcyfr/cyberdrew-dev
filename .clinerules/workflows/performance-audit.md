# Performance Audit Workflow

## Objective
Systematically analyze and optimize application performance across various dimensions.

## Performance Audit Stages

### 1. Initial Performance Assessment
- Run comprehensive performance profiling
- Identify bottlenecks and performance hotspots
- Analyze bundle size and loading times

### 2. Bundle Analysis
```bash
# Analyze bundle composition
npm run build --report
```

### 3. Performance Metrics to Evaluate
- First Contentful Paint (FCP)
- Time to Interactive (TTI)
- Total Bundle Size
- JavaScript Execution Time
- Memory Consumption

### 4. Optimization Strategies
- Code Splitting
- Lazy Loading
- Memoization
- Reducing Unnecessary Re-renders
- Optimizing Asset Delivery

### 5. React-Specific Optimizations
- Audit component memoization
- Review useCallback and useMemo usage
- Identify and eliminate unnecessary renders
- Optimize complex component hierarchies

### 6. Performance Profiling Tools
- Use React DevTools Profiler
- Leverage Chrome Performance Tab
- Implement Lighthouse audits
- Use webpack-bundle-analyzer

### 7. Specific Performance Checks
#### React Component Performance
- Verify `React.memo()` usage
- Check for proper dependency arrays in hooks
- Eliminate inline function definitions in render
- Optimize context usage

#### Bundle Optimization
- Remove unused dependencies
- Enable tree shaking
- Implement code splitting
- Minimize third-party library footprint

#### Rendering Optimization
- Use `useCallback` for event handlers
- Implement `useMemo` for expensive computations
- Minimize prop drilling
- Use efficient state management

### 8. Accessibility and Performance Intersection
- Ensure performance optimizations don't compromise accessibility
- Verify screen reader performance
- Check keyboard navigation efficiency

### 9. Reporting and Tracking
- Generate detailed performance report
- Create performance baseline
- Track performance metrics over time

## Workflow Execution
```xml
<ask_followup_question>
<question>Would you like to initiate a comprehensive performance audit?</question>
<options>["Start Performance Audit", "Custom Audit Focus", "Cancel"]</options>
</ask_followup_question>
```

### Performance Audit Checklist
- [ ] Bundle size analyzed
- [ ] Rendering performance optimized
- [ ] Unnecessary re-renders eliminated
- [ ] Lazy loading implemented
- [ ] Performance metrics documented
- [ ] Accessibility maintained
