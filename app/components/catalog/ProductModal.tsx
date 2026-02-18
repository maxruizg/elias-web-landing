import { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "~/components/ui/Modal";
import { Button } from "~/components/ui/Button";
import { IconWhatsApp, IconCheck } from "~/components/ui/Icons";
import { type Product } from "~/data/products";
import { cn, formatCurrency } from "~/lib/utils";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(product?.minQuantity || 50);

  if (!product) return null;

  const total = product.price * quantity;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Product Image */}
        <div className="relative aspect-square md:aspect-auto bg-[var(--background-soft)] min-h-[300px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Badges */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            {product.new && (
              <span className="px-4 py-1.5 text-sm font-bold rounded-full bg-gradient-to-r from-[var(--brand-secondary)] to-[var(--brand-accent)] text-white shadow-lg">
                Nuevo
              </span>
            )}
            {product.bestseller && (
              <span className="px-4 py-1.5 text-sm font-bold rounded-full bg-gradient-to-r from-[var(--brand-tertiary)] to-[var(--color-emerald)] text-white shadow-lg">
                Bestseller
              </span>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-8 overflow-y-auto max-h-[80vh]">
          {/* Category & Brand */}
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <span className="uppercase tracking-wider">{product.category}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--muted)]" />
            <span className="capitalize">{product.brand}</span>
          </div>

          {/* Name */}
          <h2 className="text-2xl md:text-3xl font-bold mt-2 font-display">{product.name}</h2>

          {/* Price */}
          <div className="mt-4">
            <span className="text-3xl font-bold font-display tabular-nums">
              {formatCurrency(product.price)}
            </span>
            <span className="text-[var(--muted)] ml-2">/ pieza</span>
          </div>

          {/* Description */}
          <p className="text-[var(--muted)] mt-4 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-3">
              Color: <span className="font-normal text-[var(--muted)]">
                {selectedColor === 0 ? "Primario" : `Opcion ${selectedColor + 1}`}
              </span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className={cn(
                    "w-10 h-10 rounded-xl border-2 transition-all duration-200",
                    "hover:scale-110 relative",
                    selectedColor === i
                      ? "border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)] ring-offset-2 ring-offset-[var(--background)]"
                      : "border-[var(--border)]"
                  )}
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${i + 1}`}
                >
                  {selectedColor === i && (
                    <IconCheck
                      className={cn(
                        "absolute inset-0 m-auto w-5 h-5",
                        color === "#ffffff" || color === "#fef3c7"
                          ? "text-black"
                          : "text-white"
                      )}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-3">
              Cantidad: <span className="font-normal text-[var(--muted)]">
                (Min. {product.minQuantity} pzas)
              </span>
            </h4>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[var(--border)] rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(product.minQuantity, quantity - 10))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-[var(--surface)] transition-colors text-xl"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(product.minQuantity, parseInt(e.target.value) || 0))
                  }
                  className="w-20 h-12 text-center bg-transparent border-x border-[var(--border)] font-medium focus:outline-none tabular-nums"
                />
                <button
                  onClick={() => setQuantity(quantity + 10)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-[var(--surface)] transition-colors text-xl"
                >
                  +
                </button>
              </div>
              <div className="text-sm text-[var(--muted)]">
                Subtotal:{" "}
                <span className="font-bold text-[var(--foreground)] tabular-nums">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-6 p-4 rounded-xl bg-[var(--background-soft)]">
            <h4 className="text-sm font-semibold mb-3">Incluye:</h4>
            <ul className="space-y-2">
              {[
                "Personalizacion con tu logo",
                "Empaque individual",
                "Certificado de calidad",
                "Envio a todo Mexico",
              ].map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <IconCheck className="w-4 h-4 text-[var(--brand-tertiary)] flex-shrink-0" />
                  <span className="text-[var(--muted)]">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1"
              size="lg"
              icon={<IconWhatsApp />}
              onClick={() =>
                window.open(
                  `https://wa.me/5212345678901?text=Hola, me interesa cotizar ${quantity} piezas del producto: ${product.name}`,
                  "_blank"
                )
              }
            >
              Cotizar por WhatsApp
            </Button>
            <Button variant="outline" size="lg" onClick={onClose}>
              Seguir viendo
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
