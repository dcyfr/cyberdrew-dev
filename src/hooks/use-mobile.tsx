import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const getIsMobile = () =>
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false

  // Initialize from window size to avoid first-paint mismatch
  const [isMobile, setIsMobile] = React.useState<boolean>(getIsMobile)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(getIsMobile())
    mql.addEventListener("change", onChange)
    // Sync once on mount
    onChange()
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
