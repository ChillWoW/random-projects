"use client";

import React from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  label,
  description,
  error,
  disabled,
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "w-8 h-[18px] after:w-3.5 after:h-3.5",
    md: "w-11 h-6 after:w-5 after:h-5",
    lg: "w-14 h-[30px] after:w-[26px] after:h-[26px]",
  };

  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`
          flex items-center gap-2 cursor-pointer
          ${disabled ? "opacity-60 cursor-not-allowed" : ""}
          ${className}
        `}
        onClick={handleChange}
      >
        <div className="relative">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
          />
          <div
            className={`
              ${sizeClasses[size]}
              relative rounded-full transition-colors duration-200
              after:content-[''] after:absolute after:top-[2px] after:left-[2px]
              after:rounded-full after:transition-all after:duration-200
              after:bg-white
              ${checked ? "bg-green-500 after:translate-x-full" : "bg-dark-500"}
            `}
          />
        </div>
        {label && (
          <span
            className={`text-foreground ${
              size === "sm"
                ? "text-xs"
                : size === "lg"
                ? "text-base"
                : "text-sm"
            }`}
          >
            {label}
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-left ml-2.5 text-dark-300">{description}</p>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Switch;
