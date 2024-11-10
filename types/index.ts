import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

export interface BaseProps {
  className?: string
  children?: ReactNode
}

// Button Types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
export type ButtonSize = 'sm' | 'default' | 'lg'

export interface ButtonBaseProps extends BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  icon?: ReactNode
}

export interface ButtonAsButton
  extends ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  as?: 'button'
  href?: never
}

export interface ButtonAsLink
  extends ButtonBaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> {
  as: 'link'
  href: string
}

export type ButtonProps = ButtonAsButton | ButtonAsLink

// Navigation Types
export interface NavItem {
  label: string
  href: string
  isExternal?: boolean
}

export interface NavProps extends BaseProps {
  items: NavItem[]
  logo?: ReactNode
}

// Footer Types
export interface FooterColumn {
  title: string
  links: Array<{
    label: string
    href: string
    isExternal?: boolean
  }>
}

export interface SocialLink {
  platform: string
  href: string
  icon: ReactNode
}

export interface FooterProps extends BaseProps {
  columns: FooterColumn[]
  socialLinks?: SocialLink[]
  logo?: ReactNode
  bottomText?: string
}

export interface SwitchProps extends BaseProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}