<<<<<<< HEAD
=======

>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
<<<<<<< HEAD
    <Card className="flex flex-col overflow-hidden shadow-lg transition-all hover:shadow-xl h-full">
=======
    <Card className="flex flex-col overflow-hidden shadow-lg transition-all hover:shadow-xl h-full rounded-lg">
>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.id}`} aria-label={`View details for ${product.title}`}>
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={400}
            height={300}
            className="object-cover w-full h-48"
            data-ai-hint={product.imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-1 leading-tight">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            {product.title}
          </Link>
        </CardTitle>
        <Badge variant="secondary" className="mb-2">{product.category}</Badge>
        <CardDescription className="text-2xl font-semibold text-primary">
<<<<<<< HEAD
          ${product.price.toFixed(2)}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
         {/* Placeholder for Add to Cart or other actions. For now, just a view details button */}
=======
          ₹{product.price.toFixed(2)}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
        <Button asChild className="w-full" variant="outline">
           <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
