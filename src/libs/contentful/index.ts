import { Entry, createClient } from "contentful";
import {
  FetchingPostError,
  fetchContentfulPosts,
} from "./utils";

export const contentfulClient = Object.freeze(
  createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string,
  })
);

export async function getPosts() {
  try {
    const posts = await fetchContentfulPosts({
      content_type: "blog",
    });

    if (!posts || !posts.items)
      throw new FetchingPostError("Failed to fetch posts: No data returned.");

    return posts.items;
  } catch (error) {
    console.error(
      error instanceof FetchingPostError
        ? error.message
        : "Unexpected error fetching posts:",
      error
    );
    return [];
  }
}

export async function getPostByID(slug: string): Promise<Entry<any> | null> {
  try {
    const response = await fetchContentfulPosts({
      content_type: "blog",
      "fields.slug": slug,
      limit: 1,
    });

    if (!response)
      throw new FetchingPostError(
        `Failed to fetch post with slug "${slug}": No data returned.`
      );

    if (response.items.length > 0) return response.items[0] as Entry<any>; 
    
    return null;
  } catch (error) {
    console.error(
      error instanceof FetchingPostError
        ? error.message
        : `Unexpected error fetching post with slug "${slug}":`,
      error
    );
    return null;
  }
}
