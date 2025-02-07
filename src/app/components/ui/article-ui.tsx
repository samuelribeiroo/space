"use client";

import Link from "next/link";
import { PropsWithChildren, ReactNode } from "react";
import Footer from "./footer";

function ArticleMain({ children }: PropsWithChildren) {
  return (
    <>
      <main className="max-w-screen-xl mx-auto px-4 py-12 flex flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}

function ArticleCard({ children }: PropsWithChildren) {
  return <article className="max-w-2xl mx-auto py-16">{children}</article>;
}

type ArticleContentProps = PropsWithChildren<{
  date: string | Date;
  imageSrc: string;
  alt: string;
  text: ReactNode;
  title: string;
}>;

function ArticleContent({ title, date, imageSrc, text }: ArticleContentProps) {
  return (
    <>
      <div className="text-center space-y-6 mb-12">
        <time className="font-karla text-sm text-gray-400">{String(date)}</time>
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

type NotFoundedProps = {
  message: ReactNode
}

function NotFounded({ message }: NotFoundedProps) {
  return (
    <>
      <div className="text-left py-8">
        <h2 className="text-xl font-karla text-zinc-400 font-normal">
          {message}
        </h2>
      </div>
    </>
  );
}

export { ArticleMain, ArticleCard, ArticleContent, NotFounded };
