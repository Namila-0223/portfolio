import CanvasPortfolio from "../components/canvas-portfolio/CanvasPortfolio";
import localFont from "next/font/local";

const display = localFont({ src: "../../public/fonts/portfolio-syne.ttf", variable: "--font-display", weight: "400 800", display: "swap" });
const body = localFont({ src: "../../public/fonts/portfolio-space-grotesk.ttf", variable: "--font-body", weight: "300 700", display: "swap" });
const brush = localFont({ src: "../../public/fonts/portfolio-kaushan-script.ttf", variable: "--font-brush", weight: "400", display: "swap" });

export const metadata = {
  title: "Namila Preshan — UI/UX Designer & Engineer",
  description: "Thoughtful interfaces, from first idea to the details in code. The portfolio of Namila Preshan.",
};

export default function HomePage() {
  return <div className={`${display.variable} ${body.variable} ${brush.variable}`}><CanvasPortfolio /></div>;
}
