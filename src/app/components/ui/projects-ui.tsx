import { PropsWithChildren, ReactNode } from "react";
import { Badge } from "./badge";

function Project({ children }: PropsWithChildren) {
  return (
    <>
      <section className="space-y-16 mt-16 container mx-auto px-4">
        {children}
      </section>
    </>
  );
}

function ProjectContent({ children }: PropsWithChildren) {
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

function ProjectImage(props: {url: string, alt: string }) {
  return (
    <>
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
        <img src={props.url} alt={props.alt} className="object-cover" />
      </div>
    </>
  );
}

export { Project, ProjectContent, BadgeIcons, ProjectImage };
