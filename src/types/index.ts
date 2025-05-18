
export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  imageHint?: string; // For data-ai-hint
};

export type ProductCategory = "Electronics" | "Fashion" | "Home Goods" | "Books" | "Collectibles" | "Other";

export const PRODUCT_CATEGORIES: ProductCategory[] = ["Electronics", "Fashion", "Home Goods", "Books", "Collectibles", "Other"];
