import { cn } from '@/lib/utils';

export interface IconProps {
  className?: string;
  size?: number;
  iconColor?: string;
}

export function InstagramIcon({ className, size = 24, iconColor = '#FFFFFF' }: IconProps) {
  const gradientId = 'instagram-bg-gradient';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('rounded-md', className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="100%" stopColor="#285AEB" />
        </linearGradient>
      </defs>
      
      {/* Solid Brand Gradient Background */}
      <rect width="24" height="24" rx="5" fill={`url(#${gradientId})`} />
      
      {/* Inner White Icon Outline */}
      <g stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <rect x="5" y="5" width="14" height="14" rx="3.5" ry="3.5" />
        <path d="M14.8 11.56A2.8 2.8 0 1 1 12.44 9.2 2.8 2.8 0 0 1 14.8 11.56z" />
        <line x1="15.85" y1="8.15" x2="15.86" y2="8.15" />
      </g>
    </svg>
  );
}