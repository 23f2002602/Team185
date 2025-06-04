
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
