
import { Logo } from '@/components/icons';

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo className="h-6 w-auto hidden md:block" />
          <p className="text-center text-sm leading-loose md:text-left font-body">
            Built by You. Powered by AI.
            <br className="md:hidden" />
            &copy; {new Date().getFullYear()} EcoFinds. All rights reserved.
          </p>
        </div>
        {/* Additional footer links can go here */}
      </div>
    </footer>
  );
}
