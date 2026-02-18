import { motion } from "framer-motion";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";

const clients = [
  "Coca-Cola", "BBVA", "Liverpool", "Bimbo", "Cemex", "Telmex",
  "Modelo", "Oxxo", "Aeromexico", "Televisa", "Banorte", "Cinepolis",
];

const clientsRow2 = [
  "Samsung", "Amazon", "Google", "Microsoft", "Meta", "Tesla",
  "Uber", "Spotify", "Netflix", "Adobe", "Shopify", "Stripe",
];

export function Trusted() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-[var(--background-soft)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-tertiary)]/10 text-sm font-medium text-[var(--brand-tertiary)] mb-4">
            Confianza comprobada
          </span>
          <h2 className="mt-4">Marcas que confian en nosotros</h2>
        </motion.div>
      </div>

      {/* Two-row counter-scrolling marquee */}
      <div className="relative space-y-6">
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--background-soft)] to-transparent z-10 pointer-events-none" />
        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--background-soft)] to-transparent z-10 pointer-events-none" />

        {/* Row 1 - scrolls left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex"
        >
          <div className="flex items-center gap-12 marquee">
            {[...clients, ...clients].map((name, index) => (
              <span
                key={`r1-${index}`}
                className="text-3xl md:text-4xl font-bold font-display tracking-tight whitespace-nowrap text-[var(--foreground)] opacity-10 hover:opacity-60 transition-opacity duration-300 cursor-default select-none hover:text-[var(--brand-primary)]"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Row 2 - scrolls right (counter) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex"
        >
          <div className="flex items-center gap-12 marquee-reverse">
            {[...clientsRow2, ...clientsRow2].map((name, index) => (
              <span
                key={`r2-${index}`}
                className="text-3xl md:text-4xl font-bold font-display tracking-tight whitespace-nowrap text-[var(--foreground)] opacity-10 hover:opacity-60 transition-opacity duration-300 cursor-default select-none hover:text-[var(--brand-secondary)]"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Trust Stats */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-3xl mx-auto px-6 mt-16 text-center"
      >
        <p className="text-lg text-[var(--muted)]">
          Mas de <span className="font-semibold text-[var(--foreground)]">1,200 empresas</span> han
          confiado en nosotros para sus campanas promocionales en todo Mexico.
        </p>
      </motion.div>
    </section>
  );
}
