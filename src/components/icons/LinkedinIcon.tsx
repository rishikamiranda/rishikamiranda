import { cn } from '@/lib/utils';

export interface IconProps {
  className?: string;
  size?: number;
  bgColor?: string;
  iconColor?: string;
}

export function LinkedinIcon({
  className,
  size = 24,
  bgColor = '#0077B5',
  iconColor = '#FFFFFF',
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn('rounded-md', className)}
    >
      {/* Solid LinkedIn Blue Background */}
      <rect width="24" height="24" rx="5" fill={bgColor} />
      
      {/* Solid White Logo Fill */}
      <g fill={iconColor}>
        <path d="M19 19h-3v-4.74c0-1.42-.56-2.39-1.84-2.39-.98 0-1.56.66-1.81 1.3-.09.23-.12.55-.12.87V19h-3s.04-8.81 0-9.72h3v1.38c.4-.61 1.1-1.49 2.69-1.49 1.96 0 3.43 1.28 3.43 4.04V19zM6.88 8.02h-.02c-1 0-1.65-.68-1.65-1.53 0-.87.67-1.53 1.69-1.53 1.02 0 1.65.66 1.67 1.53 0 .85-.65 1.53-1.69 1.53zM5.38 19h3V9.28h-3V19z" />
      </g>
    </svg>
  );
}