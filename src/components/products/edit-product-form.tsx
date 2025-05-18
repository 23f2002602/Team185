
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
import { PRODUCT_CATEGORIES, type ProductCategory, type Product } from "@/types";
import { UploadCloud, Save, PackageX } from "lucide-react";

const editProductFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }).max(100, { message: "Title can be at most 100 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(500, { message: "Description can be at most 500 characters." }),
  category: z.enum(PRODUCT_CATEGORIES, { required_error: "Category is required." }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }).min(1, {message: "Price must be at least ₹1."}),
  image: z.any().optional(), 
});

type EditProductFormValues = z.infer<typeof editProductFormSchema>;

interface EditProductFormProps {
  productId: string;
}

const DEFAULT_IMAGE_PLACEHOLDER = "https://placehold.co/400x300.png";

export function EditProductForm({ productId }: EditProductFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(DEFAULT_IMAGE_PLACEHOLDER);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productNotFound, setProductNotFound] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const form = useForm<EditProductFormValues>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedInLoopMart');
    if (loggedInStatus !== 'true') {
      toast({
        title: "Authentication Required",
        description: "Please log in to edit a product.",
        variant: "destructive",
      });
      router.push('/auth/login');
      return;
    }
    setIsLoggedIn(true);

    const storedProducts: Product[] = JSON.parse(localStorage.getItem("loopmartUserProducts") || "[]");
    const productToEdit = storedProducts.find(p => p.id === productId);

    if (productToEdit) {
      form.reset({
        title: productToEdit.title,
        description: productToEdit.description,
        category: productToEdit.category,
        price: productToEdit.price,
      });
      setImagePreview(productToEdit.imageUrl || DEFAULT_IMAGE_PLACEHOLDER);
    } else {
      setProductNotFound(true);
      toast({
        title: "Product Not Found",
        description: "The product you are trying to edit could not be found.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }, [productId, form, router, toast]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(data: EditProductFormValues) {
    // If no new image is selected, imageFile will be null.
    // We need to ensure imagePreview (which holds the current or new Data URL) is used.
    if (!imagePreview || imagePreview === DEFAULT_IMAGE_PLACEHOLDER && !imageFile) {
      toast({
        title: "Image Required",
        description: "Please ensure an image is uploaded for the product.",
        variant: "destructive",
      });
      return;
    }
    
    const storedProducts: Product[] = JSON.parse(localStorage.getItem("loopmartUserProducts") || "[]");
    const productIndex = storedProducts.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      toast({
        title: "Error",
        description: "Could not find the product to update. It might have been deleted.",
        variant: "destructive",
      });
      router.push('/products/my-listings');
      return;
    }

    const updatedProduct: Product = {
      ...storedProducts[productIndex],
      ...data,
      imageUrl: imagePreview, // This will be the new Data URL if a new image was chosen, or the existing one
      imageHint: data.category.toLowerCase(), // Update hint based on potentially new category
    };

    storedProducts[productIndex] = updatedProduct;
    localStorage.setItem("loopmartUserProducts", JSON.stringify(storedProducts));

    console.log("Product Updated:", updatedProduct);
    toast({
      title: "Product Updated!",
      description: `${data.title} has been successfully updated.`,
    });
    router.push("/products/my-listings");
  }
  
  if (!isLoggedIn) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="w-full max-w-md p-8 text-center">
          <CardTitle className="text-2xl mb-4">Access Denied</CardTitle>
          <CardDescription className="mb-6">Redirecting to login...</CardDescription>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl shadow-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Loading Product...</CardTitle>
        </CardHeader>
        <CardContent><p>Please wait while we fetch product details.</p></CardContent>
      </Card>
    );
  }

  if (productNotFound) {
    return (
      <Card className="w-full max-w-2xl shadow-xl mx-auto text-center">
        <CardHeader>
          <PackageX className="h-16 w-16 mx-auto text-destructive mb-4" />
          <CardTitle className="text-3xl">Product Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">The product you are trying to edit does not exist or may have been removed.</p>
          <Button onClick={() => router.push('/products/my-listings')}>Go to My Listings</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl shadow-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Edit Product Listing</CardTitle>
        <CardDescription>Update the details for your item.</CardDescription>
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
                    <Textarea placeholder="Describe your item..." {...field} className="text-base min-h-[120px]" />
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  Change Image
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
              <Save className="mr-2 h-5 w-5" />
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
