import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./styles/global.css";

import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { BottomNav } from "~/components/layout/BottomNav";
import { ScrollProgress } from "~/components/ui/ScrollProgress";
import { CursorFollower } from "~/components/ui/CursorFollower";
import { CommandPalette } from "~/components/ui/CommandPalette";
import { Confetti } from "~/components/ui/Confetti";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" data-theme="light" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Elias Distribucion - Tu socio estrategico en articulos promocionales. Mas de 15 anos impulsando marcas con productos de calidad."
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <Meta />
        <Links />
        {/* Theme initialization script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      {/* Skip Navigation Link */}
      <a href="#main-content" className="skip-nav">
        Saltar al contenido principal
      </a>

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      <Header />
      <main id="main-content" className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <CursorFollower />
      <CommandPalette />
      <Confetti />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5212345678901"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
        aria-label="Contactar por WhatsApp"
      >
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Ha ocurrido un error inesperado.";
  let stack: string | undefined;
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  if (isRouteErrorResponse(error)) {
    message = is404 ? "404" : "Error";
    details =
      is404
        ? "Parece que esta pagina se fue de vacaciones..."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--brand-primary)] opacity-10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[var(--brand-secondary)] opacity-10 blur-[100px]" />

      <div className="relative text-center max-w-lg">
        {/* Animated number */}
        <div className="relative inline-block mb-6">
          <span className="text-[10rem] md:text-[14rem] font-extrabold leading-none font-display gradient-text-animate select-none">
            {message}
          </span>
          {is404 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl animate-bounce" role="img" aria-label="confused face">
                &#129300;
              </span>
            </div>
          )}
        </div>

        <p className="text-xl md:text-2xl text-[var(--muted)] mb-4 font-display">{details}</p>

        {is404 && (
          <p className="text-sm text-[var(--muted)] mb-8">
            Pero no te preocupes, tu marca sigue siendo increible.
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Volver al inicio
          </a>
          <a
            href="/catalogo"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border)] text-[var(--foreground)] rounded-xl font-semibold hover:bg-[var(--surface)] transition-colors"
          >
            Ver catalogo
          </a>
        </div>

        {stack && (
          <pre className="mt-8 p-4 bg-[var(--surface)] rounded-xl text-left text-sm overflow-auto max-w-2xl mx-auto border border-[var(--border)]">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
