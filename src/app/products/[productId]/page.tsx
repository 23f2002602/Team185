
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart'; // Import useCart

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;
  const { toast } = useToast();
  const { addToCart } = useCart(); // Use the cart hook

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      const userProducts: Product[] = JSON.parse(localStorage.getItem("loopmartUserProducts") || "[]");
      let foundProduct = userProducts.find(p => p.id === productId);

      if (!foundProduct) {
        foundProduct = MOCK_PRODUCTS.find(p => p.id === productId);
      }

      if (foundProduct) {
        setProduct(foundProduct);
        document.title = `${foundProduct.title} - LoopMart`;
      } else {
        setError("Product not found. It may have been removed or the link is incorrect.");
        document.title = "Product Not Found - LoopMart";
      }
      setIsLoading(false);
    } else {
        setError("No product ID provided.");
        setIsLoading(false);
         document.title = "Error - LoopMart";
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Use the addToCart function from the hook
    } else {
      toast({
        title: "Error",
        description: "Could not add product to cart. Product details missing.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 flex justify-center">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Loading Product Details...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-96 bg-muted rounded-lg animate-pulse"></div>
              <div className="h-8 bg-muted rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-muted rounded w-1/2 animate-pulse"></div>
              <div className="h-20 bg-muted rounded animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-12 px-4 flex justify-center text-center">
        <Card className="w-full max-w-md p-8 shadow-lg">
          <CardHeader>
            <AlertTriangle className="h-16 w-16 mx-auto text-destructive mb-4" />
            <CardTitle className="text-2xl text-destructive">
              {error ? "Error" : "Product Not Found"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              {error || "We couldn't find the product you're looking for."}
            </p>
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Listings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Listings
          </Link>
        </Button>
      </div>

      <Card className="w-full max-w-4xl mx-auto shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-square md:aspect-[4/3] bg-muted">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-contain p-2"
              data-ai-hint={product.imageHint || "product item detail"}
              priority
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <CardHeader className="p-0 mb-4">
              <Badge variant="secondary" className="mb-2 w-fit">{product.category}</Badge>
              <CardTitle className="text-3xl lg:text-4xl font-bold leading-tight">{product.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow space-y-4">
              <CardDescription className="text-lg text-muted-foreground">
                {product.description}
              </CardDescription>
              <p className="text-4xl font-bold text-primary">
                ₹{product.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter className="p-0 mt-6">
              <Button size="lg" className="w-full text-lg py-3" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}
