import { useState } from "react";
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
  const [hoveredColor, setHoveredColor] = useState<Record<string, string>>({});

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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-secondary)]/10 text-sm font-medium text-[var(--brand-secondary)] mb-4">
              Productos destacados
            </span>
            <h2 className="mt-2">Lo mas popular</h2>
          </div>
          <Link to="/catalogo">
            <Button
              variant="outline"
              icon={<IconArrowRight />}
              iconPosition="right"
            >
              Ver todo el catalogo
            </Button>
          </Link>
        </motion.div>

        {/* Magazine-style grid: first item hero, rest smaller */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 card-group">
          {featuredProducts.slice(0, 4).map((product, index) => {
            const isHero = index === 0;
            const tintColor = hoveredColor[product.id];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className={cn(
                  "card-item group relative overflow-hidden rounded-2xl",
                  "bg-[var(--surface)] border border-[var(--border)]",
                  "transition-all duration-500",
                  "hover:border-[var(--foreground-soft)] hover:shadow-xl",
                  isHero && "sm:col-span-2 sm:row-span-2"
                )}
                style={{
                  perspective: "1000px",
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  e.currentTarget.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  setHoveredColor((prev) => {
                    const next = { ...prev };
                    delete next[product.id];
                    return next;
                  });
                }}
              >
                {/* Product Image */}
                <div
                  className={cn(
                    "relative overflow-hidden bg-[var(--background-soft)]",
                    isHero ? "aspect-[4/5]" : "aspect-[4/5]"
                  )}
                  style={{
                    backgroundColor: tintColor || undefined,
                    transition: "background-color 0.5s ease",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover transition-all duration-500",
                      "group-hover:scale-105",
                      tintColor && "mix-blend-multiply"
                    )}
                    loading="lazy"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.new && (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-[var(--brand-secondary)] to-[var(--brand-accent)] text-white shadow-md">
                        Nuevo
                      </span>
                    )}
                    {product.bestseller && (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-[var(--brand-tertiary)] to-[var(--color-emerald)] text-white shadow-md">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center",
                      "bg-black/50 opacity-0 group-hover:opacity-100",
                      "transition-opacity duration-300"
                    )}
                  >
                    <Link to={`/catalogo?producto=${product.id}`}>
                      <Button size="sm">Ver detalles</Button>
                    </Link>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider font-medium">
                    {product.category}
                  </span>
                  <h3 className="text-base font-semibold mt-1 leading-tight group-hover:text-[var(--foreground)] transition-colors line-clamp-2 font-display">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mt-3">
                    <div className="text-lg font-bold font-display tabular-nums">
                      {formatCurrency(product.price)}
                    </div>
                    <div className="text-[10px] text-[var(--muted)] bg-[var(--background-soft)] px-2 py-1 rounded-full">
                      Min. {product.minQuantity} pzas
                    </div>
                  </div>

                  {/* Color Options - Interactive */}
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[var(--border)]">
                    {product.colors.slice(0, 5).map((color, i) => (
                      <button
                        key={i}
                        onMouseEnter={() =>
                          setHoveredColor((prev) => ({ ...prev, [product.id]: color }))
                        }
                        className="w-5 h-5 rounded-full border border-[var(--border)] shadow-sm cursor-pointer hover:scale-125 transition-transform duration-200"
                        style={{ backgroundColor: color }}
                        aria-label={`Color ${i + 1}`}
                      />
                    ))}
                    {product.colors.length > 5 && (
                      <span className="text-[10px] text-[var(--muted)] font-medium ml-1">
                        +{product.colors.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
