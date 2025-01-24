"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { links } from "@/constants/data";
import { cn } from "@/utils/clsx";
import Image from "next/image";
import SwitchThemes from "./ui/switch-themes";

export default function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <header className="header-style group">
        <nav className="nav-style">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/profile.png"
              alt="Profile Image"
              width={68}
              height={48}
              className="rounded-full p-4 hover:profile-spinner"
              fetchPriority="high"
            />
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {links.map(({ href, label }) => (
              <Link href={href} key={href} className="from-neutral-100 text-sm">
                {label}
              </Link>
            ))}
            <SwitchThemes />
          </div>

          <div className="md:hidden">
            <button className="size-10" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        <div
          className={cn(
            "fixed inset-x-0 top-[64px] z-50 h-[calc(100vh-64px)] md:hidden",
            isOpen ? "block" : "hidden"
          )}
        >
          <div className="container flex flex-col space-y-4 p-4">
            {links.map(({ href, label }) => (
              <Link
                href={href}
                key={href}
                className="from-neutral-100 text-sm"
                onClick={() => setIsOpen(!isOpen)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-4">
              <SwitchThemes />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
