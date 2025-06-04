
<<<<<<< HEAD
export type ProductCondition = 'New' | 'Used - Like New' | 'Used - Good' | 'Used - Fair';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  condition: ProductCondition;
  location: string;
  imageUrl: string;
  imageHint?: string;
}

export interface UserProfile {
  id?: string; // UID from Firebase Auth or Firestore doc ID
  email: string;
  name: string;
  age: number;
  address: {
    country: string;
    state: string;
    city: string;
    manualAddress: string;
    pincode: string;
  };
  phoneNumber: string;
  profileImageUrl?: string;
  createdAt?: Date;
}
=======
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
>>>>>>> 23315374c4ecbe8458f38a8a8a1a48c3843132b6
