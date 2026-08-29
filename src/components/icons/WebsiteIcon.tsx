import { cn } from '@/lib/utils';

export interface IconProps {
  className?: string;
  size?: number;
  bgColor?: string;
  iconColor?: string;
}

export function WebsiteIcon({
  className,
  size = 24,
  bgColor = '#475569',
  iconColor = '#FFFFFF',
}: IconProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-md shrink-0',
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size * 0.625}
        height={size * 0.625}
        viewBox="0 0 24 24"
        fill="none"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    </div>
  );
}