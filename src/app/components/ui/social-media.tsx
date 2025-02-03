"use client";

import { SocialMedia, socialMedia } from "@/constants/data";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function SocialMediaLinks() {
  const [hoverId, setHoverId] = useState<number | null>(null);

  return (
    <>
      <div className="flex gap-4 p-4 justify-center sm:justify-start">
        {socialMedia.map(({ id, icon, title, href }: SocialMedia) => (
          <Link
            key={id}
            href={href}
            className="transition-transform hover:scale-110"
            onMouseEnter={() => setHoverId(id)}
            onMouseLeave={() => setHoverId(null)}
            aria-label={title}
            target="_blank"
          >
            <Image
              src={icon || "/placeholder.svg"}
              alt={title}
              width={24}
              height={24}
              className={`transition-colors ${
                hoverId === id ? "text-primary" : "text-white"
              }`}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
