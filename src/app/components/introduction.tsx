"use client";

import { ArrowRight, Plus } from "lucide-react";
import { BlurFade } from "./ui/blur-fade";
import Button, { SizeButton, VariantButton } from "./ui/button";
import Link from "next/link";
import { myself } from "@/constants/data";
import useFetchPosts from "@/hooks/useFetchPosts";
import SocialMediaLinks from "./ui/social-media";
import IntroductionContent from "./ui/introduction-content";

const [data] = myself;
const { name, role, buttonTitle1, buttonTitle2 } = data;

export default function Introduction() {
  const { filteredPosts } = useFetchPosts();

  const latestPost = filteredPosts.map((post) => post.fields.title);

  return (
    <>
      <section id="header" className="introduction-style">
        <div className="flex flex-col space-y-3">
          <BlurFade delay={0.25} inView>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              {`I'm ${name}`}
            </h1>
          </BlurFade>
          <BlurFade
            delay={0.25 * 2}
            inView
            className="flex flex-col space-y-5 items-left"
          >
            <span className="text-xl text-pretty tracking-tighter sm:text-3xl xl:text-4xl/none">
              {role}
            </span>
            <Link href={"/articles"}>
              <Button
                variant={VariantButton.Informative}
                size={SizeButton.Lg}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between space-x-3 mr-1">
                  <span className="rounded bg-emerald-600 px-2 py-0.5 text-sm font-grotesk text-white">
                    New article
                  </span>
                  <span className="text-gray-200">{latestPost[0]}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 hover:translate-x-1" />
                </div>
              </Button>
            </Link>
            <SocialMediaLinks />
            <IntroductionContent />
            <div className="flex items-left gap-8 ml-4 justify-center sm:items-center sm: gap-2">
              <Link href={"/about"}>
                <Button
                  variant={VariantButton.Default}
                  size={SizeButton.Default}
                  className="mb-5 bg-white text-black font-sans button-hover"
                >
                  {buttonTitle1}
                </Button>
              </Link>

              <Link href={"/articles"}>
                <Button
                  variant={VariantButton.Default}
                  size={SizeButton.Default}
                  className="mb-5 bg-blue-950 font-sans button-hover"
                >
                  {buttonTitle2}
                </Button>
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>
    </>
  );
}
