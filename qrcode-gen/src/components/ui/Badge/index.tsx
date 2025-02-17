import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "filled" | "outline" | "light";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  withDot?: boolean;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  size = "md",
  variant = "filled",
  leftIcon,
  rightIcon,
  withDot = false,
  className,
  color,
  style,
  ...props
}) => {
  const sizeClasses = {
    sm: "text-[10px] h-[18px] px-2.5 py-1.5 rounded",
    md: "text-[11px] px-3 py-1.5 rounded-md",
    lg: "text-[13px] h-[26px] px-3.5 py-1.5 rounded-lg",
    xl: "text-[14px] h-[32px] px-4 py-1.5 rounded-xl",
  };

  const variantClasses = {
    filled: "bg-blue-500/40 text-white",
    outline: "bg-transparent border border-gray-300 text-gray-300",
    light: "bg-blue-100 text-blue-700",
  };

  return (
    <div
      className={`
        inline-flex items-center justify-center gap-[5px] 
        font-medium uppercase tracking-wider whitespace-nowrap
        transition-all duration-200 ease-in-out
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      style={{
        backgroundColor: color,
        ...style,
      }}
      {...props}
    >
      {withDot && (
        <span className="w-1.5 h-1.5 rounded-full bg-transparent border-[0.5px] border-current" />
      )}
      {leftIcon}
      {children}
      {rightIcon}
    </div>
  );
};

export default Badge;
