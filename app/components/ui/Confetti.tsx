import { useState, useEffect, useCallback } from "react";
import { useKonamiCode } from "~/hooks/useKonamiCode";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  shape: "circle" | "square" | "triangle";
}

const COLORS = ["#6C3CE1", "#FF6B35", "#00C9A7", "#FFD23F", "#FF6B6B", "#A78BFA", "#F472B6"];
const SHAPES: Particle["shape"][] = ["circle", "square", "triangle"];

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
    velocityX: (Math.random() - 0.5) * 4,
    velocityY: 2 + Math.random() * 4,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
  }));
}

export function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);

  const triggerConfetti = useCallback(() => {
    setParticles(createParticles(80));
    setIsActive(true);
  }, []);

  useKonamiCode(triggerConfetti);

  // Animate particles
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setParticles((prev) => {
        const updated = prev
          .map((p) => ({
            ...p,
            y: p.y + p.velocityY * 0.5,
            x: p.x + p.velocityX * 0.15,
            rotation: p.rotation + (p.velocityX > 0 ? 5 : -5),
            velocityY: p.velocityY + 0.08,
          }))
          .filter((p) => p.y < 120);

        if (updated.length === 0) {
          setIsActive(false);
        }
        return updated;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.shape !== "triangle" ? p.color : "transparent",
            borderRadius: p.shape === "circle" ? "50%" : p.shape === "square" ? "2px" : "0",
            borderLeft: p.shape === "triangle" ? `${p.size / 2}px solid transparent` : undefined,
            borderRight: p.shape === "triangle" ? `${p.size / 2}px solid transparent` : undefined,
            borderBottom: p.shape === "triangle" ? `${p.size}px solid ${p.color}` : undefined,
            transform: `rotate(${p.rotation}deg)`,
            opacity: Math.max(0, 1 - p.y / 110),
          }}
        />
      ))}
    </div>
  );
}
