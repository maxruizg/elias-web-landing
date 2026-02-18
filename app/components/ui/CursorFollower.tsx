import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useReducedMotion } from "~/hooks/useReducedMotion";

export function CursorFollower() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");
  const [isPointer, setIsPointer] = useState(false);
  const isTouchDevice = useRef(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      );

      if (interactive) {
        setIsPointer(true);
        const label = interactive.getAttribute("data-cursor") || "";
        setCursorLabel(label);
        setIsHovering(true);
      } else {
        setIsPointer(false);
        setCursorLabel("");
        setIsHovering(false);
      }
    },
    [isVisible, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Detect touch device
    isTouchDevice.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice.current || prefersReducedMotion) return;

    // Check if it's a desktop-width screen
    const mql = window.matchMedia("(min-width: 768px)");
    if (!mql.matches) return;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter, prefersReducedMotion]);

  // Don't render on touch or reduced motion
  if (prefersReducedMotion) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 48 : 12,
          height: isHovering ? 48 : 12,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 20 },
          height: { type: "spring", stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className="w-full h-full rounded-full bg-white flex items-center justify-center"
          style={{
            opacity: isPointer ? 0.8 : 1,
          }}
        >
          {cursorLabel && (
            <span className="text-[8px] font-bold uppercase tracking-wider text-black whitespace-nowrap">
              {cursorLabel}
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
}
