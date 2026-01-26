import { motion } from "framer-motion";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";

// Placeholder client logos - in production these would be actual logos
const clients = [
  { name: "Coca-Cola", logo: "🥤" },
  { name: "BBVA", logo: "🏦" },
  { name: "Liverpool", logo: "🛍️" },
  { name: "Bimbo", logo: "🍞" },
  { name: "Cemex", logo: "🏗️" },
  { name: "Telmex", logo: "📞" },
  { name: "Modelo", logo: "🍺" },
  { name: "Oxxo", logo: "🏪" },
  { name: "Aeroméxico", logo: "✈️" },
  { name: "Televisa", logo: "📺" },
  { name: "Banorte", logo: "💳" },
  { name: "Cinépolis", logo: "🎬" },
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
          <span className="text-sm font-medium text-[var(--muted)] uppercase tracking-widest">
            Confianza comprobada
          </span>
          <h2 className="mt-4">Marcas que confían en nosotros</h2>
        </motion.div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative">
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--background-soft)] to-transparent z-10 pointer-events-none" />

        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--background-soft)] to-transparent z-10 pointer-events-none" />

        {/* Marquee Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex"
        >
          {/* First set of logos */}
          <div className="flex items-center gap-16 marquee">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex flex-col items-center gap-3 min-w-[120px] group"
              >
                <div className="w-20 h-20 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-4xl transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--foreground)]">
                  {client.logo}
                </div>
                <span className="text-sm text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                  {client.name}
                </span>
              </div>
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
          Más de <span className="font-semibold text-[var(--foreground)]">1,200 empresas</span> han
          confiado en nosotros para sus campañas promocionales en todo México.
        </p>
      </motion.div>
    </section>
  );
}
