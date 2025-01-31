"use client";

import { Loader2 } from "lucide-react";

type LoadingScreenProps = {
  message?: string;
  fullscreen?: boolean;
};

export default function LoadingScreen({
  message = "Carregando artigos...",
  fullscreen = true,
}: LoadingScreenProps) {
  return (
    <>
      <div
        className={`${
          fullscreen ? "fixed inset-0 z-50 bg-red-500 backdrop-blur-sm" : ""
        } flex items-center justify-center mt-48`}
      >
        <div className="text-center space-y-4">
          <Loader2 className="size-12 text-blue-400" />
        </div>
      </div>
    </>
  );
}
