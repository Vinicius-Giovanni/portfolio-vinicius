export function track(event: string, props?: Record<string, string>): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
    umami?: { track: (event: string, data?: Record<string, string>) => void }
  }
  w.plausible?.(event, { props })
  w.umami?.track(event, props)
}
