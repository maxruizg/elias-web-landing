import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "~/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "solid" | "glass" | "outline";
  hover?: boolean;
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "solid", hover = true, children, className, ...props }, ref) => {
    const variants = {
      solid: "bg-[var(--surface)] border border-[var(--border)]",
      glass: "glass",
      outline: "bg-transparent border border-[var(--border)]",
    };

    const hoverStyles = hover
      ? `
        hover:border-[var(--foreground-soft)]
        hover:shadow-lg
        hover:-translate-y-1
        transition-all duration-300 ease-out
      `
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl overflow-hidden",
          variants[variant],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn("p-6 pb-0", className)} {...props}>
      {children}
    </div>
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({
  children,
  className,
  ...props
}: CardContentProps) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("p-6 pt-0 flex items-center gap-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
