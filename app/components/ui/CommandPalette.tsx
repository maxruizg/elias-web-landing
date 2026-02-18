import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { products, categories } from "~/data/products";
import { IconSearch } from "~/components/ui/Icons";
import { cn } from "~/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  category: "page" | "product" | "action";
  href?: string;
  action?: () => void;
  icon: string;
}

const pageItems: CommandItem[] = [
  { id: "home", label: "Inicio", description: "Pagina principal", category: "page", href: "/", icon: "home" },
  { id: "catalogo", label: "Catalogo", description: "Ver todos los productos", category: "page", href: "/catalogo", icon: "grid" },
  { id: "showroom", label: "Showroom Virtual", description: "Personaliza productos con tu logo", category: "page", href: "/showroom", icon: "eye" },
  { id: "contacto", label: "Contacto", description: "Formulario de contacto", category: "page", href: "/#contacto", icon: "mail" },
];

const actionItems: CommandItem[] = [
  {
    id: "whatsapp",
    label: "Contactar por WhatsApp",
    description: "Abrir chat de WhatsApp",
    category: "action",
    icon: "message",
    action: () => window.open("https://wa.me/5212345678901", "_blank"),
  },
  {
    id: "theme",
    label: "Cambiar tema",
    description: "Alternar entre modo claro y oscuro",
    category: "action",
    icon: "sun",
    action: () => {
      const html = document.documentElement;
      const current = html.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    },
  },
];

const categoryIcons: Record<string, string> = {
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  grid: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  eye: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  message: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  sun: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  package: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
};

function CommandIcon({ icon }: { icon: string }) {
  const path = categoryIcons[icon];
  if (!path) return null;
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      {path.split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : `M${d}`} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Build product items
  const productItems: CommandItem[] = useMemo(
    () =>
      products.map((p) => ({
        id: `product-${p.id}`,
        label: p.name,
        description: `${categories.find((c) => c.id === p.category)?.name || p.category} — $${p.price} MXN`,
        category: "product" as const,
        href: `/catalogo?producto=${p.id}`,
        icon: "package",
      })),
    []
  );

  const allItems = useMemo(
    () => [...pageItems, ...actionItems, ...productItems],
    [productItems]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return [...pageItems, ...actionItems];
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [query, allItems]);

  // Group filtered items by category
  const grouped = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    for (const item of filtered) {
      const key = item.category === "page" ? "Paginas" : item.category === "product" ? "Productos" : "Acciones";
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    }
    // Limit products shown
    if (groups["Productos"] && groups["Productos"].length > 5) {
      groups["Productos"] = groups["Productos"].slice(0, 5);
    }
    return groups;
  }, [filtered]);

  const flatFiltered = useMemo(
    () => Object.values(grouped).flat(),
    [grouped]
  );

  // Keyboard shortcut to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset selected index when filtered items change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-command-item]");
    items[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const executeItem = useCallback(
    (item: CommandItem) => {
      setIsOpen(false);
      if (item.action) {
        item.action();
      } else if (item.href) {
        navigate(item.href);
      }
    },
    [navigate]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatFiltered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatFiltered.length) % flatFiltered.length);
    } else if (e.key === "Enter" && flatFiltered[selectedIndex]) {
      e.preventDefault();
      executeItem(flatFiltered[selectedIndex]);
    }
  };

  let itemCounter = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="relative w-full max-w-lg mx-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 border-b border-[var(--border)]">
              <IconSearch className="w-5 h-5 text-[var(--muted)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar paginas, productos, acciones..."
                className="flex-1 py-4 bg-transparent text-[var(--foreground)] placeholder-[var(--muted)] outline-none text-base"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-[var(--muted)] bg-[var(--surface)] border border-[var(--border)] rounded-md">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[300px] overflow-y-auto p-2">
              {flatFiltered.length === 0 ? (
                <div className="py-8 text-center text-[var(--muted)] text-sm">
                  No se encontraron resultados para "{query}"
                </div>
              ) : (
                Object.entries(grouped).map(([groupName, items]) => (
                  <div key={groupName}>
                    <div className="px-3 py-2 text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                      {groupName}
                    </div>
                    {items.map((item) => {
                      const index = itemCounter++;
                      const isSelected = index === selectedIndex;
                      return (
                        <button
                          key={item.id}
                          data-command-item
                          onClick={() => executeItem(item)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left",
                            "transition-colors duration-100",
                            isSelected
                              ? "bg-[var(--brand-primary)]/10 text-[var(--foreground)]"
                              : "text-[var(--foreground)] hover:bg-[var(--surface)]"
                          )}
                        >
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                              isSelected
                                ? "bg-[var(--brand-primary)] text-white"
                                : "bg-[var(--surface)] text-[var(--muted)]"
                            )}
                          >
                            <CommandIcon icon={item.icon} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {item.label}
                            </div>
                            <div className="text-xs text-[var(--muted)] truncate">
                              {item.description}
                            </div>
                          </div>
                          {isSelected && (
                            <kbd className="hidden sm:inline-flex text-xs text-[var(--muted)] bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                              Enter
                            </kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--border)] text-xs text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 bg-[var(--surface)] border border-[var(--border)] rounded text-[10px]">↑↓</kbd>
                <span>Navegar</span>
                <kbd className="px-1.5 py-0.5 bg-[var(--surface)] border border-[var(--border)] rounded text-[10px] ml-2">↵</kbd>
                <span>Seleccionar</span>
              </div>
              <span>{flatFiltered.length} resultados</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
