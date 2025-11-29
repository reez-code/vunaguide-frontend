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
    // ✅ FIX: Use 'emerald' (standard) instead of 'vuna' (custom)
    // This guarantees the green background appears
    primary:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200 border-transparent",

    secondary: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50",

    danger: "bg-red-600 text-white hover:bg-red-700",

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
