import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { Button } from "~/components/ui/Button";
import {
  IconMail,
  IconPhone,
  IconLocation,
  IconWhatsApp,
  IconArrowRight,
} from "~/components/ui/Icons";
import { cn } from "~/lib/utils";

const contactMethods = [
  {
    icon: IconWhatsApp,
    label: "WhatsApp",
    value: "+52 (33) 1234 5678",
    href: "https://wa.me/5212345678901",
    description: "Respuesta inmediata",
  },
  {
    icon: IconPhone,
    label: "Teléfono",
    value: "+52 (33) 1234 5678",
    href: "tel:+523312345678",
    description: "Lun - Vie, 9am - 6pm",
  },
  {
    icon: IconMail,
    label: "Email",
    value: "contacto@eliasdistribucion.mx",
    href: "mailto:contacto@eliasdistribucion.mx",
    description: "Respuesta en 24 hrs",
  },
  {
    icon: IconLocation,
    label: "Ubicación",
    value: "Guadalajara, Jalisco",
    href: "https://maps.google.com",
    description: "Showroom con cita",
  },
];

export function Contact() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section
      ref={ref}
      id="contacto"
      className="py-24 md:py-32 bg-[var(--background-soft)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[var(--muted)] uppercase tracking-widest">
            Contáctanos
          </span>
          <h2 className="mt-4">¿Listo para impulsar tu marca?</h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Solicita una cotización sin compromiso. Nuestro equipo te responderá
            en menos de 2 horas hábiles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-8">
              Medios de contacto
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={cn(
                    "group p-6 rounded-2xl",
                    "bg-[var(--surface)] border border-[var(--border)]",
                    "hover:border-[var(--foreground)] hover:shadow-lg",
                    "transition-all duration-300"
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <method.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted)]">
                        {method.label}
                      </div>
                      <div className="font-medium mt-1">{method.value}</div>
                      <div className="text-xs text-[var(--muted)] mt-1">
                        {method.description}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick WhatsApp CTA */}
            <div className="mt-8 p-6 rounded-2xl bg-[var(--foreground)] text-[var(--background)]">
              <div className="flex items-center gap-4">
                <IconWhatsApp className="w-8 h-8" />
                <div className="flex-1">
                  <div className="font-semibold">¿Prefieres WhatsApp?</div>
                  <div className="text-sm opacity-80">
                    Chatea directamente con un asesor
                  </div>
                </div>
                <a
                  href="https://wa.me/5212345678901"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[var(--background)] text-[var(--foreground)] font-medium hover:opacity-90 transition-opacity"
                >
                  Iniciar chat
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <h3 className="text-2xl font-semibold mb-6">
                Solicitar cotización
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    ¡Mensaje enviado!
                  </h4>
                  <p className="text-[var(--muted)]">
                    Nos pondremos en contacto contigo pronto.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        required
                        className={cn(
                          "w-full px-4 py-3 rounded-xl",
                          "bg-[var(--background)] border border-[var(--border)]",
                          "focus:border-[var(--foreground)] focus:outline-none",
                          "transition-colors duration-200"
                        )}
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl",
                          "bg-[var(--background)] border border-[var(--border)]",
                          "focus:border-[var(--foreground)] focus:outline-none",
                          "transition-colors duration-200"
                        )}
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className={cn(
                          "w-full px-4 py-3 rounded-xl",
                          "bg-[var(--background)] border border-[var(--border)]",
                          "focus:border-[var(--foreground)] focus:outline-none",
                          "transition-colors duration-200"
                        )}
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl",
                          "bg-[var(--background)] border border-[var(--border)]",
                          "focus:border-[var(--foreground)] focus:outline-none",
                          "transition-colors duration-200"
                        )}
                        placeholder="+52 (33) 1234 5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      ¿Qué productos te interesan?
                    </label>
                    <select
                      className={cn(
                        "w-full px-4 py-3 rounded-xl",
                        "bg-[var(--background)] border border-[var(--border)]",
                        "focus:border-[var(--foreground)] focus:outline-none",
                        "transition-colors duration-200"
                      )}
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="textiles">Textiles (playeras, polos, etc.)</option>
                      <option value="tecnologia">Tecnología</option>
                      <option value="drinkware">Drinkware (termos, tazas)</option>
                      <option value="bolsas">Bolsas y mochilas</option>
                      <option value="oficina">Artículos de oficina</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      required
                      rows={4}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl resize-none",
                        "bg-[var(--background)] border border-[var(--border)]",
                        "focus:border-[var(--foreground)] focus:outline-none",
                        "transition-colors duration-200"
                      )}
                      placeholder="Cuéntanos sobre tu proyecto..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full group"
                    size="lg"
                    isLoading={isSubmitting}
                    icon={<IconArrowRight className="group-hover:translate-x-1 transition-transform" />}
                    iconPosition="right"
                  >
                    Enviar solicitud
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
