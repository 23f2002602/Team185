
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { Trash2 } from "lucide-react";

interface CartItemCardProps {
  product: Product;
}

export function CartItemCard({ product }: CartItemCardProps) {
  const { removeFromCart } = useCart();

  return (
    <Card className="overflow-hidden shadow-lg flex flex-col sm:flex-row">
      <div className="relative sm:w-1/4 aspect-video sm:aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-contain p-2 sm:p-1" // Adjusted padding
          data-ai-hint={product.imageHint || "product item cart"}
        />
      </div>
      <div className="flex flex-col justify-between p-4 sm:w-3/4">
        <div>
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-lg hover:text-primary transition-colors">
              <Link href={`/products/${product.id}`}>
                {product.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mb-2">
            <p className="text-muted-foreground text-sm">{product.category}</p>
            <p className="text-xl font-semibold text-primary">
              ₹{product.price.toFixed(2)}
            </p>
          </CardContent>
        </div>
        <CardFooter className="p-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeFromCart(product.id)}
            className="text-destructive hover:bg-destructive/10 border-destructive/50 hover:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
