import * as React from "react";

type ButtonVariant = "glass" | "primary" | "outline" | "ghost" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const base =
    "group relative inline-flex items-center justify-center font-medium overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none disabled:opacity-50 disabled:pointer-events-none mt-2";

const variants: Record<ButtonVariant, string> = {
    glass:
        "rounded-md text-white",
    primary:
        "rounded-md bg-white/80 text-black hover:bg-white/90",
    secondary:
        "rounded-md bg-black/80 text-white hover:bg-white/90",
    outline:
        "rounded-md border border-white/20 text-white hover:bg-white/10",
    ghost:
        "rounded-md text-white hover:bg-white/10",
};

const sizes: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-4 text-sm",
    lg: "px-10 py-5 text-base",
};

export function Button({
    children,
    variant = "glass",
    size = "md",
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={`${base} ${variants[variant]} ${sizes[size]} ${className ?? ""}`}
            {...props}
        >
            {/* GLASS BACKGROUND */}
            {variant === "glass" && (
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r
                        from-white/20 to-white/10
                        backdrop-blur-xl border border-white/20" />
            )}

            {/* METALLIC SHINE */}
            {variant === "glass" && (
                <div className="absolute inset-0 rounded-2xl
                        bg-linear-to-br from-white/10 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity" />
            )}

            {/* CONTENT */}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </button>
    );
}
