export type CategorySlug =
  | "sofas"
  | "beds"
  | "dining"
  | "chairs"
  | "coffee-tables"
  | "storage"
  | "office"
  | "outdoor";

export type RoomSlug = "living" | "bedroom" | "dining" | "office" | "outdoor";

export interface ColorOption {
  name: string;
  hex: string;
  /** index into Product.images shown when this colour is selected */
  image: number;
}

export interface SizeOption {
  label: string;
  priceDelta: number;
}

export interface Product {
  slug: string;
  sku: string;
  name: string;
  category: CategorySlug;
  room: RoomSlug;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  short: string;
  description: string;
  images: string[];
  colors: ColorOption[];
  sizes: SizeOption[];
  dimensions: { w: number; h: number; d: number };
  weightKg?: number;
  materials: string;
  upholstery: string;
  assembly: string;
  warranty: string;
  delivery: string;
  care: string;
  stock: number;
  bestseller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  key: string;
  slug: string;
  name: string;
  image: string;
  color: string;
  size: string;
  sku: string;
  unitPrice: number;
  qty: number;
}