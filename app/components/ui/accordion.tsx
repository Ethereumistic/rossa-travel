"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { IconChevronDown } from '@tabler/icons-react'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-medium">{title}</span>
        <IconChevronDown
          className={cn(
            'h-4 w-4 transition-transform',
            isOpen ? 'rotate-180' : ''
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="pb-4 text-sm text-gray-600 dark:text-gray-300">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}