import { useState, useEffect, useCallback, useRef } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onActivate: () => void) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Reset after 2 seconds of inactivity
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIndex(0), 2000);

      if (e.key === KONAMI_CODE[index]) {
        const next = index + 1;
        if (next === KONAMI_CODE.length) {
          setIndex(0);
          onActivate();
        } else {
          setIndex(next);
        }
      } else {
        setIndex(0);
      }
    },
    [index, onActivate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleKeyDown]);
}
