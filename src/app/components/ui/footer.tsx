"use client";

import SocialMediaLinks from "./social-media";

export default function Footer() {
  return (
    <footer className="w-full bg-transparent text-white/80 py-4 px-6 border-t border-white/10 mt-48">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6">
          <SocialMediaLinks />
        </div>

        <div className="mt-3 text-center text-sm md:text-base font-inter">
          <p>
            &copy; {new Date().getFullYear()} Samuel Ribeiro
          </p>
        </div>
      </div>
    </footer>
  );
}
