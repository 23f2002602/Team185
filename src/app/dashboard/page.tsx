
"use client";

import * as React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { AIProductSuggestions } from '@/components/ai-product-suggestions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IconSpinner } from '@/components/icons';
import { PackagePlus, UserCircle, History, ListChecks, BarChart3, Bell, MessageSquare, HelpCircle } from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [browsingHistory, setBrowsingHistory] = React.useState<string[]>([]); 
  
  // Example: In a real app, browsing history might be fetched or managed globally.
  // For demonstration, if user clicks on a recommended product, we could add its name.
  // const handleProductView = (productName: string) => {
  //   setBrowsingHistory(prev => [...new Set([...prev, productName])].slice(-10));
  // };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <IconSpinner className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-body">Loading your EcoFinds dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <UserCircle className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold font-headline">Access Denied</h1>
        <p className="text-muted-foreground font-body">Please log in to view your dashboard.</p>
        <Button asChild className="mt-6">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="p-6 bg-gradient-to-r from-primary/70 to-accent/70 rounded-xl shadow-lg text-primary-foreground">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Welcome back, {user.name}!
        </h1>
        <p className="text-lg font-body mt-1">
          Here's your EcoFinds activity hub. Let's find or sell some treasures!
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card className="hover:shadow-xl transition-shadow duration-200 ease-in-out transform hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-semibold font-headline">My Profile</CardTitle>
            <UserCircle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground font-body mb-3">View and edit your personal details.</p>
            <Button variant="outline" size="sm" className="w-full font-body" asChild>
                <Link href="/dashboard/profile">View Profile</Link>
            </Button>
          </CardContent>
        </Card>
         <Card className="hover:shadow-xl transition-shadow duration-200 ease-in-out transform hover:-translate-y-1 bg-primary/10 border-primary/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-semibold font-headline text-primary">Add New Item</CardTitle>
            <PackagePlus className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground font-body mb-3">List an item for sale on EcoFinds.</p>
             <Button variant="default" size="sm" className="w-full font-body" asChild>
                <Link href="/dashboard/add-item">Add Item</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-shadow duration-200 ease-in-out transform hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-semibold font-headline">My Listings</CardTitle>
            <ListChecks className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground font-body mb-3">Manage your active product listings.</p>
             <Button variant="outline" size="sm" className="w-full font-body" asChild>
                <Link href="/dashboard/products/list">View Listings</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-shadow duration-200 ease-in-out transform hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-semibold font-headline">Sales History</CardTitle>
            <History className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground font-body mb-3">Review your past sales and earnings.</p>
            <Button variant="outline" size="sm" className="w-full font-body" asChild>
                <Link href="/dashboard/products/sold">View Sales</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="shadow-lg overflow-hidden">
          <CardHeader className="bg-accent/20 border-b border-accent/50 p-6">
            <CardTitle className="font-headline text-2xl text-accent-foreground">AI Recommended For You</CardTitle>
            <CardDescription className="font-body text-accent-foreground/80">
              Based on your activity and preferences, you might like these:
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <AIProductSuggestions browsingHistory={browsingHistory} />
             {browsingHistory.length === 0 && (
                <p className="text-sm text-muted-foreground font-body mt-2">
                    Start browsing or add items to your cart to see personalized recommendations. 
                    Click the 'Suggest' button on product cards on the homepage, or search for items to refine suggestions.
                </p>
            )}
          </CardContent>
        </Card>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <CardTitle className="text-lg font-headline flex items-center"><Bell className="mr-2 h-5 w-5 text-primary"/> Notifications</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground font-body">No new notifications. (Coming Soon)</p>
            </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <CardTitle className="text-lg font-headline flex items-center"><MessageSquare className="mr-2 h-5 w-5 text-primary"/> Messages</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground font-body">You have no unread messages. (Coming Soon)</p>
            </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <CardTitle className="text-lg font-headline flex items-center"><HelpCircle className="mr-2 h-5 w-5 text-primary"/> Help & Support</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground font-body">Find FAQs or contact support. (Coming Soon)</p>
                 <Button variant="link" size="sm" className="p-0 h-auto mt-1 font-body" disabled>Visit Help Center</Button>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
