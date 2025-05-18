
"use client"; // Required for useRouter and localStorage access

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProfileForm } from '@/components/dashboard/profile-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusSquare, ListChecks } from 'lucide-react'; // Added ListChecks for My Listings

// export const metadata: Metadata = { // This can be problematic with "use client" for dynamic titles
//   title: 'User Dashboard - LoopMart',
//   description: 'Manage your profile and settings on LoopMart.',
// };

export default function DashboardPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Set document title dynamically
    document.title = 'User Dashboard - LoopMart';

    const loggedInStatus = localStorage.getItem('isLoggedInLoopMart');
    const storedUsername = localStorage.getItem('loopmartUsername');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } else {
      router.push('/auth/login'); // Redirect if not logged in
    }
  }, [router]);

  if (!isLoggedIn) {
    // Optional: Show a loading state or null while checking auth
    return (
        <div className="container mx-auto py-8 px-4 flex justify-center">
            <Card className="w-full max-w-2xl shadow-xl p-8">
                <CardHeader>
                    <CardTitle className="text-3xl">Loading Dashboard...</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Please wait while we verify your session.</p>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-2xl shadow-xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome, {username || 'User'}!</CardTitle>
          <CardDescription>Manage your profile and listings.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl shadow-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Your Listings</CardTitle>
          <CardDescription>Manage your items or add new ones.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <Button asChild className="w-full md:w-auto text-lg py-3">
              <Link href="/products/my-listings">
                <ListChecks className="mr-2 h-5 w-5" />
                View My Listings
              </Link>
            </Button>
            <Button asChild className="w-full md:w-auto text-lg py-3">
              <Link href="/products/add">
                <PlusSquare className="mr-2 h-5 w-5" />
                Add New Product
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
