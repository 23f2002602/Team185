
import type { Metadata } from 'next';
import { ProfileForm } from '@/components/dashboard/profile-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'User Dashboard - LoopMart',
  description: 'Manage your profile and settings on LoopMart.',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 flex justify-center">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">User Dashboard</CardTitle>
          <CardDescription>View and update your profile information.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
