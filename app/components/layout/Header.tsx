import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "~/components/ui/ThemeToggle";
import { Button } from "~/components/ui/Button";
import { IconMenu, IconClose, IconWhatsApp } from "~/components/ui/Icons";
import { cn } from "~/lib/utils";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Showroom", href: "/showroom" },
  { label: "Contacto", href: "/#contacto" },
];

export function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header
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
            <span className="text-2xl font-bold tracking-tight">
              ELÍAS
            </span>
            <span className="text-sm font-medium text-[var(--muted)] tracking-widest uppercase">
              Distribución
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--foreground)] transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "relative py-2 text-sm font-medium tracking-wide",
                  "transition-colors duration-300",
                  location.pathname === item.href
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-[var(--foreground)]",
                    "transition-all duration-300",
                    location.pathname === item.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
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
                "hover:bg-[var(--background-soft)] hover:border-[var(--foreground)]",
                "transition-all duration-300"
              )}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "absolute right-0 top-0 bottom-0 w-[280px]",
                "bg-[var(--background)] border-l border-[var(--border)]",
                "flex flex-col pt-24 px-6 pb-8"
              )}
            >
              <div className="flex-1 flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "block py-4 text-lg font-medium",
                        "border-b border-[var(--border)]",
                        "transition-colors duration-300",
                        location.pathname === item.href
                          ? "text-[var(--foreground)]"
                          : "text-[var(--muted)]"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  className="w-full"
                  icon={<IconWhatsApp className="w-4 h-4" />}
                  onClick={() => window.open("https://wa.me/5212345678901", "_blank")}
                >
                  Cotizar ahora
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
