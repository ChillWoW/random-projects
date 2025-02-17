"use client";

import React, { useState, useRef, useEffect } from "react";
import { IconChevronDown } from "@tabler/icons-react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  description?: string;
  withAsterisk?: boolean;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  leftSectionIcon?: React.ReactNode;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  description,
  withAsterisk,
  error,
  placeholder = "Select option",
  disabled,
  leftSectionIcon,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: `${rect.bottom + window.scrollY + 5}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        maxHeight: "200px",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      {label && (
        <label className="text-xs text-left ml-2.5 text-foreground flex items-center gap-1">
          {label}
          {withAsterisk && <span className="text-red-600 ml-0.5">*</span>}
        </label>
      )}

      {description && (
        <p className="text-xs text-left ml-2.5 text-dark-300">{description}</p>
      )}

      <div className="relative">
        {leftSectionIcon && (
          <div className="absolute left-0 flex items-center justify-center w-9 inset-y-0 opacity-70">
            {leftSectionIcon}
          </div>
        )}

        <div
          className={`
            flex items-center justify-between
            rounded-lg px-3 py-2 text-sm cursor-pointer
            transition-all duration-200 ease-in-out
            shadow-[0_0_2px_0_rgba(0,0,0,0.3)]
            bg-dark-600 border border-dark-400
            ${
              disabled
                ? "opacity-60 cursor-not-allowed"
                : "hover:border-dark-300"
            }
            ${error ? "border-red-600" : ""}
            ${leftSectionIcon ? "pl-9" : ""}
            ${className}
          `}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <span
            className={`${
              !selectedOption ? "text-dark-300" : "text-foreground"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <IconChevronDown
            className={`
              w-4 h-4 text-dark-300 transition-transform duration-200
              ${isOpen ? "rotate-180" : ""}
            `}
          />
        </div>

        {isOpen && !disabled && (
          <div
            className="fixed z-50 bg-dark-600 border border-dark-400 rounded-lg shadow-lg overflow-y-auto"
            style={dropdownStyle}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`
                  px-3 py-2 cursor-pointer text-sm
                  transition-colors duration-200
                  ${
                    option.value === value
                      ? "bg-dark-500 text-foreground"
                      : "text-dark-50 hover:bg-dark-500 hover:text-foreground"
                  }
                `}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-600 ml-2.5">{error}</p>}
    </div>
  );
};

export default Select;
