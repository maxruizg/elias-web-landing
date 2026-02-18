import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Route } from "./+types/catalogo";
import { CategoryCard } from "~/components/catalog/CategoryCard";
import { MagazineViewer } from "~/components/catalog/MagazineViewer";
import { ProductModal } from "~/components/catalog/ProductModal";
import { IconArrowRight, IconSearch } from "~/components/ui/Icons";
import {
  products,
  getAllCategoriesWithCounts,
  type Product,
} from "~/data/products";
import { cn } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Catalogo de Productos | Elias Distribucion" },
    {
      name: "description",
      content:
        "Explora nuestro catalogo completo de articulos promocionales. Playeras, polos, gorras, termos, bolsas y mas productos para tu marca.",
    },
  ];
}

// Category colors matched to indices for the MagazineViewer
const categoryColors = [
  "var(--brand-primary)",
  "var(--brand-secondary)",
  "var(--brand-tertiary)",
  "var(--brand-accent)",
  "var(--color-coral)",
  "var(--color-emerald)",
];

// Featured category IDs for the horizontal scroll
const FEATURED_IDS = ["textiles", "drinkware", "tecnologia"];

export default function Catalogo() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const featuredScrollRef = useRef<HTMLDivElement>(null);

  const categoriesWithCounts = getAllCategoriesWithCounts();

  // Featured categories
  const featuredCategories = categoriesWithCounts.filter((c) =>
    FEATURED_IDS.includes(c.id)
  );

  // Get products for selected category
  const categoryProducts = useMemo(() => {
    if (!selectedCategory) return [];
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Get selected category info + color
  const selectedCategoryInfo = categoriesWithCounts.find(
    (c) => c.id === selectedCategory
  );
  const selectedCategoryIndex = categoriesWithCounts.findIndex(
    (c) => c.id === selectedCategory
  );
  const selectedCategoryColor =
    selectedCategoryIndex >= 0
      ? categoryColors[selectedCategoryIndex % categoryColors.length]
      : undefined;

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleCloseViewer = () => {
    setSelectedCategory(null);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <>
      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(circle, var(--brand-primary), var(--brand-secondary), transparent)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-bold tracking-[0.3em] text-[var(--muted)] uppercase">
              Catalogo 2026
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-4 tracking-tight font-display">
              Nuestras{" "}
              <span className="gradient-text">colecciones</span>
            </h1>
            <p className="text-lg text-[var(--muted)] mt-4 max-w-2xl mx-auto">
              Explora nuestros catalogos de productos promocionales premium.
              Cada coleccion esta cuidadosamente curada para tu marca.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-md mx-auto"
          >
            <div className="relative">
              <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-12 pr-4 py-4 rounded-2xl",
                  "bg-[var(--surface)] border border-[var(--border)]",
                  "focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20",
                  "transition-all duration-200",
                  "text-base"
                )}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Search Results ──────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {searchQuery && searchResults.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-6 pb-12"
          >
            <h2 className="text-2xl font-bold mb-6 font-display">
              Resultados para &ldquo;{searchQuery}&rdquo;
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.slice(0, 6).map((product, index) => (
                <motion.button
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleProductSelect(product)}
                  className={cn(
                    "p-4 rounded-2xl text-left",
                    "bg-[var(--surface)] border border-[var(--border)]",
                    "hover:border-[var(--brand-primary)] hover:shadow-lg",
                    "transition-all duration-300"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[var(--background-soft)] flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <p className="text-sm text-[var(--muted)] capitalize">
                        {product.category}
                      </p>
                    </div>
                    <IconArrowRight className="w-5 h-5 text-[var(--muted)]" />
                  </div>
                </motion.button>
              ))}
            </div>
            {searchResults.length > 6 && (
              <p className="text-center text-[var(--muted)] mt-4 text-sm">
                y {searchResults.length - 6} productos mas...
              </p>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Only show catalog sections when not searching */}
      {!searchQuery && (
        <>
          {/* ── Featured Catalogs — Horizontal Scroll ────────────────── */}
          <section className="pb-16">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <span className="text-xs font-bold tracking-[0.2em] text-[var(--muted)] uppercase">
                      Destacados
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight mt-1">
                      Catalogos populares
                    </h2>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Horizontal scroll container */}
            <div className="relative">
              {/* Gradient fades on edges */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

              <div
                ref={featuredScrollRef}
                className="flex gap-6 overflow-x-auto px-6 md:px-[calc((100vw-80rem)/2+1.5rem)] pb-4 snap-x snap-mandatory scrollbar-none"
                style={{ scrollbarWidth: "none" }}
              >
                {featuredCategories.map((category, index) => {
                  const globalIndex = categoriesWithCounts.findIndex(
                    (c) => c.id === category.id
                  );
                  return (
                    <div key={category.id} className="snap-start">
                      <CategoryCard
                        category={category}
                        index={globalIndex}
                        onClick={() => handleCategoryClick(category.id)}
                        featured
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── All Collections Grid ─────────────────────────────────── */}
          <section className="pb-16">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <span className="text-xs font-bold tracking-[0.2em] text-[var(--muted)] uppercase">
                  Explora
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight mt-1">
                  Todas las colecciones
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {categoriesWithCounts.map((category, index) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    index={index}
                    onClick={() => handleCategoryClick(category.id)}
                  />
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── Stats Bar ────────────────────────────────────────────── */}
          <section className="pb-20">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-8 px-8 py-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                  <div>
                    <div className="text-3xl font-bold font-display tabular-nums">
                      {products.length}
                    </div>
                    <div className="text-sm text-[var(--muted)]">Productos</div>
                  </div>
                  <div className="w-px h-12 bg-[var(--border)]" />
                  <div>
                    <div className="text-3xl font-bold font-display tabular-nums">
                      {categoriesWithCounts.length}
                    </div>
                    <div className="text-sm text-[var(--muted)]">
                      Categorias
                    </div>
                  </div>
                  <div className="w-px h-12 bg-[var(--border)]" />
                  <div>
                    <div className="text-3xl font-bold font-display tabular-nums">
                      50+
                    </div>
                    <div className="text-sm text-[var(--muted)]">Marcas</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {/* ── Magazine Viewer (Full-screen overlay) ──────────────────── */}
      <AnimatePresence>
        {selectedCategory && selectedCategoryInfo && (
          <MagazineViewer
            products={categoryProducts}
            categoryName={selectedCategoryInfo.name}
            categoryColor={selectedCategoryColor}
            onClose={handleCloseViewer}
            onProductSelect={handleProductSelect}
          />
        )}
      </AnimatePresence>

      {/* ── Product Modal ──────────────────────────────────────────── */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
