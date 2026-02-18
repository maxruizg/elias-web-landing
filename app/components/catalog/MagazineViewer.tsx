import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Product } from "~/data/products";
import { Button } from "~/components/ui/Button";
import { IconWhatsApp, IconClose } from "~/components/ui/Icons";
import { cn, formatCurrency } from "~/lib/utils";
import { useReducedMotion } from "~/hooks/useReducedMotion";

interface MagazineViewerProps {
  products: Product[];
  categoryName: string;
  categoryColor?: string;
  onClose: () => void;
  onProductSelect: (product: Product) => void;
}

// Page types for our magazine
type PageType =
  | { kind: "cover" }
  | { kind: "toc" }
  | { kind: "product"; product: Product; layoutVariant: "A" | "B" }
  | { kind: "backCover" };

export function MagazineViewer({
  products,
  categoryName,
  categoryColor = "var(--brand-primary)",
  onClose,
  onProductSelect,
}: MagazineViewerProps) {
  const reducedMotion = useReducedMotion();
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Build pages array
  const pages: PageType[] = useMemo(() => {
    const p: PageType[] = [{ kind: "cover" }, { kind: "toc" }];
    products.forEach((product, i) => {
      p.push({
        kind: "product",
        product,
        layoutVariant: i % 2 === 0 ? "A" : "B",
      });
    });
    p.push({ kind: "backCover" });
    return p;
  }, [products]);

  const totalPages = pages.length;

  // Desktop: two-page spreads. On desktop we show pairs (left, right).
  // Page 0 (cover) is shown alone, then pairs: [1,2], [3,4], etc.
  // Mobile: single page at a time.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      const clamped = Math.max(0, Math.min(page, totalPages - 1));
      setDirection(clamped > currentPage ? 1 : -1);
      setCurrentPage(clamped);
    },
    [currentPage, totalPages]
  );

  const nextPage = useCallback(() => {
    if (isDesktop && currentPage > 0) {
      // Navigate by 2 on desktop (spread)
      goToPage(Math.min(currentPage + 2, totalPages - 1));
    } else {
      goToPage(currentPage + 1);
    }
  }, [currentPage, isDesktop, totalPages, goToPage]);

  const prevPage = useCallback(() => {
    if (isDesktop && currentPage > 1) {
      goToPage(Math.max(currentPage - 2, 0));
    } else {
      goToPage(currentPage - 1);
    }
  }, [currentPage, isDesktop, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextPage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevPage();
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage, onClose]);

  // Touch/swipe handling
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextPage();
      else prevPage();
    }
  };

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Focus trap
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  // Animation variants
  const pageVariants = reducedMotion
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: (d: number) => ({
          x: d > 0 ? 300 : -300,
          opacity: 0,
          scale: 0.95,
        }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (d: number) => ({
          x: d > 0 ? -300 : 300,
          opacity: 0,
          scale: 0.95,
        }),
      };

  // Get the current pages to display
  const getVisiblePages = (): PageType[] => {
    if (!isDesktop || currentPage === 0) {
      // Single page: cover or mobile
      return [pages[currentPage]];
    }
    // Desktop spread: show current + next
    const leftIdx =
      currentPage % 2 === 1 ? currentPage : currentPage - 1;
    const result: PageType[] = [pages[leftIdx]];
    if (leftIdx + 1 < totalPages) {
      result.push(pages[leftIdx + 1]);
    }
    return result;
  };

  const visiblePages = getVisiblePages();
  const isSpread = visiblePages.length === 2;

  // Page number display
  const displayPage = currentPage + 1;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`Catalogo ${categoryName}`}
      tabIndex={-1}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4 z-20">
        <button
          onClick={onClose}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            "bg-white/10 hover:bg-white/20 text-white",
            "transition-all duration-300",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          )}
          aria-label="Cerrar catalogo"
        >
          <IconClose className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-sm md:text-base font-bold text-white font-display">
            {categoryName}
          </h2>
          <p className="text-xs text-white/50 tabular-nums">
            Pagina {displayPage} de {totalPages}
          </p>
        </div>

        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Book Container */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-12 pb-4 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: reducedMotion ? 0.15 : 0.4,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={cn(
              "relative flex rounded-2xl overflow-hidden shadow-2xl shadow-black/50",
              "max-h-[calc(100vh-10rem)]",
              isSpread
                ? "w-full max-w-6xl aspect-auto"
                : "w-full max-w-xl lg:max-w-2xl"
            )}
          >
            {/* Render pages */}
            {visiblePages.map((page, idx) => (
              <div
                key={`${currentPage}-${idx}`}
                className={cn(
                  "relative bg-white dark:bg-zinc-900 overflow-y-auto",
                  isSpread ? "w-1/2" : "w-full",
                  "min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh]"
                )}
              >
                <PageContent
                  page={page}
                  categoryName={categoryName}
                  categoryColor={categoryColor}
                  products={products}
                  pages={pages}
                  onProductSelect={onProductSelect}
                  onClose={onClose}
                  onGoToPage={goToPage}
                />
              </div>
            ))}

            {/* Spine shadow between pages */}
            {isSpread && (
              <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 pointer-events-none z-10">
                <div className="w-full h-full bg-gradient-to-r from-black/10 via-black/20 to-black/10" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav Arrows */}
      <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            "bg-white/10 hover:bg-white/20 text-white",
            "transition-all duration-300",
            "disabled:opacity-20 disabled:cursor-not-allowed",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          )}
          aria-label="Pagina anterior"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            "bg-white/10 hover:bg-white/20 text-white",
            "transition-all duration-300",
            "disabled:opacity-20 disabled:cursor-not-allowed",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          )}
          aria-label="Pagina siguiente"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom page indicator dots */}
      <div className="flex items-center justify-center gap-1.5 pb-4 z-20">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === currentPage
                ? "w-6 bg-white"
                : "w-1.5 bg-white/30 hover:bg-white/50"
            )}
            aria-label={`Ir a pagina ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Page Content Renderer ──────────────────────────────────────────────────

interface PageContentProps {
  page: PageType;
  categoryName: string;
  categoryColor: string;
  products: Product[];
  pages: PageType[];
  onProductSelect: (product: Product) => void;
  onClose: () => void;
  onGoToPage: (page: number) => void;
}

function PageContent({
  page,
  categoryName,
  categoryColor,
  products,
  pages,
  onProductSelect,
  onClose,
  onGoToPage,
}: PageContentProps) {
  switch (page.kind) {
    case "cover":
      return (
        <CoverPage
          categoryName={categoryName}
          categoryColor={categoryColor}
          productCount={products.length}
        />
      );
    case "toc":
      return (
        <TocPage
          products={products}
          pages={pages}
          onGoToPage={onGoToPage}
        />
      );
    case "product":
      return (
        <ProductPage
          product={page.product}
          layoutVariant={page.layoutVariant}
          onProductSelect={onProductSelect}
        />
      );
    case "backCover":
      return (
        <BackCoverPage
          categoryName={categoryName}
          categoryColor={categoryColor}
          onClose={onClose}
        />
      );
  }
}

// ─── Cover Page ─────────────────────────────────────────────────────────────

function CoverPage({
  categoryName,
  categoryColor,
  productCount,
}: {
  categoryName: string;
  categoryColor: string;
  productCount: number;
}) {
  return (
    <div
      className="relative w-full h-full min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}cc, ${categoryColor}88)`,
      }}
    >
      {/* Decorative geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
          style={{ background: "white" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-10"
          style={{ background: "white" }}
        />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-white/20 rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border border-white/10 rotate-45" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <p className="text-xs font-bold tracking-[0.4em] uppercase text-white/60 mb-2">
          Elias Distribucion
        </p>
        <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-12">
          Coleccion 2026
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight leading-none mb-6">
          {categoryName}
        </h1>

        <div className="w-16 h-0.5 bg-white/40 mx-auto mb-6" />

        <p className="text-lg text-white/70">
          {productCount} productos seleccionados
        </p>
      </div>
    </div>
  );
}

// ─── Table of Contents ──────────────────────────────────────────────────────

function TocPage({
  products,
  pages,
  onGoToPage,
}: {
  products: Product[];
  pages: PageType[];
  onGoToPage: (page: number) => void;
}) {
  return (
    <div className="w-full h-full p-8 md:p-12 flex flex-col">
      <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
        Contenido
      </h2>
      <div className="w-10 h-0.5 bg-zinc-300 dark:bg-zinc-600 mb-8" />

      <div className="flex-1 space-y-0">
        {products.map((product, idx) => {
          // Find the page index for this product
          const pageIdx = pages.findIndex(
            (p) => p.kind === "product" && p.product.id === product.id
          );
          return (
            <button
              key={product.id}
              onClick={() => onGoToPage(pageIdx)}
              className={cn(
                "w-full flex items-baseline gap-3 py-3 group text-left",
                "border-b border-zinc-100 dark:border-zinc-800",
                "hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors rounded-lg px-3 -mx-3"
              )}
            >
              <span className="text-sm text-zinc-400 dark:text-zinc-500 tabular-nums font-mono w-6">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-sm md:text-base font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors truncate">
                {product.name}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 capitalize">
                {product.brand}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                p. {pageIdx + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Product Page ───────────────────────────────────────────────────────────

function ProductPage({
  product,
  layoutVariant,
  onProductSelect,
}: {
  product: Product;
  layoutVariant: "A" | "B";
  onProductSelect: (product: Product) => void;
}) {
  const isA = layoutVariant === "A";

  return (
    <div className="w-full h-full flex flex-col">
      {/* Image section */}
      <div
        className={cn(
          "relative w-full",
          isA ? "h-[45%] min-h-[200px]" : "h-[40%] min-h-[180px]"
        )}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.new && (
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-[var(--brand-secondary)] to-[var(--brand-accent)] text-white shadow-lg">
              Nuevo
            </span>
          )}
          {product.bestseller && (
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-[var(--brand-tertiary)] to-[var(--color-emerald)] text-white shadow-lg">
              Bestseller
            </span>
          )}
        </div>
      </div>

      {/* Text section */}
      <div
        className={cn(
          "flex-1 p-6 md:p-8 flex flex-col justify-center",
          isA ? "order-last" : ""
        )}
      >
        <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-500 uppercase">
          {product.brand}
        </span>

        <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-zinc-100 mt-1 leading-tight">
          {product.name}
        </h3>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed line-clamp-3">
          {product.description}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-display tabular-nums text-zinc-900 dark:text-zinc-100">
            {formatCurrency(product.price)}
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            / pieza
          </span>
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-2 mt-4">
          {product.colors.map((color, i) => (
            <span
              key={i}
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => onProductSelect(product)}
          className={cn(
            "mt-5 inline-flex items-center gap-2 text-sm font-medium",
            "text-[var(--brand-primary)] hover:underline",
            "transition-colors"
          )}
        >
          Ver detalles
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Back Cover ─────────────────────────────────────────────────────────────

function BackCoverPage({
  categoryName,
  categoryColor,
  onClose,
}: {
  categoryName: string;
  categoryColor: string;
  onClose: () => void;
}) {
  return (
    <div
      className="relative w-full h-full min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] flex flex-col items-center justify-center p-8 md:p-12 text-center"
      style={{
        background: `linear-gradient(135deg, ${categoryColor}dd, ${categoryColor})`,
      }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 border border-white/10 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white/10 rotate-45" />
      </div>

      <div className="relative z-10 text-white max-w-sm">
        <p className="text-xs font-bold tracking-[0.4em] uppercase text-white/60 mb-8">
          Elias Distribucion
        </p>

        <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
          Te interesa algo de {categoryName}?
        </h2>

        <p className="text-white/60 mb-8">
          Solicita una cotizacion personalizada sin compromiso.
        </p>

        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            icon={<IconWhatsApp />}
            onClick={() =>
              window.open(
                `https://wa.me/5212345678901?text=Hola, me interesa una cotización de la categoría: ${categoryName}`,
                "_blank"
              )
            }
            className="w-full bg-white text-zinc-900 hover:bg-white/90"
          >
            Solicitar cotizacion
          </Button>
          <button
            onClick={onClose}
            className="text-sm text-white/60 hover:text-white transition-colors mt-2"
          >
            Volver al catalogo
          </button>
        </div>
      </div>
    </div>
  );
}
