"use client";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <label className="flex items-center justify-between gap-2 text-sm text-gray-600 sm:justify-start sm:text-base">
      সাজান:
      <span className="relative min-w-0 flex-1 sm:flex-none">
        <select
          className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white py-1.5 pl-3 pr-9 text-sm text-gray-900 outline-none focus:border-green-600"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
          <option value="rise">দাম বেশি বেড়েছে</option>
          <option value="fall">দাম বেশি কমেছে</option>
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </label>
  );
}