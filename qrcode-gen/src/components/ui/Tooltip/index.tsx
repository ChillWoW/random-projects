"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
    children: React.ReactNode;
    label: string | React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    delay?: number;
    withArrow?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
    children,
    label,
    position = "bottom",
    delay = 200,
    withArrow = false
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [mounted, setMounted] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    let timeoutId: NodeJS.Timeout;

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const updatePosition = () => {
        if (!triggerRef.current || !tooltipRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        let top = 0;
        let left = 0;

        switch (position) {
            case "top":
                top = triggerRect.top - tooltipRect.height - 10;
                left =
                    triggerRect.left +
                    (triggerRect.width - tooltipRect.width) / 2;
                break;
            case "bottom":
                top = triggerRect.bottom + 10;
                left =
                    triggerRect.left +
                    (triggerRect.width - tooltipRect.width) / 2;
                break;
            case "left":
                top =
                    triggerRect.top +
                    (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.left - tooltipRect.width - 10;
                break;
            case "right":
                top =
                    triggerRect.top +
                    (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.right + 10;
                break;
        }

        setCoords({
            top: top + window.scrollY,
            left: left + window.scrollX
        });
    };

    useEffect(() => {
        if (isVisible && mounted) {
            updatePosition();
            window.addEventListener("resize", updatePosition);
            window.addEventListener("scroll", updatePosition);
            return () => {
                window.removeEventListener("resize", updatePosition);
                window.removeEventListener("scroll", updatePosition);
            };
        }
    }, [isVisible, mounted]);

    const handleMouseEnter = () => {
        timeoutId = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutId);
        setIsVisible(false);
    };

    return (
        <>
            <div
                ref={triggerRef}
                className="inline-block cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>

            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {isVisible && (
                            <motion.div
                                ref={tooltipRef}
                                className={`
                  fixed z-[1000] px-3 py-2 text-xs rounded-md
                  pointer-events-none max-w-[200px] text-center
                  bg-dark-600 text-white shadow-[0_0_3px_0_rgba(0,0,0,0.2)]
                `}
                                style={{ top: coords.top, left: coords.left }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                            >
                                {label}
                                {withArrow && (
                                    <div
                                        className={`
                      absolute w-2 h-2 bg-dark-600 rotate-45
                      ${
                          position === "top"
                              ? "bottom-[-4px] left-1/2 -ml-1"
                              : ""
                      }
                      ${
                          position === "bottom"
                              ? "top-[-4px] left-1/2 -ml-1"
                              : ""
                      }
                      ${position === "left" ? "right-[-4px] top-1/2 -mt-1" : ""}
                      ${position === "right" ? "left-[-4px] top-1/2 -mt-1" : ""}
                    `}
                                    />
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
};

export default Tooltip;
