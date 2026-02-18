import { motion } from "framer-motion";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import {
  IconPackage,
  IconTruck,
  IconPalette,
  IconShield,
  IconClock,
  IconZap,
} from "~/components/ui/Icons";
import { cn } from "~/lib/utils";

const features = [
  {
    icon: IconPackage,
    title: "Catalogo Extenso",
    description:
      "Mas de 500 productos promocionales de las mejores marcas internacionales.",
    color: "var(--brand-primary)",
    span: "lg:col-span-4 lg:row-span-2",
  },
  {
    icon: IconPalette,
    title: "Personalizacion Total",
    description:
      "Serigrafia, bordado, sublimacion, grabado laser y mas tecnicas de impresion.",
    color: "var(--brand-secondary)",
    span: "lg:col-span-4",
  },
  {
    icon: IconTruck,
    title: "Envio Nacional",
    description:
      "Entrega a todo Mexico con seguimiento en tiempo real de tu pedido.",
    color: "var(--brand-tertiary)",
    span: "lg:col-span-4",
  },
  {
    icon: IconClock,
    title: "Entregas Express",
    description:
      "Opciones de entrega urgente para tus campanas de ultimo momento.",
    color: "var(--brand-accent)",
    span: "lg:col-span-4",
  },
  {
    icon: IconShield,
    title: "Garantia de Calidad",
    description:
      "Cada producto pasa por control de calidad antes de ser entregado.",
    color: "var(--color-emerald)",
    span: "lg:col-span-4",
  },
  {
    icon: IconZap,
    title: "Cotizacion Rapida",
    description:
      "Respuesta a tu cotizacion en menos de 2 horas habiles garantizado.",
    color: "var(--color-coral)",
    span: "lg:col-span-4",
  },
];

export function Features() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-[var(--background-soft)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-primary)]/10 text-sm font-medium text-[var(--brand-primary)] mb-4">
            Por que elegirnos
          </span>
          <h2 className="mt-4">
            Todo lo que necesitas en un solo lugar
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Somos tu aliado estrategico para impulsar tu marca con productos
            promocionales de la mas alta calidad.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 card-group">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
              className={cn(
                "card-item group relative p-8 rounded-2xl overflow-hidden",
                "bg-[var(--surface)] border border-[var(--border)]",
                "hover:border-[var(--foreground-soft)] hover:shadow-lg",
                "transition-all duration-300 ease-out hover:-translate-y-1",
                feature.span
              )}
            >
              {/* Large number background */}
              <span
                className="absolute top-4 right-6 text-[6rem] font-bold font-display leading-none opacity-[0.04] pointer-events-none select-none"
                style={{ color: feature.color }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Subtle gradient background */}
              <div
                className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at top right, ${feature.color}, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className={cn(
                  "relative w-14 h-14 rounded-2xl flex items-center justify-center",
                  "transition-all duration-300",
                  "group-hover:scale-110 group-hover:rotate-3"
                )}
                style={{
                  background: feature.color,
                  color: "white",
                }}
              >
                <feature.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-semibold mt-6 mb-3 font-display">
                {feature.title}
              </h3>
              <p className="relative text-[var(--muted)] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
