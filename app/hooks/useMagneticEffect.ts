import { useRef, useCallback, type RefObject, type MouseEvent } from "react";

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagneticEffect<T extends HTMLElement>(
  options: MagneticOptions = {}
): {
  ref: RefObject<T | null>;
  onMouseMove: (e: MouseEvent) => void;
  onMouseLeave: () => void;
} {
  const { strength = 0.3, radius = 100 } = options;
  const ref = useRef<T>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        const factor = 1 - distance / radius;
        ref.current.style.transform = `translate(${distX * strength * factor}px, ${distY * strength * factor}px)`;
      }
    },
    [strength, radius]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "";
    ref.current.style.transition = "transform 0.3s ease-out";
    setTimeout(() => {
      if (ref.current) {
        ref.current.style.transition = "";
      }
    }, 300);
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
