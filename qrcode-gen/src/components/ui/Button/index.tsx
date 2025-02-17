import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: "filled" | "outline";
    size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
    children,
    leftIcon,
    rightIcon,
    className,
    variant = "filled",
    size = "md",
    disabled,
    ...props
}) => {
    const sizeClasses = {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2"
    };

    const variantClasses = {
        filled: "bg-gray-200 border border-gray-800 text-black hover:bg-gray-400",
        outline:
            "bg-transparent border border-gray-200 text-gray-200 hover:border-gray-400 hover:text-gray-400"
    };

    return (
        <button
            className={`
        flex items-center justify-center gap-2 
        rounded-lg cursor-pointer transition-all duration-200 
        relative overflow-hidden
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : ""}
        ${className}
      `}
            disabled={disabled}
            {...props}
        >
            {leftIcon && <span className="mr-1">{leftIcon}</span>}
            <span className="flex items-center w-full justify-inherit gap-2">
                {children}
            </span>
            {rightIcon && <span className="ml-1">{rightIcon}</span>}
        </button>
    );
};

export default Button;
