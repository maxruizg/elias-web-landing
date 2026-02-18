import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { IconStar } from "~/components/ui/Icons";

const testimonials = [
  {
    name: "Maria Garcia",
    role: "Directora de Marketing, TechCorp",
    content: "Increible calidad y servicio. Los articulos promocionales de Elias ayudaron a que nuestro evento corporativo fuera un exito total.",
    rating: 5,
    color: "var(--brand-primary)",
  },
  {
    name: "Carlos Rodriguez",
    role: "CEO, StartupMX",
    content: "La personalizacion de las playeras fue perfecta. El equipo de Elias entendio exactamente lo que necesitabamos para nuestra marca.",
    rating: 5,
    color: "var(--brand-secondary)",
  },
  {
    name: "Ana Martinez",
    role: "Gerente de RRHH, Grupo Industrial",
    content: "Llevamos 5 anos trabajando con Elias y siempre superan nuestras expectativas. Entrega puntual y productos de primera.",
    rating: 5,
    color: "var(--brand-tertiary)",
  },
  {
    name: "Roberto Hernandez",
    role: "Director Comercial, Eventos Plus",
    content: "El showroom virtual nos ahorro mucho tiempo. Pudimos visualizar los productos antes de ordenar y el resultado fue exacto.",
    rating: 5,
    color: "var(--brand-accent)",
  },
];

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[var(--background-soft)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-accent)]/10 text-sm font-medium text-[var(--brand-accent)] mb-4">
            Testimonios
          </span>
          <h2 className="mt-4">Lo que dicen nuestros clientes</h2>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <IconStar
                    key={i}
                    className="w-5 h-5"
                    style={{ color: testimonials[currentIndex].color } as React.CSSProperties}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-[var(--foreground)]">
                &ldquo;{testimonials[currentIndex].content}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-8">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold font-display text-lg"
                  style={{ background: testimonials[currentIndex].color }}
                >
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div className="font-semibold font-display">{testimonials[currentIndex].name}</div>
                <div className="text-sm text-[var(--muted)]">{testimonials[currentIndex].role}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === currentIndex ? 24 : 8,
                  background: i === currentIndex ? t.color : "var(--border)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
