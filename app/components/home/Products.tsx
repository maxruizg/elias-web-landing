import { Link } from "react-router";
import { motion } from "framer-motion";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { Button } from "~/components/ui/Button";
import { IconArrowRight } from "~/components/ui/Icons";
import { getFeaturedProducts } from "~/data/products";
import { formatCurrency } from "~/lib/utils";
import { cn } from "~/lib/utils";

export function Products() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const featuredProducts = getFeaturedProducts();

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-sm font-medium text-[var(--muted)] uppercase tracking-widest">
              Productos destacados
            </span>
            <h2 className="mt-4">Lo más popular</h2>
          </div>
          <Link to="/catalogo">
            <Button
              variant="outline"
              icon={<IconArrowRight />}
              iconPosition="right"
            >
              Ver todo el catálogo
            </Button>
          </Link>
        </motion.div>

        {/* Products Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl",
                "bg-[var(--surface)] border border-[var(--border)]",
                "transition-all duration-500",
                "hover:border-[var(--foreground-soft)] hover:shadow-xl",
                // Make first item span 2 rows on larger screens
                index === 0 && "lg:row-span-2"
              )}
            >
              {/* Product Image Placeholder */}
              <div
                className={cn(
                  "relative overflow-hidden bg-[var(--background-soft)]",
                  index === 0 ? "aspect-[4/5]" : "aspect-square"
                )}
              >
                {/* Placeholder gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800" />

                {/* Product Image would go here */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-20">📦</span>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.new && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--foreground)] text-[var(--background)]">
                      Nuevo
                    </span>
                  )}
                  {product.bestseller && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--foreground)] text-[var(--background)]">
                      Bestseller
                    </span>
                  )}
                </div>

                {/* Hover Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center",
                    "bg-black/60 opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-300"
                  )}
                >
                  <Link to={`/catalogo?producto=${product.id}`}>
                    <Button size="sm">Ver detalles</Button>
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs text-[var(--muted)] uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-semibold mt-1 group-hover:text-[var(--foreground)] transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {formatCurrency(product.price)}
                    </div>
                    <div className="text-xs text-[var(--muted)]">
                      Min. {product.minQuantity} pzas
                    </div>
                  </div>
                </div>

                {/* Color Options */}
                <div className="flex items-center gap-2 mt-4">
                  {product.colors.slice(0, 4).map((color, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-full border border-[var(--border)]"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <span className="text-xs text-[var(--muted)]">
                      +{product.colors.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
