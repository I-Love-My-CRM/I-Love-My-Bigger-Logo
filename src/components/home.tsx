import LogoUpscaler from "./logo-upscaler/upscaler";
import { useEffect, useState } from "react";

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [animationTime, setAnimationTime] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation loop for subtle background movement
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      setAnimationTime(elapsed / 1000); // Convert to seconds for slower movement
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-blue-50 to-indigo-100 relative">
      {/* Parallax background elements with flowing animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80')",
            backgroundSize: "cover",
            transform: `translateY(${scrollY * 0.3}px) scale(${1 + Math.sin(animationTime * 0.1) * 0.01})`,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-blue-400 opacity-20 blur-3xl"
          style={{
            transform: `translate(
              ${scrollY * 0.1 + Math.sin(animationTime * 0.2) * 10}px, 
              ${scrollY * -0.1 + Math.cos(animationTime * 0.3) * 10}px
            )`,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div
          className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-purple-400 opacity-20 blur-3xl"
          style={{
            transform: `translate(
              ${scrollY * -0.05 + Math.cos(animationTime * 0.15) * 8}px, 
              ${scrollY * 0.05 + Math.sin(animationTime * 0.25) * 8}px
            )`,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div
          className="absolute bottom-40 right-20 w-64 h-64 rounded-full bg-teal-400 opacity-20 blur-3xl"
          style={{
            transform: `translate(
              ${Math.sin(animationTime * 0.18) * 12}px, 
              ${Math.cos(animationTime * 0.12) * 12}px
            )`,
            transition: "transform 0.5s ease-out",
          }}
        />
      </div>

      {/* Content with glass effect */}
      <div className="relative z-10 pt-10 pb-20 px-4">
        <LogoUpscaler />
      </div>
    </div>
  );
}

export default Home;
