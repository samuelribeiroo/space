"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SwitchThemes from "./ui/switch-themes";
import { DesktopNavigation, MobileMenu } from "./ui/header-ui";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggleMenu = () => setIsOpen(!isOpen);

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
              loading="lazy"
            />
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <DesktopNavigation />
            <SwitchThemes />
          </div>

          <div className="md:hidden">
            <button className="size-10" onClick={handleToggleMenu}>
              {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        <MobileMenu isOpen={isOpen} onCloseMenu={handleToggleMenu} />
      </header>
    </>
  );
}
