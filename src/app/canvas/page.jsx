import PortfolioCanvas from "../../components/portfolio-canvas/PortfolioCanvas";

export const metadata = {
  title: "Portfolio Canvas — Namila Preshan",
  description: "An interactive preview of Namila Preshan’s UI/UX portfolio.",
  robots: { index: false, follow: false },
};

export default function CanvasPage() {
  return <PortfolioCanvas />;
}
