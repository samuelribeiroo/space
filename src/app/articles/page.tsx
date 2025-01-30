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
  const { posts, loading, hasMore, loadMore } = useFetchPosts();
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
      <SectionPostList>
        {posts.map((post: Post) => {
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
       <div ref={observerTarget} className="h-10" />
      </SectionPostList>
  );
}
