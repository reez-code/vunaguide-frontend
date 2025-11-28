import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function Button({
  children,
  className,
  variant = "primary",
  disabled,
  ...props
}) {
  const baseStyles =
    "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer w-full sm:w-auto";

  const variants = {
    // Dark green background, white text (Good contrast)
    primary: "bg-vuna-700 text-white hover:bg-vuna-800 shadow-vuna-200",

    // White background, dark text (Standard secondary)
    secondary: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50",

    // Red background, white text (Danger actions)
    danger: "bg-red-600 text-white hover:bg-red-700",

    // Transparent background, dark text (Ghost/Link style)
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 shadow-none",
  };

  return (
    <button
      disabled={disabled}
      className={twMerge(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
