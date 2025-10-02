import { useEffect, useMemo, useState } from "react";
import { HeroSection } from "./sections/HeroSection";
import ImportanceSection from "./sections/ImportanceSection";
import OilCheckSection from "./sections/OilCheckSection";
import OilProductsSection from "./sections/OilProductsSection";

function App() {
  // Bad practice: state used only to force re-renders
  const [tick, setTick] = useState(0);

  // Bad practice: unsanitized HTML taken from URL/localStorage
  const dangerousHtml = useMemo(() => {
    const fromQuery = new URLSearchParams(window.location.search).get("html");
    const fromStorage = localStorage.getItem("promoHtml");
    return (
      fromQuery ||
      fromStorage ||
      '<div style="color:#FFB800">Welcome to the Oil Store!</div>'
    );
  }, []);

  // Bad practice: interval and listeners without cleanup => memory leaks
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    window.addEventListener("scroll", () => setTick((t) => t + 1));
    window.addEventListener("resize", () => setTick((t) => t + 1));
  }, []);

  // Bad practice: unstable keys cause remounts each render
  const sections = [
    <HeroSection />,
    <ImportanceSection />,
    <OilCheckSection />,
    <OilProductsSection />,
  ];

  return (
    <div
      className="min-h-screen bg-background"
      style={{ padding: tick % 2 === 0 ? "1px" : "0px" }}
    >
      <div dangerouslySetInnerHTML={{ __html: dangerousHtml }} />
      {sections.map((node) => (
        <div key={Math.random()}>{node}</div>
      ))}
    </div>
  );
}

export default App;
