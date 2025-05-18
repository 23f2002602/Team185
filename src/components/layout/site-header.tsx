
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { LoopMartLogo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserCircle, LogOut, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

export function SiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartCount, isCartLoaded } = useCart(); // Get cartCount and loading state

  // Simulate checking login state on mount (e.g., from localStorage)
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedInLoopMart');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleLoginSimulate = () => {
    localStorage.setItem('isLoggedInLoopMart', 'true');
    setIsLoggedIn(true);
  };
  
  const handleSignupSimulate = () => {
    localStorage.setItem('isLoggedInLoopMart', 'true');
    setIsLoggedIn(true); 
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedInLoopMart');
    // Potentially clear other user-specific data, like username and avatar
    localStorage.removeItem('loopmartUsername');
    localStorage.removeItem('loopmartAvatar');
    // For cart, decide if it should persist or be cleared on logout.
    // For this demo, we'll let it persist.
    // const { clearCart } = useCart(); // If you want to clear cart on logout
    // clearCart(); 
    setIsLoggedIn(false);
    // Consider redirecting to home or login page after logout
    // router.push('/'); 
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <LoopMartLogo />
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild variant="ghost" className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {isCartLoaded && cartCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">View Cart</span>
            </Link>
          </Button>
          {isLoggedIn ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/dashboard">
                  <UserCircle className="mr-2 h-5 w-5" />
                  Profile
                </Link>
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" onClick={handleLoginSimulate}>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild onClick={handleSignupSimulate}>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
