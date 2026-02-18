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
    color: "var(--brand-tertiary)",
  },
  {
    icon: IconPhone,
    label: "Telefono",
    value: "+52 (33) 1234 5678",
    href: "tel:+523312345678",
    description: "Lun - Vie, 9am - 6pm",
    color: "var(--brand-primary)",
  },
  {
    icon: IconMail,
    label: "Email",
    value: "contacto@eliasdistribucion.mx",
    href: "mailto:contacto@eliasdistribucion.mx",
    description: "Respuesta en 24 hrs",
    color: "var(--brand-secondary)",
  },
  {
    icon: IconLocation,
    label: "Ubicacion",
    value: "Guadalajara, Jalisco",
    href: "https://maps.google.com",
    description: "Showroom con cita",
    color: "var(--brand-accent)",
  },
];

export function Contact() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-primary)]/10 text-sm font-medium text-[var(--brand-primary)] mb-4">
            Contactanos
          </span>
          <h2 className="mt-4">Listo para impulsar tu marca?</h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Solicita una cotizacion sin compromiso. Nuestro equipo te respondera
            en menos de 2 horas habiles.
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
            <h3 className="text-2xl font-semibold mb-8 font-display">
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
                    "hover:shadow-lg hover:-translate-y-1",
                    "transition-all duration-300"
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Colored left border */}
                    <div
                      className="w-1 h-12 rounded-full flex-shrink-0 mt-1"
                      style={{ background: method.color }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <method.icon className="w-4 h-4 text-[var(--muted)]" />
                        <span className="text-sm text-[var(--muted)]">
                          {method.label}
                        </span>
                      </div>
                      <div className="font-medium mt-1 text-sm">{method.value}</div>
                      <div className="text-xs text-[var(--muted)] mt-1">
                        {method.description}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
                <div className="absolute -left-5 -bottom-5 w-24 h-24 rounded-full bg-white/10" />
              </div>
              <div className="relative flex items-center gap-4">
                <IconWhatsApp className="w-8 h-8" />
                <div className="flex-1">
                  <div className="font-semibold">Prefieres WhatsApp?</div>
                  <div className="text-sm opacity-80">
                    Chatea directamente con un asesor
                  </div>
                </div>
                <a
                  href="https://wa.me/5212345678901"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-white text-[var(--brand-primary)] font-medium hover:opacity-90 transition-opacity"
                >
                  Iniciar chat
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <h3 className="text-2xl font-semibold mb-6 font-display">
                Solicitar cotizacion
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--brand-tertiary)]/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-[var(--brand-tertiary)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 font-display">
                    Mensaje enviado!
                  </h4>
                  <p className="text-[var(--muted)]">
                    Nos pondremos en contacto contigo pronto.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder=" "
                        className={cn(
                          "peer w-full px-4 pt-5 pb-2 rounded-xl",
                          "bg-[var(--background)] border border-[var(--border)]",
                          "focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]",
                          "transition-colors duration-200"
                        )}
                      />
                      <label className="absolute left-4 top-2 text-[10px] font-medium text-[var(--muted)] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--brand-primary)]">
                        Nombre *
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder=" "
                        className={cn(
                          "peer w-full px-4 pt-5 pb-2 rounded-xl",
                          "bg-[var(--background)] border border-[var(--border)]",
                          "focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]",
                          "transition-colors duration-200"
                        )}
                      />
                      <label className="absolute left-4 top-2 text-[10px] font-medium text-[var(--muted)] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--brand-primary)]">
                        Empresa
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder=" "
                        className={cn(
                          "peer w-full px-4 pt-5 pb-2 rounded-xl",
                          "bg-[var(--background)] border border-[var(--border)]",
                          "focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]",
                          "transition-colors duration-200"
                        )}
                      />
                      <label className="absolute left-4 top-2 text-[10px] font-medium text-[var(--muted)] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--brand-primary)]">
                        Email *
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder=" "
                        className={cn(
                          "peer w-full px-4 pt-5 pb-2 rounded-xl",
                          "bg-[var(--background)] border border-[var(--border)]",
                          "focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]",
                          "transition-colors duration-200"
                        )}
                      />
                      <label className="absolute left-4 top-2 text-[10px] font-medium text-[var(--muted)] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--brand-primary)]">
                        Telefono
                      </label>
                    </div>
                  </div>

                  <div>
                    <select
                      className={cn(
                        "w-full px-4 py-3 rounded-xl",
                        "bg-[var(--background)] border border-[var(--border)]",
                        "focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]",
                        "transition-colors duration-200"
                      )}
                    >
                      <option value="">Que productos te interesan?</option>
                      <option value="textiles">Textiles (playeras, polos, etc.)</option>
                      <option value="tecnologia">Tecnologia</option>
                      <option value="drinkware">Drinkware (termos, tazas)</option>
                      <option value="bolsas">Bolsas y mochilas</option>
                      <option value="oficina">Articulos de oficina</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div className="relative">
                    <textarea
                      required
                      rows={4}
                      placeholder=" "
                      className={cn(
                        "peer w-full px-4 pt-5 pb-2 rounded-xl resize-none",
                        "bg-[var(--background)] border border-[var(--border)]",
                        "focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]",
                        "transition-colors duration-200"
                      )}
                    />
                    <label className="absolute left-4 top-2 text-[10px] font-medium text-[var(--muted)] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--brand-primary)]">
                      Mensaje *
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
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
