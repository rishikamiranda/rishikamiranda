import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export function WebsiteIcon({ className, size = 18, color = 'currentColor' }: IconProps) {
  return <Globe className={cn(className)} size={size} color={color} strokeWidth={1.5} />;
}