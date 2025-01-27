"use client";

import { copyIntroduction } from "@/constants/data";
import { PropsWithChildren } from "react";

function Card({ children }: PropsWithChildren) {
  return <div className="space-y-4 font-grotesk ">{children}</div>;
}

export default function IntroductionContent() {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        {copyIntroduction.map(({ start, middle, end }, index) => (
          <div key={index} className="rounded-lg p-6 space-y-8">
            <Card>
              <p className="introduction-content-paragraph">{start}</p>
            </Card>

            <Card>
              <p className="introduction-content-paragraph">{middle}</p>
            </Card>

            <Card>
              <p className="introduction-content-paragraph">{end}</p>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
