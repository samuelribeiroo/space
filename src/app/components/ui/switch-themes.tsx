"use client";

import { cn } from "@/utils/clsx";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type ThemeToggleProps = {
  className?: string;
};

export default function SwitchThemes({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme == "dark";

  const toggleThemes = () => setTheme(isDark ? "light" : "dark");

  return (
    <>
      <div
        className={cn(
          "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
          isDark
            ? "bg-r border border-zinc-800"
            : "bg-white border border-zinc-200",
          className
        )}
        onClick={toggleThemes}
        role="button"
        tabIndex={0}
      >
        <div className="d-flex w-full">
          <div
            className={cn(
              "d-flex size-6 rounded-full transition-transform duration-300",
              isDark
                ? "transform translate-x-0 bg-zinc-800 p-1"
                : "transform translate-x-8 bg-gray-200 p-1"
            )}
          >
            {isDark 
            ? <Moon className="size-4 text-white" strokeWidth={1.5} />
            : <Sun className="size-4 text-gray-700" strokeWidth={1.5} />
            }
          </div>
          <div
            className={cn(
              "d-flex w-6 h-6 rounded-full transition-transform duration-300",
              isDark ? "bg-transparent" : "transform -translate-x-8"
            )}
          >
            {isDark 
            ? <Sun className="size-4 text-gray-500" strokeWidth={1.5} />
            : <Moon className="size-4 text-black" strokeWidth={1.5} />
            }
          </div>
        </div>
      </div>
    </>
  );
}
