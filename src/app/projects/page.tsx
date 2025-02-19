import { projects } from "@/constants/data";
import { Badge } from "../components/ui/badge";
import { Github } from "lucide-react";
import Button, { SizeButton } from "../components/ui/button";
import {
  Project,
  Container,
  ProjectImage,
  TechStack,
  ProjectDetails,
  ProjectContent,
} from "../components/ui/projects-ui";

export default function ProjectsPage() {
  return (
    <>
      <Project>
      {/* componente com copy aqui  */}
        {projects.map(
          (
            { id, image, description, name, current, company, stack },
            index
          ) => {
            const isImageLeft = index % 2 === 0;

            return (
              <>
                <section
                  className={`projects-grid-container ${
                    index % 2 === 0 ? "layout-image-left" : "layout-image-right"
                  }`}
                  key={id}
                >
                  {isImageLeft ? (
                    <>
                      <ProjectImage url={image} alt={name} />

                      <Container>
                        <ProjectContent
                          title={name}
                          children={
                            current && (
                              <a
                                href="https://nextjs.org/docs/messages/next-image-unconfigured-host" // refactor no json pra pegar o link aq
                                className="inline-flex gap-3 items-center text-sm hover:underline mt-4"
                              >
                                <Button
                                  className="d-flex rounded-md p-2 hover:bg-gray-800/80 transition-colors"
                                  size={SizeButton.Default}
                                >
                                  <Github className="size-5 " />
                                </Button>
                              </a>
                            )
                          }
                        />

                        <ProjectDetails
                          description={description}
                          company={company}
                        />

                        <TechStack>
                          {stack.map(platform => <Badge>{platform}</Badge>)}
                        </TechStack>
                      </Container>
                    </>
                  ) : (
                    <>
                      <Container>
                        <ProjectContent
                          title={name}
                          children={
                            current && (
                              <a
                                href="https://nextjs.org/docs/messages/next-image-unconfigured-host" // refactor no json pra pegar o link aq
                                className="inline-flex gap-3 items-center text-sm hover:underline mt-4"
                              >
                                <Button
                                  className="d-flex rounded-md p-2 hover:bg-gray-800/80 transition-colors"
                                  size={SizeButton.Default}
                                >
                                  <Github className="size-5 " />
                                </Button>
                              </a>
                            )
                          }
                        />

                        <ProjectDetails
                          description={description}
                          company={company}
                        />

                        <TechStack>
                          {stack.map(tech => <Badge>{tech}</Badge>)}
                        </TechStack>
                      </Container>
                      <ProjectImage url={image} alt={name} />
                    </>
                  )}
                </section>
              </>
            );
          }
        )}
      </Project>
    </>
  );
}
