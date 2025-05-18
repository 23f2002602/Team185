
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/types";
import { UploadCloud, PlusCircle, PackagePlus } from "lucide-react";

const addProductFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }).max(100, { message: "Title can be at most 100 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(500, { message: "Description can be at most 500 characters." }),
  category: z.enum(PRODUCT_CATEGORIES, { required_error: "Category is required." }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }).min(1, {message: "Price must be at least ₹1."}),
  image: z.any().optional(), // We'll handle image separately, making it optional in schema for now
});

type AddProductFormValues = z.infer<typeof addProductFormSchema>;

const DEFAULT_IMAGE_PLACEHOLDER = "https://placehold.co/400x300.png";

export function AddProductForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(DEFAULT_IMAGE_PLACEHOLDER);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedInLoopMart');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    } else {
      // Redirect to login if not logged in
      toast({
        title: "Authentication Required",
        description: "Please log in to add a product.",
        variant: "destructive",
      });
      router.push('/auth/login');
    }
  }, [router, toast]);

  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(DEFAULT_IMAGE_PLACEHOLDER);
    }
  };

  function onSubmit(data: AddProductFormValues) {
    if (!imageFile) {
      toast({
        title: "Image Required",
        description: "Please upload an image for the product.",
        variant: "destructive",
      });
      return;
    }

    const newProduct = {
      id: `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...data,
      imageUrl: imagePreview, // Use the preview (Data URL) for mock display
      imageHint: data.category.toLowerCase(), // Simple hint based on category
    };

    // Simulate saving to database (localStorage for demo)
    const existingProducts = JSON.parse(localStorage.getItem("loopmartUserProducts") || "[]");
    localStorage.setItem("loopmartUserProducts", JSON.stringify([...existingProducts, newProduct]));

    console.log("New Product Submitted:", newProduct);
    toast({
      title: "Product Listed!",
      description: `${data.title} has been successfully listed. (Data in localStorage & console)`,
    });
    form.reset();
    setImagePreview(DEFAULT_IMAGE_PLACEHOLDER);
    setImageFile(null);
    if(fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
    router.push("/"); // Redirect to home page after successful submission
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="w-full max-w-md p-8 text-center">
          <CardTitle className="text-2xl mb-4">Access Denied</CardTitle>
          <CardDescription className="mb-6">You need to be logged in to add a new product.</CardDescription>
          <Button onClick={() => router.push('/auth/login')}>Go to Login</Button>
        </Card>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl shadow-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl flex items-center gap-2">
          <PackagePlus className="h-8 w-8" /> List a New Product
        </CardTitle>
        <CardDescription>Fill in the details below to sell your item on LoopMart.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Vintage Leather Jacket" {...field} className="text-base py-2.5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your item, its condition, features, etc." {...field} className="text-base min-h-[120px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-base py-2.5">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PRODUCT_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category} className="text-base">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Price (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 1500" {...field} className="text-base py-2.5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="text-base">Product Image</FormLabel>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-full max-w-md h-64 relative border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Product image preview"
                      fill
                      style={{ objectFit: 'contain' }}
                      data-ai-hint="product item"
                    />
                  ) : (
                    <div className="text-muted-foreground text-center p-4">
                      <UploadCloud className="h-12 w-12 mx-auto mb-2" />
                      <p>Image preview will appear here</p>
                       <p className="text-xs">(Recommended 400x300px)</p>
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full max-w-md"
                >
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/png, image/jpeg, image/gif"
                  id="productImage"
                />
                <FormMessage>{form.formState.errors.image?.message as string}</FormMessage>
              </div>
            </FormItem>

            <Button type="submit" className="w-full text-lg py-6">
              <PlusCircle className="mr-2 h-5 w-5" />
              Submit Listing
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
