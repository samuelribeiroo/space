import { features } from "@/constants/data";
import {
  BentoGrid,
  ProjectGridContent,
  ProjectGridContiner,
} from "./projects-ui";
import HeroSection from "./project-highlight";

export default function FeaturesGrid() {
  return (
    <>
    <HeroSection />
    <ProjectGridContiner>
      <div className="border border-dashed border-gray-800 rounded-lg">
        <BentoGrid>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                flex flex-col items-center text-center p-6
                ${index < 3 ? "border-dashed-grid" : ""}
                ${
                  index < 4 && index >= 3
                    ? "border-dashed-grid lg:border-b-0"
                    : ""
                }
                ${
                  index < 5 && index >= 4
                    ? "border-dashed-grid md:border-b-0"
                    : ""
                }
              `}
            >
              <feature.icon className="size-8 text-gray-400 mb-4" />
              <ProjectGridContent
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </BentoGrid>
      </div>
    </ProjectGridContiner>
    </>
  );
}
