
import type { Metadata } from 'next';
import { AddProductForm } from '@/components/products/add-product-form';

export const metadata: Metadata = {
  title: 'Add New Product - LoopMart',
  description: 'List your pre-owned items for sale on LoopMart.',
};

export default function AddProductPage() {
  return (
    <div className="container mx-auto py-8 px-4 flex justify-center">
      <AddProductForm />
    </div>
  );
}
