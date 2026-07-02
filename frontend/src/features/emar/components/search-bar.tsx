import * as React from "react";

type SearchBarProps = {
  placeholder?: string;
};

export function SearchBar({ placeholder = "Search by drug name..." }: SearchBarProps) {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </span>
      <input
        className="w-full pl-10 pr-12 py-3 bg-slate-100 border-none rounded-[1.125rem] focus:ring-2 focus:ring-primary text-sm"
        placeholder={placeholder}
        type="text"
      />
      <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary hover:text-blue-800" type="button">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}
