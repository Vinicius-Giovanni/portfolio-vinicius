import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MarqueeProps = {
  children: ReactNode
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  gap?: string
  className?: string
}

export function Marquee({
  children,
  speed = 45,
  direction = 'left',
  pauseOnHover = true,
  gap = '4rem',
  className,
}: MarqueeProps) {
  const animStyle: CSSProperties = {
    animation: `marquee-${direction} ${speed}s linear infinite`,
    gap,
  }

  return (
    <div
      className={cn('group relative w-full overflow-hidden', className)}
      style={{
        maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
      }}
    >
      <div
        className={cn(
          'flex w-max',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={animStyle}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}