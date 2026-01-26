import type { Route } from "./+types/_index";
import { Hero } from "~/components/home/Hero";
import { Features } from "~/components/home/Features";
import { Products } from "~/components/home/Products";
import { Trusted } from "~/components/home/Trusted";
import { Stats } from "~/components/home/Stats";
import { Contact } from "~/components/home/Contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Elías Distribución | Artículos Promocionales Premium" },
    {
      name: "description",
      content:
        "Tu socio estratégico en artículos promocionales. Más de 15 años impulsando marcas con productos de calidad en todo México.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Products />
      <Trusted />
      <Stats />
      <Contact />
    </>
  );
}
