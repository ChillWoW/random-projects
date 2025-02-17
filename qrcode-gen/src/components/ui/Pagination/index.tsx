"use client";

import React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface PaginationProps {
  total: number;
  page: number;
  onChange: (page: number) => void;
  siblings?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  page,
  onChange,
  siblings = 1,
  className,
}) => {
  const getRange = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const getPageNumbers = () => {
    const totalNumbers = siblings * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (total <= totalBlocks) {
      return getRange(1, total);
    }

    const leftSiblingIndex = Math.max(page - siblings, 1);
    const rightSiblingIndex = Math.min(page + siblings, total);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < total - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblings;
      return [...getRange(1, leftItemCount), "...", total];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblings;
      return [1, "...", ...getRange(total - rightItemCount + 1, total)];
    }

    return [
      1,
      "...",
      ...getRange(leftSiblingIndex, rightSiblingIndex),
      "...",
      total,
    ];
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        className={`
          flex items-center justify-center min-w-[32px] h-8
          px-1.5 text-sm rounded border transition-all duration-200
          select-none border-dark-500 bg-dark-700 text-gray-400
          ${
            page === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-dark-600 hover:text-white"
          }
        `}
        onClick={() => page > 1 && onChange(page - 1)}
        disabled={page === 1}
      >
        <IconChevronLeft size={18} />
      </button>

      {getPageNumbers().map((pageNumber, i) => (
        <button
          key={i}
          className={`
            flex items-center justify-center min-w-[32px] h-8
            px-1.5 text-sm rounded border transition-all duration-200
            select-none
            ${
              pageNumber === page
                ? "bg-gray-700 border-gray-700 text-white hover:bg-gray-800"
                : pageNumber === "..."
                ? "cursor-default hover:bg-transparent"
                : "border-dark-500 bg-dark-700 text-gray-400 hover:bg-dark-600 hover:text-white"
            }
          `}
          onClick={() => pageNumber !== "..." && onChange(Number(pageNumber))}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className={`
          flex items-center justify-center min-w-[32px] h-8
          px-1.5 text-sm rounded border transition-all duration-200
          select-none border-dark-500 bg-dark-700 text-gray-400
          ${
            page === total
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-dark-600 hover:text-white"
          }
        `}
        onClick={() => page < total && onChange(page + 1)}
        disabled={page === total}
      >
        <IconChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
