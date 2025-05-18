
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { LoopMartLogo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { UserCircle, LogOut } from 'lucide-react';

export function SiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    // In a real app, you'd navigate to /auth/login, and upon successful login, this state would be managed by an auth provider.
  };
  
  const handleSignupSimulate = () => {
    localStorage.setItem('isLoggedInLoopMart', 'true');
    setIsLoggedIn(true); 
    // In a real app, you'd navigate to /auth/signup, and upon successful signup and login, this state would be managed.
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedInLoopMart');
    setIsLoggedIn(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <LoopMartLogo />
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-2">
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
