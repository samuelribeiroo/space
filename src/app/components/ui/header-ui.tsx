"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SwitchThemes from "./switch-themes";
import { links } from "@/constants/data";

function DesktopNavigation() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      {links.map(({ href, label }) => (
        <motion.div
          key={href}
          onHoverStart={() => setHoveredItem(href)}
          onHoverEnd={() => setHoveredItem(null)}
          className="relative"
        >
          <Link
            href={href}
            className="relative z-10 block rounded-lg px-4 py-2 text-sm text-neutral-300 transition-colors hover:text-white"
          >
            <motion.span
              className="relative z-10 block"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {label}
            </motion.span>
          </Link>
          <motion.div
            className="absolute inset-0 rounded-lg bg-zinc-700/95"
            initial={false}
            animate={{
              opacity: hoveredItem === href ? 1 : 0,
              scale: hoveredItem === href ? 1 : 0.9,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>
      ))}
    </>
  );
}

type MobileMenuProps = {
  isOpen: boolean;
  onCloseMenu: VoidFunction;
};

function MobileMenu({ isOpen, onCloseMenu }: MobileMenuProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm md:hidden"
        onClick={onCloseMenu}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      />


      <motion.div
        initial={false}
        animate={isOpen ? {
          scale: 1,
          opacity: 1,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        } : {
          scale: 0.95,
          opacity: 0,
          transition: { duration: 0.2 }
        }}
        className="relative z-50 mx-4 p-6 md:hidden"
        style={{ 
          display: isOpen ? 'block' : 'none',
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      >
        <div className="flex flex-col space-y-4">
          {links.map(({ href, label }) => (
            <motion.div
              key={href}
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={href}
                className="text-sm font-medium text-neutral-100 hover:text-white"
                onClick={onCloseMenu}
              >
                {label}
              </Link>
            </motion.div>
          ))}
          <div className="pt-4">
            <SwitchThemes />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export { DesktopNavigation, MobileMenu };

// left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background/95