import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "~/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      isLoading = false,
      icon,
      iconPosition = "left",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      relative inline-flex items-center justify-center gap-2
      font-medium tracking-tight
      transition-all duration-300 ease-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      overflow-hidden
    `;

    const variants = {
      primary: `
        bg-[var(--foreground)] text-[var(--background)]
        hover:opacity-90 hover:scale-[1.02]
        active:scale-[0.98]
        focus-visible:ring-[var(--foreground)]
      `,
      secondary: `
        bg-[var(--surface)] text-[var(--foreground)]
        border border-[var(--border)]
        hover:bg-[var(--background-soft)] hover:border-[var(--foreground)]
        active:scale-[0.98]
        focus-visible:ring-[var(--foreground)]
      `,
      outline: `
        bg-transparent text-[var(--foreground)]
        border border-[var(--border)]
        hover:bg-[var(--surface)] hover:border-[var(--foreground)]
        active:scale-[0.98]
        focus-visible:ring-[var(--foreground)]
      `,
      ghost: `
        bg-transparent text-[var(--foreground)]
        hover:bg-[var(--surface)]
        active:scale-[0.98]
        focus-visible:ring-[var(--foreground)]
      `,
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-6 py-3 text-base rounded-xl",
      lg: "px-8 py-4 text-lg rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        ) : null}
        <span
          className={cn(
            "flex items-center gap-2",
            isLoading && "opacity-0",
            iconPosition === "right" && "flex-row-reverse"
          )}
        >
          {icon}
          {children}
        </span>
        {/* Shimmer effect on hover */}
        <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-[100%] transition-transform duration-700" />
      </button>
    );
  }
);

Button.displayName = "Button";
