"use client";

import { links } from "@/constants/data";
import useDismissOnClickOrEscape from "@/hooks/useDismissOnClickOrEscape";
import { Search, Calendar, Newspaper } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import Input from "./input";
import Button, { SizeButton } from "./button";
import { getPosts } from "@/libs/contentful";
import { Entry } from "contentful";
import {
  Post,
  PostEntry,
  PostEntryRecord,
  PostGeneric,
} from "@/libs/contentful/utils";
import { delayTimeout } from "@/utils/delayFn";
import useFetchPosts from "@/hooks/useFetchPosts";
import { publishDateFormatter } from "@/utils/date-formatter";
import { NotFounded } from "./article-ui";

const linksHref = links.map((link) => link.label);

type CardBlogPost = PropsWithChildren<{
  imageUrl?: string;
  alt?: string;
  titlePost?: string;
  overview?: string;
  publishDate?: ReactNode;
  post?: PostEntryRecord;
}>;

export type QueryProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onOpen: VoidFunction;
  onSearch?: (post: Entry<PostGeneric>[], searchQuery: string) => void;
};

function NavigationArticles() {
  return (
    <nav className="text-sm text-blue-400 font-grotesk font-semibold">
      <Link href="/" className="hover:brightness-75">
        home
      </Link>
      <span className="mx-2">{">"}</span>
      <Link href="/" className="hover:brightness-75">
        {linksHref[2].toLowerCase()}
      </Link>
      <span className="mx-2">{">"}</span>
      <span className="text-gray-400 hover:brightness-75 cursor-pointer">
        all articles
      </span>
    </nav>
  );
}

function SearchArticles({ isOpen, onClose, onOpen, onSearch }: QueryProps) {
  const { handleSearchArticle, searchQuery, setSearchQuery } = useFetchPosts();

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen, setSearchQuery]);

  useEffect(() => {
    const debounceTimer = delayTimeout(() => {
      getPosts(0, 10, searchQuery).then((posts) =>
        onSearch?.(posts, searchQuery)
      );
    }, 500); // 0.5s

    /*
    
    Atraso de 500ms antes de fazer a busca - Evitar buscas excessivas ao servidor enquanto o usuário está digitando.

    O debounce timer é usado aqui para adiar a execução e fazer o fetch somente depois que o usuário parar de digitar. Após 5s.

    Por que isso? Caso não for aplicado a estratégia de debounce a cada tecla digitada a API será chamada (btw não é uma boa prática)
    
    */

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, onSearch]);

  const { ref } = useDismissOnClickOrEscape<HTMLInputElement>({
    isOpen,
    onClose,
  });

  return (
    <>
      {isOpen ? (
        <>
          <Input
            searchedText={searchQuery}
            ref={ref}
            onChange={handleSearchArticle}
          />
        </>
      ) : (
        <>
          <Button
            onClick={onOpen}
            size={SizeButton.Icon}
            className="d-flex rounded-md p-2 hover:bg-gray-800/80 transition-colors"
          >
            <Search className="size-5" />
          </Button>
        </>
      )}
    </>
  );
}

function SectionPostList({
  children,
  post,
}: CardBlogPost & { post?: Entry<PostEntry>[] }) {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [posts, setPosts] = useState<PostEntry[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleOpenInput = () => setIsInputOpen(true);
  const handleCloseInput = () => setIsInputOpen(false);

  const handleGetSearchedPosts = (
    results: PostEntry[],
    searchQuery: string
  ) => {
    setPosts(results);
    setHasSearched(searchQuery.trim() !== "");
  };

  useEffect(() => {
    // @ts-ignore
    getPosts().then((posts: PostEntry[]) => {
      setPosts(posts);
      setHasSearched(false);
    });
  }, []);

  return (
    <>
      <main className="text-white p-4 mt-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-left gap-5 justify-between mb-8">
          <NavigationArticles />
          <SearchArticles
            isOpen={isInputOpen}
            onClose={handleCloseInput}
            onOpen={handleOpenInput}
            // @ts-ignore
            onSearch={handleGetSearchedPosts}
          />
        </div>
        {posts.length === 0 && hasSearched ? (
          <NotFounded message="Nenhum artigo encontrado." />
        ) : (
          <section className="section-post-grid">
            {posts.map((post: PostEntry) => {
              const { id } = post.sys;
              const { title, slug, excerpt, publishDate } = post.fields;
              const { url } = post.fields.image?.fields.file;

              const formattedDate = publishDateFormatter(publishDate);

              return (
                <CardPost key={id}>
                  <Link
                    href={`/articles/${slug}`}
                    className="block space-y-3 relative z-10"
                  >
                    <CardPostContent
                      imageUrl={url}
                      publishDate={formattedDate}
                      overview={excerpt}
                      titlePost={title}
                      alt={title}
                    />
                  </Link>
                </CardPost>
              );
            })}
          </section>
        )}
        {children}
      </main>
    </>
  );
}

function CardPost({ children }: CardBlogPost) {
  return (
    <>
      <article className="group article-card">{children}</article>
    </>
  );
}

function CardPostContent({
  imageUrl,
  titlePost,
  overview,
  publishDate,
}: CardBlogPost) {
  return (
    <>
      <div className="relative overflow-hidden aspect-video md:aspect-[3/1] lg:aspect-[2.5/1]">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt=""
          className="size-full object-cover transition-all duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
      </div>

      <div className="p-4 md:p-6 space-y-3">
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-zinc-100 group-hover:text-zinc-300 transition-colors">
          {titlePost}
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mb-4 line-clamp-2">
          {overview}
        </p>
        <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
          <Calendar className="size-4" />
          <span>{publishDate}</span>
        </div>
        <span className="flex items-center gap-2">
          <Newspaper className="size-4 text-zinc-500/60" />
          <h4 className="text-zinc-400 text-sm tracking-wide hover:text-white">
            Leia o artigo
          </h4>
        </span>
      </div>
    </>
  );
}

export { SectionPostList, CardPost, CardPostContent, NavigationArticles };
