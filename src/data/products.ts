import type { CartItem, CategorySlug, ColorOption, Product, RoomSlug, SizeOption } from "@/lib/types";

/*
  SAMPLE DATA: sab specifications, ratings aur prices demo hain.
  Apni asli furniture ki details aur images (public/products/...) se replace karo.
  Image URLs Unsplash par hain; kuch images product se bilkul match na karein to apni photos lagao.
*/

export const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const SOFA = ["1555041469-a586c61ea9bc", "1540574163026-643ea20ade25", "1493663284031-b7e3aefcae8e"];
const LIVING = ["1618220179428-22790b461013", "1519710164239-da123dc03ef4", "1586023492125-27b2c045efd7"];
const BED = ["1505693416388-ac5ce068fe85", "1616594039964-ae9021a400a0", "1505691938895-1758d7feb511"];
const CHAIR = ["1567538096630-e0c55bd6374c", "1503602642458-232111445657", "1592078615290-033ee584e267"];
const DINE = ["1538688525198-9b88f6f53126", "1524758631624-e2822e304c36", "1600210492486-724fe5c67fb0"];
const OFFICE = ["1497366216548-37526070297c", "1524758631624-e2822e304c36", "1586023492125-27b2c045efd7"];
const OUTDOOR = ["1600585154340-be6161a56a0c", "1564013799919-ab600027ffc6", "1600210492486-724fe5c67fb0"];

const pics = (ids: string[]) => ids.map((id) => img(id));
const c = (name: string, hex: string, image: number): ColorOption => ({ name, hex, image });
const s = (label: string, priceDelta = 0): SizeOption => ({ label, priceDelta });

const SAMPLE = {
  assembly: "Sample data: confirm assembly terms before launch.",
  warranty: "Sample data: add your real warranty terms.",
  delivery: "Sample data: delivery estimate is confirmed by our team after your order.",
  care: "Wipe with a soft, dry cloth. Avoid direct sunlight and harsh chemicals.",
};

type Input = Omit<Product, "assembly" | "warranty" | "delivery" | "care" | "stock"> &
  Partial<Pick<Product, "assembly" | "warranty" | "delivery" | "care" | "stock">>;

const mk = (p: Input): Product => ({ stock: 12, ...SAMPLE, ...p });

export const categories: { slug: CategorySlug; label: string }[] = [
  { slug: "sofas", label: "Sofas & Sectionals" },
  { slug: "beds", label: "Beds & Bedroom" },
  { slug: "dining", label: "Dining Tables" },
  { slug: "chairs", label: "Chairs & Armchairs" },
  { slug: "coffee-tables", label: "Coffee Tables" },
  { slug: "storage", label: "Wardrobes & Storage" },
  { slug: "office", label: "Office Furniture" },
  { slug: "outdoor", label: "Outdoor Furniture" },
];

export const roomTitles: Record<RoomSlug, string> = {
  living: "Living Room",
  bedroom: "Bedroom",
  dining: "Dining Room",
  office: "Office",
  outdoor: "Outdoor",
};

export const products: Product[] = [
  mk({
    slug: "modern-l-shaped-sofa", sku: "MW-SOF-001", name: "Modern L-Shaped Sofa", category: "sofas", room: "living",
    price: 249000, originalPrice: 289000, rating: 4.8, reviews: 128, bestseller: true,
    short: "Deep, generous seating with a clean tailored profile.",
    description: "A sectional with high-density foam cushions and a low, tailored silhouette that anchors a living room without overpowering it.",
    images: pics(SOFA), colors: [c("Stone Grey", "#b9b4aa", 0), c("Oat", "#d8cbb2", 1), c("Charcoal", "#3d3a38", 2)],
    sizes: [s("3-Seater L-Shape"), s("5-Seater L-Shape", 45000)], dimensions: { w: 260, h: 85, d: 160 }, weightKg: 78,
    materials: "Hardwood frame, high-density foam", upholstery: "Performance fabric",
  }),
  mk({
    slug: "cloud-modular-sectional", sku: "MW-SOF-002", name: "Cloud Modular Sectional", category: "sofas", room: "living",
    price: 329000, rating: 4.9, reviews: 64, isNew: true,
    short: "Soft, modular seating you can rearrange as your space changes.",
    description: "Plush modular pieces with removable covers, designed for relaxed everyday living and easy rearranging.",
    images: pics([...SOFA].reverse()), colors: [c("Ivory", "#efe8da", 0), c("Sand", "#cdb995", 1), c("Moss", "#6f7a5c", 2)],
    sizes: [s("4-Piece Set"), s("6-Piece Set", 85000)], dimensions: { w: 300, h: 80, d: 170 }, weightKg: 96,
    materials: "Kiln-dried wood frame, feather-blend cushions", upholstery: "Textured weave",
  }),
  mk({
    slug: "walnut-platform-bed", sku: "MW-BED-001", name: "Walnut Platform Bed", category: "beds", room: "bedroom",
    price: 189000, originalPrice: 215000, rating: 4.7, reviews: 92, bestseller: true,
    short: "A low-profile walnut bed with a sculpted headboard.",
    description: "A calm, low-profile bed in warm walnut veneer with a sculpted headboard and sturdy slatted base.",
    images: pics(BED), colors: [c("Natural Walnut", "#6b4a33", 0), c("Dark Walnut", "#3f2a1d", 1)],
    sizes: [s("King"), s("Queen", -20000)], dimensions: { w: 200, h: 110, d: 215 }, weightKg: 85,
    materials: "Solid wood frame, walnut veneer", upholstery: "Walnut finish",
  }),
  mk({
    slug: "tufted-upholstered-bed", sku: "MW-BED-002", name: "Tufted Upholstered Bed", category: "beds", room: "bedroom",
    price: 219000, rating: 4.8, reviews: 41, isNew: true,
    short: "A softly tufted headboard in a plush upholstered frame.",
    description: "A statement bed with a deep-tufted headboard and upholstered rails for a hotel-suite feel at home.",
    images: pics([...BED].reverse()), colors: [c("Cream", "#eadfca", 0), c("Taupe", "#9c8a78", 1), c("Slate", "#59606a", 2)],
    sizes: [s("King"), s("Queen", -20000)], dimensions: { w: 205, h: 135, d: 220 }, weightKg: 92,
    materials: "Hardwood frame, foam padding", upholstery: "Soft-touch fabric",
  }),
  mk({
    slug: "solid-walnut-dining-table", sku: "MW-DIN-001", name: "Solid Walnut Dining Table", category: "dining", room: "dining",
    price: 168000, rating: 4.9, reviews: 77, bestseller: true,
    short: "A solid walnut table with a refined, enduring presence.",
    description: "A generous dining table with a hand-finished walnut top and slim tapered legs, made for long dinners.",
    images: pics(DINE), colors: [c("Natural Walnut", "#6b4a33", 0), c("Espresso", "#3a2a22", 1)],
    sizes: [s("6 Seater (180 cm)"), s("8 Seater (220 cm)", 38000)], dimensions: { w: 180, h: 75, d: 90 }, weightKg: 64,
    materials: "Solid walnut top, hardwood legs", upholstery: "Walnut, oil finish",
  }),
  mk({
    slug: "oak-round-dining-table", sku: "MW-DIN-002", name: "Oak Round Dining Table", category: "dining", room: "dining",
    price: 124000, originalPrice: 139000, rating: 4.6, reviews: 53,
    short: "A round oak table that makes conversation easy.",
    description: "A pedestal-base round table in warm oak that suits compact dining rooms and open-plan spaces.",
    images: pics([...DINE].reverse()), colors: [c("Natural Oak", "#b99468", 0), c("Smoked Oak", "#7b6048", 1)],
    sizes: [s("4 Seater (120 cm)"), s("6 Seater (150 cm)", 22000)], dimensions: { w: 120, h: 75, d: 120 }, weightKg: 48,
    materials: "Oak veneer top, solid wood base", upholstery: "Oak, matte finish",
  }),
  mk({
    slug: "sculpted-accent-armchair", sku: "MW-CHR-001", name: "Sculpted Accent Armchair", category: "chairs", room: "living",
    price: 68000, rating: 4.7, reviews: 110, bestseller: true,
    short: "A sculpted armchair with a sink-in seat.",
    description: "A designer armchair with curved arms and a deep seat, ideal for reading corners and living rooms.",
    images: pics(CHAIR), colors: [c("Camel", "#b88a5a", 0), c("Ivory", "#efe8da", 1), c("Forest", "#4d5a45", 2)],
    sizes: [s("Standard")], dimensions: { w: 78, h: 80, d: 80 }, weightKg: 17,
    materials: "Hardwood frame, foam", upholstery: "Bouclé-style fabric",
  }),
  mk({
    slug: "velvet-wingback-chair", sku: "MW-CHR-002", name: "Velvet Wingback Chair", category: "chairs", room: "living",
    price: 74500, rating: 4.8, reviews: 36, isNew: true,
    short: "A classic wingback reimagined in soft velvet.",
    description: "A timeless wingback silhouette with rich velvet upholstery and slim brass-finish legs.",
    images: pics([...CHAIR].reverse()), colors: [c("Emerald", "#2f5a4a", 0), c("Blush", "#d8b4a6", 1), c("Midnight", "#2b3445", 2)],
    sizes: [s("Standard")], dimensions: { w: 76, h: 105, d: 78 }, weightKg: 19,
    materials: "Hardwood frame, metal legs", upholstery: "Velvet",
  }),
  mk({
    slug: "marble-top-coffee-table", sku: "MW-COF-001", name: "Marble-Top Coffee Table", category: "coffee-tables", room: "living",
    price: 54000, originalPrice: 62000, rating: 4.7, reviews: 71, bestseller: true,
    short: "A marble-effect top on a slim metal frame.",
    description: "A low coffee table with a marble-look top and a slim brushed-gold frame that lightens a seating area.",
    images: pics(LIVING), colors: [c("White Marble", "#ece8e1", 0), c("Black Marble", "#2b2b2b", 1)],
    sizes: [s("Round 90 cm"), s("Oval 120 cm", 9000)], dimensions: { w: 90, h: 40, d: 90 }, weightKg: 24,
    materials: "Stone-effect top, metal frame", upholstery: "Brushed gold finish",
  }),
  mk({
    slug: "minimal-oak-coffee-table", sku: "MW-COF-002", name: "Minimal Oak Coffee Table", category: "coffee-tables", room: "living",
    price: 38500, rating: 4.5, reviews: 48,
    short: "Quiet, honest lines in solid oak.",
    description: "A minimalist oak coffee table with rounded corners and a hidden shelf for books and throws.",
    images: pics([...LIVING].reverse()), colors: [c("Natural Oak", "#b99468", 0), c("Smoked Oak", "#7b6048", 1)],
    sizes: [s("Standard")], dimensions: { w: 110, h: 38, d: 60 }, weightKg: 16,
    materials: "Solid oak", upholstery: "Oak, matte finish",
  }),
  mk({
    slug: "three-door-wardrobe", sku: "MW-STO-001", name: "Three-Door Wardrobe", category: "storage", room: "bedroom",
    price: 135000, originalPrice: 152000, rating: 4.6, reviews: 39,
    short: "Generous storage with soft-close doors.",
    description: "A tall three-door wardrobe with hanging space, shelves and soft-close doors in a refined matte finish.",
    images: pics(BED.slice(1).concat(BED.slice(0, 1))), colors: [c("Warm White", "#f1ebe0", 0), c("Walnut", "#6b4a33", 1)],
    sizes: [s("Standard")], dimensions: { w: 150, h: 220, d: 58 }, weightKg: 110,
    materials: "Engineered wood, metal fittings", upholstery: "Matte laminate finish",
  }),
  mk({
    slug: "executive-office-desk", sku: "MW-OFF-001", name: "Executive Office Desk", category: "office", room: "office",
    price: 89000, rating: 4.7, reviews: 45, isNew: true,
    short: "A wide desk with a cable-managed work surface.",
    description: "A spacious desk with a walnut-effect top, built-in drawers and cable management for a tidy workspace.",
    images: pics(OFFICE), colors: [c("Walnut", "#6b4a33", 0), c("Oak", "#b99468", 1)],
    sizes: [s("140 cm"), s("180 cm", 16000)], dimensions: { w: 140, h: 75, d: 70 }, weightKg: 52,
    materials: "Engineered wood, steel frame", upholstery: "Wood-effect laminate",
  }),
  mk({
    slug: "ergonomic-office-chair", sku: "MW-OFF-002", name: "Ergonomic Office Chair", category: "office", room: "office",
    price: 42000, rating: 4.5, reviews: 88,
    short: "Supportive seating for long working days.",
    description: "An ergonomic chair with adjustable height, tilt and a breathable back for comfort through the day.",
    images: pics([...OFFICE].reverse()), colors: [c("Graphite", "#3a3a3d", 0), c("Stone", "#b9b4aa", 1)],
    sizes: [s("Standard")], dimensions: { w: 65, h: 115, d: 65 }, weightKg: 14,
    materials: "Steel base, mesh back", upholstery: "Breathable mesh",
  }),
  mk({
    slug: "teak-outdoor-lounge-set", sku: "MW-OUT-001", name: "Teak Outdoor Lounge Set", category: "outdoor", room: "outdoor",
    price: 198000, rating: 4.8, reviews: 29, isNew: true,
    short: "A weather-ready lounge set for terraces and gardens.",
    description: "A four-piece outdoor lounge set in teak-look wood with water-resistant cushions.",
    images: pics(OUTDOOR), colors: [c("Natural Teak", "#a37a4b", 0), c("Grey Wash", "#9a9a94", 1)],
    sizes: [s("4-Piece Set"), s("6-Piece Set", 60000)], dimensions: { w: 200, h: 80, d: 90 }, weightKg: 70,
    materials: "Teak-look hardwood, water-resistant cushions", upholstery: "Outdoor fabric",
  }),
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const categoryLabel = (slug: CategorySlug) => categories.find((x) => x.slug === slug)?.label ?? slug;
export const priceFor = (p: Product, sizeLabel: string) =>
  p.price + (p.sizes.find((x) => x.label === sizeLabel)?.priceDelta ?? 0);

export function variantSku(p: Product, colorName: string, sizeLabel: string) {
  const ci = Math.max(0, p.colors.findIndex((x) => x.name === colorName));
  const si = Math.max(0, p.sizes.findIndex((x) => x.label === sizeLabel));
  return `${p.sku}-C${ci + 1}-S${si + 1}`;
}

export function makeCartItem(p: Product, colorName: string, sizeLabel: string, qty: number): Omit<CartItem, "key"> {
  const color = p.colors.find((x) => x.name === colorName) ?? p.colors[0];
  return {
    slug: p.slug,
    name: p.name,
    image: p.images[color.image] ?? p.images[0],
    color: color.name,
    size: sizeLabel,
    sku: variantSku(p, color.name, sizeLabel),
    unitPrice: priceFor(p, sizeLabel),
    qty,
  };
}

export function searchProducts(q: string) {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  return products.filter((p) =>
    [p.name, p.short, categoryLabel(p.category), roomTitles[p.room]].join(" ").toLowerCase().includes(t)
  );
}

export const relatedProducts = (p: Product, n = 4) =>
  products.filter((x) => x.slug !== p.slug && (x.category === p.category || x.room === p.room)).slice(0, n);

export const bestsellers = () => products.filter((p) => p.bestseller);
export const newArrivals = () => products.filter((p) => p.isNew);