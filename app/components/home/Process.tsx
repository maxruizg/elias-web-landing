import { motion } from "framer-motion";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";

const steps = [
  {
    number: "01",
    title: "Elige tu producto",
    description: "Explora nuestro catalogo de mas de 500 articulos promocionales y encuentra el ideal para tu marca.",
    color: "var(--brand-primary)",
  },
  {
    number: "02",
    title: "Personaliza tu diseno",
    description: "Sube tu logo y visualizalo en nuestro showroom virtual. Ajusta colores, posicion y tamano.",
    color: "var(--brand-secondary)",
  },
  {
    number: "03",
    title: "Cotiza y aprueba",
    description: "Recibe tu cotizacion en menos de 2 horas. Sin compromiso, con precios competitivos.",
    color: "var(--brand-tertiary)",
  },
  {
    number: "04",
    title: "Recibe tu pedido",
    description: "Produccion profesional y envio a todo Mexico con seguimiento en tiempo real.",
    color: "var(--brand-accent)",
  },
];

export function Process() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-secondary)]/10 text-sm font-medium text-[var(--brand-secondary)] mb-4">
            Como funciona
          </span>
          <h2 className="mt-4">4 pasos para impulsar tu marca</h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Un proceso simple y transparente para que tus productos promocionales
            esten listos en tiempo record.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, var(--brand-primary), var(--brand-secondary), var(--brand-tertiary), var(--brand-accent))" }}
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              // transform-origin is left
              // using style instead of className for dynamic origin
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="relative text-center"
              >
                {/* Step Number Circle */}
                <motion.div
                  className="relative w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-white font-bold text-xl font-display z-10"
                  style={{ background: step.color }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {step.number}
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${step.color}` }}
                    animate={isVisible ? { scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-semibold font-display mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed max-w-[250px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
