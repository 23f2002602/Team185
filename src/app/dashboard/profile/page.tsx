
"use client";

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IconSpinner } from '@/components/icons';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { UserCircle, Edit3, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <IconSpinner className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <UserCircle className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold font-headline">Access Denied</h1>
        <p className="text-muted-foreground font-body">Please log in to view your profile.</p>
        <Button asChild className="mt-6">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }
  
  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
  };


  return (
    <div className="space-y-6">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-muted/30 p-6 border-b">
          <div className="flex items-center space-x-4">
            <div className="relative">
                <Image 
                  src={user.profileImageUrl || `https://avatar.vercel.sh/${user.email}.png?text=${getInitials(user.name)}&size=100`} 
                  alt={user.name || "User"} 
                  width={100} 
                  height={100} 
                  className="rounded-full border-4 border-background shadow-md"
                  data-ai-hint="profile avatar"
                />
                 <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background hover:bg-muted" title="Change Profile Picture (Coming Soon)" disabled>
                    <Edit3 className="h-4 w-4"/>
                    <span className="sr-only">Change Profile Picture</span>
                </Button>
            </div>
            <div>
              <CardTitle className="text-3xl font-headline text-primary">{user.name}</CardTitle>
              <CardDescription className="text-md font-body text-muted-foreground">{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold font-headline mb-3 text-foreground/90">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <Label htmlFor="name" className="font-body text-muted-foreground">Full Name</Label>
                <Input id="name" value={user.name} readOnly className="mt-1 bg-input/50"/>
              </div>
              <div>
                <Label htmlFor="email" className="font-body text-muted-foreground">Email</Label>
                <Input id="email" value={user.email} readOnly className="mt-1 bg-input/50"/>
              </div>
              <div>
                <Label htmlFor="age" className="font-body text-muted-foreground">Age</Label>
                <Input id="age" value={user.age.toString()} readOnly className="mt-1 bg-input/50"/>
              </div>
              <div>
                <Label htmlFor="phone" className="font-body text-muted-foreground">Phone Number</Label>
                <Input id="phone" value={user.phoneNumber} readOnly className="mt-1 bg-input/50"/>
              </div>
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold font-headline mb-3 text-foreground/90">Address Details</h3>
            <div className="border p-4 rounded-md bg-muted/10 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                    <Label htmlFor="addressStreet" className="font-body text-muted-foreground">Street Address</Label>
                    <Input id="addressStreet" value={user.address.manualAddress} readOnly className="mt-1 bg-input/50"/>
                </div>
                <div>
                    <Label htmlFor="addressCity" className="font-body text-muted-foreground">City</Label>
                    <Input id="addressCity" value={user.address.city} readOnly className="mt-1 bg-input/50"/>
                </div>
                <div>
                    <Label htmlFor="addressState" className="font-body text-muted-foreground">State</Label>
                    <Input id="addressState" value={user.address.state} readOnly className="mt-1 bg-input/50"/>
                </div>
                <div>
                    <Label htmlFor="addressPincode" className="font-body text-muted-foreground">Pincode</Label>
                    <Input id="addressPincode" value={user.address.pincode} readOnly className="mt-1 bg-input/50"/>
                </div>
                <div>
                    <Label htmlFor="addressCountry" className="font-body text-muted-foreground">Country</Label>
                    <Input id="addressCountry" value={user.address.country} readOnly className="mt-1 bg-input/50"/>
                </div>
                </div>
            </div>
          </section>

          <div className="pt-4 flex gap-3">
            <Button disabled className="font-body">
                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile (Coming Soon)
            </Button>
            <Button variant="outline" disabled className="font-body">
                <ShieldCheck className="mr-2 h-4 w-4" /> Change Password (Via Dropdown)
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
