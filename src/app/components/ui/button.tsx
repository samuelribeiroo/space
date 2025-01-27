"use client";

import { LucideIcon } from "lucide-react";
import { PropsWithChildren } from "react";

enum VariantButton {
  Default = "default",
  Informative = "informative",
}

enum SizeButton {
  Default = "default",
  Sm = "sm",
  Lg = "lg",
  Icon = "icon",
}

type ButtonProps = PropsWithChildren<{
  variant?: VariantButton | undefined;
  size: SizeButton;
  className?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  text?: string;
}>;

export default function Button({
  variant = VariantButton.Default,
  size,
  text,
  className = "",
  icon: Icon,
  ...props
}: ButtonProps) {
  const styleBase =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles: Record<VariantButton, string> = {
    [VariantButton.Default]:
      "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80",
    [VariantButton.Informative]:
      "bg-zinc-900/95 p-5 text-sm hover:bg-[#1A1A1A] transition-colors",
  };

  const sizeStyles: Record<SizeButton, string> = {
    [SizeButton.Default]: "h-10 w-40 py-2 px-4",
    [SizeButton.Sm]: "h-9 px-3 rounded-md",
    [SizeButton.Lg]: "h-8 w-66",
    [SizeButton.Icon]: "h-10 w-10",
  };

  const baseClasse = `${styleBase} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <>
      <button className={baseClasse} {...props} />
    </>
  );
}

export { VariantButton, SizeButton };
