export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  minQuantity: number;
  image: string;
  colors: string[];
  featured?: boolean;
  new?: boolean;
  bestseller?: boolean;
  templateType?: "tshirt" | "polo" | "hoodie" | "cap" | "mug" | "bag" | "thermos" | "backpack";
}

export const categories = [
  { id: "all", name: "Todos", description: "Todos los productos", icon: "📦", image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80" },
  {
    id: "textiles",
    name: "Textiles",
    description: "Playeras, polos, sudaderas y gorras de las mejores marcas",
    icon: "👕",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80"
  },
  {
    id: "escritura",
    name: "Escritura",
    description: "Plumas, lápices y artículos de escritura ejecutivos",
    icon: "✒️",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&q=80"
  },
  {
    id: "tecnologia",
    name: "Tecnología",
    description: "Gadgets, memorias USB y accesorios electrónicos",
    icon: "💻",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80"
  },
  {
    id: "bolsas",
    name: "Bolsas",
    description: "Bolsas ecológicas, mochilas y maletines ejecutivos",
    icon: "👜",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
  },
  {
    id: "drinkware",
    name: "Drinkware",
    description: "Termos, tazas y botellas para toda ocasión",
    icon: "☕",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80"
  },
  {
    id: "oficina",
    name: "Oficina",
    description: "Libretas, organizadores y accesorios de escritorio",
    icon: "📒",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
  },
];

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}

export function getCategoryWithCount(categoryId: string): Category & { productCount: number } {
  const category = categories.find(c => c.id === categoryId) || categories[0];
  const productCount = categoryId === "all"
    ? products.length
    : products.filter(p => p.category === categoryId).length;
  return { ...category, productCount };
}

export function getAllCategoriesWithCounts(): (Category & { productCount: number })[] {
  return categories
    .filter(c => c.id !== "all")
    .map(category => ({
      ...category,
      productCount: products.filter(p => p.category === category.id).length
    }));
}

export const brands = [
  { id: "all", name: "Todas" },
  { id: "gildan", name: "Gildan" },
  { id: "next-level", name: "Next Level" },
  { id: "nike", name: "Nike" },
  { id: "champion", name: "Champion" },
  { id: "generic", name: "Genérico" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Playera Premium",
    description:
      "Playera de algodón 100% premium con ajuste moderno. Ideal para sublimación y serigrafía. Disponible en múltiples colores.",
    category: "textiles",
    brand: "gildan",
    price: 85,
    minQuantity: 50,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    colors: ["#ffffff", "#0a0a0a", "#1e40af", "#dc2626", "#16a34a"],
    featured: true,
    bestseller: true,
    templateType: "tshirt",
  },
  {
    id: "2",
    name: "Polo Ejecutivo",
    description:
      "Polo de piqué con cuello reforzado y botones de alta calidad. Perfecto para uniformes corporativos.",
    category: "textiles",
    brand: "nike",
    price: 220,
    minQuantity: 25,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    colors: ["#ffffff", "#0a0a0a", "#1e3a8a"],
    featured: true,
    templateType: "polo",
  },
  {
    id: "3",
    name: "Termo Inteligente",
    description:
      "Termo de acero inoxidable con pantalla LED de temperatura. Mantiene bebidas frías 24h y calientes 12h.",
    category: "drinkware",
    brand: "generic",
    price: 380,
    minQuantity: 50,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    colors: ["#0a0a0a", "#ffffff", "#b91c1c"],
    featured: true,
    new: true,
    templateType: "thermos",
  },
  {
    id: "4",
    name: "Bolsa Ecológica Premium",
    description:
      "Bolsa de algodón reciclado con costuras reforzadas. Gran área de impresión para tu logo.",
    category: "bolsas",
    brand: "generic",
    price: 45,
    minQuantity: 100,
    image: "https://images.unsplash.com/photo-1597484661643-2f5fef26aa4e?w=800&q=80",
    colors: ["#fef3c7", "#ffffff", "#0a0a0a"],
    bestseller: true,
    templateType: "bag",
  },
  {
    id: "5",
    name: "Power Bank 20000mAh",
    description:
      "Batería portátil de alta capacidad con carga rápida. Incluye cable tipo C y área para grabado láser.",
    category: "tecnologia",
    brand: "generic",
    price: 450,
    minQuantity: 25,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
    colors: ["#0a0a0a", "#ffffff"],
    new: true,
  },
  {
    id: "6",
    name: "Pluma Ejecutiva",
    description:
      "Pluma metálica con mecanismo twist. Tinta negra premium y caja de presentación incluida.",
    category: "escritura",
    brand: "generic",
    price: 35,
    minQuantity: 100,
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&q=80",
    colors: ["#0a0a0a", "#1e3a8a", "#b91c1c"],
  },
  {
    id: "7",
    name: "Hoodie Premium",
    description:
      "Sudadera con capucha de algodón francés. Interior afelpado y bolsillo canguro.",
    category: "textiles",
    brand: "champion",
    price: 480,
    minQuantity: 25,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    colors: ["#0a0a0a", "#374151", "#1e40af"],
    featured: true,
    templateType: "hoodie",
  },
  {
    id: "8",
    name: "Libreta Ejecutiva A5",
    description:
      "Libreta con pasta dura y papel de 80g. Incluye separador y elástico de cierre.",
    category: "oficina",
    brand: "generic",
    price: 65,
    minQuantity: 50,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80",
    colors: ["#0a0a0a", "#1e3a8a", "#b91c1c", "#16a34a"],
  },
  {
    id: "9",
    name: "Mochila Laptop",
    description:
      "Mochila con compartimento acolchado para laptop hasta 15.6\". Múltiples bolsillos y puerto USB.",
    category: "bolsas",
    brand: "generic",
    price: 520,
    minQuantity: 25,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    colors: ["#0a0a0a", "#374151"],
    new: true,
    templateType: "backpack",
  },
  {
    id: "10",
    name: "Taza Mágica",
    description:
      "Taza de cerámica que revela diseño con calor. Capacidad 11oz. Apta para sublimación.",
    category: "drinkware",
    brand: "generic",
    price: 75,
    minQuantity: 50,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
    colors: ["#0a0a0a"],
    templateType: "mug",
  },
  {
    id: "11",
    name: "USB 32GB",
    description:
      "Memoria USB 3.0 de alta velocidad. Carcasa metálica con área para grabado láser.",
    category: "tecnologia",
    brand: "generic",
    price: 120,
    minQuantity: 50,
    image: "https://images.unsplash.com/photo-1618410320928-25228d811631?w=800&q=80",
    colors: ["#c0c0c0", "#0a0a0a"],
    bestseller: true,
  },
  {
    id: "12",
    name: "Gorra Snapback",
    description:
      "Gorra con visera plana y broche snapback. Panel frontal estructurado ideal para bordado.",
    category: "textiles",
    brand: "next-level",
    price: 95,
    minQuantity: 50,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    colors: ["#0a0a0a", "#ffffff", "#1e40af", "#dc2626"],
    templateType: "cap",
  },
];

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
