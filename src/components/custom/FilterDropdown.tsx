import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  maxHeight?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedValues,
  onSelectionChange,
  placeholder,
  className = "",
  maxHeight = "max-h-60",
}) => {
  const displayText = selectedValues.length > 0 ? `${label} (${selectedValues.length})` : placeholder || label;

  const handleToggle = (value: string) => {
    const newSelection = selectedValues.includes(value) ? selectedValues.filter((v) => v !== value) : [...selectedValues, value];

    onSelectionChange(newSelection);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`h-9 w-full rounded-md border border-input bg-white px-3 text-sm text-left shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring hover:bg-accent/50 ${className}`}
        >
          {displayText}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`min-w-[180px] bg-white border border-input shadow-lg ${maxHeight} overflow-auto`}>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selectedValues.includes(option)}
            onCheckedChange={() => handleToggle(option)}
            className="bg-white hover:bg-accent/50"
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
