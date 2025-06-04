import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - LoopMart',
  description: 'Login to your LoopMart account.',
};

export default function LoginPage() {
  return <LoginForm />;
}
