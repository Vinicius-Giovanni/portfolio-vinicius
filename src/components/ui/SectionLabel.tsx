import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionLabelProps = {
  children: ReactNode
  variant?: 'default' | 'light'
}

export function SectionLabel({ children, variant = 'default' }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={cn(
          'text-xs font-bold tracking-[0.25em] uppercase',
          variant === 'light' ? 'text-cream/80' : 'text-navy/70',
        )}
      >
        {children}
      </span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'h-px flex-1 origin-left',
          variant === 'light' ? 'bg-cream/40' : 'bg-navy/40',
        )}
      />
    </div>
  )
}