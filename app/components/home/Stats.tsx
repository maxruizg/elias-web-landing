import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Productos",
    description: "En catálogo permanente",
  },
  {
    value: 1200,
    suffix: "+",
    label: "Clientes Activos",
    description: "En todo México",
  },
  {
    value: 50000,
    suffix: "+",
    label: "Pedidos Entregados",
    description: "Con 99% satisfacción",
  },
  {
    value: 15,
    suffix: "+",
    label: "Años de Experiencia",
    description: "En el mercado",
  },
];

function AnimatedCounter({
  value,
  suffix = "",
  isVisible,
}: {
  value: number;
  suffix?: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-MX").format(num);
  };

  return (
    <span>
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

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
          <span className="text-sm font-medium text-[var(--muted)] uppercase tracking-widest">
            Nuestros números
          </span>
          <h2 className="mt-4">Resultados que hablan por sí solos</h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="relative text-center p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
            >
              {/* Accent Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[var(--foreground)] rounded-b-full" />

              {/* Value */}
              <div className="text-4xl md:text-5xl font-bold tracking-tight">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>

              {/* Label */}
              <div className="text-lg font-semibold mt-2">{stat.label}</div>

              {/* Description */}
              <div className="text-sm text-[var(--muted)] mt-1">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
