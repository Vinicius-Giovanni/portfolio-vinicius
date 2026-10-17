type WaveDividerProps = { className?: string }

export function WaveDivider({ className }: WaveDividerProps) {
  return (
    <svg
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      {/* Onda inferior — visível no lado claro (creme) */}
      <path
        d="M0,65 C200,80 400,50 600,65 C800,80 1000,50 1200,65 L1200,100 L0,100 Z"
        fill="rgba(11,31,58,0.14)"
      />
      {/* Onda superior — visível no lado escuro (navy) */}
      <path
        d="M0,25 C200,40 400,10 600,25 C800,40 1000,10 1200,25 L1200,55 L0,55 Z"
        fill="rgba(255,255,255,0.28)"
      />
    </svg>
  )
}