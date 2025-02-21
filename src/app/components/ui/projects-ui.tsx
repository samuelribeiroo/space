import { PropsWithChildren, ReactNode } from "react";

function Project({ children }: PropsWithChildren) {
  return (
    <>
      <main className="space-y-16 mt-20 container px-4">{children}</main>
    </>
  );
}

function Container({ children }: PropsWithChildren) {
  return (
    <>
      <section className="space-y-4">{children}</section>
    </>
  );
}

type BadgeIconsProps = PropsWithChildren<{
  content: ReactNode;
}>;

function BadgeIcons({ content, children }: BadgeIconsProps) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {children}
        {content}
      </div>
    </>
  );
}

function ProjectImage(props: { url: string; alt: string }) {
  return (
    <>
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
        <img
          src={props.url}
          alt={props.alt}
          className="object-cover size-full cursor-pointer"
        />
      </div>
    </>
  );
}

function ProjectTitle(props: { title: string }) {
  return <h3 className="text-2xl font-bold">{props.title}</h3>;
}

/*  details bc contain description */
function ProjectDetails(props: {
  classficiation: string;
  description: string | undefined;
}) {
  return (
    <>
      <p className="text-sm text-gray-400">
        {/* Made at{" "} */}
        <span className="font-medium text-white">{props.classficiation}</span>
      </p>

      <p className="text-gray-300">{props.description}</p>
    </>
  );
}

type ProjectContentProps = PropsWithChildren<{
  title: string;
  children: any;
}>;

function ProjectContent({ title, children }: ProjectContentProps) {
  return (
    <>
      <article className="flex items-center justify-between">
        <ProjectTitle title={title} />
        {children}
      </article>
    </>
  );
}

function TechStack({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex flex-wrap gap-2 select-none">{children}</div>
    </>
  );
}

/* Project Grid UI Elements  */
function ProjectGridContiner({ children }: PropsWithChildren) {
  return (
    <>
      <section className="container mx-auto mt-32">{children}</section>
    </>
  );
}

function BentoGrid({ children }: PropsWithChildren) {
  return (
    <>
      <span className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </span>
    </>
  );
}

function ProjectGridContent(props: { title: string; description: string }) {
  return (
    <>
      <h4 className="text-zinc-200 text-xl font-semibold mb-2">
        {props.title}
      </h4>
      <p className="text-gray-200">{props.description}</p>
    </>
  );
}

/* Project Highlight UI Elements   */

type HeroProps = PropsWithChildren<{
  heading: string;
  content: string;
}>;

function Hero({
  children,
  heading,
  content,
}: HeroProps) {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4">
      <div className="space-y-6">
        {children}

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[0.5px] leading-tight mb-8">
            {heading}
          </h1>

          <p className="font-karla text-lg sm:text-xl text-gray-400 lg:text-right">
            {content}
            <br />
          </p>
        </div>
      </div>
      </section>
    </>
  );
}


export {
  Project,
  Container,
  BadgeIcons,
  ProjectImage,
  TechStack,
  ProjectDetails,
  ProjectContent,
  ProjectGridContiner,
  BentoGrid,
  ProjectGridContent,
  Hero
};
