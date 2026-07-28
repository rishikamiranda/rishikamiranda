import * as React from "react";

export function CloseIcon({
  size = 50,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="m37.304 11.282l1.414 1.414l-26.022 26.02l-1.414-1.413z"/><path d="m12.696 11.282l26.022 26.02l-1.414 1.415l-26.022-26.02z"/>
    </svg>
  );
}
