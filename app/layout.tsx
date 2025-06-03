import { SpeedInsights } from "@vercel/speed-insights/next";

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Namila Preshan | UI/UX Engineer",
    description:
        "Explore the personal portfolio of Namila Preshan — a UI/UX Engineer crafting intuitive digital experiences through thoughtful design and interaction.",
    generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <title>Namila Preshan – UI/UX Engineer & Product Designer Portfolio</title>
                <link rel="icon" href="/favicon.svg" type="image/x-icon" />
                <link rel="icon" href="/favicon.png" type="image/x-icon" />
                <meta name="title" content="Namila Preshan – UI/UX Engineer & Product Designer Portfolio" />
                <meta
                    name="description"
                    content="Explore the portfolio of Namila Preshan – a UI/UX Engineer dedicated to crafting seamless, user-focused web and mobile experiences. Discover design case studies, prototypes, and intuitive interfaces."
                />
                <meta
                    name="keywords"
                    content="Namila Preshan, UI UX Engineer, UX Designer Sri Lanka, Portfolio Website, Frontend Developer, Web Designer, Product Designer, Creative Portfolio, User Interface Design, Responsive Design"
                />
                <meta name="author" content="Namila Preshan" />
                <meta name="robots" content="index, follow" />
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <link rel="canonical" href="https://www.namilapreshan.com/" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.namilapreshan.com/" />
                <meta property="og:title" content="Namila Preshan – UI/UX Engineer & Product Designer Portfolio" />
                <meta
                    property="og:description"
                    content="A portfolio by Namila Preshan showcasing modern, user-centric UI/UX design work, frontend development, and digital product thinking."
                />
                <meta property="og:image" content="https://www.namilapreshan.com/preview.webp" />
                <meta property="og:site_name" content="Namila Preshan Portfolio" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://www.namilapreshan.com/" />
                <meta name="twitter:title" content="Namila Preshan – UI/UX Engineer & Product Designer" />
                <meta
                    name="twitter:description"
                    content="Explore the portfolio of Namila Preshan, a UI/UX Engineer crafting intuitive user experiences for digital products."
                />
                <meta name="twitter:image" content="https://www.namilapreshan.com/preview.webp" />

                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </head>

            <body className={`${inter.className} bg-[#0f0f0f] text-white antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
                    {children}
                    <SpeedInsights />
                </ThemeProvider>
            </body>
        </html>
    );
}
