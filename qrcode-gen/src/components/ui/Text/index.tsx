import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  color?: string;
  weight?: "bold" | "semibold" | "normal" | "light" | number;
  align?: "left" | "center" | "right";
  italic?: boolean;
  underline?: boolean;
  dimmed?: boolean;
  component?: any;
  className?: string;
  children?: React.ReactNode;
}

const Text: React.FC<TextProps> = ({
  size = "md",
  color,
  weight,
  align,
  italic,
  underline,
  dimmed,
  component: Component = "p",
  className,
  style,
  children,
  ...others
}) => {
  const sizeClasses = {
    xs: "text-[10px]",
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
    xl: "text-xl",
  };

  const weightClasses = {
    bold: "font-bold",
    semibold: "font-semibold",
    normal: "font-normal",
    light: "font-light",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <Component
      className={`
        m-0 p-0 font-inherit
        ${typeof size === "string" ? sizeClasses[size] : ""}
        ${weight && typeof weight === "string" ? weightClasses[weight] : ""}
        ${align ? alignClasses[align] : ""}
        ${italic ? "italic" : ""}
        ${underline ? "underline" : ""}
        ${dimmed ? "text-gray-600" : ""}
        ${className}
      `}
      style={{
        ...style,
        color: color,
        fontWeight: typeof weight === "number" ? weight : undefined,
        fontSize: typeof size === "number" ? size : undefined,
      }}
      {...others}
    >
      {children}
    </Component>
  );
};

export default Text;
