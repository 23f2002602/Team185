
'use server';

import { z } from 'zod';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { UserProfile } from '@/types';

// OTP store and functions are kept for potential future re-enablement, but not used for now.
interface OtpEntry {
  otp: string;
  email: string;
  expiresAt: number;
}
const otpStore = new Map<string, OtpEntry>(); // email -> OtpEntry

const EmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

const OtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, { message: "OTP must be 6 digits." }),
});

// OTP sending function - NOT USED CURRENTLY
export async function sendOtpAction(prevState: any, formData: FormData) {
  console.log("sendOtpAction triggered (currently disabled, intended for email OTP).");
  const validatedFields = EmailSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid email.",
      errors: validatedFields.error.flatten().fieldErrors,
      step: 1, // Assuming step logic would be part of OTP flow
    };
  }
  const { email } = validatedFields.data;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  otpStore.set(email, { otp, email, expiresAt });

  // Email sending logic (SendGrid or Firebase Extension) would go here.
  // For now, we are bypassing it.
  console.log(`[DISABLED OTP] Generated OTP for ${email}: ${otp}`);
  
  // Simulating OTP sent for potential future use.
  // In a real OTP flow, you wouldn't return the OTP here.
  return { 
    message: `OTP generation bypassed. In a real flow, an OTP would be sent to ${email}. (DEV OTP: ${otp})`, 
    step: 2, 
    email 
  };
}

// OTP verification function - NOT USED CURRENTLY
export async function verifyOtpAction(prevState: any, formData: FormData) {
  console.log("verifyOtpAction triggered (currently disabled).");
  const validatedFields = OtpSchema.safeParse({
    email: formData.get('email'),
    otp: formData.get('otp'),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid OTP format.",
      errors: validatedFields.error.flatten().fieldErrors,
      step: 2, // Assuming step logic
      email: formData.get('email') as string || '',
    };
  }
  const { email, otp } = validatedFields.data;
  const storedEntry = otpStore.get(email);

  if (!storedEntry) return { message: "OTP not found (simulation).", step: 2, email };
  if (Date.now() > storedEntry.expiresAt) {
    otpStore.delete(email);
    return { message: "OTP has expired (simulation).", step: 1 };
  }
  if (storedEntry.otp === otp) {
    otpStore.delete(email);
    return { message: "OTP verified successfully (simulation).", step: 3, email };
  }
  return { message: "Invalid OTP (simulation).", step: 2, email };
}

// Zod schema commented out to disable validation
/*
const RegistrationDetailsSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, "Name is too short."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long."),
  age: z.coerce.number().min(1, "Age must be at least 1.").max(120, "Age is unrealistic."),
  state: z.string().min(1, "State is required."),
  city: z.string().min(1, "City is required."),
  manualAddress: z.string().min(5, "Address is too short."),
  pincode: z.string().regex(/^\d{6}$/, "Invalid Indian pincode."),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits."),
  // profileImage is handled separately as File object
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Path of error
});
*/

export async function submitRegistrationAction(prevState: any, formData: FormData) {
  // Validation is disabled. Directly extract data.
  const email = formData.get('email') as string || '';
  const name = formData.get('name') as string || '';
  const password = formData.get('password') as string || ''; // Password is received but not stored securely.
  const ageString = formData.get('age') as string || '0';
  const state = formData.get('state') as string || '';
  const city = formData.get('city') as string || '';
  const manualAddress = formData.get('manualAddress') as string || '';
  const pincode = formData.get('pincode') as string || '';
  const phoneNumber = formData.get('phoneNumber') as string || '';

  const age = parseInt(ageString, 10);

  // Basic check for password confirmation (can be kept simple or removed)
  if (password !== formData.get('confirmPassword')) {
    return {
        message: "Passwords do not match.",
        email,
        success: false,
    }
  }
  
  console.log(`Password received for ${email} but NOT stored for security reasons in this temporary setup.`);

  const profileImageFile = formData.get('profileImage') as File | null;
  let profileImageUrl: string | undefined = undefined;

  if (profileImageFile && profileImageFile.size > 0) {
    // Basic size check can remain if desired, or be removed for full disablement
    // if (profileImageFile.size > 5 * 1024 * 1024) { // Max 5MB
    //     return { message: "Profile image is too large (max 5MB).", email, success: false, };
    // }
    try {
      const storageRef = ref(storage, `profileImages/${email}/${profileImageFile.name}`);
      const snapshot = await uploadBytes(storageRef, profileImageFile);
      profileImageUrl = await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error("Error uploading profile image:", error);
      return { message: "Failed to upload profile image.", email, success: false, };
    }
  }

  const newUserProfile: UserProfile = {
    email,
    name,
    age,
    address: {
      country: "India",
      state,
      city,
      manualAddress,
      pincode,
    },
    phoneNumber: `+91${phoneNumber}`, // Assuming +91 prefix
    profileImageUrl,
    createdAt: new Date(), 
  };

  try {
    const usersRef = collection(db, "users");
    const userDocRef = doc(usersRef, email); 
    
    await setDoc(userDocRef, { 
        ...newUserProfile,
        createdAt: serverTimestamp() 
    });
    return { message: "Registration successful! (Validation Disabled)", success: true, email }; 
  } catch (error) {
    console.error("Error creating user profile:", error);
    if ((error as any)?.code === 'already-exists' || (error as any).message?.includes('already exists')) {
        return { message: "An account with this email already exists.", email, success: false };
    }
    return { message: "Failed to create profile. Please try again.", email, success: false };
  }
}
