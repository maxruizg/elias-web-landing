import { motion } from "framer-motion";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { Card, CardContent } from "~/components/ui/Card";
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
    title: "Catálogo Extenso",
    description:
      "Más de 500 productos promocionales de las mejores marcas internacionales.",
  },
  {
    icon: IconPalette,
    title: "Personalización Total",
    description:
      "Serigrafía, bordado, sublimación, grabado láser y más técnicas de impresión.",
  },
  {
    icon: IconTruck,
    title: "Envío Nacional",
    description:
      "Entrega a todo México con seguimiento en tiempo real de tu pedido.",
  },
  {
    icon: IconClock,
    title: "Entregas Express",
    description:
      "Opciones de entrega urgente para tus campañas de último momento.",
  },
  {
    icon: IconShield,
    title: "Garantía de Calidad",
    description:
      "Cada producto pasa por control de calidad antes de ser entregado.",
  },
  {
    icon: IconZap,
    title: "Cotización Rápida",
    description:
      "Respuesta a tu cotización en menos de 2 horas hábiles garantizado.",
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
          <span className="text-sm font-medium text-[var(--muted)] uppercase tracking-widest">
            ¿Por qué elegirnos?
          </span>
          <h2 className="mt-4">
            Todo lo que necesitas en un solo lugar
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Somos tu aliado estratégico para impulsar tu marca con productos
            promocionales de la más alta calidad.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <Card className="h-full group">
                <CardContent className="p-8">
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center",
                      "bg-[var(--foreground)] text-[var(--background)]",
                      "transition-transform duration-300",
                      "group-hover:scale-110 group-hover:rotate-3"
                    )}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mt-6 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--muted)] leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
