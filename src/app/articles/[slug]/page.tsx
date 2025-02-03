import {
  ArticleCard,
  ArticleContent,
  ArticleMain,
} from "@/app/components/ui/article-ui";
import { getPostBySlug } from "@/libs/contentful";
import { formatContentfulPost } from "@/libs/contentful/utils";
import { publishDateFormatter } from "@/utils/date-formatter";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { notFound } from "next/navigation";

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const getPostEntry = await getPostBySlug(params.slug);

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
