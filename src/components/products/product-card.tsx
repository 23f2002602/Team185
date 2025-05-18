
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
    <Card className="flex flex-col overflow-hidden shadow-lg transition-all hover:shadow-xl h-full rounded-lg">
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
          ₹{product.price.toFixed(2)}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant="outline">
           <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
