
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { Edit3, Trash2, PackageSearch } from 'lucide-react';

export default function MyListingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    document.title = 'My Listings - LoopMart';
    const loggedInStatus = localStorage.getItem('isLoggedInLoopMart');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
      const storedProducts = JSON.parse(localStorage.getItem("loopmartUserProducts") || "[]");
      setUserProducts(storedProducts);
    } else {
      toast({
        title: "Authentication Required",
        description: "Please log in to view your listings.",
        variant: "destructive",
      });
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router, toast]);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!productToDelete) return;

    const updatedProducts = userProducts.filter(p => p.id !== productToDelete.id);
    localStorage.setItem("loopmartUserProducts", JSON.stringify(updatedProducts));
    setUserProducts(updatedProducts);
    setProductToDelete(null);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Product Deleted",
      description: `${productToDelete.title} has been removed from your listings.`,
    });
  };

  if (!isLoggedIn || isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <Card className="max-w-md mx-auto p-6">
          <CardHeader>
            <CardTitle>Loading your listings...</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please wait while we fetch your products.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          My Product Listings
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Manage your items currently up for sale.
        </p>
      </header>

      {userProducts.length === 0 ? (
        <Card className="max-w-lg mx-auto text-center p-8 shadow-lg">
          <PackageSearch className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <CardTitle className="text-2xl mb-2">No Listings Yet!</CardTitle>
          <CardDescription className="mb-6">You haven&apos;t listed any products. Add your first item to start selling.</CardDescription>
          <Button asChild size="lg">
            <Link href="/products/add">Add New Product</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {userProducts.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden shadow-lg rounded-xl h-full transition-all hover:shadow-2xl">
              <CardHeader className="p-0 relative">
                <Image
                  src={product.imageUrl || "https://placehold.co/400x300.png"}
                  alt={product.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-52"
                  data-ai-hint={product.imageHint || "product item"}
                />
              </CardHeader>
              <CardContent className="p-5 flex-grow">
                <CardTitle className="text-xl mb-1.5 leading-tight">{product.title}</CardTitle>
                <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                <p className="text-muted-foreground text-sm mb-3 h-12 overflow-hidden text-ellipsis">
                  {product.description.substring(0, 100)}{product.description.length > 100 ? "..." : ""}
                </p>
                <CardDescription className="text-2xl font-semibold text-primary mb-3">
                  ₹{product.price.toFixed(2)}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-3">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/products/edit/${product.id}`}>
                    <Edit3 className="mr-2 h-4 w-4" /> Edit
                  </Link>
                </Button>
                <Button variant="destructive" className="w-full" onClick={() => handleDeleteClick(product)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {productToDelete && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete &quot;{productToDelete.title}&quot; from your listings.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

