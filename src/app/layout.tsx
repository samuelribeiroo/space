import type { Metadata } from "next";
import { Karla, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/app/components/navigation";
import ThemeProvider from "@/providers/theme-providers";

const karlaFont = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

const groteskFont = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samuel Ribeiro ⚡",
  description: "My own space on internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${interFont.variable} ${interFont.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          enableSystem
          disableTransitionOnChange
          defaultTheme="dark"
        >
          <div className="dynamic-background">
            <div className="background-radial absolute bottom-0 left-0 right-0 top-0">
            <Navigation />
            {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
