import { useState } from "react";
import { motion } from "framer-motion";
import type { Route } from "./+types/showroom";
import { LogoUploader } from "~/components/showroom/LogoUploader";
import { ProductPreview } from "~/components/showroom/ProductPreview";
import { Button } from "~/components/ui/Button";
import { IconDownload, IconShare, IconWhatsApp } from "~/components/ui/Icons";
import { cn } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Showroom Virtual | Elías Distribución" },
    {
      name: "description",
      content:
        "Visualiza tu logo en nuestros productos promocionales. Sube tu logo y ve cómo quedaría en playeras, gorras, termos y más.",
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
  const [logo, setLogo] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);
  const [logoScale, setLogoScale] = useState(1);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });

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
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-[var(--muted)] uppercase tracking-widest">
            Showroom virtual
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Visualiza tu marca
          </h1>
          <p className="text-lg text-[var(--muted)] mt-4 max-w-2xl mx-auto">
            Sube tu logo y ve cómo quedaría en nuestros productos promocionales.
            Experimenta con colores y posiciones.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Controls */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Logo Uploader */}
            <LogoUploader
              onUpload={handleLogoUpload}
              currentLogo={logo}
              onClear={handleClearLogo}
            />

            {/* Color Selector */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Color del producto</h3>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={cn(
                      "w-12 h-12 rounded-xl border-2 transition-all duration-200",
                      "hover:scale-110",
                      selectedColor === color.value
                        ? "border-[var(--foreground)] ring-2 ring-[var(--foreground)] ring-offset-2 ring-offset-[var(--background)]"
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
                className="space-y-6"
              >
                {/* Scale Control */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Tamaño del logo</h3>
                    <span className="text-sm text-[var(--muted)]">
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
                    className="w-full h-2 rounded-full bg-[var(--surface)] appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--foreground)]"
                  />
                </div>

                {/* Position Controls */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Posición</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[var(--muted)]">
                        Horizontal
                      </label>
                      <input
                        type="range"
                        min="-30"
                        max="30"
                        step="1"
                        value={logoPosition.x}
                        onChange={(e) =>
                          setLogoPosition({
                            ...logoPosition,
                            x: parseFloat(e.target.value),
                          })
                        }
                        className="w-full h-2 rounded-full bg-[var(--surface)] appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--foreground)]"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[var(--muted)]">
                        Vertical
                      </label>
                      <input
                        type="range"
                        min="-30"
                        max="30"
                        step="1"
                        value={logoPosition.y}
                        onChange={(e) =>
                          setLogoPosition({
                            ...logoPosition,
                            y: parseFloat(e.target.value),
                          })
                        }
                        className="w-full h-2 rounded-full bg-[var(--surface)] appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--foreground)]"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setLogoPosition({ x: 0, y: 0 })}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    Centrar logo
                  </button>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            {logo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  className="flex-1"
                  icon={<IconWhatsApp />}
                  onClick={() =>
                    window.open(
                      "https://wa.me/5212345678901?text=Hola, me gustaría cotizar productos con mi logo",
                      "_blank"
                    )
                  }
                >
                  Solicitar cotización
                </Button>
                <Button
                  variant="outline"
                  icon={<IconDownload />}
                  onClick={() => alert("Funcionalidad de descarga próximamente")}
                >
                  Descargar
                </Button>
                <Button
                  variant="ghost"
                  icon={<IconShare />}
                  onClick={() => alert("Funcionalidad de compartir próximamente")}
                >
                  Compartir
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ProductPreview
              logo={logo}
              logoScale={logoScale}
              logoPosition={logoPosition}
              selectedColor={selectedColor}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
