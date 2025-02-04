import { Entry, EntryCollection, EntrySkeletonType } from "contentful";
import { contentfulClient } from ".";
import { Document } from "@contentful/rich-text-types";
import { ReactNode } from "react";

const SPACE_ID = process.env
  .NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string;
const ACCESS_TOKEN = process.env
  .NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string;

type PostFields = {
  title: string;
  slug: string;
  excerpt: string;
  publishDate: string;
  body: string;
  image: ContentfulImage
};

export interface PostEntry extends EntrySkeletonType {
  sys: { id: string; };
  fields: PostFields;
  contentTypeId: 'blog' 
}

export type Post = {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    publishDate: string;
    article: Document;
    image: string;
  };
};

export type PostEntryRecord = Entry<PostEntry>

export interface PostGeneric extends EntrySkeletonType {
  contentTypeId: string; 
  title: string;
  body: string;
}

type ContentfulImage = {
  fields: {
    file: {
      url: string;
    };
  };
};

export type GetPostsProps = {
  skip: number;
  limit: number;
};

export type QueryParams = {
  content_type: string;
  skip: number;
  limit: number;
  order: string;
  query?: ReactNode
};

class FetchingPostError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FetchingPostError";
  }
}

/* Generic Function */
async function fetchContentfulPosts<T extends EntrySkeletonType>(
  query: Record<string, any> // any bc it's out control what will come up to object
): Promise<EntryCollection<T>> {
  return contentfulClient.getEntries<T>(query); // geEntries -> select all post or posts based on a id.
}

/* 

This function (formatContentfulPost)
exists based on concept: Adapat BE to FE. I.E, we receive the data from
contentful and transforming in a format more acceptable to FE.

-> Entry: should be connect with 'EntrySkeletonType'
-> Return should be equal type defined before.

*/
function formatContentfulPost(entry: Entry<EntrySkeletonType>): Post {
  const image = entry.fields.image as ContentfulImage;

  return {
    sys: {
      id: entry.sys.id,
    },
    fields: {
      title: entry.fields.title as string,
      slug: entry.fields.slug as string,
      excerpt: entry.fields.excerpt as string,
      publishDate: entry.fields.publishDate as string,
      article: entry.fields.article as Document,
      image: image.fields.file.url,
    },
  };
}

export {
  ACCESS_TOKEN,
  SPACE_ID,
  fetchContentfulPosts,
  FetchingPostError,
  formatContentfulPost,
};
