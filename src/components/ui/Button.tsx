import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonIntent = "primary" | "secondary";
type ButtonSize = "sm" | "md";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  intent?: ButtonIntent;
  size?: ButtonSize;
  children: ReactNode;
};

const intentStyles: Record<ButtonIntent, string> = {
  primary: "bg-foreground text-on-foreground hover-bg-foreground-strong",
  secondary:
    "border border-subtle bg-surface-strong text-foreground hover:border-strong",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "btn-size-sm",
  md: "btn-size-md",
};

export function Button({
  intent = "primary",
  size = "md",
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      {...rest}
      className={`focus-ring shadow-button inline-flex items-center justify-center radius-full text-strong transition ${intentStyles[intent]} ${sizeStyles[size]} ${rest.className ?? ""}`}
    >
      {children}
    </a>
  );
}
