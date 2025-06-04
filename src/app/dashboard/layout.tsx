
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'EcoFinds Dashboard',
  description: 'Manage your EcoFinds account and listings.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The SiteHeader will be rendered by the root layout, 
  // but if we needed a dashboard-specific header/sidebar, it would go here.
  // For now, we'll rely on the global SiteHeader.
  return (
    <div className="flex min-h-screen flex-col">
      {/* <SiteHeader onSearchChange={() => {}} initialSearchQuery="" /> */}
      {/* SiteHeader is in root layout, so it's available globally */}
      <main className="flex-1 container py-6 md:py-10">
        {children}
      </main>
      {/* <SiteFooter /> */} 
      {/* SiteFooter is in root layout */}
    </div>
  );
}
