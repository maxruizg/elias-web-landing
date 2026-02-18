import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

const categoryColors = [
  "var(--brand-primary)",
  "var(--brand-secondary)",
  "var(--brand-tertiary)",
  "var(--brand-accent)",
  "var(--color-coral)",
  "var(--color-emerald)",
];

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    icon: string;
    image: string;
    productCount: number;
  };
  index: number;
  onClick: () => void;
  featured?: boolean;
}

export function CategoryCard({
  category,
  index,
  onClick,
  featured = false,
}: CategoryCardProps) {
  const color = categoryColors[index % categoryColors.length];

  return (
    <motion.button
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden",
        "bg-[var(--surface)] border border-white/10",
        "transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-black/20",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2",
        "rounded-2xl",
        featured ? "aspect-[3/4] min-w-[280px] flex-shrink-0" : "aspect-[3/4] w-full"
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/50" />
        {/* Brand color gradient from bottom */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to top, ${color}cc 0%, ${color}30 50%, transparent 100%)`,
          }}
        />
      </div>

      {/* Decorative inset border */}
      <div className="absolute inset-3 border border-white/20 rounded-xl pointer-events-none z-10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 z-10">
        {/* Top: Branding */}
        <div className="flex items-start justify-between">
          <div className="text-left">
            <p className="text-[10px] font-bold tracking-[0.3em] text-white/60 uppercase">
              Elias Distribucion
            </p>
            <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mt-0.5">
              Edicion 2026
            </p>
          </div>
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold text-white/90 backdrop-blur-sm"
            style={{ background: `${color}80` }}
          >
            {category.productCount} productos
          </span>
        </div>

        {/* Center & Bottom */}
        <div className="text-left space-y-3">
          {/* Category icon */}
          <span className="text-3xl">{category.icon}</span>

          {/* Category name — large display */}
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-display leading-tight">
            {category.name}
          </h3>

          {/* Description snippet */}
          <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">
            {category.description}
          </p>

          {/* Hover CTA */}
          <div className="flex items-center gap-2 text-sm font-medium text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <span>Ver catalogo</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
