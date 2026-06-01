import type { ImageMetadata } from "astro";

// Resolve film stills as Astro assets so <Image> can emit responsive WebP
// at display size (the originals are multi-MB — far too heavy to ship raw).
const assets = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/films/**/*.{jpg,jpeg,png}",
  { eager: true },
);
const img = (p: string): ImageMetadata => {
  const m = assets[`../assets/films/${p}`];
  if (!m) throw new Error(`films.ts: missing image ../assets/films/${p}`);
  return m.default;
};

export interface Film {
  slug: string;
  title: string;
  year: string;
  hero: ImageMetadata;
  span: 4 | 5 | 6 | 7 | 8 | 12;
  kind?: string;
  director?: string;
  stills?: ImageMetadata[];
  credits?: { role: string; name: string }[];
  tech?: { label: string; value: string }[];
  synopsis?: string;
}

export const films: Film[] = [
  {
    slug: "skin",
    title: "SKIN",
    year: "2025",
    hero: img("skin/3.jpg"),
    span: 5,
    kind: "Short film",
    director: "Sarah Grant",
    synopsis:
      "A short film shot on Sony Venice with DZO Vespid primes and vintage glass — warm, honest about light direction, never decorative.",
    stills: [img("skin/1.jpg"), img("skin/2.jpg"), img("skin/4.jpg"), img("skin/5.jpg"), img("skin/6.jpg")],
    credits: [
      { role: "Director", name: "Sarah Grant" },
      { role: "Director of photography", name: "Ross Imlach" },
      { role: "Focus puller", name: "—" },
      { role: "Gaffer", name: "—" },
    ],
    tech: [
      { label: "Camera", value: "Sony Venice" },
      { label: "Lenses", value: "DZO Vespid · Mir-1V 37mm · Jupiter-9 85mm" },
      { label: "Aspect", value: "2.39 : 1" },
    ],
  },
  { slug: "downtown", title: "LUCIA & THE BEST BOYS: Downtown Lights", year: "2023", hero: img("downtown/1.hd.jpg"), span: 7, kind: "Music video" },
  { slug: "feeble", title: "Declan Welsh: FEEBLE", year: "2025", hero: img("feeble/1.jpg"), span: 12, kind: "Music video" },
  { slug: "healthandbeauty", title: "Health and Beauty: PIKTRED", year: "2024", hero: img("healthandbeauty/1.hd.jpg"), span: 5, kind: "Music video" },
  { slug: "bynow", title: "By Now", year: "2023", hero: img("bynow/1.hd.jpg"), span: 7, kind: "Short film" },
  { slug: "sneaker", title: "SNEAKER", year: "2024", hero: img("sneaker/1.hd.jpg"), span: 12, kind: "Short film" },
  { slug: "gemini", title: "GEMINI", year: "2022", hero: img("gemini/1.hd.jpg"), span: 4, kind: "Short film" },
  { slug: "blueheart", title: "LUCIA & THE BEST BOYS: BLUEHEART", year: "2019", hero: img("blueheart/1.jpg"), span: 4, kind: "Music video" },
  { slug: "thepartyline", title: "The Party Line", year: "2022", hero: img("thepartyline/1.jpg"), span: 4, kind: "Short film" },
];

export const getFilm = (slug: string) => films.find((f) => f.slug === slug);
