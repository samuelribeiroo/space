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
import LoadingScreen from "../components/ui/loading";

export default function ArticlesPage() {
  const { posts, loading, hasMore, loadMore } = useFetchPosts();
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const isSomethingToLoad =
          entries[0].isIntersecting && hasMore && !loading;

        if (isSomethingToLoad) loadMore();
      },

      { threshold: 1.0 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  return (
    <>
      {loading && posts.length === 0 && <LoadingScreen fullscreen={true} />}
      <SectionPostList>

         {/* This loading was be inserted here bc in the future I'll implement a infinite-scroll feature  */}
         {loading && posts.length > 0 && (
          <div className="col-span-full flex justify-center py-8">
            <LoadingScreen
              message="Carregando mais artigos..."
              fullscreen={false}
            />
          </div>
        )}

        <div ref={observerTarget} className="h-10" />
      </SectionPostList>
    </>
  );
}
