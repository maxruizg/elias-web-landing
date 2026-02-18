import type { Route } from "./+types/_index";
import { Hero } from "~/components/home/Hero";
import { Features } from "~/components/home/Features";
import { Products } from "~/components/home/Products";
import { Process } from "~/components/home/Process";
import { Trusted } from "~/components/home/Trusted";
import { Testimonials } from "~/components/home/Testimonials";
import { Stats } from "~/components/home/Stats";
import { Contact } from "~/components/home/Contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Elias Distribucion | Articulos Promocionales Premium" },
    {
      name: "description",
      content:
        "Tu socio estrategico en articulos promocionales. Mas de 15 anos impulsando marcas con productos de calidad en todo Mexico.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Products />
      <Process />
      <Trusted />
      <Testimonials />
      <Stats />
      <Contact />
    </>
  );
}
