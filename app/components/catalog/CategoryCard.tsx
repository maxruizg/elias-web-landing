import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    icon: string;
    productCount: number;
  };
  index: number;
  onClick: () => void;
}

export function CategoryCard({ category, index, onClick }: CategoryCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      className={cn(
        "group relative w-full aspect-[4/5] rounded-3xl overflow-hidden",
        "bg-[var(--surface)] border border-[var(--border)]",
        "transition-all duration-500 ease-out",
        "hover:border-[var(--foreground)] hover:shadow-2xl hover:-translate-y-2",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]"
      )}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 grid-pattern" />

      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-[8rem] md:text-[10rem] opacity-20 group-hover:opacity-30 transition-opacity duration-500"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {category.icon}
        </motion.span>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-[var(--foreground)]/0 group-hover:bg-[var(--foreground)]/5 transition-colors duration-500" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {/* Product Count Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="mb-auto"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--foreground)] text-[var(--background)]">
            {category.productCount} productos
          </span>
        </motion.div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-300">
            {category.name}
          </h3>
          <p className="text-sm text-[var(--muted)] line-clamp-2 group-hover:text-[var(--foreground-soft)] transition-colors">
            {category.description}
          </p>
        </div>

        {/* Arrow Indicator */}
        <div className="mt-4 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
          <span>Explorar</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 bg-[var(--foreground)] rotate-45 translate-x-14 -translate-y-14 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      </div>
    </motion.button>
  );
}
