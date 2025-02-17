import React, { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  description,
  error,
  required,
  leftSection,
  rightSection,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs text-left ml-2.5 text-white flex items-center gap-1">
          {label}
          {required && <span className="text-red-600 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex items-start">
        <textarea
          className={`
            w-full rounded-lg px-3 py-2 outline-none
            transition-all duration-200 ease-in-out
            shadow-[0_0_2px_0_rgba(0,0,0,0.3)]
            text-sm bg-dark-600 text-white resize-none min-h-[20px]
            border border-dark-400 focus:border-dark-300
            ${leftSection ? "pl-9" : ""}
            ${rightSection ? "pr-9" : ""}
            ${error ? "border-red-600" : ""}
            ${className}
          `}
          {...props}
        />

        {leftSection && (
          <div className="absolute left-0 flex items-center justify-center w-9 top-2 opacity-70">
            {leftSection}
          </div>
        )}

        {rightSection && (
          <div className="absolute right-0 flex items-center justify-center w-9 top-2 opacity-70">
            {rightSection}
          </div>
        )}
      </div>

      {description && (
        <p className="text-xs text-left ml-2.5 text-gray-500">{description}</p>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default TextArea;
