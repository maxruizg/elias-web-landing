import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Productos",
    description: "En catalogo permanente",
    color: "var(--brand-primary)",
  },
  {
    value: 1200,
    suffix: "+",
    label: "Clientes Activos",
    description: "En todo Mexico",
    color: "var(--brand-secondary)",
  },
  {
    value: 50000,
    suffix: "+",
    label: "Pedidos Entregados",
    description: "Con 99% satisfaccion",
    color: "var(--brand-tertiary)",
  },
  {
    value: 15,
    suffix: "+",
    label: "Anos de Experiencia",
    description: "En el mercado",
    color: "var(--brand-accent)",
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
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const duration = 2000;
      // Ease-out expo
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(eased * value);
      setCount(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    },
    [value]
  );

  useEffect(() => {
    if (!isVisible) return;
    startTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, animate]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-MX").format(num);
  };

  return (
    <span className="tabular-nums" aria-live="polite">
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Full-bleed gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[var(--brand-tertiary)] opacity-[0.06]" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-accent)]/10 text-sm font-medium text-[var(--brand-accent)] mb-4">
            Nuestros numeros
          </span>
          <h2 className="mt-4">Resultados que hablan por si solos</h2>
        </motion.div>

        {/* Stats - Horizontal layout with dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="relative text-center p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
            >
              {/* SVG Progress Ring */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="4"
                  />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke={stat.color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={251.2}
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={isVisible ? { strokeDashoffset: 251.2 * 0.15 } : {}}
                    transition={{ duration: 2, delay: 0.2 + index * 0.15, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl md:text-3xl font-bold font-display tracking-tight">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      isVisible={isVisible}
                    />
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="text-base font-semibold font-display">{stat.label}</div>

              {/* Description */}
              <div className="text-sm text-[var(--muted)] mt-1">
                {stat.description}
              </div>

              {/* Colored accent line */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-b-full"
                style={{ background: stat.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
