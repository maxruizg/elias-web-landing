import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Route } from "./+types/catalogo";
import { CategoryCard } from "~/components/catalog/CategoryCard";
import { MagazineViewer } from "~/components/catalog/MagazineViewer";
import { ProductModal } from "~/components/catalog/ProductModal";
import { Button } from "~/components/ui/Button";
import { IconArrowRight, IconSearch } from "~/components/ui/Icons";
import {
  products,
  getAllCategoriesWithCounts,
  type Product,
} from "~/data/products";
import { cn } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Catálogo de Productos | Elías Distribución" },
    {
      name: "description",
      content:
        "Explora nuestro catálogo completo de artículos promocionales. Playeras, polos, gorras, termos, bolsas y más productos para tu marca.",
    },
  ];
}

export default function Catalogo() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categoriesWithCounts = getAllCategoriesWithCounts();

  // Get products for selected category
  const categoryProducts = useMemo(() => {
    if (!selectedCategory) return [];
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Get selected category info
  const selectedCategoryInfo = categoriesWithCounts.find(
    (c) => c.id === selectedCategory
  );

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
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-[var(--muted)] uppercase tracking-widest">
              Catálogo
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight">
              Explora nuestros productos
            </h1>
            <p className="text-lg text-[var(--muted)] mt-4 max-w-2xl mx-auto">
              Selecciona una categoría para descubrir nuestra colección completa
              de artículos promocionales premium.
            </p>

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
                    "focus:border-[var(--foreground)] focus:outline-none",
                    "transition-all duration-200",
                    "text-lg"
                  )}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Search Results */}
          <AnimatePresence mode="wait">
            {searchQuery && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-16"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Resultados para "{searchQuery}"
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
                        "hover:border-[var(--foreground)] hover:shadow-lg",
                        "transition-all duration-300"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-[var(--background-soft)] flex items-center justify-center text-3xl">
                          📦
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
                  <p className="text-center text-[var(--muted)] mt-4">
                    y {searchResults.length - 6} productos más...
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Grid */}
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoriesWithCounts.map((category, index) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    index={index}
                    onClick={() => handleCategoryClick(category.id)}
                  />
                ))}
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-16 text-center"
              >
                <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                  <div>
                    <div className="text-3xl font-bold">{products.length}</div>
                    <div className="text-sm text-[var(--muted)]">Productos</div>
                  </div>
                  <div className="w-px h-12 bg-[var(--border)]" />
                  <div>
                    <div className="text-3xl font-bold">{categoriesWithCounts.length}</div>
                    <div className="text-sm text-[var(--muted)]">Categorías</div>
                  </div>
                  <div className="w-px h-12 bg-[var(--border)]" />
                  <div>
                    <div className="text-3xl font-bold">50+</div>
                    <div className="text-sm text-[var(--muted)]">Marcas</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Magazine Viewer */}
      <AnimatePresence>
        {selectedCategory && selectedCategoryInfo && (
          <MagazineViewer
            products={categoryProducts}
            categoryName={selectedCategoryInfo.name}
            onClose={handleCloseViewer}
            onProductSelect={handleProductSelect}
          />
        )}
      </AnimatePresence>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
