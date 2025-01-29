"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Post } from "@/libs/contentful/utils";
import useFetchPosts from "@/hooks/useFetchPosts";
import {
  CardPost,
  CardPostContent,
  SectionPostList,
} from "../components/ui/post-list-ui";

export default function ArticlesPage() {
  const { filteredPosts, loading, hasMore, loadMore } = useFetchPosts();
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  return (
    <main className="text-white p-4 mt-20 max-w-7xl mx-auto">
      <SectionPostList>
        {filteredPosts.map((post: Post) => {
          const { id } = post.sys;
          const { title, slug, excerpt, publishDate, image } = post.fields;

          const formattedDate = new Date(publishDate).toLocaleDateString(
            "pt-br",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );

          return (
            <CardPost key={id}>
              <Link
                href={`/posts/${slug}`}
                className="block space-y-3 relative z-10"
              >
                <CardPostContent
                  imageUrl={image}
                  publishDate={formattedDate}
                  overview={excerpt}
                  titlePost={title}
                  alt={title}
                />
              </Link>
            </CardPost>
          );
        })}
      </SectionPostList>
      <div ref={observerTarget} className="h-10" />
    </main>
  );
}
