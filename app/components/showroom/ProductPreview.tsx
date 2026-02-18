import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

interface ProductPreviewProps {
  logo: string | null;
  logoScale: number;
  logoPosition: { x: number; y: number };
  selectedColor: string;
  initialProductId?: string;
  productInfo?: {
    name: string;
    price: number;
    minQuantity: number;
  };
}

export const productTemplates = [
  { id: "tshirt", name: "Playera", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80" },
  { id: "polo", name: "Polo", image: "https://images.unsplash.com/photo-1625910513413-5fc4e5e52058?w=600&q=80" },
  { id: "hoodie", name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80" },
  { id: "cap", name: "Gorra", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80" },
  { id: "mug", name: "Taza", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80" },
  { id: "bag", name: "Bolsa", image: "https://images.unsplash.com/photo-1597484661643-2f5fef26aa4e?w=600&q=80" },
  { id: "thermos", name: "Termo", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80" },
  { id: "backpack", name: "Mochila", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
];

export function ProductPreview({
  logo,
  logoScale,
  logoPosition,
  selectedColor,
  initialProductId,
  productInfo,
}: ProductPreviewProps) {
  const [selectedProduct, setSelectedProduct] = useState(() => {
    if (initialProductId) {
      const found = productTemplates.find(p => p.id === initialProductId);
      if (found) return found;
    }
    return productTemplates[0];
  });

  useEffect(() => {
    if (initialProductId) {
      const found = productTemplates.find(p => p.id === initialProductId);
      if (found) setSelectedProduct(found);
    }
  }, [initialProductId]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold font-display">Vista previa</h3>

      {/* Product Selector - Horizontal scrollable strip with images */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
        {productTemplates.map((product) => (
          <button
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className={cn(
              "flex-shrink-0 relative w-16 h-16 rounded-xl overflow-hidden",
              "border-2 transition-all duration-200",
              selectedProduct.id === product.id
                ? "border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]/30 scale-105"
                : "border-[var(--border)] opacity-60 hover:opacity-100"
            )}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-1">
              <span className="text-[8px] font-bold text-white uppercase tracking-wider">
                {product.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Preview Canvas */}
      <motion.div
        layout
        className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)]"
        style={{ transition: "background-color 0.5s ease" }}
      >
        {/* Product Background */}
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundColor: selectedColor }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-cover mix-blend-multiply opacity-90"
          />
        </motion.div>

        {/* Logo Overlay - Draggable */}
        {logo && (
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            dragElastic={0.1}
            className="absolute cursor-grab active:cursor-grabbing"
            style={{
              top: `${50 + logoPosition.y}%`,
              left: `${50 + logoPosition.x}%`,
              transform: `translate(-50%, -50%) scale(${logoScale})`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: logoScale }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ scale: logoScale * 1.05 }}
          >
            <img
              src={logo}
              alt="Logo preview"
              className="max-w-[200px] max-h-[200px] object-contain pointer-events-none"
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
            <div className="text-center p-4 rounded-xl bg-[var(--background)]/80 backdrop-blur-sm">
              <p className="text-sm text-[var(--muted)]">
                Sube tu logo para ver la vista previa
              </p>
              <p className="text-xs text-[var(--muted)] mt-1">
                Puedes arrastrar el logo para posicionarlo
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Product Info */}
      <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold font-display">
              {productInfo?.name || `${selectedProduct.name} Premium`}
            </h4>
            <p className="text-sm text-[var(--muted)]">
              Impresion en serigrafia o bordado
            </p>
          </div>
          <div className="text-right">
            <div className="font-bold font-display tabular-nums">
              Desde ${productInfo?.price || 85}
            </div>
            <div className="text-xs text-[var(--muted)]">
              Min. {productInfo?.minQuantity || 50} pzas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
