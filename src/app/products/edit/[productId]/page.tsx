
import type { Metadata } from 'next';
import { EditProductForm } from '@/components/products/edit-product-form';

export const metadata: Metadata = {
  title: 'Edit Product - LoopMart',
  description: 'Edit your product listing on LoopMart.',
};

// This component will extract productId from params
export default function EditProductPage({ params }: { params: { productId: string } }) {
  return (
    <div className="container mx-auto py-8 px-4 flex justify-center">
      <EditProductForm productId={params.productId} />
    </div>
  );
}
