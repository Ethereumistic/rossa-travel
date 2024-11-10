// app/components/ui/buttons.tsx
"use client"

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { ButtonProps, SwitchProps } from '@/types'
import { IconCheck, IconLoader, IconX } from '@tabler/icons-react'
import Link from 'next/link'
const buttonVariants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
}

const buttonSizes = {
  sm: 'h-9 px-3 text-sm',
  default: 'h-10 px-4',
  lg: 'h-11 px-8',
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    (
      {
        className,
        variant = 'primary',
        size = 'default',
        isLoading = false,
        icon,
        children,
        as = 'button',
        type = 'button',
        href,
        ...props
      },
      ref
    ) => {
      const classes = cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )

    // Type guard to ensure correct props are passed
    const commonProps = {
      className: classes,
      ref: ref as any,
      ...props,
    };

    if (as === 'link') {
        const { onToggle, ...linkProps } = commonProps;
        return (
          <Link href={href!} {...(linkProps as any)} className={classes}>
            {isLoading ? (
              <IconLoader className="mr-2 h-4 w-4 animate-spin" />
            ) : icon ? (
              <span className="mr-2">{icon}</span>
            ) : null}
            {children}
          </Link>
        )
      }
  
      return (
        <button type={type as "button" | "submit" | "reset"} {...(commonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
          {isLoading ? (
            <IconLoader className="mr-2 h-4 w-4 animate-spin" />
          ) : icon ? (
            <span className="mr-2">{icon}</span>
          ) : null}
          {children}
        </button>
      )
    }
  )

  export function Switch({ checked, onChange, disabled = false, className }: SwitchProps) {
    return (
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out',
          checked ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          className
        )}
      >
        <span
          className={cn(
            'inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white transition-transform duration-200 ease-in-out',
            checked ? 'translate-x-6' : 'translate-x-0.5'
          )}
        >
          {checked ? (
            <IconCheck className="h-3 w-3 text-primary" />
          ) : (
            <IconX className="h-3 w-3 text-gray-400" />
          )}
        </span>
      </button>
    )
  }