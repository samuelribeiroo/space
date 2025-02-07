import { Entry, createClient } from "contentful";
import {
  FetchingPostError,
  PostEntry,
  QueryParams,
  fetchContentfulPosts,
  FetchContentfulErrors,
} from "./utils";

export const contentfulClient = Object.freeze(
  createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string,
  })
);

export async function getPosts(skip = 0, limit = 10, searchQuery = "") {
  try {
    const queryParams: QueryParams = {
      content_type: "blog",
      skip,
      limit,
      order: "-sys.createdAt",
    };

    searchQuery ? (queryParams.query = searchQuery) : null;

    const posts = await fetchContentfulPosts(queryParams);

    if (!posts || !posts.items)
      throw new FetchingPostError(FetchContentfulErrors.FETCH_FAILED);

    return posts.items;
  } catch (error) {
    console.error(
      error instanceof FetchingPostError
        ? error.message
        : FetchContentfulErrors.UNEXPECTED_ERROR,
      error
    );
    return [];
  }
}

export async function getPostBySlug(
  slug: string
): Promise<Entry<PostEntry> | null> {
  try {
    const response = await fetchContentfulPosts({
      content_type: "blog",
      "fields.slug": slug,
      limit: 1,
    });

    if (!response)
      throw new FetchingPostError(
        `${FetchContentfulErrors.FETCH_FAILED_SLUG} ${slug}`
      );

    if (response.items.length > 0) return response.items[0] as Entry<PostEntry>;

    return null;
  } catch (error) {
    console.error(
      error instanceof FetchingPostError
        ? error.message
        : FetchContentfulErrors.UNEXPECTED_ERROR,
      error
    );
    return null;
  }
}
