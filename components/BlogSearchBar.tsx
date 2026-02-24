"use client";

import { useQueryState, parseAsString } from "nuqs";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";

interface SearchBarProps {
  onReset?: () => void;
}

export function BlogSearchBar({ onReset }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useQueryState(
    "search",
    parseAsString.withOptions({ shallow: false }),
  );
  const [, setPage] = useQueryState("page");
  const [inputValue, setInputValue] = useState(searchQuery || "");

  useEffect(() => {
    setInputValue(searchQuery || "");
  }, [searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value || null);
    setPage("1"); // Reset to first page when searching
  };

  const handleClear = () => {
    setInputValue("");
    setSearchQuery(null);
    setPage("1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-6">
      <div className="relative">
        <div className="relative flex-0 md:basis-2/5 w-full mt-3">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search for food, location..."
            value={inputValue}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 w-full"
          />
        </div>

        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      {searchQuery && (
        <div className="mt-2 text-sm text-gray-600">
          Searching for: <span className="font-semibold">"{searchQuery}"</span>
          <button
            type="button"
            onClick={handleClear}
            className="ml-2 text-blue-600 hover:text-blue-800 underline"
          >
            Clear search
          </button>
        </div>
      )}
    </form>
  );
}
