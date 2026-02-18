import { Link } from "react-router";
import { IconMail, IconPhone, IconLocation, IconWhatsApp } from "~/components/ui/Icons";
import { Button } from "~/components/ui/Button";
import { IconArrowRight } from "~/components/ui/Icons";

const footerLinks = {
  productos: [
    { label: "Textiles", href: "/catalogo?categoria=textiles" },
    { label: "Tecnologia", href: "/catalogo?categoria=tecnologia" },
    { label: "Drinkware", href: "/catalogo?categoria=drinkware" },
    { label: "Bolsas", href: "/catalogo?categoria=bolsas" },
    { label: "Oficina", href: "/catalogo?categoria=oficina" },
  ],
  servicios: [
    { label: "Catalogo", href: "/catalogo" },
    { label: "Showroom Virtual", href: "/showroom" },
    { label: "Cotizaciones", href: "/#contacto" },
    { label: "Envios", href: "/#" },
  ],
  empresa: [
    { label: "Nosotros", href: "/#" },
    { label: "Politicas", href: "/#" },
    { label: "Terminos", href: "/#" },
    { label: "Privacidad", href: "/#" },
  ],
};

const contactInfo = [
  { icon: IconPhone, label: "+52 (33) 1234 5678", href: "tel:+523312345678" },
  { icon: IconWhatsApp, label: "WhatsApp", href: "https://wa.me/5212345678901" },
  { icon: IconMail, label: "contacto@eliasdistribucion.mx", href: "mailto:contacto@eliasdistribucion.mx" },
  { icon: IconLocation, label: "Guadalajara, Jalisco, Mexico", href: "https://maps.google.com" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] pb-20 md:pb-0">
      {/* CTA Band */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[var(--brand-tertiary)] py-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-white/20" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/20" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display">
              Listo para hacer crecer tu marca?
            </h2>
            <p className="text-white/80 mt-4 text-lg max-w-xl mx-auto">
              Solicita una cotizacion sin compromiso y descubre todo lo que podemos hacer por ti.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/#contacto">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--brand-primary)] rounded-xl font-semibold hover:bg-white/90 transition-colors">
                  Solicitar cotizacion
                  <IconArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <a
                href="https://wa.me/5212345678901"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                <IconWhatsApp className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight font-display gradient-text-animate">
                ELIAS
              </span>
              <span className="ml-2 text-sm font-medium text-[var(--muted)] tracking-widest uppercase">
                Distribucion
              </span>
            </Link>
            <p className="mt-4 text-[var(--muted)] max-w-sm">
              Tu socio estrategico en articulos promocionales. Mas de 15 anos
              impulsando marcas con productos de calidad.
            </p>

            <div className="mt-8 space-y-3">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-sm text-[var(--muted)] hover:text-[var(--brand-primary)] transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 font-display">
                {title === "productos" ? "Productos" : title === "servicios" ? "Servicios" : "Empresa"}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-[var(--muted)] hover:text-[var(--brand-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted)]">
            {currentYear} Elias Distribucion. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
            <span>Hecho con</span>
            <span className="text-[var(--brand-secondary)]">pasion</span>
            <span>en Mexico</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
