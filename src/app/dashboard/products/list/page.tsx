
"use client";

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IconSpinner } from '@/components/icons';
import { ListChecks, PackagePlus, Edit, Trash2, ArrowLeft } from 'lucide-react';

export default function ProductListPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <IconSpinner className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <ListChecks className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold font-headline">Access Denied</h1>
        <p className="text-muted-foreground font-body">Please log in to view your product listings.</p>
        <Button asChild className="mt-6">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" asChild className="mb-4">
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
      </Button>
      <Card className="shadow-lg">
        <CardHeader className="bg-muted/30 p-6 border-b">
          <CardTitle className="font-headline text-2xl flex items-center text-primary">
            <ListChecks className="mr-3 h-7 w-7"/> My Product Listings
            </CardTitle>
          <CardDescription className="font-body text-md">
            Manage your items currently available for sale on EcoFinds.
            </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="p-8 border-2 border-dashed border-border rounded-lg text-center bg-background">
            <ListChecks className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold font-headline text-foreground/90">Your Listed Products</h3>
            <p className="text-muted-foreground/80 font-body mt-2 mb-6 max-w-md mx-auto">
              A table or grid displaying your active product listings will appear here soon. 
              You'll be able to see details, view counts, and manage each item.
            </p>
            <div className="flex justify-center space-x-3 mb-6">
                <Button variant="outline" size="sm" disabled><Edit className="mr-2 h-4 w-4"/>Edit (Placeholder)</Button>
                <Button variant="destructive" size="sm" disabled><Trash2 className="mr-2 h-4 w-4"/>Delete (Placeholder)</Button>
            </div>
             <p className="text-xs text-muted-foreground/70 font-body mt-4">
                (Functionality to display and manage products is coming soon.)
            </p>
          </div>
           <div className="mt-8 text-center">
             <Button asChild size="lg" className="font-body">
                <Link href="/dashboard/add-item">
                    <PackagePlus className="mr-2 h-5 w-5"/> Add New Item
                </Link>
            </Button>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
