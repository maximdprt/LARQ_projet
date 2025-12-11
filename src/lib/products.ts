export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSize {
  volume: string;
  price: number;
  originalPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  isNew: boolean;
  colors: ProductColor[];
  sizes: ProductSize[];
  features: string[];
  category: string;
  imagePath?: string;
  model3dPath?: string;
  displayName?: string; // Nom à afficher (ex: "LARQ BOTTLE GOLD")
}

export const products: Product[] = [
  {
    id: "bottle-swig-top",
    name: "LARQ Bottle Swig Top",
    displayName: "LARQ BLEU",
    isNew: true,
    colors: [
      { name: "Amalfi Blue", hex: "#4A90E2" },
      { name: "Black", hex: "#000000" },
      { name: "Eucalyptus Green", hex: "#2D5016" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Yellow", hex: "#FFD700" },
      { name: "Orange", hex: "#FF8C00" },
      { name: "Light Brown", hex: "#D2B48C" },
      { name: "Light Purple", hex: "#DDA0DD" },
      { name: "Light Blue", hex: "#87CEEB" },
    ],
    sizes: [
      { volume: "2L", price: 100, originalPrice: 140 },
    ],
    features: ["À utiliser tous les jours"],
    category: "featured",
    imagePath: "/images/generated-image.png",
  },
  {
    id: "bottle-filtered-swig-top",
    name: "LARQ Bottle Filtered Swig Top",
    displayName: "LARQ VIOLETTE",
    isNew: true,
    colors: [
      { name: "Eucalyptus Green", hex: "#2D5016" },
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Yellow", hex: "#FFD700" },
      { name: "Orange", hex: "#FF8C00" },
      { name: "Light Brown", hex: "#D2B48C" },
      { name: "Light Purple", hex: "#DDA0DD" },
      { name: "Light Blue", hex: "#87CEEB" },
    ],
    sizes: [
      { volume: "2L", price: 100, originalPrice: 140 },
    ],
    features: ["Filtration"],
    category: "filtration",
    imagePath: "/images/generated-image (1).png",
  },
  {
    id: "bottle-purevis",
    name: "LARQ Bottle PureVis™",
    displayName: "LARQ DORE",
    isNew: false,
    colors: [
      { name: "Granite White", hex: "#F5F5DC" },
      { name: "Dark Blue", hex: "#1a3a5c" },
      { name: "Black", hex: "#000000" },
      { name: "Light Blue", hex: "#87CEEB" },
      { name: "Pink", hex: "#FFB6C1" },
    ],
    sizes: [
      { volume: "2L", price: 100, originalPrice: 140 },
    ],
    features: ["Autonettoyante"],
    category: "smart",
    imagePath: "/images/generated-image (5).png",
  },
  {
    id: "bottle-filtered-flip-top",
    name: "LARQ Bottle Filtered Flip Top",
    displayName: "LARQ ROSE",
    isNew: false,
    colors: [
      { name: "Granite White", hex: "#F5F5DC" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: [
      { volume: "2L", price: 100, originalPrice: 140 },
    ],
    features: ["Filtration"],
    category: "filtration",
    imagePath: "/images/generated-image (6).png",
  },
];

export const categories = [
  { id: "featured", label: "En vedette" },
  { id: "smart", label: "Bouteilles intelligentes" },
  { id: "filtration", label: "Bouteilles de filtration" },
  { id: "everyday", label: "Everyday Drinkware" },
  { id: "pitchers", label: "Pichets" },
];

