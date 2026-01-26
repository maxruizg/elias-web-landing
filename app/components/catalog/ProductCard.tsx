import { motion } from "framer-motion";
import { Button } from "~/components/ui/Button";
import { IconArrowRight } from "~/components/ui/Icons";
import { type Product } from "~/data/products";
import { cn, formatCurrency } from "~/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  index?: number;
}

export function ProductCard({ product, onQuickView, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "bg-[var(--surface)] border border-[var(--border)]",
        "transition-all duration-500",
        "hover:border-[var(--foreground-soft)] hover:shadow-xl hover:-translate-y-1"
      )}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-[var(--background-soft)]">
        {/* Placeholder gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800" />

        {/* Product Image placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-20">📦</span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.new && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--foreground)] text-[var(--background)]">
              Nuevo
            </span>
          )}
          {product.bestseller && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-600 text-white">
              Bestseller
            </span>
          )}
        </div>

        {/* Quick View Overlay */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-black/60 opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300"
          )}
        >
          <Button
            size="sm"
            onClick={() => onQuickView(product)}
            icon={<IconArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Vista rápida
          </Button>
        </div>

        {/* Hover image zoom effect */}
        <div className="absolute inset-0 transform group-hover:scale-110 transition-transform duration-700" />
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category */}
        <span className="text-xs text-[var(--muted)] uppercase tracking-wider">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="text-lg font-semibold mt-1 group-hover:text-[var(--foreground)] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--muted)] mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Price & Min Quantity */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="text-xl font-bold">{formatCurrency(product.price)}</div>
            <div className="text-xs text-[var(--muted)]">
              Min. {product.minQuantity} pzas
            </div>
          </div>

          {/* Color Options */}
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 4).map((color, i) => (
              <span
                key={i}
                className="w-4 h-4 rounded-full border border-[var(--border)]"
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
      </div>
    </motion.div>
  );
}
