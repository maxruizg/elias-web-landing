import { useState, useCallback, type DragEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconUpload, IconClose } from "~/components/ui/Icons";
import { cn } from "~/lib/utils";

interface LogoUploaderProps {
  onUpload: (file: File, preview: string) => void;
  currentLogo: string | null;
  onClear: () => void;
}

export function LogoUploader({ onUpload, currentLogo, onClear }: LogoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files && files[0]) processFile(files[0]);
    },
    [onUpload]
  );

  const handleFileInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) processFile(files[0]);
    },
    [onUpload]
  );

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor, sube una imagen valida (PNG, JPG, SVG)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      onUpload(file, preview);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold font-display">Tu logo</h3>

      <AnimatePresence mode="wait">
        {currentLogo ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
          >
            <button
              onClick={onClear}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors"
              aria-label="Eliminar logo"
            >
              <IconClose className="w-4 h-4" />
            </button>
            <img
              src={currentLogo}
              alt="Logo subido"
              className="max-h-32 mx-auto object-contain"
            />
          </motion.div>
        ) : (
          <motion.div
            key="uploader"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <label
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={cn(
                "flex flex-col items-center justify-center p-8 rounded-2xl cursor-pointer",
                "border-2 border-dashed transition-all duration-300",
                isDragging
                  ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/5 scale-[1.02]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--brand-primary)]"
              )}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />

              <motion.div
                animate={isDragging ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-4",
                  "transition-colors duration-300",
                  isDragging
                    ? "bg-[var(--brand-primary)] text-white"
                    : "bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white"
                )}
              >
                <IconUpload className="w-6 h-6" />
              </motion.div>

              <p className="text-sm font-medium text-center">
                {isDragging ? "Suelta aqui tu logo" : "Arrastra tu logo aqui"}
              </p>
              <p className="text-xs text-[var(--muted)] mt-2">
                PNG, JPG o SVG (max. 5MB)
              </p>
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
