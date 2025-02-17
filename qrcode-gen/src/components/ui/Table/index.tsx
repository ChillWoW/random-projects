"use client";

import React, { useState } from "react";
import {
  IconChevronUp,
  IconChevronDown,
  IconSelector,
} from "@tabler/icons-react";

interface Column<T> {
  key: keyof T | string;
  title: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  width?: number | string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  selectedRows?: T[];
  onSelectedRowsChange?: (rows: T[]) => void;
  loading?: boolean;
  noDataText?: string;
  className?: string;
  striped?: boolean;
  highlightOnHover?: boolean;
}

const Table = <T extends { id?: string | number }>({
  data,
  columns,
  onRowClick,
  selectable,
  selectedRows = [],
  onSelectedRowsChange,
  loading,
  noDataText = "No data found",
  className = "",
  striped = false,
  highlightOnHover = true,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof T | string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig) return data;

    return [...data].sort((a: T, b: T) => {
      const aValue = (a[sortConfig.key as keyof T] as any) || "";
      const bValue = (b[sortConfig.key as keyof T] as any) || "";

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const handleRowSelect = (row: T) => {
    if (!onSelectedRowsChange) return;

    const isSelected = selectedRows.some(
      (r) => (r as any).id === (row as any).id
    );
    let newSelectedRows: T[];

    if (isSelected) {
      newSelectedRows = selectedRows.filter(
        (r) => (r as any).id !== (row as any).id
      );
    } else {
      newSelectedRows = [...selectedRows, row];
    }

    onSelectedRowsChange(newSelectedRows);
  };

  const handleSelectAll = () => {
    if (!onSelectedRowsChange) return;

    if (selectedRows.length === data.length) {
      onSelectedRowsChange([]);
    } else {
      onSelectedRowsChange([...data]);
    }
  };

  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;

    if (sortConfig?.key === column.key) {
      return sortConfig.direction === "asc" ? (
        <IconChevronUp size={16} />
      ) : (
        <IconChevronDown size={16} />
      );
    }
    return <IconSelector size={16} />;
  };

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-dark-600">
            {selectable && (
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length}
                  onChange={handleSelectAll}
                  className="rounded border-dark-400 bg-dark-700 
                           checked:bg-purple-600 hover:checked:bg-purple-500
                           focus:ring-purple-600 focus:ring-offset-dark-900"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key as string}
                className={`
                  p-3 text-left text-sm font-medium text-dark-200
                  ${column.sortable ? "cursor-pointer select-none" : ""}
                `}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-1">
                  {column.title}
                  {getSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="relative">
          {loading && (
            <tr className="absolute inset-0 bg-dark-900/50">
              <td className="h-full">
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent" />
                </div>
              </td>
            </tr>
          )}
          {getSortedData().map((row, rowIndex) => (
            <tr
              key={(row as any).id || rowIndex}
              className={`
                border-b border-dark-600 transition-colors duration-150
                ${onRowClick ? "cursor-pointer" : ""}
                ${striped && rowIndex % 2 === 0 ? "bg-dark-800/50" : ""}
                ${highlightOnHover ? "hover:bg-dark-700/50" : ""}
              `}
              onClick={() => onRowClick?.(row)}
            >
              {selectable && (
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.some(
                      (r) => (r as any).id === (row as any).id
                    )}
                    onChange={() => handleRowSelect(row)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded border-dark-400 bg-dark-700 
                             checked:bg-purple-600 hover:checked:bg-purple-500
                             focus:ring-purple-600 focus:ring-offset-dark-900"
                  />
                </td>
              )}
              {columns.map((column) => (
                <td
                  key={column.key as string}
                  className="p-3 text-sm text-foreground"
                >
                  {column.render
                    ? column.render(row)
                    : (row[column.key as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && !loading && (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="p-8 text-center text-sm text-dark-300"
              >
                {noDataText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
