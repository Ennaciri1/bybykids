import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'teal' | 'yellow' | 'purple' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-300/50 hover:shadow-pink-400/60 hover:from-pink-400 hover:to-rose-400',
  secondary:
    'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-300/40 hover:from-violet-400 hover:to-purple-500',
  teal:
    'bg-gradient-to-r from-teal-400 to-cyan-400 text-white shadow-lg shadow-teal-300/40 hover:from-teal-300 hover:to-cyan-300',
  yellow:
    'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg shadow-yellow-300/40 hover:from-yellow-300 hover:to-orange-300',
  purple:
    'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-300/40 hover:from-purple-400 hover:to-pink-400',
  outline:
    'border-3 border-pink-400 text-pink-600 bg-pink-50 hover:bg-pink-100 hover:border-pink-500',
  ghost:
    'text-pink-600 hover:bg-pink-50',
  danger:
    'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-300/40',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-xs rounded-full',
  md: 'px-6 py-2.5 text-sm rounded-full',
  lg: 'px-8 py-3.5 text-base rounded-full',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', loading, fullWidth, disabled, children, ...props },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'btn-kids inline-flex items-center justify-center gap-2 font-bold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300 disabled:pointer-events-none disabled:opacity-50 select-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
)
Button.displayName = 'Button'
