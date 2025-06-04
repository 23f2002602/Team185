
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulate API call for password reset link
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Password Reset Link Sent",
      description: `If an account exists for ${email}, a password reset link has been sent. Please check your inbox. (This is a mock response)`,
    });
    
    setIsLoading(false);
    // setEmail(""); // Optionally clear email field
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Forgot Your Password?</CardTitle>
          <CardDescription>
            No worries! Enter your email address below and we'll send you a link to reset your password. (This is a placeholder page).
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="you@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending Link..." : "Send Reset Link"}
            </Button>
             <Button variant="link" asChild className="text-sm">
                <Link href="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
