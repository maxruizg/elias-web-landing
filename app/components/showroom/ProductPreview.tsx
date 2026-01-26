import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

interface ProductPreviewProps {
  logo: string | null;
  logoScale: number;
  logoPosition: { x: number; y: number };
  selectedColor: string;
}

const productTemplates = [
  { id: "tshirt", name: "Playera", emoji: "👕" },
  { id: "polo", name: "Polo", emoji: "👔" },
  { id: "hoodie", name: "Hoodie", emoji: "🧥" },
  { id: "cap", name: "Gorra", emoji: "🧢" },
  { id: "mug", name: "Taza", emoji: "☕" },
  { id: "bag", name: "Bolsa", emoji: "👜" },
];

export function ProductPreview({
  logo,
  logoScale,
  logoPosition,
  selectedColor,
}: ProductPreviewProps) {
  const [selectedProduct, setSelectedProduct] = useState(productTemplates[0]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Vista previa</h3>

      {/* Product Selector */}
      <div className="flex flex-wrap gap-2">
        {productTemplates.map((product) => (
          <button
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl",
              "border transition-all duration-200",
              selectedProduct.id === product.id
                ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--foreground)]"
            )}
          >
            <span>{product.emoji}</span>
            <span className="text-sm font-medium">{product.name}</span>
          </button>
        ))}
      </div>

      {/* Preview Canvas */}
      <motion.div
        layout
        className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)]"
      >
        {/* Product Background */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: selectedColor }}
        >
          {/* Product Placeholder */}
          <div className="text-[12rem] opacity-20 select-none">
            {selectedProduct.emoji}
          </div>
        </div>

        {/* Logo Overlay */}
        {logo && (
          <motion.div
            className="absolute"
            style={{
              top: `${50 + logoPosition.y}%`,
              left: `${50 + logoPosition.x}%`,
              transform: `translate(-50%, -50%) scale(${logoScale})`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: logoScale }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <img
              src={logo}
              alt="Logo preview"
              className="max-w-[200px] max-h-[200px] object-contain"
              style={{
                filter:
                  selectedColor === "#ffffff" || selectedColor === "#f5f5f5"
                    ? "none"
                    : "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
              }}
            />
          </motion.div>
        )}

        {/* Empty State */}
        {!logo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-[var(--muted)] bg-[var(--background)]/80 px-4 py-2 rounded-lg">
              Sube tu logo para ver la vista previa
            </p>
          </div>
        )}
      </motion.div>

      {/* Product Info */}
      <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">{selectedProduct.name} Premium</h4>
            <p className="text-sm text-[var(--muted)]">
              Impresión en serigrafía o bordado
            </p>
          </div>
          <div className="text-right">
            <div className="font-bold">Desde $85</div>
            <div className="text-xs text-[var(--muted)]">Min. 50 pzas</div>
          </div>
        </div>
      </div>
    </div>
  );
}
