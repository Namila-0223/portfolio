import localFont from "next/font/local";
import "../styles/globals.css";

const display = localFont({
  src: "../assets/fonts/portfolio-syne.ttf",
  variable: "--font-display",
  weight: "400 800",
  display: "swap",
});

const body = localFont({
  src: "../assets/fonts/portfolio-space-grotesk.ttf",
  variable: "--font-body",
  weight: "300 700",
  display: "swap",
});

const brush = localFont({
  src: "../assets/fonts/portfolio-kaushan-script.ttf",
  variable: "--font-brush",
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Namila Preshan — UI/UX Designer & Engineer",
  description:
    "Thoughtful interfaces, from first idea to the details in code. The portfolio of Namila Preshan.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${brush.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
