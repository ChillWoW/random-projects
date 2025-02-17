"use client";

import React, { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  centered?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  opened,
  onClose,
  title,
  size = "md",
  centered = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (closeOnEscape) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [closeOnEscape, onClose]);

  if (!mounted || !opened) return null;

  const sizeClasses = {
    xs: "w-80",
    sm: "w-[30rem]",
    md: "w-[40rem]",
    lg: "w-[50rem]",
    xl: "w-[60rem]",
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[200]"
        onClick={closeOnClickOutside ? onClose : undefined}
      />
      <div
        className={`
        fixed inset-0 z-[201] p-4
        ${centered ? "flex items-center justify-center" : ""}
      `}
      >
        <div
          className={`
          bg-dark-800 rounded-lg 
          shadow-[0_8px_32px_rgba(0,0,0,0.2)]
          border-[1px] border-dark-700
          ${sizeClasses[size]}
        `}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="flex items-center justify-between p-4 border-b border-dark-700">
              <h2 className="text-lg font-medium">{title}</h2>
              <button
                onClick={onClose}
                className="bg-transparent border-none text-gray-500 cursor-pointer p-2 rounded
                         hover:bg-dark-800 hover:text-white transition-colors"
              >
                <IconX size={18} />
              </button>
            </div>
          )}
          <div className="p-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
