import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { type Product } from "~/data/products";
import { Button } from "~/components/ui/Button";
import { IconArrowRight, IconWhatsApp, IconClose } from "~/components/ui/Icons";
import { cn, formatCurrency } from "~/lib/utils";

interface MagazineViewerProps {
  products: Product[];
  categoryName: string;
  onClose: () => void;
  onProductSelect: (product: Product) => void;
}

export function MagazineViewer({
  products,
  categoryName,
  onClose,
  onProductSelect,
}: MagazineViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const currentProduct = products[currentIndex];
  const progress = ((currentIndex + 1) / products.length) * 100;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, products.length]);

  const goToNext = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      goToNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      goToPrev();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[var(--background)]"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                "bg-[var(--surface)] border border-[var(--border)]",
                "hover:bg-[var(--background-soft)] hover:border-[var(--foreground)]",
                "transition-all duration-200"
              )}
            >
              <IconClose className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg md:text-xl font-bold">{categoryName}</h2>
              <p className="text-sm text-[var(--muted)]">
                {currentIndex + 1} de {products.length}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="hidden md:block w-48">
            <div className="h-1 rounded-full bg-[var(--surface)] overflow-hidden">
              <motion.div
                className="h-full bg-[var(--foreground)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        ref={containerRef}
        className="h-full flex items-center justify-center px-4 md:px-20 pt-24 pb-32"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, x: 100, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -100, rotateY: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="w-full max-w-5xl cursor-grab active:cursor-grabbing"
            style={{ x }}
          >
            {/* Magazine Page */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Left Page - Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative aspect-square md:aspect-[3/4] rounded-3xl overflow-hidden bg-[var(--surface)] border border-[var(--border)]"
              >
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10rem] opacity-20">📦</span>
                </div>

                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {currentProduct.new && (
                    <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-[var(--foreground)] text-[var(--background)]">
                      Nuevo
                    </span>
                  )}
                  {currentProduct.bestseller && (
                    <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-green-600 text-white">
                      Bestseller
                    </span>
                  )}
                </div>

                {/* Page Number */}
                <div className="absolute bottom-6 right-6 text-sm font-medium text-[var(--muted)]">
                  {String(currentIndex + 1).padStart(2, "0")}
                </div>
              </motion.div>

              {/* Right Page - Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col justify-center"
              >
                {/* Category */}
                <span className="text-sm font-medium text-[var(--muted)] uppercase tracking-widest">
                  {currentProduct.brand}
                </span>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 tracking-tight">
                  {currentProduct.name}
                </h1>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold">
                    {formatCurrency(currentProduct.price)}
                  </span>
                  <span className="text-[var(--muted)]">/ pieza</span>
                </div>

                {/* Description */}
                <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">
                  {currentProduct.description}
                </p>

                {/* Colors */}
                <div className="mt-8">
                  <span className="text-sm font-medium">Colores disponibles</span>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {currentProduct.colors.map((color, i) => (
                      <span
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-[var(--border)] hover:scale-110 transition-transform cursor-pointer"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Min Quantity */}
                <div className="mt-6 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <span className="text-sm text-[var(--muted)]">Pedido mínimo:</span>
                  <span className="ml-2 font-bold">{currentProduct.minQuantity} piezas</span>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    icon={<IconWhatsApp />}
                    onClick={() =>
                      window.open(
                        `https://wa.me/5212345678901?text=Hola, me interesa el producto: ${currentProduct.name}`,
                        "_blank"
                      )
                    }
                  >
                    Cotizar
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => onProductSelect(currentProduct)}
                  >
                    Ver detalles
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Prev Button */}
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-medium",
              "transition-all duration-200",
              currentIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-[var(--surface)]"
            )}
          >
            <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Page Dots */}
          <div className="flex items-center gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  i === currentIndex
                    ? "w-8 bg-[var(--foreground)]"
                    : "bg-[var(--border)] hover:bg-[var(--muted)]"
                )}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            disabled={currentIndex === products.length - 1}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-medium",
              "transition-all duration-200",
              currentIndex === products.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-[var(--surface)]"
            )}
          >
            <span className="hidden sm:inline">Siguiente</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Swipe Hint (Mobile) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 md:hidden"
      >
        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <span>Desliza para navegar</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
