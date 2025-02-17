import React from "react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";

interface NumberInputProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  icon?: React.ReactNode;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
  placeholder?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  description,
  error,
  required,
  min,
  max,
  step = 1,
  icon,
  value,
  onChange,
  disabled,
  className,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && onChange) {
      // Ensure the value is within bounds
      const boundedValue = Math.min(
        max ?? newValue,
        Math.max(min ?? newValue, newValue)
      );
      onChange(boundedValue);
    }
  };

  const increment = () => {
    if (disabled || !onChange || value === undefined) return;
    const newValue = value + step;
    if (max === undefined || newValue <= max) {
      onChange(newValue);
    }
  };

  const decrement = () => {
    if (disabled || !onChange || value === undefined) return;
    const newValue = value - step;
    if (min === undefined || newValue >= min) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs text-left ml-2.5 text-white flex items-center gap-1">
          {label}
          {required && <span className="text-red-600 ml-0.5">*</span>}
        </label>
      )}

      <div
        className={`
          flex items-center border rounded-lg
          transition-all duration-200 ease-in-out
          bg-dark-600 border-dark-400
          ${disabled ? "opacity-60 cursor-not-allowed" : ""}
          ${error ? "border-red-600" : ""}
          ${className || ""}
        `}
      >
        {icon && <div className="px-3 text-gray-600">{icon}</div>}

        <input
          type="number"
          className="
            flex-1 border-none bg-transparent px-2 py-1 text-sm
            outline-none w-full text-white
            [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          "
          value={value ?? ""}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          {...props}
        />

        <div className="flex flex-col border-l border-dark-400">
          <button
            type="button"
            onClick={increment}
            disabled={
              disabled ||
              (max !== undefined && value !== undefined && value >= max)
            }
            className="
              px-2 py-1 cursor-pointer text-gray-500
              transition-all duration-200 ease-in-out
              hover:text-gray-300 hover:scale-105
              disabled:cursor-not-allowed disabled:opacity-50
              disabled:hover:scale-100 disabled:hover:text-gray-500
            "
          >
            <IconChevronUp size={16} />
          </button>
          <button
            type="button"
            onClick={decrement}
            disabled={
              disabled ||
              (min !== undefined && value !== undefined && value <= min)
            }
            className="
              px-2 py-1 cursor-pointer text-gray-500
              transition-all duration-200 ease-in-out
              hover:text-gray-300 hover:scale-105
              disabled:cursor-not-allowed disabled:opacity-50
              disabled:hover:scale-100 disabled:hover:text-gray-500
            "
          >
            <IconChevronDown size={16} />
          </button>
        </div>
      </div>

      {description && (
        <p className="text-xs text-left ml-2.5 text-gray-500">{description}</p>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default NumberInput;
