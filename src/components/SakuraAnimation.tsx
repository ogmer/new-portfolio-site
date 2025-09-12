import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

interface Sakura {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const MAX_SAKURAS = 50;
const SAKURA_INTERVAL = 300;

export default function SakuraAnimation() {
  const [sakuras, setSakuras] = useState<Sakura[]>([]);
  const { theme } = useTheme();

  const createSakura = useCallback(() => {
    const newSakura: Sakura = {
      id: Date.now(),
      x: Math.random() * window.innerWidth,
      y: -20,
      size: Math.random() * 10 + 5,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 2,
    };
    setSakuras((prev) => {
      const updated = [...prev, newSakura];
      if (updated.length > MAX_SAKURAS) {
        return updated.slice(-MAX_SAKURAS);
      }
      return updated;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(createSakura, SAKURA_INTERVAL);
    return () => clearInterval(interval);
  }, [createSakura]);

  const sakuraStyle = useMemo(
    () => ({
      background:
        theme === "dark"
          ? "radial-gradient(circle, #ffffff 0%, #ffffff 50%, transparent 100%)"
          : "radial-gradient(circle, #ffb7c5 0%, #ffb7c5 50%, transparent 100%)",
      borderRadius: "50%",
    }),
    [theme]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {sakuras.map((sakura) => (
        <motion.div
          key={sakura.id}
          initial={{ y: sakura.y, x: sakura.x, opacity: 1 }}
          animate={{
            y: window.innerHeight + 20,
            x: sakura.x + (Math.random() - 0.5) * 100,
            opacity: 0,
          }}
          transition={{
            duration: sakura.duration,
            delay: sakura.delay,
            ease: "linear",
          }}
          className="absolute"
          style={{
            width: sakura.size,
            height: sakura.size,
            ...sakuraStyle,
          }}
        />
      ))}
    </div>
  );
}
