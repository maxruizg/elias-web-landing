import { useEffect, type ReactNode } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { cn } from "~/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Modal({
  isOpen,
  onClose,
  children,
  className,
  size = "md",
}: ModalProps) {
  const dragControls = useDragControls();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[90vw] max-h-[90vh]",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal content - Bottom sheet on mobile, centered on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose();
              }
            }}
            className={cn(
              "relative w-full bg-[var(--background)] shadow-2xl",
              "border border-[var(--border)]",
              "overflow-hidden",
              // Mobile: bottom sheet with top rounding
              "rounded-t-3xl md:rounded-2xl",
              "max-h-[90vh] md:max-h-none",
              sizes[size],
              className
            )}
          >
            {/* Drag handle - mobile only */}
            <div
              className="md:hidden flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-10 h-1 rounded-full bg-[var(--border)]" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className={cn(
                "absolute top-4 right-4 z-10",
                "w-10 h-10 rounded-full",
                "flex items-center justify-center",
                "bg-[var(--surface)] border border-[var(--border)]",
                "hover:bg-[var(--background-soft)] hover:border-[var(--brand-primary)]",
                "transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
              )}
              aria-label="Cerrar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
