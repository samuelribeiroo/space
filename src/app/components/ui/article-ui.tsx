"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";

function ArticleMain({ children }: PropsWithChildren) {
  return <main className="max-w-screen-xl mx-auto px-4 py-12">{children}</main>;
}

function ArticleCard({ children }: PropsWithChildren) {
  return <article className="max-w-2xl mx-auto py-16">{children}</article>;
}

type ArticleContentProps = PropsWithChildren<{
  date: any;
  imageSrc: string;
  alt: string;
  text: any;
  title: string;
}>;

function ArticleContent({
  title,
  date,
  imageSrc,
  text,
}: ArticleContentProps) {
  return (
    <>
      <div className="text-center space-y-6 mb-12">
        <time className="font-karla text-sm text-gray-400">{date}</time>
        <h1 className="text-4xl md:text-5xl font-serif leading-tight">
          {title}
        </h1>
        <div className="text-gray-400 text-sm">
          Written by{" "}
          <Link href="/about" className="hover:text-white">
            Samuel Ribeiro
          </Link>
        </div>
      </div>

      <div className="aspect-[16/9] relative mb-6">
        <img
          src={imageSrc}
          alt={title}
          className="object-cover rounded-lg"
          fetchPriority="high"
        />
      </div>

      <div className="font-karla text-gray-400 leading-relaxed mt-8">
        {text}
      </div>
    </>
  );
}

export { ArticleMain, ArticleCard, ArticleContent };
