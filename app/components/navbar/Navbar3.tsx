"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { cn } from "@/lib/utils";
import { Logo } from "../information/info";
import { Button } from "../ui/buttons";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

export function Navbar3() {
    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(true);
  
    useMotionValueEvent(scrollYProgress, "change", (current) => {
      // Check if current is not undefined and is a number
      if (typeof current === "number") {
        const direction = current! - scrollYProgress.getPrevious()!;
  
        if (scrollYProgress.get() < 0.05) {
          setVisible(true);
        } else {
          if (direction < 0) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        }
      }
    });
  
    return (
        <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            " fixed  inset-x-0 w-full flex items-center justify-center z-[5000] border-none",
        )}
        >
        <Navbar className="top-0" />
      </motion.div>
      </AnimatePresence>
    );
  }

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false); // Add this state

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 200); // Update state based on scroll position
      };
  
      window.addEventListener("scroll", handleScroll); // Add scroll event listener
      return () => window.removeEventListener("scroll", handleScroll); // Cleanup
    }, []);
    return (
      <div
      className={cn(`fixed top-10 inset-x-0 w-full mx-auto z-50 transition-colors duration-300 ${isScrolled ? 'bg-white' : ''}`, className)}>
      <Menu setActive={setActive}>
         <Logo className={`transition-all duration-300 ${isScrolled ? '' : 'invert'}`} 
               title="Logo" href="/" src="https://cdn.jsdelivr.net/gh/Ethereumistic/chistota-smurt-assets/partners/echoray-dark.png" />
          <div className="flex items-center space-x-16">
              <MenuItem setActive={setActive} active={active} item="Services" isScrolled={isScrolled}>
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/web-dev">Web Development</HoveredLink>
                  <HoveredLink href="/interface-design">Interface Design</HoveredLink>
                  <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                  <HoveredLink href="/branding">Branding</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Products" isScrolled={isScrolled}>
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  <ProductItem
                    title="Algochurn"
                    href="https://algochurn.com"
                    src="https://assets.aceternity.com/demos/algochurn.webp"
                    description="Prepare for tech interviews like never before."
                  />
                  <ProductItem
                    title="Tailwind Master Kit"
                    href="https://tailwindmasterkit.com"
                    src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                    description="Production ready Tailwind css components for your next project"
                  />
                  <ProductItem
                    title="Moonbeam"
                    href="https://gomoonbeam.com"
                    src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                    description="Never write from scratch again. Go from idea to blog in minutes."
                  />
                  <ProductItem
                    title="Rogue"
                    href="https://userogue.com"
                    src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                    description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                  />
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Pricing" isScrolled={isScrolled}>
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/hobby">Hobby</HoveredLink>
                  <HoveredLink href="/individual">Individual</HoveredLink>
                  <HoveredLink href="/team">Team</HoveredLink>
                  <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                </div>
              </MenuItem>
              <Button  variant="destructive" type="submit">Contact Us</Button>
          </div>
        </Menu>
      </div>
    );
  }