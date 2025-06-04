
"use client";
import Image from 'next/image';
import type { Product } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, PlusCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToHistory?: (productName: string) => void;
}

export function ProductCard({ product, onAddToHistory }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="aspect-video relative w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={product.imageHint || 'product image'}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-2">
        <CardTitle className="text-lg font-headline">{product.name}</CardTitle>
        <CardDescription className="text-sm font-body text-muted-foreground line-clamp-3">
          {product.description}
        </CardDescription>
        <div className="font-body">
          <p className="text-xs text-muted-foreground">Condition: {product.condition}</p>
          <p className="text-xs text-muted-foreground">Location: {product.location}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <p className="text-xl font-bold font-headline text-primary">${product.price.toFixed(2)}</p>
        <div className="flex gap-2">
        {onAddToHistory && (
            <Button variant="outline" size="sm" onClick={() => onAddToHistory(product.name)} title="Add to browsing history for AI suggestions">
              <PlusCircle className="mr-2 h-4 w-4" /> Suggest
            </Button>
          )}
          <Button variant="default" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
