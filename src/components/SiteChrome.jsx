"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/canvas") return children;
  return <PageTransition><Header /><main>{children}</main><Footer /></PageTransition>;
}
