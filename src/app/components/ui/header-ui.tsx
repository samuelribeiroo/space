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
            className="absolute inset-0 rounded-lg bg-neutral-800/50"
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
        initial={false}
        animate={
          isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        className="fixed inset-x-0 top-[64px] z-50 overflow-hidden md:hidden"
      >
        <div className="container flex flex-col space-y-4 p-4">
          {links.map(({ href, label }) => (
            <motion.div
              key={href}
              whileHover={{ x: 10 }}
              className="rounded-lg"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                href={href}
                key={href}
                className="from-neutral-100 text-sm"
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
