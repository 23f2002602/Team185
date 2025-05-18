import type { Product, ProductCategory } from "@/types";
import { PRODUCT_CATEGORIES } from "@/types";

const sampleDescriptions = [
  "Gently used, in great condition. A fantastic find for any enthusiast.",
  "Like new! Only used a few times. Perfect for upgrading your current setup.",
  "Vintage item with unique character. Shows some signs of age, adding to its charm.",
  "Brand new, still in original packaging. Unwanted gift looking for a new home.",
  "Well-loved item with plenty of life left. Ideal for students or budget-conscious buyers.",
];

const imageHints: Record<ProductCategory, string[]> = {
  "Electronics": ["gadget tech", "computer device", "audio headphones"],
  "Fashion": ["clothing apparel", "shoes sneakers", "accessory bag"],
  "Home Goods": ["furniture decor", "kitchen appliance", "lamp lighting"],
  "Books": ["novel literature", "textbook education", "comic graphicnovel"],
  "Collectibles": ["vintage antique", "toy figure", "art sculpture"],
  "Other": ["sports equipment", "garden tool", "pet supply"],
};

const generateRandomPrice = () => parseFloat((Math.random() * 200 + 5).toFixed(2));

export const MOCK_PRODUCTS: Product[] = Array.from({ length: 20 }, (_, i) => {
  const category = PRODUCT_CATEGORIES[i % PRODUCT_CATEGORIES.length];
  const hintOptions = imageHints[category];
  const imageHint = hintOptions[Math.floor(Math.random() * hintOptions.length)];
  return {
    id: `prod_${i + 1}`,
    title: `${category.replace(/([A-Z])/g, ' $1').trim()} Item ${i + 1}`,
    description: sampleDescriptions[i % sampleDescriptions.length] + ` This is item number ${i+1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    price: generateRandomPrice(),
    category: category,
    imageUrl: `https://placehold.co/400x300.png`, // Standard placeholder
    imageHint: imageHint,
  };
});

