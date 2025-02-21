import { heroContent } from "@/constants/data";
import { PropsWithChildren } from "react";
import Button, { SizeButton } from "./button";
import { Hero } from "./projects-ui";

export default function HeroSection() {
  return (
    <>
      <div className="max-w-7xl mx-auto mt-48">
        {heroContent.map(({ title, text, badge }, index) => {
          return (
            <Hero
              heading={title}
              content={text}
              key={index}
            >
              <div>
                <Button
                  className="d-flex rounded-md p-2 hover:bg-gray-800/80 transition-colors mb-4"
                  size={SizeButton.Default}
                >
                  {badge}
                </Button>
              </div>
            </Hero>
          );
        })}
      </div>
    </>
  );
}
