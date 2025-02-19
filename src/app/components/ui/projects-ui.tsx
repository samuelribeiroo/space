import { PropsWithChildren, ReactNode } from "react";
import { Badge } from "./badge";

function Project({ children }: PropsWithChildren) {
  return (
    <>
      <main className="space-y-16 mt-16 container mx-auto px-4">
        {children}
      </main>
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
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden [@media(max-width:900px)]:mx-4">
        <img src={props.url} alt={props.alt} className="object-cover size-full cursor-pointer" />
      </div>
    </>
  );
}

function ProjectTitle(props: { title: string }) {
  return (
    <>
      <h3 className="text-2xl font-bold">{props.title}</h3>
    </>
  );
}

/*  details bc contain description */

function ProjectDetails(props: { company: string, description: string | undefined }) {
  return (
    <>
      <p className="text-sm text-gray-400">
        Made at{" "}
        <span className="font-medium text-white">{props.company}</span>
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
    <div className="flex flex-wrap gap-2">
      {children}
    </div>
    </>
  )
}


export { Project, Container, BadgeIcons, ProjectImage, TechStack, ProjectDetails, ProjectContent };
