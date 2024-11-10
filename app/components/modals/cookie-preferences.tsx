"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Switch } from '../ui/buttons'
import { AccordionItem } from '../ui/accordion'
import { IconX } from '@tabler/icons-react'

interface CookiePreferencesProps {
  isOpen: boolean
  onClose: () => void
  onSave: (preferences: {
    necessary: boolean
    analytics: boolean
  }) => void
}

export function CookiePreferences({ isOpen, onClose, onSave }: CookiePreferencesProps) {
  const [analytics, setAnalytics] = useState(false)

  const handleSave = () => {
    onSave({
      necessary: true, // Always true
      analytics,
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-[15%] m-2 z-50  max-w-lg  rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Cookie preferences</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <IconX className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We use cookies to ensure the basic functionalities of the website and to enhance your online experience.
              </p>

              <div className="mt-6 space-y-4">
                <AccordionItem title="Strictly necessary cookies" defaultOpen>
                  <div className="flex items-center justify-between">
                    <div className="mr-8">
                      <p>These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly.</p>
                    </div>
                    <Switch checked={true} onChange={() => {}} />
                  </div>
                </AccordionItem>

                <AccordionItem title="Performance and Analytics cookies">
                  <div className="flex items-center justify-between">
                    <div className="mr-8">
                      <p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>
                    </div>
                    <Switch checked={analytics} onChange={setAnalytics} />
                  </div>
                </AccordionItem>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold">More information</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  For any queries in relation to our policy on cookies and your choices, please contact us
                </p>
              </div>

              <div className="mt-6 flex justify-between">
                <div className="flex gap-4">
                <Button variant="primary" onClick={handleSave} className="">
                  Accept all
                </Button>
                <Button variant="primary" onClick={handleSave} className="">
                  Reject all
                </Button>
                </div>
                <Button variant="ghost" onClick={handleSave} className="">
                  Save preferences
                </Button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}