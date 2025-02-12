"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react"; // Icon for checkmark
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/custom-ui/notes-input";

export interface Option {
  value: string;
  label: string;
}
interface TagsSelectProps {
  tags: Option[];
  initialSelected: string[];
}

export default function TagsSelect({tags, initialSelected}:TagsSelectProps) {
  const formContext = useFormContext();
  const [options, setOptions] = useState<Option[]>(tags ?? []);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelected ?? []);
  const [isOpen, setIsOpen] = useState(false);
  const [newOption, setNewOption] = useState<string>(""); // State for new option input
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Close the dropdown
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOptions(initialSelected ?? [])
  }, [initialSelected,setSelectedOptions  ])

  useEffect(() => {
    formContext.setValue("tags", selectedOptions, { shouldDirty: true});
    
  }, [selectedOptions, formContext]);

  const toggleOption = (value: string) => {
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleAddOption = () => {
    if (newOption.trim() !== "" && !options.some(option => option.value === newOption)) {
      const newOptionObject = { value: newOption, label: newOption };
      setOptions((prev) => [...prev, newOptionObject]); // Add the new option to the list
      setSelectedOptions((prev) => [...prev, newOption]); // Add to selected options
      setNewOption(""); // Clear the input field
      setIsOpen(false); // Close dropdown after creating the option
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="border-b-[1px] rounded-[4px] py-2 cursor-pointer flex gap-x-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0
          ? (
            selectedOptions.map(option => (
              <span className="bg-background text-foreground text-preset-6 md:text-preset-5 p-2 rounded-[4px]" key={option}>
                {option}
              </span>
            ))
          )
          : <span className="py-3 text-muted-foreground text-preset-6 md:text-preset-5">Select tags</span>}
      </div>
      {isOpen && (
        <div ref={dropdownRef} className="absolute w-full max-w-[300px] bg-background-2 border p-2 shadow-md max-h-[220px] overflow-auto rounded-b-[8px]">
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 cursor-pointer flex gap-2 items-center hover:bg-background text-foreground"
              onClick={() => toggleOption(option.value)}
            >
              {selectedOptions.includes(option.value) ? (
                <Check size={16} className="text-blue-500" />
              ) : <div className="w-[16px]"></div>}
              <span>{option.label}</span>
            </div>
          ))}
          <div className="py-3 flex gap-2 items-center border-t border-border">
            <Input
              type="text"
              className="p-2 border rounded-md w-full"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Create a new tag"
            />
            <button
              className="text-blue-500 p-1"
              onClick={handleAddOption}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
