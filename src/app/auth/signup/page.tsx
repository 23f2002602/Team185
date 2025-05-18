import { SignupForm } from "@/components/auth/signup-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - LoopMart',
  description: 'Create an account to join LoopMart.',
};

export default function SignupPage() {
  return <SignupForm />;
}
