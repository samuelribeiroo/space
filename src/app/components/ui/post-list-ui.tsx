"use client";

import { PropsWithChildren, ReactNode } from "react";


type CardBlogPost = PropsWithChildren<{
  imageUrl: string;
  alt: string;
  titlePost?: string;
  overview?: string;
  publishDate?: ReactNode;
}>;

function SectionPostList({ children }: PropsWithChildren) {
  return (
    <>
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {children}
    </section>
    </>
  )
}

function CardPost({ children }: PropsWithChildren) {
  return (
    <>
      <article className="group article-card">{children}</article>
    </>
  );
}

function CardPostContent({
  imageUrl,
  titlePost,
  overview,
  publishDate,
}: CardBlogPost) {
  return (
    <>
      <div className="relative overflow-hidden aspect-video md:aspect-[3/1] lg:aspect-[2.5/1]">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt=""
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
      </div>

      <div className="p-4 md:p-6 space-y-3">
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-zinc-100 group-hover:text-zinc-300 transition-colors">
          {titlePost}
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mb-4 line-clamp-2">
          {overview}
        </p>
        <div className="flex items-center text-xs md:text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
          <span>{publishDate}</span>
        </div>
      </div>
    </>
  );
}

export { SectionPostList, CardPost, CardPostContent };
