
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="120"
      height="30"
      aria-label="EcoFinds Logo"
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <text
        x="10"
        y="35"
        fontFamily="var(--font-headline), Belleza, sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="url(#logoGradient)"
      >
        EcoFinds
      </text>
      <path
        d="M160 15 Q165 10 170 15 Q175 20 180 15 Q185 10 190 15"
        stroke="hsl(var(--accent))"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        transform="translate(-5, 0)"
      >
        <animate attributeName="d" values="M160 15 Q165 10 170 15 Q175 20 180 15 Q185 10 190 15; M160 15 Q165 20 170 15 Q175 10 180 15 Q185 20 190 15; M160 15 Q165 10 170 15 Q175 20 180 15 Q185 10 190 15" dur="2s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

export function IconSpinner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
