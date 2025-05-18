
"use client";

import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { CartItemCard } from "@/components/cart/cart-item-card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowLeft, CreditCard, PackageX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function CartPage() {
  const { cartItems, getCartTotal, cartCount, isCartLoaded } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Shopping Cart - LoopMart";
  }, []);

  const handleCheckout = () => {
    toast({
      title: "Checkout Coming Soon!",
      description: "Checkout functionality is not yet implemented.",
    });
  };

  if (!isCartLoaded) {
    return (
      <div className="container mx-auto py-12 px-4 flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Loading Your Cart...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-20 bg-muted rounded animate-pulse"></div>
              <div className="h-20 bg-muted rounded animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const cartTotal = getCartTotal();

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl flex items-center justify-center gap-3">
          <ShoppingCart className="h-10 w-10" /> Your Shopping Cart
        </h1>
      </header>

      {cartCount === 0 ? (
        <Card className="max-w-lg mx-auto text-center p-8 shadow-lg">
            <PackageX className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <CardTitle className="text-2xl mb-2">Your Cart is Empty</CardTitle>
            <CardDescription className="mb-6">
                Looks like you haven&apos;t added anything to your cart yet.
            </CardDescription>
            <Button asChild size="lg">
                <Link href="/">
                <ArrowLeft className="mr-2 h-5 w-5" /> Continue Shopping
                </Link>
            </Button>
        </Card>

      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItemCard key={item.id} product={item} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-xl sticky top-24"> {/* Added sticky top for summary */}
              <CardHeader>
                <CardTitle className="text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground">Subtotal ({cartCount} item{cartCount > 1 ? 's' : ''})</p>
                  <p className="font-semibold text-lg">₹{cartTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground">Shipping</p>
                  <p className="font-semibold text-lg">FREE</p> 
                </div>
                <Separator />
                <div className="flex justify-between items-center text-xl font-bold">
                  <p>Total</p>
                  <p>₹{cartTotal.toFixed(2)}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3">
                <Button size="lg" className="w-full text-lg py-3" onClick={handleCheckout}>
                  <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
