import {
  ArticleCard,
  ArticleContent,
  ArticleMain,
} from "@/app/components/ui/article-ui";
import { getPostBySlug, getPosts } from "@/libs/contentful";
import { formatContentfulPost } from "@/libs/contentful/utils";
import { publishDateFormatter } from "@/utils/date-formatter";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { notFound } from "next/navigation";
import React from "react";


type SingleArticleProps = {
  context: { params: { slug: string } }
}

export default async function Article(context: { params: {  slug: string } }) {

  // 'await' has no effect on the type of this expression. -> but dont remove. If remove will see a log warning
  /* Route "/articles/[slug]" used `params.slug`. `params` should be awaited before using its properties */
  const { slug } = await context.params;

  const getPostEntry = await getPostBySlug(slug);

  if (!getPostEntry) notFound();

  const post = formatContentfulPost(getPostEntry);

  const { title, article, publishDate } = post.fields;

  const url = post.fields.image;

  const formattedDate = publishDateFormatter(publishDate);

  const articleText = documentToReactComponents(article);

  return (
    <>
      <ArticleMain>
        <ArticleCard>
          <ArticleContent
            date={formattedDate}
            imageSrc={url}
            text={articleText}
            title={title}
            alt={title}
          />
        </ArticleCard>
      </ArticleMain>
    </>
  );
}
