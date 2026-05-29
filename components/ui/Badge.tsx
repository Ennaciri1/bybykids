import { cn } from '@/lib/utils'

type BadgeProps = {
  children: React.ReactNode
  className?: string
  variant?: 'pink' | 'yellow' | 'teal' | 'purple' | 'orange' | 'blue' | 'lime' | 'default'
}

const variantClasses = {
  default:  'bg-gray-100 text-gray-700',
  pink:     'bg-pink-100 text-pink-700 border border-pink-200',
  yellow:   'bg-yellow-100 text-yellow-700 border border-yellow-200',
  teal:     'bg-teal-100 text-teal-700 border border-teal-200',
  purple:   'bg-purple-100 text-purple-700 border border-purple-200',
  orange:   'bg-orange-100 text-orange-700 border border-orange-200',
  blue:     'bg-sky-100 text-sky-700 border border-sky-200',
  lime:     'bg-lime-100 text-lime-700 border border-lime-200',
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'sticker font-bold',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
