
"use client";

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import {
  LogOut,
  User,
  Settings,
  CreditCard,
  LayoutGrid,
  PlusCircle,
  ShoppingCart,
  ListOrdered,
  History,
  KeyRound,
  PackageSearch,
  DollarSign,
  ListChecks
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export function UserNav() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return null; 
  }

  const handleLogout = () => {
    logout();
    router.push('/'); 
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
  };

  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="sm" asChild className="font-medium hover:bg-accent/80 hover:text-accent-foreground transition-colors duration-150">
        <Link href="/dashboard/profile">
          <User className="mr-1.5 h-4 w-4" />
          Profile
        </Link>
      </Button>
      <Button variant="ghost" size="sm" asChild className="font-medium hover:bg-accent/80 hover:text-accent-foreground transition-colors duration-150">
        <Link href="/dashboard/add-item">
          <PlusCircle className="mr-1.5 h-4 w-4" />
          Add Item
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="font-medium hover:bg-accent/80 hover:text-accent-foreground transition-colors duration-150">
             <PackageSearch className="mr-1.5 h-4 w-4" />
             Product Management
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel>Manage Your Products</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/products/list">
              <ListChecks className="mr-2 h-4 w-4" />
              <span>My Listings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/products/sold">
              <History className="mr-2 h-4 w-4" />
              <span>Sold Items</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
           <DropdownMenuItem asChild>
            <Link href="/dashboard/payments">
              <DollarSign className="mr-2 h-4 w-4" />
              <span>Payment History</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button variant="ghost" size="sm" asChild className="font-medium hover:bg-accent/80 hover:text-accent-foreground transition-colors duration-150">
        <Link href="/cart">
          <ShoppingCart className="mr-1.5 h-4 w-4" />
          Cart
          {/* Basic cart count, can be dynamic later */}
          {/* <span className="ml-1 text-xs bg-primary text-primary-foreground h-4 w-4 rounded-full flex items-center justify-center">0</span> */}
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Avatar className="h-9 w-9 border border-muted-foreground/30">
              <AvatarImage src={user.profileImageUrl || `https://avatar.vercel.sh/${user.email}.png?text=${getInitials(user.name)}`} alt={user.name || "User"} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings"> Future settings page
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup> 
          <DropdownMenuSeparator /> */}
           <DropdownMenuItem onClick={() => router.push('/forgot-password')}> 
            <KeyRound className="mr-2 h-4 w-4" />
            <span>Change Password</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
