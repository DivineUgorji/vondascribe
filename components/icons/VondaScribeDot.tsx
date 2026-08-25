import React from "react";

type EchonoteDotProps = React.SVGProps<SVGSVGElement>;

export default function EchonoteDot({ className, ...props }: EchonoteDotProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
      {...props}
    >
      <circle cx="16" cy="16" r="4" className="fill-primary" />
      <path
        d="M10 16a6 6 0 0 0 6 6"
        className="stroke-primary"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M10 16a6 6 0 0 1 6-6"
        className="stroke-primary"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M6 16a10 10 0 0 0 10 10"
        className="stroke-primary"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M6 16a10 10 0 0 1 10-10"
        className="stroke-primary"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M22 16a6 6 0 0 0-6-6"
        className="stroke-primary"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M22 16a6 6 0 0 1-6 6"
        className="stroke-primary"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M26 16a10 10 0 0 0-10-10"
        className="stroke-primary"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M26 16a10 10 0 0 1-10 10"
        className="stroke-primary"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}
