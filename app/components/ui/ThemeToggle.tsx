import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "~/hooks/useTheme";
import { cn } from "~/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        className={cn(
          "relative w-10 h-10 rounded-full flex items-center justify-center",
          "bg-[var(--surface)] border border-[var(--border)]",
          "transition-all duration-300",
          className
        )}
        aria-label="Cambiar tema"
      >
        <span className="w-5 h-5 rounded-full bg-[var(--muted)] animate-pulse" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative w-10 h-10 rounded-full flex items-center justify-center",
        "bg-[var(--surface)] border border-[var(--border)]",
        "hover:bg-[var(--background-soft)] hover:border-[var(--brand-primary)]",
        "transition-all duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]",
        className
      )}
      aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.svg
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}
