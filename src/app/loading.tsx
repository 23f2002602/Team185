
import { IconSpinner } from '@/components/icons';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm text-foreground">
      <div className="p-8 bg-card rounded-xl shadow-2xl flex flex-col items-center gap-4">
        <IconSpinner className="h-12 w-12 animate-spin text-primary" />
        <h1 className="text-xl font-headline text-primary">Loading EcoFinds...</h1>
        <p className="text-muted-foreground font-body">Please wait a moment while we fetch the good stuff.</p>
      </div>
    </div>
  );
}
