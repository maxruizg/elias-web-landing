import { forwardRef, type ButtonHTMLAttributes, type ReactNode, useCallback, useRef } from "react";
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
      onClick,
      ...props
    },
    ref
  ) => {
    const rippleRef = useRef<HTMLSpanElement>(null);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        // Ripple effect
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        ripple.className = "absolute rounded-full bg-white/30 animate-[ripple_0.6s_ease-out] pointer-events-none";
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);

        onClick?.(e);
      },
      [onClick]
    );

    const baseStyles = `
      group relative inline-flex items-center justify-center gap-2
      font-medium tracking-tight
      transition-all duration-300 ease-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      overflow-hidden cursor-pointer
    `;

    const variants = {
      primary: `
        bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white
        hover:shadow-lg hover:shadow-[var(--brand-primary)]/25 hover:scale-[1.03] hover:-translate-y-0.5
        active:scale-[0.97]
        focus-visible:ring-[var(--brand-primary)]
      `,
      secondary: `
        bg-[var(--surface)] text-[var(--foreground)]
        border border-[var(--border)]
        hover:bg-[var(--background-soft)] hover:border-[var(--brand-primary)] hover:shadow-md hover:-translate-y-0.5
        active:scale-[0.97]
        focus-visible:ring-[var(--brand-primary)]
      `,
      outline: `
        bg-transparent text-[var(--foreground)]
        border-2 border-[var(--border)]
        hover:bg-[var(--surface)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] hover:shadow-md hover:-translate-y-0.5
        active:scale-[0.97]
        focus-visible:ring-[var(--brand-primary)]
      `,
      ghost: `
        bg-transparent text-[var(--foreground)]
        hover:bg-[var(--surface)] hover:-translate-y-0.5
        active:scale-[0.97]
        focus-visible:ring-[var(--brand-primary)]
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
        onClick={handleClick}
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
        <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[100%] transition-transform duration-700" />
        <span ref={rippleRef} />
      </button>
    );
  }
);

Button.displayName = "Button";
