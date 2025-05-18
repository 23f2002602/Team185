import type { SVGProps } from 'react';
import { Leaf } from 'lucide-react';

export function LoopMartLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" aria-label="LoopMart Logo">
      <Leaf className="h-7 w-7 text-primary" {...props} />
      <span className="text-2xl font-bold text-primary">LoopMart</span>
    </div>
  );
}
