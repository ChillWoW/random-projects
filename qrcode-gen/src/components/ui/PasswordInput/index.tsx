"use client";

import React, { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  leftSection?: React.ReactNode;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  description,
  error,
  required,
  leftSection,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs text-left ml-2.5 text-white flex items-center gap-1">
          {label}
          {required && <span className="text-red-600 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          className={`
            flex-1 rounded-lg px-3 py-2 outline-none
            transition-all duration-200 ease-in-out
            shadow-[0_0_2px_0_rgba(0,0,0,0.3)]
            text-sm bg-dark-600 text-white
            border border-dark-400 focus:border-dark-300
            ${leftSection ? "pl-9" : ""}
            pr-9
            ${error ? "border-red-600" : ""}
            ${className}
          `}
          {...props}
        />

        {leftSection && (
          <div className="absolute left-0 flex items-center justify-center w-9 inset-y-0 opacity-70">
            {leftSection}
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 flex items-center justify-center w-9 inset-y-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
        </button>
      </div>

      {description && (
        <p className="text-xs text-left ml-2.5 text-gray-500">{description}</p>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default PasswordInput;
