
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, UploadCloud, Save } from "lucide-react";

const profileFormSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }).max(30, { message: "Username can be at most 30 characters." }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const DEFAULT_AVATAR_URL = "https://placehold.co/128x128.png";

export function ProfileForm() {
  const { toast } = useToast();
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => {
    // Load saved profile data from localStorage (simulation)
    const savedUsername = localStorage.getItem("loopmartUsername");
    const savedAvatar = localStorage.getItem("loopmartAvatar");
    if (savedUsername) {
      form.setValue("username", savedUsername);
    }
    setProfileImagePreview(savedAvatar || DEFAULT_AVATAR_URL);
  }, [form]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(data: ProfileFormValues) {
    // Simulate saving profile data (e.g., to localStorage or an API)
    localStorage.setItem("loopmartUsername", data.username);
    if (profileImagePreview && profileImagePreview !== DEFAULT_AVATAR_URL && !profileImagePreview.startsWith('https://placehold.co')) {
        localStorage.setItem("loopmartAvatar", profileImagePreview);
    } else if (!profileImagePreview || profileImagePreview === DEFAULT_AVATAR_URL) {
        localStorage.removeItem("loopmartAvatar"); // Remove if set to default or null
    }
    
    console.log("Profile updated:", { ...data, avatar: profileImageFile?.name || 'current or default' });
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-32 w-32 ring-2 ring-primary ring-offset-2 ring-offset-background">
            <AvatarImage 
              src={profileImagePreview || DEFAULT_AVATAR_URL} 
              alt="Profile Avatar" 
              data-ai-hint="avatar person" 
            />
            <AvatarFallback>
              <User className="h-16 w-16" />
            </AvatarFallback>
          </Avatar>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="mr-2 h-4 w-4" />
            Change Picture
          </Button>
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
          />
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} className="text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full text-lg py-6">
          <Save className="mr-2 h-5 w-5" />
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
