"use client"

import { useState } from 'react'
import { Button } from '../ui/buttons'
import { cn } from '@/lib/utils'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { CookiePreferences } from './cookie-preferences'

interface CookieConsentProps {
  position?: 'bottom-left' | 'bottom-right' | 'bottom-center'
  onAccept?: () => void
  onReject?: () => void
  onManage?: () => void
}

export function CookieConsent({
  position = 'bottom-right',
  onAccept,
  onReject,
  onManage,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [showPreferences, setShowPreferences] = useState(false)

  const handleAccept = () => {
    setIsVisible(false)
    onAccept?.()
  }

  const handleReject = () => {
    setIsVisible(false)
    onReject?.()
  }

  const handleManage = () => {
    setShowPreferences(true)
  }

  if (!isVisible) return null

  return (
    <>
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 2 }}
          className={cn(
            'fixed z-50 m-4 max-w-[380px] rounded-lg bg-white p-6 shadow-lg',
            'dark:bg-gray-800',
            {
              'left-0 bottom-0': position === 'bottom-left',
              'right-0 bottom-0': position === 'bottom-right',
              'left-1/2 bottom-0 -translate-x-1/2': position === 'bottom-center',
            },
            'sm:m-6',
            'max-sm:fixed max-sm:left-1/2 max-sm:right-auto max-sm:bottom-4 max-sm:-translate-x-1/2 max-sm:w-[calc(100%-2rem)]'
          )}
        >
      <h3 className="mb-2 text-lg font-semibold">We value your privacy</h3>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        We use cookies to enhance your browsing experience, serve personalized ads or content, and
        analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
      </p>
      <div className="flex flex-col gap-2">
        <Button
          variant="primary"
          size="default"
          className="w-full"
          onClick={handleAccept}
        >
          Accept all
        </Button>
        <Button
          variant="secondary"
          size="default"
          className="w-full"
          onClick={handleReject}
        >
          Reject all
        </Button>
        <Button
          variant="ghost"
          size="default"
          className="w-full"
          onClick={handleManage}
        >
          Manage preferences
          </Button>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
    
    <CookiePreferences
    isOpen={showPreferences}
    onClose={() => setShowPreferences(false)}
    onSave={(preferences) => {
      setShowPreferences(false)
      setIsVisible(false)
      // Handle the preferences here
      console.log('Saved preferences:', preferences)
    }}
  />
  </>
  )
}