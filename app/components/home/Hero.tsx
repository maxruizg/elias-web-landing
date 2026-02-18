import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/components/ui/Button";
import { IconArrowRight, IconArrowDown } from "~/components/ui/Icons";

const rotatingWords = ["playeras", "gorras", "termos", "bolsas", "plumas", "mochilas"];

const brandColors = [
  "var(--brand-primary)",
  "var(--brand-secondary)",
  "var(--brand-tertiary)",
  "var(--brand-accent)",
];

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [wordIndex, setWordIndex] = useState(0);
  const rafRef = useRef<number>(0);

  // Throttled mouse tracking with rAF
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
      rafRef.current = 0;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  // Rotating word carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            background: "var(--gradient-mesh)",
            backgroundSize: "200% 200%",
          }}
        />
        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      {/* Animated geometric shapes */}
      {[
        { size: 120, color: brandColors[0], top: "10%", left: "5%", delay: 0 },
        { size: 80, color: brandColors[1], top: "20%", right: "10%", delay: 1 },
        { size: 60, color: brandColors[2], bottom: "30%", left: "15%", delay: 2 },
        { size: 100, color: brandColors[3], bottom: "15%", right: "20%", delay: 0.5 },
        { size: 40, color: brandColors[0], top: "60%", left: "60%", delay: 1.5 },
      ].map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20 pointer-events-none"
          style={{
            width: shape.size,
            height: shape.size,
            background: shape.color,
            top: shape.top,
            bottom: (shape as Record<string, unknown>).bottom as string | undefined,
            left: shape.left,
            right: (shape as Record<string, unknown>).right as string | undefined,
            filter: "blur(1px)",
          }}
          animate={{
            x: mousePosition.x * (1 + i * 0.3),
            y: mousePosition.y * (1 + i * 0.3),
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
            scale: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: shape.delay },
            rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
          }}
        />
      ))}

      {/* Content - Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)] animate-pulse" />
              <span className="text-sm font-medium text-[var(--brand-primary)]">
                +15 anos de experiencia
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
            >
              <span className="block">Impulsa</span>
              <span className="block">tu marca</span>
              <span className="block mt-2">
                con{" "}
                <span className="relative inline-block">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ y: 40, opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                      animate={{ y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                      exit={{ y: -40, opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="gradient-text-animate"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-[var(--muted)] max-w-lg mt-8"
            >
              Articulos promocionales premium para empresas que buscan destacar.
              Calidad, innovacion y servicio excepcional.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-4 mt-10"
            >
              <Link to="/catalogo">
                <Button size="lg" icon={<IconArrowRight />} iconPosition="right">
                  Ver catalogo
                </Button>
              </Link>
              <Link to="/showroom">
                <Button variant="outline" size="lg">
                  Showroom virtual
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right: Stats pills / visual area */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Hero image with brand overlay */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80"
                  alt="Articulos promocionales"
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10" />
              </div>

              {/* Floating stat cards */}
              {[
                { value: "500+", label: "Productos", color: "var(--brand-primary)", x: -30, y: 80 },
                { value: "1,200+", label: "Clientes", color: "var(--brand-secondary)", x: -40, y: 220 },
                { value: "15+", label: "Anos", color: "var(--brand-tertiary)", x: 20, y: 360 },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: stat.x }}
                  transition={{ delay: 0.6 + i * 0.15, type: "spring" }}
                  className="absolute bg-[var(--background)]/90 backdrop-blur-xl border border-[var(--border)] rounded-2xl px-5 py-3 shadow-lg"
                  style={{ top: stat.y, left: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1 h-10 rounded-full"
                      style={{ background: stat.color }}
                    />
                    <div>
                      <div className="text-xl font-bold font-display tabular-nums">{stat.value}</div>
                      <div className="text-xs text-[var(--muted)]">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile Stats */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 lg:hidden"
        >
          {[
            { value: "500+", label: "Productos", color: "var(--brand-primary)" },
            { value: "1,200+", label: "Clientes", color: "var(--brand-secondary)" },
            { value: "50K+", label: "Pedidos", color: "var(--brand-tertiary)" },
            { value: "15+", label: "Anos", color: "var(--brand-accent)" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center p-4 rounded-2xl bg-[var(--surface)]/80 backdrop-blur-sm border border-[var(--border)]"
            >
              <div
                className="w-8 h-1 rounded-full mx-auto mb-3"
                style={{ background: stat.color }}
              />
              <div className="text-2xl font-bold font-display tabular-nums">{stat.value}</div>
              <div className="text-xs text-[var(--muted)] mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[var(--muted)] uppercase tracking-widest">
            Scroll
          </span>
          <IconArrowDown className="w-4 h-4 text-[var(--muted)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
