<<<<<<< HEAD
=======

>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
<<<<<<< HEAD
=======
import { Textarea } from "@/components/ui/textarea"; // Added for address
>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }).max(20, { message: "Username must be at most 20 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
<<<<<<< HEAD
=======
  mobileNumber: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }).max(100, { message: "Address can be at most 100 characters." }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Pincode must be 6 digits." }),
>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
});

export function SignupForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
<<<<<<< HEAD
=======
      mobileNumber: "",
      address: "",
      pincode: "",
>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Implement actual signup logic
    console.log(values);
    toast({
      title: "Signup Attempted",
<<<<<<< HEAD
      description: "Signup functionality is not yet implemented.",
=======
      description: "Signup functionality is not yet implemented. Check console for values.",
>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
    });
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>Join LoopMart and start your sustainable journey.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="yourusername" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
<<<<<<< HEAD
=======
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="9876543210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="123 Main St, Anytown" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
>>>>>>> 5ad46081c687b2e9e2594ee0324427195743d6c6
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
       <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" asChild className="p-0 h-auto">
            <Link href="/auth/login">Login</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
