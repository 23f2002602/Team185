
"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { submitRegistrationAction } from "./actions"; // Removed sendOtpAction, verifyOtpAction
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { indianStates, getCitiesByState, type City } from "@/data/indian-states-cities";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const initialState = {
  message: "",
  // errors object might not be populated if server-side Zod validation is fully disabled
  errors: {}, 
  email: "",
  success: false,
};

function SubmitButton({ children, pendingText }: { children: React.ReactNode, pendingText?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending} className="w-full">
      {pending ? (pendingText || "Submitting...") : children}
    </Button>
  );
}

export default function RegisterPage() {
  const [state, formAction] = React.useActionState(submitRegistrationAction, initialState);
  const { toast } = useToast();
  const router = useRouter();

  const [selectedState, setSelectedState] = React.useState("");
  const [cities, setCities] = React.useState<City[]>([]);
  const [profileImagePreview, setProfileImagePreview] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState(state?.email || ""); 

  React.useEffect(() => {
    if (state.message) {
       toast({ title: state.success ? "Registration Complete" : "Error", description: state.message, variant: state.success ? "default" : "destructive" });
      if (state.success) {
        router.push('/login'); 
      } else if (state.email) {
        setEmail(state.email); 
      }
    }
  }, [state, toast, router]);

  React.useEffect(() => {
    if (selectedState) {
      setCities(getCitiesByState(selectedState));
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImagePreview(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Create Your EcoFinds Account</CardTitle>
          <CardDescription>Please fill in your details to complete registration. (Validation Disabled)</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
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
              {/* {state?.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>} */}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Choose a strong password" required />
              {/* {state?.errors?.password && <p className="text-sm text-destructive mt-1">{state.errors.password[0]}</p>} */}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Re-enter your password" required />
              {/* {state?.errors?.confirmPassword && <p className="text-sm text-destructive mt-1">{state.errors.confirmPassword[0]}</p>} */}
            </div>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" type="text" placeholder="Your Full Name" required />
              {/* {state?.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>} */}
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="number" placeholder="Your Age" required />
              {/* {state?.errors?.age && <p className="text-sm text-destructive mt-1">{state.errors.age[0]}</p>} */}
            </div>
            
            <fieldset className="space-y-2 border p-3 rounded-md">
              <legend className="text-sm font-medium px-1">Address</legend>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" type="text" value="India" readOnly className="bg-muted" />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Select name="state" required onValueChange={setSelectedState}>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((s) => (
                      <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* {state?.errors?.state && <p className="text-sm text-destructive mt-1">{state.errors.state[0]}</p>} */}
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Select name="city" required disabled={!selectedState || cities.length === 0}>
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* {state?.errors?.city && <p className="text-sm text-destructive mt-1">{state.errors.city[0]}</p>} */}
              </div>
              <div>
                <Label htmlFor="manualAddress">Street Address / Locality</Label>
                <Input id="manualAddress" name="manualAddress" type="text" placeholder="e.g., 123 Main St, Apt 4B" required />
                {/* {state?.errors?.manualAddress && <p className="text-sm text-destructive mt-1">{state.errors.manualAddress[0]}</p>} */}
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" name="pincode" type="text" placeholder="e.g., 110001" maxLength={6} required />
                {/* {state?.errors?.pincode && <p className="text-sm text-destructive mt-1">{state.errors.pincode[0]}</p>} */}
              </div>
            </fieldset>

            <div>
              <Label htmlFor="phoneNumber">Phone Number (10 digits)</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm">
                  +91
                </span>
                <Input id="phoneNumber" name="phoneNumber" type="tel" placeholder="9876543210" maxLength={10} required className="rounded-l-none" />
              </div>
               {/* {state?.errors?.phoneNumber && <p className="text-sm text-destructive mt-1">{state.errors.phoneNumber[0]}</p>} */}
            </div>

            <div>
              <Label htmlFor="profileImage">Profile Image (Optional, Max 5MB)</Label>
              <Input id="profileImage" name="profileImage" type="file" accept="image/*" onChange={handleImageChange} />
              {profileImagePreview && (
                <div className="mt-2 w-24 h-24 relative">
                  <Image src={profileImagePreview} alt="Profile Preview" layout="fill" objectFit="cover" className="rounded-full" data-ai-hint="profile avatar" />
                </div>
              )}
               {/* {state?.errors?.profileImage && <p className="text-sm text-destructive mt-1">{state.errors.profileImage[0]}</p>} */}
            </div>

            <SubmitButton pendingText="Registering...">Complete Registration</SubmitButton>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
            <p>Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Login here</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}
