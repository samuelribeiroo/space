
import { getPosts } from "@/libs/contentful";
import { Post, formatContentfulPost } from "@/libs/contentful/utils";
import { useState, useEffect } from "react";

export default function useFetchPosts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      const mappedPosts: Post[] = fetchedPosts.map(formatContentfulPost);
      setPosts(mappedPosts);
      setFilteredPosts(mappedPosts);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.fields.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.fields.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  return {
    searchTerm,
    handleInputChange,
    filteredPosts,
  }
}