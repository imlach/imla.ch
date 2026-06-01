// Single source of truth for the cinematography reel + portfolio pages.
// `span` drives the asymmetric reel mosaic (12-col grid). `stills`,
// `credits`, and `tech` are only fully populated for SKIN so far — the
// other films carry reel-level data only until their rosters are written.

export interface Film {
  slug: string;
  title: string;
  year: string;
  hero: string;
  span: 4 | 5 | 6 | 7 | 8 | 12;
  kind?: string;
  director?: string;
  stills?: string[];
  credits?: { role: string; name: string }[];
  tech?: { label: string; value: string }[];
  synopsis?: string;
}

export const films: Film[] = [
  {
    slug: "skin",
    title: "SKIN",
    year: "2025",
    hero: "/images/skin/3.jpg",
    span: 5,
    kind: "Short film",
    director: "Sarah Grant",
    synopsis:
      "A short film shot on Sony Venice with DZO Vespid primes and vintage glass — warm, honest about light direction, never decorative.",
    stills: [
      "/images/skin/1.jpg",
      "/images/skin/2.jpg",
      "/images/skin/4.jpg",
      "/images/skin/5.jpg",
      "/images/skin/6.jpg",
    ],
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
  { slug: "downtown", title: "LUCIA & THE BEST BOYS: Downtown Lights", year: "2023", hero: "/images/downtown/1.hd.jpg", span: 7, kind: "Music video" },
  { slug: "feeble", title: "Declan Welsh: FEEBLE", year: "2025", hero: "/images/feeble/1.jpg", span: 12, kind: "Music video" },
  { slug: "healthandbeauty", title: "Health and Beauty: PIKTRED", year: "2024", hero: "/images/healthandbeauty/1.hd.jpg", span: 5, kind: "Music video" },
  { slug: "bynow", title: "By Now", year: "2023", hero: "/images/bynow/1.hd.jpg", span: 7, kind: "Short film" },
  { slug: "sneaker", title: "SNEAKER", year: "2024", hero: "/images/sneaker/1.hd.jpg", span: 12, kind: "Short film" },
  { slug: "gemini", title: "GEMINI", year: "2022", hero: "/images/gemini/1.hd.jpg", span: 4, kind: "Short film" },
  { slug: "blueheart", title: "LUCIA & THE BEST BOYS: BLUEHEART", year: "2019", hero: "/images/blueheart/1.jpg", span: 4, kind: "Music video" },
  { slug: "thepartyline", title: "The Party Line", year: "2022", hero: "/images/thepartyline/1.jpg", span: 4, kind: "Short film" },
];

export const getFilm = (slug: string) => films.find((f) => f.slug === slug);
