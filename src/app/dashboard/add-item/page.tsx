
"use client";

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addItemSchema, type AddItemFormValues, addItemFormConditions, ACCEPTED_IMAGE_TYPES, MAX_FILES_COUNT } from './schema';
import { productCategories } from '@/data/mock-products';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { IconSpinner } from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';
import { PackagePlus, ArrowLeft, UploadCloud, XCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ADD_NEW_CATEGORY_VALUE = "Add New Category";

export default function AddItemPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<AddItemFormValues>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      productName: "",
      category: "",
      customCategory: "",
      price: '', // Changed from undefined
      condition: '', // Changed from undefined
      problems: "",
      images: [],
    },
  });

  const watchedCategory = form.watch("category");

  React.useEffect(() => {
    // Clean up object URLs when component unmounts or previews change
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFilesArray = Array.from(files).slice(0, MAX_FILES_COUNT - (form.getValues('images')?.length || 0) );
      const currentFiles = form.getValues('images') || [];
      const updatedFiles = [...currentFiles, ...newFilesArray];
      
      form.setValue('images', updatedFiles.slice(0, MAX_FILES_COUNT), { shouldValidate: true });

      const newPreviews = newFilesArray.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews].slice(0, MAX_FILES_COUNT));
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]); // Revoke the specific URL
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    
    const currentFiles = form.getValues('images') || [];
    form.setValue('images', currentFiles.filter((_, i) => i !== index), { shouldValidate: true });
  };

  const onSubmit = async (data: AddItemFormValues) => {
    setIsSubmitting(true);
    console.log("Form Data to be submitted to Firebase:", data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you would upload images to Firebase Storage,
    // then save product data (with image URLs) to Firestore.
    // This functionality needs to be implemented in a server action.

    toast({
      title: "Item Submitted (Mock)",
      description: `Product "${data.productName}" has been submitted for listing. (This is a mock response)`,
      variant: "default",
    });
    form.reset();
    setImagePreviews([]);
    setIsSubmitting(false);
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <IconSpinner className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <PackagePlus className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold font-headline">Access Denied</h1>
        <p className="text-muted-foreground font-body">Please log in to add an item to EcoFinds.</p>
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
            <PackagePlus className="mr-3 h-7 w-7"/> List a New Item for Sale
          </CardTitle>
          <CardDescription className="font-body text-md">
            Fill in the details below to share your pre-loved item with the EcoFinds community.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Vintage Leather Jacket" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                          <SelectItem value={ADD_NEW_CATEGORY_VALUE}>Add New Category...</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchedCategory === ADD_NEW_CATEGORY_VALUE && (
                  <FormField
                    control={form.control}
                    name="customCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Category Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter new category name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1500.00" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value))} step="0.01" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                       <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select item condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {addItemFormConditions.map(cond => (
                            <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="problems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Known Problems/Defects (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Small tear on the left sleeve, slight discoloration on the back." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={({ fieldState }) => ( // field is not directly used here, onChange is handled separately
                  <FormItem>
                    <FormLabel>Item Photos (up to {MAX_FILES_COUNT}, max 5MB each)</FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer border-input hover:border-primary transition-colors bg-muted/20 hover:bg-muted/40">
                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, JPEG, WEBP up to 5MB</p>
                        <Input
                          id="file-upload"
                          type="file"
                          multiple
                          accept={ACCEPTED_IMAGE_TYPES.join(",")}
                          onChange={handleImageChange}
                          className="sr-only" // Hidden, label acts as trigger
                          disabled={(imagePreviews?.length || 0) >= MAX_FILES_COUNT}
                        />
                         <Button type="button" variant="outline" size="sm" className="mt-3" onClick={() => document.getElementById('file-upload')?.click()}  disabled={(imagePreviews?.length || 0) >= MAX_FILES_COUNT}>
                            Browse Files
                        </Button>
                      </div>
                    </FormControl>
                    {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                     { (imagePreviews?.length || 0) >= MAX_FILES_COUNT && <p className="text-sm text-destructive mt-1">Maximum {MAX_FILES_COUNT} images allowed.</p>}
                  </FormItem>
                )}
              />
              
              {imagePreviews.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Image Previews:</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {imagePreviews.map((src, index) => (
                      <div key={index} className="relative group aspect-square border rounded-md overflow-hidden shadow-sm">
                        <Image src={src} alt={`Preview ${index + 1}`} layout="fill" objectFit="cover" data-ai-hint="product photo item"/>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-70 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <XCircle className="h-4 w-4" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" disabled={isSubmitting} className="font-body">
                  {isSubmitting ? (
                    <>
                      <IconSpinner className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" /> Save and List Item
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

