"use client";

import React, { useState, useRef, useEffect } from "react";

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  position?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
  className?: string;
}

const Menu: React.FC<MenuProps> = ({
  trigger,
  items,
  position = "bottom-start",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const style: any = {};

      if (position.includes("bottom")) {
        style.top = rect.bottom + 5;
      } else {
        style.bottom = window.innerHeight - rect.top + 5;
      }

      if (position.includes("end")) {
        style.right = window.innerWidth - rect.right;
      } else {
        style.left = rect.left;
      }

      setMenuStyle(style);
    }
  }, [isOpen, position]);

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`
            absolute z-50 min-w-[180px]
            bg-dark-600 border border-dark-400 rounded-lg
            shadow-lg overflow-hidden
            ${className}
          `}
          style={menuStyle}
        >
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.divider ? <div className="h-px bg-dark-400 my-1" /> : null}
              <div
                className={`
                    flex items-center gap-2 px-4 py-2
                    text-sm transition-colors duration-200
                    ${
                      item.disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:bg-dark-500"
                    }
                  `}
                onClick={() => {
                  if (!item.disabled && item.onClick) {
                    item.onClick();
                    setIsOpen(false);
                  }
                }}
              >
                {item.icon && (
                  <span className="text-dark-200">{item.icon}</span>
                )}
                <span className="text-foreground">{item.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
