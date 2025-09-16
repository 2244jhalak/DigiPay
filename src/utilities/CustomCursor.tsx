import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "A") {
        controls.start({ scale: 1.8 });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "A") {
        controls.start({ scale: 1 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] border-2 border-cyan-400 box-border"
      style={{
        translateX: position.x - 20,
        translateY: position.y - 20,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    />
  );
};

export default CustomCursor;
