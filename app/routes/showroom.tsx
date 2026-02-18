import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router";
import type { Route } from "./+types/showroom";
import { LogoUploader } from "~/components/showroom/LogoUploader";
import { ProductPreview, productTemplates } from "~/components/showroom/ProductPreview";
import { Button } from "~/components/ui/Button";
import { IconDownload, IconShare, IconWhatsApp } from "~/components/ui/Icons";
import { cn } from "~/lib/utils";
import { getProductById } from "~/data/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Showroom Virtual | Elias Distribucion" },
    {
      name: "description",
      content:
        "Visualiza tu logo en nuestros productos promocionales. Sube tu logo y ve como quedaria en playeras, gorras, termos y mas.",
    },
  ];
}

const colorOptions = [
  { name: "Blanco", value: "#ffffff" },
  { name: "Negro", value: "#0a0a0a" },
  { name: "Gris", value: "#6b7280" },
  { name: "Azul", value: "#1e40af" },
  { name: "Rojo", value: "#dc2626" },
  { name: "Verde", value: "#16a34a" },
];

export default function Showroom() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const linkedProduct = productId ? getProductById(productId) : null;

  const [logo, setLogo] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [selectedColor, setSelectedColor] = useState(() => {
    if (linkedProduct && linkedProduct.colors.length > 0) return linkedProduct.colors[0];
    return colorOptions[0].value;
  });
  const [logoScale, setLogoScale] = useState(1);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (linkedProduct && linkedProduct.colors.length > 0) {
      setSelectedColor(linkedProduct.colors[0]);
    }
  }, [linkedProduct]);

  const handleLogoUpload = (file: File, preview: string) => {
    setLogoFile(file);
    setLogo(preview);
  };

  const handleClearLogo = () => {
    setLogo(null);
    setLogoFile(null);
    setLogoScale(1);
    setLogoPosition({ x: 0, y: 0 });
  };

  return (
    <div className="pt-20 pb-20 md:pb-0 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-6 py-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-primary)]/10 text-xs font-medium text-[var(--brand-primary)] mb-2">
              Showroom virtual
            </span>
            <h1 className="text-2xl md:text-3xl font-bold font-display">
              {linkedProduct ? `Personaliza tu ${linkedProduct.name}` : "Visualiza tu marca"}
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm font-medium hover:bg-[var(--background-soft)] transition-colors"
          >
            {sidebarOpen ? "Ocultar controles" : "Mostrar controles"}
          </button>
        </div>
      </motion.div>

      {/* Full-screen canvas layout */}
      <div className="max-w-7xl mx-auto px-6">
        <div className={cn(
          "grid gap-8 transition-all duration-500",
          sidebarOpen ? "grid-cols-1 lg:grid-cols-[1fr_340px]" : "grid-cols-1"
        )}>
          {/* Main Preview Area (70%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ProductPreview
              logo={logo}
              logoScale={logoScale}
              logoPosition={logoPosition}
              selectedColor={selectedColor}
              initialProductId={linkedProduct?.templateType}
              productInfo={linkedProduct ? {
                name: linkedProduct.name,
                price: linkedProduct.price,
                minQuantity: linkedProduct.minQuantity,
              } : undefined}
            />
          </motion.div>

          {/* Sidebar Controls (30%) */}
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Logo Uploader */}
              <LogoUploader
                onUpload={handleLogoUpload}
                currentLogo={logo}
                onClear={handleClearLogo}
              />

              {/* Color Selector */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold font-display">
                  Color del producto
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(linkedProduct ? linkedProduct.colors.map(c => ({ name: c, value: c })) : colorOptions).map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={cn(
                        "w-10 h-10 rounded-xl border-2 transition-all duration-200",
                        "hover:scale-110",
                        selectedColor === color.value
                          ? "border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]/30"
                          : "border-[var(--border)]"
                      )}
                      style={{ backgroundColor: color.value }}
                      aria-label={color.name}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Logo Controls */}
              {logo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-5"
                >
                  {/* Scale */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Tamano</span>
                      <span className="text-xs text-[var(--muted)] tabular-nums">
                        {Math.round(logoScale * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.3"
                      max="2"
                      step="0.1"
                      value={logoScale}
                      onChange={(e) => setLogoScale(parseFloat(e.target.value))}
                      className="w-full h-2 rounded-full bg-[var(--surface)] appearance-none cursor-pointer accent-[var(--brand-primary)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--brand-primary)]"
                    />
                  </div>

                  {/* Position */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Posicion</span>
                      <button
                        onClick={() => setLogoPosition({ x: 0, y: 0 })}
                        className="text-xs text-[var(--brand-primary)] hover:underline"
                      >
                        Centrar
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-[var(--muted)]">Horizontal</label>
                        <input
                          type="range"
                          min="-30"
                          max="30"
                          step="1"
                          value={logoPosition.x}
                          onChange={(e) => setLogoPosition({ ...logoPosition, x: parseFloat(e.target.value) })}
                          className="w-full h-2 rounded-full bg-[var(--surface)] appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--brand-primary)]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[var(--muted)]">Vertical</label>
                        <input
                          type="range"
                          min="-30"
                          max="30"
                          step="1"
                          value={logoPosition.y}
                          onChange={(e) => setLogoPosition({ ...logoPosition, y: parseFloat(e.target.value) })}
                          className="w-full h-2 rounded-full bg-[var(--surface)] appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--brand-primary)]"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-[var(--muted)]">
                      Tambien puedes arrastrar el logo directamente en la vista previa
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 pt-2">
                    <Button
                      icon={<IconWhatsApp />}
                      onClick={() =>
                        window.open(
                          "https://wa.me/5212345678901?text=Hola, me gustaria cotizar productos con mi logo",
                          "_blank"
                        )
                      }
                    >
                      Solicitar cotizacion
                    </Button>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        icon={<IconDownload />}
                        onClick={() => alert("Funcionalidad de descarga proximamente")}
                      >
                        Descargar
                      </Button>
                      <Button
                        variant="ghost"
                        className="flex-1"
                        icon={<IconShare />}
                        onClick={() => alert("Funcionalidad de compartir proximamente")}
                      >
                        Compartir
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
