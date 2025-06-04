
"use client";

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IconSpinner } from '@/components/icons';
import { History, CheckCircle, ArrowLeft, FileText } from 'lucide-react';

export default function SoldItemsPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <IconSpinner className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading sold items...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <History className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold font-headline">Access Denied</h1>
        <p className="text-muted-foreground font-body">Please log in to view your sold items history.</p>
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
            <History className="mr-3 h-7 w-7"/> Sold Items History
          </CardTitle>
          <CardDescription className="font-body text-md">
            Review items you have successfully sold and track your sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="p-8 border-2 border-dashed border-border rounded-lg text-center bg-background">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold font-headline text-foreground/90">Your Successful Sales</h3>
            <p className="text-muted-foreground/80 font-body mt-2 mb-6 max-w-md mx-auto">
              A detailed list of your sold products, including sale dates, prices, and buyer information (if applicable), will be displayed here.
            </p>
            <Button variant="outline" size="sm" disabled>
                <FileText className="mr-2 h-4 w-4"/> View Sale Details (Placeholder)
            </Button>
             <p className="text-xs text-muted-foreground/70 font-body mt-4">
                (Sales history tracking is under development.)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
