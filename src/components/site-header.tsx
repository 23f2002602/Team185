
"use client";

import Link from 'next/link';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { UserNav } from './user-nav'; 
import { IconSpinner } from '@/components/icons';

interface SiteHeaderProps {
  onSearchChange: (query: string) => void;
  initialSearchQuery: string;
}

export function SiteHeader({ onSearchChange, initialSearchQuery }: SiteHeaderProps) {
  const { isLoggedIn, isLoading, login } = useAuth(); 

  const handleMockLogin = () => {
    login(); 
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 shadow-sm">
      <div className="container flex h-16 max-w-screen-xl items-center">
        <Link href="/" className="mr-4 flex items-center space-x-2 shrink-0">
          <Logo className="h-7 w-auto" />
        </Link>
        
        <div className="flex-1 flex justify-center px-2 sm:px-4">
          <form className="relative w-full max-w-xl items-center" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="search"
              placeholder="Search for treasures..."
              className="pl-10 pr-4 py-2 h-10 rounded-lg border-input focus:border-primary transition-colors"
              onChange={(e) => onSearchChange(e.target.value)}
              defaultValue={initialSearchQuery}
              aria-label="Search products"
            />
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </form>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-9 w-20">
               <IconSpinner className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : isLoggedIn ? (
            <UserNav />
          ) : (
            <>
              {/* <Button variant="outline" size="sm" onClick={handleMockLogin} className="hidden md:inline-flex">
                Mock Login (Dev)
              </Button> */}
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <LogIn className="mr-0 sm:mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link href="/register">
                  <UserPlus className="mr-0 sm:mr-2 h-4 w-4" />
                   <span className="hidden sm:inline">Register</span>
                </Link>
              </Button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
