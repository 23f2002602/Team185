
"use client";

import { useAuth } from '@/hooks/use-auth'; 
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IconSpinner } from '@/components/icons';
import { ShoppingCart, Trash2, CreditCardIcon, Home } from 'lucide-react';

export default function CartPage() {
  const { user, isLoading, isLoggedIn } = useAuth(); 

  const cartItemsCount = 0; // Mock count, will be dynamic later

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <IconSpinner className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-body">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/80 to-accent/80 text-primary-foreground p-6">
          <CardTitle className="font-headline text-3xl flex items-center">
            <ShoppingCart className="mr-3 h-8 w-8"/> Your Shopping Cart
          </CardTitle>
          <CardDescription className="font-body text-primary-foreground/90 text-md">
            Review items in your cart before proceeding to checkout. Happy finding!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          {cartItemsCount === 0 ? (
            <div className="py-12 border-2 border-dashed border-muted-foreground/30 rounded-lg text-center bg-muted/20">
              <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
              <h3 className="text-2xl font-semibold font-headline text-foreground/90">Your Cart is Currently Empty</h3>
              <p className="text-md text-muted-foreground font-body mt-2 mb-6">
                Looks like you haven't added any treasures yet.
              </p>
              <Button asChild size="lg" className="font-body">
                <Link href="/">
                    <Home className="mr-2 h-5 w-5"/> Continue Shopping
                </Link>
              </Button>
            </div>
          ) : (
            // This section will be populated when cart items exist
            <>
              <div className="space-y-6">
                {/* Placeholder for Cart Item 1 - Repeat this block for each item */}
                <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm bg-background hover:shadow-md transition-shadow">
                    <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center">
                        <ShoppingCart className="w-10 h-10 text-muted-foreground"/> {/* Placeholder image */}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold font-headline text-lg">Placeholder Item Name</h4>
                        <p className="text-sm text-muted-foreground font-body">Brief item description or details.</p>
                        <p className="text-sm font-body">Quantity: 1 (Placeholder)</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg text-primary">$0.00</p>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive mt-1" disabled>
                            <Trash2 className="h-4 w-4"/>
                            <span className="sr-only">Remove item</span>
                        </Button>
                    </div>
                </div>
                 {/* End of Placeholder Cart Item */}
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h4 className="text-xl font-semibold font-headline mb-4">Order Summary</h4>
                <div className="space-y-2 font-body text-md">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">$0.00 (Placeholder)</span>
                  </div>
                   <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t mt-2">
                    <span>Total Estimate:</span>
                    <span>$0.00 (Placeholder)</span>
                  </div>
                </div>
                <Button size="lg" className="w-full mt-6 font-body text-lg" disabled>
                    <CreditCardIcon className="mr-2 h-5 w-5"/> Proceed to Checkout (Coming Soon)
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
       {!isLoggedIn && cartItemsCount > 0 && (
        <Card className="mt-6 shadow-md">
            <CardContent className="p-6 text-center">
                <p className="font-body text-md">
                    <Link href="/login" className="text-primary hover:underline font-medium">Log in</Link> or <Link href="/register" className="text-primary hover:underline font-medium">create an account</Link> to save your cart and proceed with checkout.
                </p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
