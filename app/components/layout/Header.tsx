import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "~/components/ui/ThemeToggle";
import { Button } from "~/components/ui/Button";
import { IconMenu, IconClose, IconWhatsApp } from "~/components/ui/Icons";
import { useScrollDirection } from "~/hooks/useScrollAnimation";
import { cn } from "~/lib/utils";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Catalogo", href: "/catalogo" },
  { label: "Showroom", href: "/showroom" },
  { label: "Contacto", href: "/#contacto" },
];

export function Header() {
  const location = useLocation();
  const { scrollDirection, scrollY } = useScrollDirection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isScrolled = scrollY > 50;
  const isCompact = scrollDirection === "down" && scrollY > 200;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        animate={{
          y: isCompact ? -100 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-500 ease-out",
          isScrolled
            ? "py-3 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)]"
            : "py-5 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="relative group flex items-center gap-2"
          >
            <span className="text-2xl font-bold tracking-tight font-display gradient-text-animate">
              ELIAS
            </span>
            <span className="text-sm font-medium text-[var(--muted)] tracking-widest uppercase">
              Distribucion
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[var(--surface)]/50 backdrop-blur-sm border border-[var(--border)]">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "relative px-5 py-2 text-sm font-medium tracking-wide rounded-full",
                    "transition-all duration-300",
                    isActive
                      ? "text-white bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cmd+K Search Hint */}
            <button
              onClick={() => {
                document.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "k", metaKey: true })
                );
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg",
                "bg-[var(--surface)] border border-[var(--border)]",
                "text-xs text-[var(--muted)] hover:text-[var(--foreground)]",
                "hover:border-[var(--brand-primary)]",
                "transition-all duration-200"
              )}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <kbd className="font-mono text-[10px]">&#8984;K</kbd>
            </button>
            <ThemeToggle />
            <Button
              size="sm"
              icon={<IconWhatsApp className="w-4 h-4" />}
              onClick={() => window.open("https://wa.me/5212345678901", "_blank")}
            >
              Cotizar
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-full",
                "bg-[var(--surface)] border border-[var(--border)]",
                "hover:bg-[var(--background-soft)] hover:border-[var(--brand-primary)]",
                "transition-all duration-300"
              )}
              aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Floating compact nav pill (shows when scrolling down) */}
      <AnimatePresence>
        {isCompact && !isMobileMenuOpen && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block"
          >
            <nav className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-[var(--background)]/90 backdrop-blur-xl border border-[var(--border)] shadow-lg">
              <Link to="/" className="px-3 py-1.5 text-sm font-bold font-display gradient-text">
                E
              </Link>
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "px-4 py-1.5 text-xs font-medium rounded-full",
                      "transition-all duration-300",
                      isActive
                        ? "text-white bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <ThemeToggle className="ml-1" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay - Full Screen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-[var(--background)]"
          >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="gradient-orb w-[400px] h-[400px] bg-[var(--brand-primary)] top-[-100px] right-[-100px] opacity-20" />
              <div className="gradient-orb w-[300px] h-[300px] bg-[var(--brand-secondary)] bottom-[-50px] left-[-50px] opacity-20" />
            </div>

            {/* Menu Content */}
            <div className="relative h-full flex flex-col items-center justify-center">
              <nav className="flex flex-col items-center gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                      delay: 0.05 + index * 0.08,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "block px-8 py-4 text-3xl font-bold font-display tracking-tight text-center",
                        "transition-colors duration-300",
                        location.pathname === item.href
                          ? "gradient-text"
                          : "text-[var(--muted)] hover:text-[var(--foreground)]"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12"
              >
                <Button
                  size="lg"
                  icon={<IconWhatsApp className="w-5 h-5" />}
                  onClick={() => window.open("https://wa.me/5212345678901", "_blank")}
                >
                  Cotizar ahora
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
