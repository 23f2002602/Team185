
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { useAuth } from "@/hooks/use-auth"; // Import useAuth
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Mock login action - in a real app, this would call Firebase Auth
async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string; 
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  // Check for the new dummy test account
  if (email === "ptejanvk@gmail.com" && password === "Teja@4569") { 
    return { success: true, message: "Login successful!", email };
  } else if (email === "user@example.com" && password === "password") { // Keep the old mock user too if needed
    return { success: true, message: "Login successful!", email };
  } else {
    return { success: false, message: "Invalid email or password." };
  }
}


export default function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard'); // Redirect if already logged in
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    
    const result = await loginAction(formData); // Call your mock login action

    if (result.success && result.email) {
      // In a real app, Firebase Auth would provide the user object
      // For mock, we use the email to fetch/create a mock UserProfile
      const mockUserProfile = {
        id: `mock-user-${result.email}`,
        email: result.email,
        name: result.email.split('@')[0].replace(/\W/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Eco User', // Simple name from email
        age: 30, // Default age for mock user
        address: { country: 'India', state: 'Tamil Nadu', city: 'Chennai', manualAddress: '123 Test Street', pincode: '600001' }, // Default address
        phoneNumber: '+919999988888', // Default phone
        profileImageUrl: `https://avatar.vercel.sh/${result.email}.png`,
        createdAt: new Date(),
      };
      login(mockUserProfile); // Update auth state using the hook's login function
      toast({ title: "Login Successful", description: "Welcome back!" });
      router.push('/dashboard'); // This line handles the redirect
    } else {
      setError(result.message);
      toast({ title: "Login Failed", description: result.message, variant: "destructive" });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Login to EcoFinds</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" 
                      className="text-sm text-primary hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
             <p className="text-center text-sm">
                Don't have an account?{' '}
                <Link href="/register" className="text-primary hover:underline font-medium">
                    Register here
                </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
