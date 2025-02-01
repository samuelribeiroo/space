import { QueryProps } from "@/app/components/ui/post-list-ui";
import { getPosts } from "@/libs/contentful";
import { Post, formatContentfulPost } from "@/libs/contentful/utils";
import { useState, useEffect, useCallback } from "react";

const POSTS_PER_PAGE = 10;

export default function useFetchPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleSearchArticle: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  };

  {
    /* 
    Fetch posts and memorize the reference to avoid uncessary recriation 
    and second things its calculate the logic of pagination
    */
  }
  const fetchPosts = useCallback(async (pageNumber: number) => {
    try {
      setIsLoading(true);
      const skip = (pageNumber - 1) * POSTS_PER_PAGE;
      const fetchedPosts = await getPosts(skip, POSTS_PER_PAGE);
      const mappedPosts: Post[] = fetchedPosts.map(formatContentfulPost);
      setPosts((prev) =>
        pageNumber === 1 ? mappedPosts : [...prev, ...mappedPosts]
      ); // here its updated the state that begins with a empty array
      setHasMore(mappedPosts.length === POSTS_PER_PAGE);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  {
    /* Load initial posts */
  }
  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  {
    /* Inifinte scroll logic + useCallback */
  }
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
      fetchPosts(page + 1);
    }
  }, [fetchPosts, hasMore, loading, page]); // dependencies that are monitoried;

  return {
    handleInputChange,
    loadMore,
    loading,
    hasMore,
    posts,
    searchQuery,
    setSearchQuery,
    handleSearchArticle,
  };
}
