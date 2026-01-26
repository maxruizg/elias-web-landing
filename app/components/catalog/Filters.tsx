import { IconSearch, IconFilter, IconClose } from "~/components/ui/Icons";
import { categories, brands } from "~/data/products";
import { cn } from "~/lib/utils";

interface FiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Filters({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  searchQuery,
  setSearchQuery,
  isMobileOpen = false,
  onMobileClose,
}: FiltersProps) {
  const hasActiveFilters =
    selectedCategory !== "all" || selectedBrand !== "all" || searchQuery !== "";

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSearchQuery("");
  };

  return (
    <aside
      className={cn(
        "w-full lg:w-72 flex-shrink-0",
        "lg:sticky lg:top-24 lg:h-fit",
        // Mobile overlay styles
        isMobileOpen &&
          "fixed inset-0 z-50 bg-[var(--background)] p-6 overflow-y-auto lg:relative lg:inset-auto lg:z-auto lg:p-0"
      )}
    >
      {/* Mobile Header */}
      {isMobileOpen && (
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-xl font-bold">Filtros</h2>
          <button
            onClick={onMobileClose}
            className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold mb-3">Buscar</label>
          <div className="relative">
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full pl-12 pr-4 py-3 rounded-xl",
                "bg-[var(--surface)] border border-[var(--border)]",
                "focus:border-[var(--foreground)] focus:outline-none",
                "transition-colors duration-200"
              )}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                <IconClose className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-semibold mb-3">Categoría</label>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "w-full text-left px-4 py-2.5 rounded-xl text-sm",
                  "transition-all duration-200",
                  selectedCategory === category.id
                    ? "bg-[var(--foreground)] text-[var(--background)] font-medium"
                    : "hover:bg-[var(--surface)]"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <label className="block text-sm font-semibold mb-3">Marca</label>
          <div className="space-y-1">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={cn(
                  "w-full text-left px-4 py-2.5 rounded-xl text-sm",
                  "transition-all duration-200",
                  selectedBrand === brand.id
                    ? "bg-[var(--foreground)] text-[var(--background)] font-medium"
                    : "hover:bg-[var(--surface)]"
                )}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="w-full py-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Limpiar filtros
          </button>
        )}

        {/* Mobile Apply Button */}
        {isMobileOpen && (
          <button
            onClick={onMobileClose}
            className="w-full py-4 bg-[var(--foreground)] text-[var(--background)] rounded-xl font-medium lg:hidden"
          >
            Ver resultados
          </button>
        )}
      </div>
    </aside>
  );
}
