import { cn } from '@/lib/utils'

type TestimonialCardProps = {
  image: string
  name: string
  role: string
  quote: string
  className?: string
}

export function TestimonialCard({
  image,
  name,
  role,
  quote,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        'bg-cream rounded-brand flex w-[320px] shrink-0 flex-col items-center gap-4 p-8 sm:w-[380px]',
        'shadow-[0_10px_20px_rgba(0,0,0,0.25)]',
        className,
      )}
    >
      <img
        src={image}
        alt={`Foto de ${name}`}
        loading="lazy"
        className="border-navy/10 h-20 w-20 rounded-full border-2 object-cover"
      />
      <div className="text-center">
        <h3 className="text-navy text-lg font-bold">{name}</h3>
        <p className="text-navy/60 mt-1 text-sm">{role}</p>
      </div>
      <p className="text-navy/85 mt-2 text-center text-[15px] leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
    </article>
  )
}