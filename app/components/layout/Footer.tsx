import { Link } from "react-router";
import { IconMail, IconPhone, IconLocation, IconWhatsApp } from "~/components/ui/Icons";

const footerLinks = {
  productos: [
    { label: "Textiles", href: "/catalogo?categoria=textiles" },
    { label: "Tecnología", href: "/catalogo?categoria=tecnologia" },
    { label: "Drinkware", href: "/catalogo?categoria=drinkware" },
    { label: "Bolsas", href: "/catalogo?categoria=bolsas" },
    { label: "Oficina", href: "/catalogo?categoria=oficina" },
  ],
  servicios: [
    { label: "Catálogo", href: "/catalogo" },
    { label: "Showroom Virtual", href: "/showroom" },
    { label: "Cotizaciones", href: "/#contacto" },
    { label: "Envíos", href: "/#" },
  ],
  empresa: [
    { label: "Nosotros", href: "/#" },
    { label: "Políticas", href: "/#" },
    { label: "Términos", href: "/#" },
    { label: "Privacidad", href: "/#" },
  ],
};

const contactInfo = [
  {
    icon: IconPhone,
    label: "+52 (33) 1234 5678",
    href: "tel:+523312345678",
  },
  {
    icon: IconWhatsApp,
    label: "WhatsApp",
    href: "https://wa.me/5212345678901",
  },
  {
    icon: IconMail,
    label: "contacto@eliasdistribucion.mx",
    href: "mailto:contacto@eliasdistribucion.mx",
  },
  {
    icon: IconLocation,
    label: "Guadalajara, Jalisco, México",
    href: "https://maps.google.com",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight">ELÍAS</span>
              <span className="ml-2 text-sm font-medium text-[var(--muted)] tracking-widest uppercase">
                Distribución
              </span>
            </Link>
            <p className="mt-4 text-[var(--muted)] max-w-sm">
              Tu socio estratégico en artículos promocionales. Más de 15 años
              impulsando marcas con productos de calidad.
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Productos
            </h4>
            <ul className="space-y-3">
              {footerLinks.productos.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Servicios
            </h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted)]">
            © {currentYear} Elías Distribución. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[var(--muted)]">
            Diseñado con pasión en México 🇲🇽
          </p>
        </div>
      </div>
    </footer>
  );
}
